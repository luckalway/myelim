app.controller('peijianCtrl', function($scope, soldCasesFactory, soldCaseFactory, $http) {

	$http.get("/api/peijians/folder").success(function(response) {
		$scope.folders = response;
	});

	$scope.soldCases = soldCasesFactory.query();
	console.log($scope.soldCases);
	$scope.showItemDialog = function() {

	}

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