"use strict";

app.controller('NoteListCtrl',  function($scope, NoteFactory, AuthFactory){
	console.log("NOTE LIST Ctrl");

	let user = AuthFactory.getUser();

	NoteFactory.getFirebaseNotes()
	.then( function(noteCollection){
		$scope.notes = noteCollection;
		console.log("$scope.notes", $scope.notes);
	});


	$scope.deleteNote = function(noteId){
		console.log("[CTRL] 1) Deleting: ", noteId);
		NoteFactory.deleteFirebaseNote(noteId)
		.then( function(response){
			console.log("[CTRL] 3) Deleted: ", response);
			NoteFactory.getFirebaseNotes(user)
			.then( function(noteCollection){
				$scope.notes = noteCollection;
			});
		});
	};


    
});




