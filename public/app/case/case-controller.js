app.controller('caseCtrl', function($scope, soldCasesFactory) {
	$scope.saleShows = soldCasesFactory.query();
});

app.controller('caseDetailCtrl', function($scope, $routeParams, soldCaseFactory) {
	$scope.itemId = $routeParams.id;
	$scope.caseItem = soldCaseFactory.get({
		id : $scope.itemId
	});
	console.log($scope.caseItem);
});