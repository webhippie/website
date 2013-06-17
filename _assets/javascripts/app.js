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


function equalizeHeights()
{
	Array.max = function( array ) { return Math.max.apply( Math, array ); };
	var heights = $('.memberBox').map(function() { return $(this).height();} ).get();
	var highestCol = Array.max(heights);
	$('.memberBox .panel').height(highestCol-40);
	/* TODO DEBUG */ document.title = highestCol + "  " + Math.random();
}	

$(document).foundation();
$(document).ready(function()
{
	equalizeHeights();
	$("#fittextTitle").fitText(1.1, { minFontSize: '25px', maxFontSize: '60px' });
	//$(".whSubtitle").fitText();	
	$('.members .memberBox').shuffle();
});

$(window).resize(function() 
{
	setTimeout(function(){equalizeHeights();},1000);
});
