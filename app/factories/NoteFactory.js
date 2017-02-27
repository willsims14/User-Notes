"use strict";

app.factory("NoteFactory", function($q, $http, AuthFactory, FBCreds){

	let getFirebaseNotes = function(){
		let notes = [];
		let userNotes = [];
		let user = AuthFactory.getUser();

		console.log("User: ", user);

		return $q((resolve, reject) => {
			// $http.get(`${FBCreds.databaseURL}/notes.json?orderBy="uid"&equalTo="${user}"`)
			$http.get(`${FBCreds.databaseURL}/notes.json`)
			.then((noteObject) => {
				console.log("[NOTE_FACT] $q Request: ", noteObject);
				let noteCollection = noteObject.data;
				Object.keys(noteCollection).forEach((key) => {
					noteCollection[key].id = key;
					notes.push(noteCollection[key]);

					if(noteCollection[key].uid === user){
						userNotes.push(noteCollection[key]);
					}

				});
				console.log("NOTES: ", notes);
				console.log("User Notes: ", userNotes);
				resolve(userNotes);
			})
			.catch((error) => {
				reject(error);
			});
		});
	};
	

	let deleteFirebaseNote = function(noteId){
		return $q((resolve, reject) => {
			console.log("URL: ", `${FBCreds.databaseURL}/notes/${noteId}.json`);
			$http.delete(`${FBCreds.databaseURL}/notes/${noteId}.json`)
			.then((objectFromFirebase) => {
				console.log("[FACT] 2) Deleting: ", objectFromFirebase);
				resolve(objectFromFirebase);
			});
		});

	};

	let updateFirebaseNote = function(noteId){

	};

	let addNoteToFirebase = function(note){
		return $q((resolve, reject) => {
			$http.post(`${FBCreds.databaseURL}/notes.json`, angular.toJson(note))
			.then((ObjectFromFirebase) => {
				resolve(ObjectFromFirebase);
			}).catch((error) => {
				reject(error);
			});
		});
	};

	return {getFirebaseNotes, deleteFirebaseNote, updateFirebaseNote, addNoteToFirebase};


});
