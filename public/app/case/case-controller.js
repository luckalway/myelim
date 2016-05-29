app.controller('caseCtrl', function($scope, myService) {
	myService.getAnlis().then(function(soldCases) {
        $scope.saleShows = soldCases;
    });;
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