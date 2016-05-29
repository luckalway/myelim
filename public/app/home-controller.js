app.controller('homeCtrl', function($scope, myService) {
	myService.getAnlis().then(function(soldCases) {
    	if (soldCases.length > 4) {
    		$scope.customerCases = soldCases.slice(0, 4);
    	} else {
    		$scope.customerCases = soldCases;
    	}
    });
}).directive("advantageSection", function() {
	return {
		restrict : "AEC",
		link : function(scope, element, attrs) {
			element.find("li").mouseenter(function() {
				$(this).find(".bgOne").animate({
					bottom : "0%"
				});
			});

			element.find("li").mouseleave(function() {
				$(this).find(".bgOne").animate({
					bottom : "-100%"
				});
			});
		}
	}
});