app.controller('caseCtrl', function($scope, soldCasesFactory) {
	$scope.saleShows = soldCasesFactory.query();
});

app.controller('caseDetailCtrl', function($scope, $routeParams) {
	$scope.itemId = $routeParams.id;
	for (var i = 0; i < window.saleShows.length; i++) {
		var caseItem = window.saleShows[i];
		console.log(caseItem);
		if (caseItem.id == $scope.itemId) {
			$scope.caseItem = caseItem;
			break;
		}
	}
});