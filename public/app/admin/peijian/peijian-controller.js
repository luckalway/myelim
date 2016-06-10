app.controller('peijianCtrl', function($scope, soldCasesFactory, soldCaseFactory, $http) {

	$http.get("/api/peijians/folder").success(function(response) {
		$scope.folders = response;
	});

	$http.get("/api/peijians").success(function(response) {
		$scope.peijians = response;
	});

	$scope.deleteItem = function($id) {
		$http({
			url : '/api/peijians/' + $id,
			method : 'DELETE'
		}).success(function(data, header, config, status) {

		}).error(function(data, header, config, status) {

		});
		window.location.reload();
	}

	$scope.addSoldCase = function() {
		alert('');
		return false;
	}
});