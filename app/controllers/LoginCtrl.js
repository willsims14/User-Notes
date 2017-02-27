"use strict";

app.controller("LoginCtrl", function($scope, $location, $window, AuthFactory) {


	$scope.account = {
		email: "",
		password: ""
	};

	let logout = function() {
		console.log("[LOGIN_CTRL] logout() click");
		AuthFactory.logoutUser()
		.then(function(data){
			$window.location.url = "/login";
		}, function(error){
			console.log("error occured on logout");
		});
	};

	//when first loaded, make sure no one is logged in
	if(AuthFactory.isAuthenticated()){
		logout();
	}


	$scope.register = function() {
    	console.log("[LOGIN_CTRL] register() click");
	    AuthFactory.createUser({
	      email: $scope.account.email,
	      password: $scope.account.password
	    })
	    .then( function(userData) {
	    	console.log("UserCtrl newUser:", userData );
	    	$scope.login();
	    }).catch( function(error){
	        console.log("Error creating user:", error);
	    });
  	};


  	$scope.login = function() {
    	console.log("[LOGIN_CTRL] login() click");
    	AuthFactory.loginUser($scope.account)
	    .then( function(x) {
	    	console.log("Calling Authe: ", x);
	        AuthFactory.isAuthenticated()
	        .then( function(userPresent){
	        	console.log("User Present2: ", userPresent);
		        $window.location.href = "#!/note-list";
		        console.log("Window Location Set");
	        })
	        .catch( function(error){
	        	console.log("ERROR: ", error);
	        });
	    });
	};

	$scope.loginGoogle = function() {
		console.log("[LOGIN_CTRL] loginWithGoogle() click");
		AuthFactory.authWithProvider()
		.then(function(result) {
	    	var user = result.user.uid;
	    	console.log("logged in user:", user);

	    	console.log("Calling Auth");
	    	AuthFactory.isAuthenticated()
	    	.then( function(x){
	    		console.log("[LOGIN_CTRL] loginWithGoogle() isAuthenticated(): (true/false): ");
		    	$window.location.href = "#!/note-list";
	    	});

	  	}).catch(function(error) {
	    	// Handle the Errors.
	    	console.log("error with google login", error);
	    	var errorCode = error.code;
	    	var errorMessage = error.message;
	    	// The email of the user's account used.
	    	var email = error.email;
	    	// The firebase.auth.AuthCredential type that was used.
	    	var credential = error.credential;
	    	// ...
	  	});
	};




});