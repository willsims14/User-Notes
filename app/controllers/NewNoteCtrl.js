"use strict";

app.controller("NewNoteCtrl", function($scope, $location, AuthFactory, NoteFactory) {
	console.log("NEW NOTE Ctrl");

	$scope.pageTitle = "New Note";
	$scope.btnText = "Add Note";

	let user = AuthFactory.getUser();

	$scope.newNote = {
		title: "",
		desc: "",
		due: "",
		uid: user
	};

	$scope.addNewNote = function(){
		$scope.newNote.uid = user;
		console.log("$scope.uid: ", $scope.newNote.uid);
		console.log("New Note: ", $scope.newNote);
		NoteFactory.addNoteToFirebase($scope.newNote)
		.then( function(response){
			$location.url('/note-list');
		});

		$scope.newNote = {};
	};
});