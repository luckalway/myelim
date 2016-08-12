$(document).ready(function() {
	var floatNavsPos = $("#JS_float_navs_position").offset().top;
	console.log(floatNavsPos);
	$(window).scroll(function(event) {
		console.log($(window).scrollTop());
		if ($(window).scrollTop() >= floatNavsPos) {
			if (!$(".module-toggle-bar").hasClass("fixed-top")) {
				$(".module-toggle-bar").addClass("fixed-top");
			}
		} else {
			$(".module-toggle-bar").removeClass("fixed-top");
		}
	});

	$(".module-toggle-bar").find('.Left a').click(function() {
		var self = $(this);
		if (self.hasClass('current'))
			return;

		var prevActivePanel = $('#item_' + self.siblings('.current').data('key'));
		prevActivePanel.hide();
		prevActivePanel.removeClass('current');
		self.siblings('.current').removeClass('current');

		self.addClass('current');
		var currActivePanel = $('#item_' + self.data('key'));
		currActivePanel.addClass('current');
		currActivePanel.show();
	});
});