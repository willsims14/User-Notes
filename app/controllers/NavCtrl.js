"use strict";

app.controller("NavCtrl", function($scope, $window){
	$scope.isLoggedIn = false;

	firebase.auth().onAuthStateChanged( function(user){
		firebase.auth().onAuthStateChanged( function(user){
			if(user){
				$scope.isLoggedIn = true;
				console.log("Current User Logged In: ", $scope.isLoggedIn);
			}else{
				$scope.isLoggedIn = false;
				console.log("Current User Logged In: ", $scope.isLoggedIn);
				$window.location.href = "#!/login";
			}
		});
	});


});