app.controller('baiyeCtrl', function($scope, soldCasesFactory, soldCaseFactory, $http) {
	$http.get("/api/baiyes/folder").success(function(response) {
		$scope.folders = response;
	});
	
	$http.get("/api/baiyes").success(function(response) {
		$scope.baiyes = response;
	});

	$scope.deleteItem = function($id) {
		soldCaseFactory.remove({
			id : $id
		});
		window.location.reload();
	}

	$scope.addSoldCase = function() {
		alert('');
		return false;
	}
});