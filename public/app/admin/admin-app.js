var app = angular.module('adminApp', [ 'ngRoute', 'ngResource', 'Authentication', 'ngCookies' ]);

app.config(function($routeProvider) {
	$routeProvider.when('/anli', {
		templateUrl : 'app/admin/anli/anli.html'
	}).when('/peijian', {
		templateUrl : 'app/admin/peijian/peijian.html'
	}).when('/baiye', {
		templateUrl : 'app/admin/baiye/baiye.html'
	}).when('/login', {
		templateUrl : 'app/admin/login/login.html'
	}).otherwise({
		redirectTo : '/login'
	})
});

app.config(function($httpProvider) {
	$httpProvider.interceptors.push('TokenInterceptor');
});

app.run(function($rootScope, $location, AuthenticationService) {
	$rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
		if (!AuthenticationService.isLogged) {
			$location.path("/login");
		}
	});
});