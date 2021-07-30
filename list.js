var application = angular.module("application", []);

application.controller("controller", 
	
	function($scope) {
		
		$scope.alert = {class:"alert-warning", message:"يرجى الانتظار"};
		$scope.students = new Object();
		
		/*
		firebase.database().ref("students").once("value").then(function(snapshot){
			
			$scope.alert = {class:"d-none", message:null};
			
			$scope.students = snapshot.val();
			
			$scope.$digest();
		});
		*/
		
		/*
		firebase.firestore().collection("students").get().then(function(snapshot){
			
			$scope.alert = {class:"d-none", message:null};
			
			snapshot.forEach(function(doc){
								
				$scope.students[doc.id] = doc.data();
			});
			
			console.log($scope.students);
			
			$scope.$digest();
		});
		*/
		
		/*
		firebase.database().ref("students").on("child_added", function(data){
			
			$scope.alert = {class:"d-none", message:null};
			
			$scope.students[data.key] = data.val();
			
			$scope.$digest();
		});
		
		firebase.database().ref("students").on("child_changed", function(data){
			
			$scope.students[data.key] = data.val();
			
			$scope.$digest();
		});
		*/
		
		firebase.firestore().collection("students").onSnapshot(function(snapshot) {
			
			$scope.alert = {class:"d-none", message:null};
			
			snapshot.docChanges().forEach(function(change) {
				
				$scope.students[change.doc.id] = change.doc.data();
				
				$scope.$digest();
			});
		});
	}
);