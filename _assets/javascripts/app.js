//= require vendor/jquery
//= require vendor/custom.modernizr
//= require vendor/shuffleelements.jquery
//= require vendor/jquery.fittext

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

function equalizeBoxHeights()
{
	$('#boxHeightContainer').each(function()
	{  
		$('.boxHeightColumn',this).css("min-height",0);
		
		var highestBox = 0;
		$('.boxHeightColumn', this).each(function()
		{
			if($(this).height() > highestBox) 
				highestBox = $(this).height(); 
		});  

		$('.boxHeightColumn',this).css("min-height",highestBox);
	});    
}

$(document).foundation();

$(document).ready(function()
{
	equalizeBoxHeights();
	$("#titleText").fitText(1.1, { /*minFontSize: '25px',*/ maxFontSize: '60px' });
	$("#subtitleText").fitText(2.8, { minFontSize: '0px', maxFontSize: '27px' } );	
	$('.members .memberBox').shuffle();
});

$(window).resize(function()
{
	//setTimeout(function(){equalizeBoxHeights();},250);
	equalizeBoxHeights();
});