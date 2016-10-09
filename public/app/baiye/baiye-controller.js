app.controller('baiyeListCtrl', function($scope, $http) {
	$http.get("/api/baiyes").success(function(response) {
		console.log(response);
		$scope.baiyes = response;
	});
});

app.controller('baiyeDetailCtrl', function($scope, $routeParams, $http) {
	$http.get("/api/baiyes/" + $routeParams.id).success(function(response) {
		$scope.baiye = response;
	});
});
