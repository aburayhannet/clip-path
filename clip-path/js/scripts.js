/* -----------------------------------------------------------------------------

	TABLE OF CONTENTS

	1.) General
	2.) Components
	3.) Header
	4.) Core
	5.) Widgets
	6.) Footer
	7.) Other

----------------------------------------------------------------------------- */

(function($){ "use strict";
$(document).ready(function(){

/* -----------------------------------------------------------------------------

	1.) GENERAL

----------------------------------------------------------------------------- */

	/* -------------------------------------------------------------------------
		CHECK FOR TOUCH DISPLAY
	------------------------------------------------------------------------- */

	$( 'body' ).one( 'touchstart', function(){
		$(this).addClass( 'm-touch' );
	});

	/* -------------------------------------------------------------------------
		INIT PAGE
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrInitPage ) {
		$.fn.lsvrInitPage = function( element ){

			var $element = $( element );

			// FLUID VIDEOS
			if ( $.fn.lsvrFluidEmbedMedia ){
				$element.lsvrFluidEmbedMedia();
			}

			// FORMS

				// ajax forms
				if ( $.fn.lsvrAjaxForm ) {
					$element.find( 'form.m-ajax-form' ).each(function(){
						$(this).lsvrAjaxForm();
					});
				}

				// checkbox inputs
				if ( $.fn.lsvrCheckboxInput ) {
					$element.find( '.checkbox-input' ).each(function(){
						$(this).lsvrCheckboxInput();
					});
				}

				// radio inputs
				if ( $.fn.lsvrRadioInput ) {
					$element.find( '.radio-input' ).each(function(){
						$(this).lsvrRadioInput();
					});
				}

				// selectbox inputs
				if ( $.fn.lsvrSelectboxInput ) {
					$element.find( '.selectbox-input' ).each(function(){
						$(this).lsvrSelectboxInput();
					});
				}

				// validate forms
				if ( $.fn.lsvrIsFormValid ) {
					$element.find( 'form.m-validate' ).each(function(){
						var $this = $(this);
						$this.submit(function(){
							if ( ! $this.lsvrIsFormValid() ) {
								$this.find( '.m-validation-error' ).slideDown( 300 );
								return false;
							}
						});
					});
				}

			// INVIEW ANIMATION
			if ( $.fn.lsvrInviewAnimation ) {
				$element.find( '[data-inview-anim]' ).each( function(){
					$(this).addClass( 'visibility-hidden' );
					$(this).lsvrInviewAnimation();
				});
			}

			// LIGHTBOXES
			if ( $.fn.lsvrInitLightboxes ) {
				$element.lsvrInitLightboxes();
			}

			// LOAD HIRES IMAGES FOR HiDPI SCREENS
			if ( $.fn.lsvrLoadHiresImages ) {
				$element.lsvrLoadHiresImages();
			}

		};
	}
	$.fn.lsvrInitPage( 'body' );

	/* -------------------------------------------------------------------------
		MEDIA QUERY BREAKPOINT
	------------------------------------------------------------------------- */

	var mediaQueryBreakpoint;
	if ( $.fn.lsvrGetMediaQueryBreakpoint ) {
		mediaQueryBreakpoint = $.fn.lsvrGetMediaQueryBreakpoint();
		$( document ).on( 'screenTransition', function(){
			mediaQueryBreakpoint = $.fn.lsvrGetMediaQueryBreakpoint();
		});
	}
	else {
		mediaQueryBreakpoint = $(window).width();
	}


/* -----------------------------------------------------------------------------

	2.) COMPONENTS

----------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrInitComponents ) {
		$.fn.lsvrInitComponents = function( element ){

			var $element = $( element );

			/* -------------------------------------------------------------------------
				ARTICLE LIST
			------------------------------------------------------------------------- */

			if ( $.fn.isotope && $.fn.lsvrImagesLoaded ) {
				$element.find( '.c-article-list.m-masonry' ).each(function(){
					var $this = $(this);
					$this.lsvrImagesLoaded(function(){

						// INIT ISOTOPE
						$this.isotope({
							itemSelector: '.c-article',
							layoutMode: 'masonry',
						});

					});

				});
			}

			/* -------------------------------------------------------------------------
				ACCORDION
			------------------------------------------------------------------------- */

			if ( $.fn.lsvrAccordion ) {
				$element.find( '.c-accordion' ).each(function(){
					$(this).lsvrAccordion();
				});
			}

			/* -------------------------------------------------------------------------
				CAROUSEL
			------------------------------------------------------------------------- */

			if ( $.fn.lsvrCarousel ) {
				$element.find( '.c-carousel' ).each(function(){
					$(this).lsvrCarousel();
				});
			}

			/* -------------------------------------------------------------------------
				COUNTER
			------------------------------------------------------------------------- */

			if ( $.fn.lsvrCounter ) {
				$element.find( '.c-counter' ).each(function(){
					$(this).lsvrCounter();
				});
			}

			/* -------------------------------------------------------------------------
				GOOGLE MAP
			------------------------------------------------------------------------- */

			if ( $.fn.lsvrLoadGoogleMaps && $element.find( '.c-gmap' ).length > 0 ) {
				$.fn.lsvrLoadGoogleMaps();
			}

			/* -------------------------------------------------------------------------
				PARALLAX SECTION
			------------------------------------------------------------------------- */

			if ( $.fn.parallax ) {

				// Webkit background-attachment:fixed bug fix
				if ( 'WebkitAppearance' in document.documentElement.style ) {
					$element.find( '.c-parallax-section, .c-cta-message.m-parallax' ).each(function(){
						$(this).fadeOut(1).fadeIn(1);
					});
				}

				// DYNAMIC
				$element.find( '.c-parallax-section.m-dynamic, .c-cta-message.m-parallax' ).each(function(){
					if ( mediaQueryBreakpoint > 1299 ) {
						$(this).parallax( '50%', 0.3 );
					}
				});

			}

			/* -------------------------------------------------------------------------
				PROGRESS BAR
			------------------------------------------------------------------------- */

			if ( $.fn.lsvrProgressBar ) {
				$element.find( '.c-progress-bar' ).each(function(){
					$(this).lsvrProgressBar();
				});
			}

			/* -------------------------------------------------------------------------
				SLIDER
			------------------------------------------------------------------------- */

			if ( $.fn.lsvrSlider ) {
				$element.find( '.c-slider' ).each(function(){
					$(this).lsvrSlider();
				});
			}

			/* -------------------------------------------------------------------------
				TABS
			------------------------------------------------------------------------- */

			if ( $.fn.lsvrTabs ) {
				$element.find( '.c-tabs' ).each(function(){
					$(this).lsvrTabs();
				});
			}

		};
	}
	$.fn.lsvrInitComponents( 'body' );


/* -----------------------------------------------------------------------------

	3.) HEADER

----------------------------------------------------------------------------- */

	/* -------------------------------------------------------------------------
		PARALLAX EFFECT
	------------------------------------------------------------------------- */

	if ( $.fn.lsvrParallax ) {
		$( '#header' ).filter( '.m-parallax' ).each(function(){
			$(this).lsvrParallax( '50%', 0.3 );
		});
	}

	/* -------------------------------------------------------------------------
		HEADER MENU
	------------------------------------------------------------------------- */

	// CLASSES
	$( '.header-menu > ul > li:last-child' ).addClass( 'm-last' );
	$( '.header-menu > ul > li:nth-last-child(2)' ).addClass( 'm-penultimate' );

	// SUBMENU
	if ( ! $.fn.lsvrHeaderSubmenu ) {
		$.fn.lsvrHeaderSubmenu = function(){

			var	$this = $(this),
				$parent = $this.parent();

			$parent.addClass( 'm-has-submenu' );

			// CREATE TOGGLES
			if ( $parent.find( '> .toggle' ).length < 1 ) {
				$parent.append( '<button class="submenu-toggle" type="button"><i></i></button>' );
			}
			var $toggle = $parent.find( '> .submenu-toggle' );

			// TOGGLE
			$toggle.click( function(){

				// close
				if ( $(this).hasClass( 'm-active' ) ) {
					$toggle.removeClass( 'm-active' );
					$this.slideUp( 300 );
				}

				// open
				else {

					// deactivate others
					if ( $(this).parents( 'ul' ).length < 2 ) {
						$( '#header .header-menu > ul > li > .submenu-toggle.m-active' ).each(function(){
							$(this).removeClass( 'm-active' );
							$(this).parent().find( '> ul' ).slideUp( 300 );
						});
					}

					// activate this
					$toggle.addClass( 'm-active' );
					$this.slideDown( 300 );

				}

			});

			// HIDE ON SCREEN TRANSITION
			$( document ).on( 'screenTransition', function(){
				$toggle.removeClass( 'm-active' );
				$this.removeAttr( 'style' );
			});


			$parent.on( 'touchstart', function(){
				$parent.addClass( 'touch' );
			});

			// HOVER
			$parent.hover(function(){
				if ( mediaQueryBreakpoint > 1199 && ! $( 'body' ).hasClass( 'm-touch' ) ) {
					$parent.addClass( 'm-hover' );
					$this.show().addClass( 'animated fadeInDown' );
				}
			}, function(){
				if ( mediaQueryBreakpoint > 1199 && ! $( 'body' ).hasClass( 'm-touch' ) ) {
					$parent.removeClass( 'm-hover' );
					$this.hide().removeClass( 'animated fadeInDown' );
				}
			});

			// CLICK ON TOUCH DISPLAY
			$parent.find( '> a' ).click(function(){
				if ( mediaQueryBreakpoint > 1199 && ! $parent.hasClass( 'm-hover' ) ) {

					if ( $(this).parents( 'ul' ).length < 2 ) {
						$( '#header .header-menu li.m-hover' ).each(function(){
							$(this).removeClass( 'm-hover' );
							$(this).find( '> ul' ).hide();
						});
					}

					$parent.addClass( 'm-hover' );
					$this.show().addClass( 'animated fadeInDown' );
					$this.bind( 'clickoutside', function(event){
						$parent.removeClass( 'm-hover' );
						$this.hide().removeClass( 'animated fadeInDown' );
						$this.unbind( 'clickoutside' );
					});
					return false;

				}
			});

		};

		$( '.header-menu ul > li > ul' ).each(function(){
			$(this).lsvrHeaderSubmenu();
		});

	}

	// SCROLLSPY
	$( '.header-menu > ul a[href^="#"]' ).each(function(){

		var $this = $(this),
			link = $this.attr( 'href' ),
			anchor;

		// SCROLLSPY
		if ( $.fn.lsvrScrollspy && $( link ).length > 0 && ! $( link ).hasClass( 'scrollspied' ) ) {

			$( link ).addClass( 'scrollspied' );
			$( link ).lsvrScrollspy({
				tolerance: 200,
				onEnter: function(){
					$( '.header-menu > ul > li.m-active' ).removeClass( 'm-active' );
					$( '.header-menu a[href="' + link + '"]' ).parent().addClass( 'm-active' );
				}
			});
			$( window ).trigger( 'scroll' );

		}

	});

	// NAVIGATION TOGGLE ON MOBILE
	$( '.header-navigation-toggle' ).click(function(){

		var $this = $(this),
			$headerNavigation = $( '#header .header-navigation' );

		// HIDE
		if ( $this.hasClass( 'm-active' ) ) {
			$this.removeClass( 'm-active' );
			$headerNavigation.slideUp( 300 );
		}

		// SHOW
		else {
			$this.addClass( 'm-active' );
			$headerNavigation.slideDown( 300 );
		}

	});
	$( document ).on( 'screenTransition', function(){
		$( '.header-navigation-toggle' ).removeClass( 'm-active' );
		$( '#header .header-navigation' ).removeAttr( 'style' );
	});

	/* -------------------------------------------------------------------------
		HEADER SEARCH
	------------------------------------------------------------------------- */

	$( '.header-search' ).each(function(){

		var $this = $(this),
			$form = $this.find( 'form' ),
			$searchInput = $form.find( '.search-input' );

		// HOVER
		$this.hover(function(){
			if ( mediaQueryBreakpoint > 1199 ) {
				$this.addClass( 'm-hover' );
				$form.show().addClass( 'animated fadeInDown' );
				$searchInput.focus();
			}
		}, function(){
			if ( mediaQueryBreakpoint > 1199 ) {
				$this.removeClass( 'm-hover' );
				$form.hide().removeClass( 'animated fadeInDown' );
			}
		});

	});


/* -----------------------------------------------------------------------------

	4.) CORE

----------------------------------------------------------------------------- */

	/* -------------------------------------------------------------------------
		PAGE TITLE
	------------------------------------------------------------------------- */

	// PARALLAX EFFECT
	if ( $.fn.lsvrParallax ) {
		$( '#page-title.m-parallax .page-title-top' ).each(function(){
			$(this).lsvrParallax( '50%', 0.3 );
		});
	}


/* -----------------------------------------------------------------------------

	5.) WIDGETS

----------------------------------------------------------------------------- */

	/* -------------------------------------------------------------------------
		FLICKR WIDGET
	------------------------------------------------------------------------- */

	if ( $.fn.lsvrFlickrFeed ) {
		$( '.flickr-widget' ).each(function(){
			$(this).lsvrFlickrFeed();
		});
	}

	/* -------------------------------------------------------------------------
		SUBSCRIBE WIDGET
	------------------------------------------------------------------------- */

	if ( $.fn.lsvrMailchimpSubscribeForm ) {
		$( '.subscribe-widget-form' ).each(function(){
			$(this).lsvrMailchimpSubscribeForm();
		});
	}


/* -----------------------------------------------------------------------------

	6.) FOOTER

----------------------------------------------------------------------------- */

	/* -------------------------------------------------------------------------
		PARALLAX EFFECT
	------------------------------------------------------------------------- */

	if ( $.fn.lsvrParallax ) {
		$( '#footer.m-parallax' ).each(function(){
			$(this).lsvrParallax( '50%', 0.3 );
		});
	}


/* -----------------------------------------------------------------------------

	7.) OTHER

----------------------------------------------------------------------------- */

	/* -------------------------------------------------------------------------
		SCROLL ANIMATION
	------------------------------------------------------------------------- */

	$( 'a[href^="#"]' ).each(function(){

		var $this = $(this),
			element = $this.attr( 'href' );

		if ( $( element ).length > 0 ) {
			$this.click(function(e){
				$( 'html, body' ).animate({
					'scrollTop' : $( element ).offset().top - 95
				}, 500);
				return false;
			});
		}

	});

});
})(jQuery);
