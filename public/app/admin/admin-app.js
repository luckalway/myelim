var app = angular.module('adminApp', [ 'ngRoute', 'ngResource' ]);

app.config(function($routeProvider) {
	$routeProvider.when('/anli', {
		templateUrl : 'app/admin/anli/anli.html'
	}).when('/peijian', {
		templateUrl : 'app/admin/peijian/peijian.html'
	}).otherwise({
		redirectTo : '/anli'
	})
});
