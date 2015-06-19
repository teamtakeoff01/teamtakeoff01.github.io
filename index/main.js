jQuery(document).ready(function($){
	var $lateral_menu_trigger = $('#cd-menu-trigger'),
		$lateral_menu_text_trigger = $('#cd-menu-text-trigger'),
		$content_wrapper = $('.cd-main-content'),
		$navigation = $('header');

	//open-close lateral menu clicking on the menu hamburger icon
	$lateral_menu_trigger.on('click', function(event){
		event.preventDefault();
		$lateral_menu_trigger.toggleClass('is-clicked');
		$navigation.toggleClass('lateral-menu-is-open');
		$('#one').toggleClass('addRgba');
		$('#two').toggleClass('addRgba');
		$content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			$('body').toggleClass('overflow-hidden');
		});
		$('#cd-lateral-nav').toggleClass('lateral-menu-is-open');
		$('#cd-menu-trigger').toggleClass('cross_transition');
		//check if transitions are not supported - i.e. in IE9
		if($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}
	});

	//open-close lateral menu clicking on the menu Text itself
	$lateral_menu_text_trigger.on('click', function(event){
		event.preventDefault();
		$('#cd-menu-trigger').toggleClass('is-clicked');
		$('#cd-menu-text-trigger').toggleClass('is-clicked');
		$('#cd-lateral-nav').toggleClass('lateral-menu-is-open');
		$navigation.toggleClass('lateral-menu-is-open');
		$('#one').toggleClass('addRgba');
		$('#two').toggleClass('addRgba');
		$content_wrapper.toggleClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			// firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
			$('body').toggleClass('overflow-hidden');
		});
		$('#cd-menu-trigger').toggleClass('cross_transition');
		
		//check if transitions are not supported - i.e. in IE9
		if($('html').hasClass('no-csstransitions')) {
			$('body').toggleClass('overflow-hidden');
		}
	});

	//close lateral menu clicking outside the menu itself
	$(document).on('click','.cd-main-content', function(event){
		if( !$(event.target).is('#cd-menu-trigger, #cd-menu-trigger span') ) {
			$lateral_menu_trigger.removeClass('is-clicked');
			$lateral_menu_text_trigger.removeClass('is-clicked');
			$('#cd-lateral-nav').removeClass('lateral-menu-is-open');
			$navigation.removeClass('lateral-menu-is-open');
			if($('#two').hasClass("addRgba") == true){
				$('#cd-menu-trigger').toggleClass('cross_transition');
			}
			
			$('#one').removeClass('addRgba');
			$('#two').removeClass('addRgba');
			$content_wrapper.removeClass('lateral-menu-is-open').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				$('body').removeClass('overflow-hidden');
			});
			
			//check if transitions are not supported
			if($('html').hasClass('no-csstransitions')) {
				$('body').removeClass('overflow-hidden');
			}

		}
	});

	//open (or close) submenu items in the lateral menu. Close all the other open submenu items.
	$('.item-has-children').children('a').on('click', function(event){
		event.preventDefault();
		$(this).toggleClass('submenu-open').next('.sub-menu').slideToggle(200).end().parent('.item-has-children').siblings('.item-has-children').children('a').removeClass('submenu-open').next('.sub-menu').slideUp(200);
	});
});