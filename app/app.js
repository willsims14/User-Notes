"use strict";

var app = angular.module("MyApp", ['ngRoute']);


let isAuth = (AuthFactory) => new Promise ( (resolve, reject) => {
    AuthFactory.isAuthenticated()
    .then ( (userExists) => {
        if (userExists){
      console.log("[APP] isAuth(): user exists");
            resolve();
        }else {
      console.log("Authentication rejected, go away.");
            reject();
        }
    });
});

app.config(function($routeProvider){
    $routeProvider.
    when('/', {
    	templateUrl: 'partials/login.html',
    	controller: 'LoginCtrl' 
    }).
    when('/login', {
    	templateUrl:"partials/login.html",
    	controller: "LoginCtrl"
    }).
    when('/new-note', {
    	templateUrl: "partials/new-note.html",
    	controller: "NewNoteCtrl"
    }).
    when('/note-list', {
        templateUrl: "partials/note-list.html",
        controller: "NoteListCtrl",
        resolve: {isAuth}
    }).
    otherwise('/');
});


app.run( function($location, FBCreds) {
    let creds = FBCreds;
    let authConfig = {
        apiKey: creds.apiKey,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    };
    firebase.initializeApp(authConfig);
});

