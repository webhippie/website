//= require vendor/jquery
//= require vendor/custom.modernizr
//= require vendor/shuffleelements
//= require vendor/fittext

//= require foundation/foundation
//= require foundation/foundation.joyride
//= require foundation/foundation.cookie
//= require foundation/foundation.alerts
//= require foundation/foundation.interchange
//= require foundation/foundation.magellan
//= require foundation/foundation.tooltips
//= require foundation/foundation.placeholder
//= require foundation/foundation.reveal
//= require foundation/foundation.clearing
//= require foundation/foundation.orbit
//= require foundation/foundation.dropdown
//= require foundation/foundation.forms
//= require foundation/foundation.topbar
//= require foundation/foundation.section
//= require_self

//function equalizeBoxHeights() {
//	$('.boxHeightContainer').each(function() {  
//		$('.boxHeightColumn', this).css("min-height", 0);
//		
//		var highestBox = null;

//		$('.boxHeightColumn', this).each(function() {
//			if($(this).height() > $(highestBox).height())
//				highestBox = $(this);
//		});

//		var highestOrigSize = $(highestBox).height();

//		$('.boxHeightColumn', this).css("min-height", $(highestBox).height() + 
//			(parseInt($(highestBox).css('padding-top').replace("px", "")) + 
//			 parseInt($(highestBox).css('padding-bottom').replace("px", ""))));
//		$(highestBox).css("min-height", highestOrigSize);
//	});    
//}

function equalizeBoxHeights() {
	$('.boxHeightContainer').each(function() {  
		$('.boxHeightColumn', this).css("height", "");
		
		var highestBox = null;

		$('.boxHeightColumn', this).each(function() {
			if($(this).height() > $(highestBox).height())
				highestBox = $(this);
		});

		$('.boxHeightColumn', this).css("height", $(highestBox).height() + 
			(parseInt($(highestBox).css('padding-top').replace("px", "")) + 
			 parseInt($(highestBox).css('padding-bottom').replace("px", ""))));
	});    
}

$(document).foundation();

$(document).ready(function() {
	$("#titleText").fitText(1.1, { maxFontSize: '60px' });
	$("#subtitleText").fitText(2.8, { minFontSize: '0px', maxFontSize: '27px' });	
	$('.members .memberBox').shuffle();
});

$(window).load(function() {
	equalizeBoxHeights();
});

$(window).resize(function() {
	equalizeBoxHeights();
});

