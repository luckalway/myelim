var app = angular.module('adminApp', [ 'ngRoute', 'ngResource' ]);

app.config(function($routeProvider) {
	$routeProvider.when('/admin', {
		templateUrl : 'app/admin/admin.html'
	}).otherwise({
		redirectTo : '/admin'
	})
});

app.controller('soldCaseCtrl', function($scope, soldCasesFactory, soldCaseFactory) {
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

	$scope.refreshPage = function() {
		window.location.reload();
	}
});