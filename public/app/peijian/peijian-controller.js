app.controller('peijianListCtrl', function($scope, $http) {
	$http.get("/api/peijians").success(function(response) {
		$scope.peijians = response;
	});
});

app.controller('peijianDetailCtrl', function($scope, $routeParams, $http) {
	$http.get("/api/peijians/" + $routeParams.id).success(function(response) {
		$scope.peijianItem = response;
	});
});
