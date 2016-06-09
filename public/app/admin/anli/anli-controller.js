app.controller('soldCaseCtrl', function($scope, soldCasesFactory, soldCaseFactory, $http) {
	$("#date").datetimepicker({
		minView : "month",
		format : 'yyyy-mm-dd',
		autoclose : true,
		todayBtn : true
	});

	$http.get("/api/sold-cases/folder").success(function(response) {
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