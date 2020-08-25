(function($){ "use strict";

/* -----------------------------------------------------------------------------

	PLUGINS

----------------------------------------------------------------------------- */

	/* -------------------------------------------------------------------------
		ACCORDION
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrAccordion ) {
		$.fn.lsvrAccordion = function(){

			var $this = $(this),
				isToggle = $this.hasClass( 'm-toggle' ) ? true : false,
				items = $this.find( '> li' );

			items.filter( '.m-active' ).find( '.accordion-content' ).slideDown( 300 );

			$this.find( '.accordion-title' ).click(function(){
				if ( ! $(this).parent().hasClass( 'm-active' ) ) {
					if ( ! isToggle ) {
						items.filter( '.m-active' ).find( '.accordion-content' ).slideUp(300);
						items.filter( '.m-active' ).removeClass( 'm-active' );
					}
					$(this).parent().find( '.accordion-content' ).slideDown(300);
					$(this).parent().addClass( 'm-active' );
				}
				else {
					$(this).parent().find( '.accordion-content' ).slideUp(300);
					$(this).parent().removeClass( 'm-active' );
				}
			});

		};
	}

	/* -------------------------------------------------------------------------
		AJAX FORM
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrAjaxForm ) {
		$.fn.lsvrAjaxForm = function(){
		// REQUIRED PLUGINS
		if ( $.fn.lsvrIsFormValid ) {

			var form = $(this),
				submitBtn = form.find( '.submit-btn' );

			form.submit(function(e){
				e.preventDefault();

				if ( ! submitBtn.hasClass( 'm-loading' ) ) {

					// CLEAN OLD MESSAGES
					form.find( '.c-alert-message.m-success, .c-alert-message.m-phpvalidation-error' ).slideUp( 300, function(){
						$(this).remove();
					});

					// FORM NOT VALID
					if ( ! form.lsvrIsFormValid() ) {
						form.find( 'p.c-alert-message.m-warning.m-validation-error' ).slideDown(300);
						return false;
					}
					// FORM VALID
					else {

						submitBtn.addClass( 'm-loading' ).attr( 'data-label', submitBtn.text() ).text( submitBtn.data( 'loading-label' ) );

						// AJAX REQUEST
						$.ajax({
							type: 'POST',
							url: form.attr( 'action' ),
							data: form.serialize(),
							success: function( data ){

								form.find( '.c-alert-message.m-validation-error' ).hide();
								form.prepend( data );
								form.find( '.c-alert-message.m-success, .c-alert-message.m-phpvalidation-error' ).slideDown(300);
								submitBtn.removeClass( 'm-loading' ).text( submitBtn.attr( 'data-label' ) );

								// RESET ALL INPUTS
								if ( data.indexOf( 'success' ) > 0 ) {
									form.find( 'input, textarea' ).each( function() {
										$(this).val( '' );
									});
								}

							},
							error: function(){
								form.find( '.c-alert-message.m-validation-error' ).slideUp(300);
								form.find( '.c-alert-message.m-request-error' ).slideDown(300);
								submitBtn.removeClass( 'm-loading' ).text( submitBtn.attr( 'data-label' ) );
							}
						});

					}

				}
			});

		}};
	}

	/* -------------------------------------------------------------------------
		CAROUSEL
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrCarousel ) {
		$.fn.lsvrCarousel = function() {

		// REQUIRED PLUGINS
		if ( $.fn.owlCarousel ) {

			var $this = $(this),
				itemList = $this.find( '.c-carousel-items' ),
				itemsShow = $this.data( 'items-show' ) ? parseInt( $this.data( 'items-show' ) ) : 3,
				itemsUnder1199 = $this.data( 'items-under-1199' ) ? parseInt( $this.data( 'items-under-1199' ) ) : 3,
				itemsUnder991 = $this.data( 'items-under-991' ) ? parseInt( $this.data( 'items-under-991' ) ) : 2,
				itemsUnder767 = $this.data( 'items-under-767' ) ? parseInt( $this.data( 'items-under-767' ) ) : 2,
				itemsUnder480 = $this.data( 'items-under-480' ) ? parseInt( $this.data( 'items-under-480' ) ) : 1,
				singleItem = itemsShow === 1 ? true : false,
				loop = $this.data( 'loop' ) && String( $this.data( 'loop' ) ) === 'true' ? true : false,
				autoplay = $this.data( 'autoplay' ) && parseInt( $this.data( 'autoplay' ) ) > 0 ? true : false,
				autoplayTimeout = $this.data( 'autoplay' ) && parseInt( $this.data( 'autoplay' ) ) > 0 ? parseInt( $this.data( 'autoplay' ) ) : 0;

			if ( itemList.find( '> .c-article-list' ).length > 0 ) {
				itemList = itemList.find( '> .c-article-list' );
			}

			// CAROUSEL
			itemList.owlCarousel({
				loop: loop,
				margin: 20,
				nav: true,
				navText: Array( '<i class="im im-chevron-left"></i>', '<i class="im im-chevron-right"></i>' ),
				dots: true,
				autoplay: autoplay,
				autoplayTimeout: autoplayTimeout,
				onInitialized: function(){

					if ( ! loop ) {
						// PREV
						if ( $this.find( '.owl-item:first-child' ).hasClass( 'active' ) ) {
							$this.find( '.owl-nav .owl-prev' ).addClass( 'm-disabled' );
						}
						else {
							$this.find( '.owl-nav .owl-prev' ).removeClass( 'm-disabled' );
						}
						// NEXT
						if ( $this.find( '.owl-item:last-child' ).hasClass( 'active' ) ) {
							$this.find( '.owl-nav .owl-next' ).addClass( 'm-disabled' );
						}
						else {
							$this.find( '.owl-nav .owl-next' ).removeClass( 'm-disabled' );
						}
					}

				},
				onTranslate: function() {
					itemList.find( '.owl-dots' ).removeAttr( 'style' );
				},
				onTranslated: function(){

					if ( ! loop ) {
						// PREV
						if ( $this.find( '.owl-item:first-child' ).hasClass( 'active' ) ) {
							$this.find( '.owl-nav .owl-prev' ).addClass( 'm-disabled' );
						}
						else {
							$this.find( '.owl-nav .owl-prev' ).removeClass( 'm-disabled' );
						}
						// NEXT
						if ( $this.find( '.owl-item:last-child' ).hasClass( 'active' ) ) {
							$this.find( '.owl-nav .owl-next' ).addClass( 'm-disabled' );
						}
						else {
							$this.find( '.owl-nav .owl-next' ).removeClass( 'm-disabled' );
						}
					}
					itemList.find( '.owl-dots' ).removeAttr( 'style' );

				},
				onResized: function() {
					itemList.find( '.owl-dots' ).removeAttr( 'style' );
				},
				responsive:{
					0: {
						items: itemsUnder480
					},
					480: {
						items: itemsUnder767
					},
					767: {
						items: itemsUnder991
					},
					991: {
						items: itemsUnder1199
					},
					1199: {
						items: itemsShow
					}
				},
			});
			itemList.find( '.owl-dots' ).removeAttr( 'style' );

			// HOVER
			$this.hover(function(){
				$this.addClass( 'm-hover' );
			}, function(){
				$this.removeClass( 'm-hover' );
			});

		}};
	}

	/* -------------------------------------------------------------------------
		COUNTER
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrCounter ) {
		$.fn.lsvrCounter = function() {
			if ( mediaQueryBreakpoint > 1199 ) {

				var $this = $(this),
					duration = $this.data( 'duration' ) ? parseInt( $this.data( 'duration' ) ) : 1000,
					valueEl = $this.find( '.counter-value' ),
					value = parseInt( valueEl.text() ),
					speed = duration / value;

				if ( ! isNaN( duration ) && ! isNaN( value ) ) {

					// RESET
					valueEl.text(0);

					// START AT IN VIEW
					$this.one( 'inview', function(){
						var currentVal = 0,
						counterAction = function(){
							currentVal++;
							valueEl.text( currentVal );
						};
						for ( var i = 0; i < value; i++ ) {
							setTimeout( counterAction, speed * i );
						}
					});

				}

			}
		};
	}

	/* -------------------------------------------------------------------------
		DRIBBBLE FEED
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrDribbbleFeed ) {
		$.fn.lsvrDribbbleFeed = function() {
		// REQUIRED PLUGINS
		if ( $.fn.lsvrImagesLoaded && $.jribbble ) {

			if ( $(this).find( '.widget-feed' ).length < 1 ) {
				$(this).append( '<div class="widget-feed"></div>' );
			}
			var $self = $(this),
				feed = $(this).find( '.widget-feed' ),
				feedId = $(this).data( 'id' ),
				feedLimit = $(this).data( 'limit' );

			if ( isNaN( feedLimit ) || feedLimit < 1 ) {
				feedLimit = 1;
			}
			feed.html( '<ul class="image-list clearfix"></ul>' );

			// GET THE FEED
			$.jribbble.getShotsByPlayerId( feedId, function ( playerShots ) {

				// get number of images to be shown
				var numberOfImages = feedLimit;
				if ( playerShots.shots.length < feedLimit ){
					numberOfImages = playerShots.shots.length;
				}

				// INSERT ITEMS
				var i;
				for( i = 0; i < numberOfImages; i++ ) {
					feed.find( 'ul' ).append( '<li class="image-list-item"><a href="' + playerShots.shots[i].url + '" style="background-image: url(' + playerShots.shots[i].image_teaser_url + ');" title="' + playerShots.shots[i].title + '" rel="external"><img src="' + playerShots.shots[i].image_teaser_url + '" alt="' + playerShots.shots[i].title + '"></a></li>' );
				}
				// IMAGES LOADED
				$self.lsvrImagesLoaded(function(){
					$self.find( '.c-loading-anim' ).fadeOut( 300, function(){
						$self.find( '.widget-feed' ).fadeIn( 300, function(){
							$self.removeClass( 'loading' );
							$self.find( '.image-list > li' ).each(function(){
								var item = $(this),
								itemIndex = $(this).index();
								setTimeout( function(){
									item.fadeIn( 300 );
								}, itemIndex * 100 );
							});
						});
					});
				});

			}, { page: 1, per_page: feedLimit } );

		}};
	}

	/* -------------------------------------------------------------------------
		FIELD VALIDATION
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrIsFieldValid ) {
		$.fn.lsvrIsFieldValid = function(){

			var field = $(this),
				value = field.val(),
				placeholder = field.attr( 'placeholder' ) ? field.attr( 'placeholder' ) : false,
				valid = false,
				emailValid = function( email ) {
					var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					return re.test(email);
				};

			if ( value.trim() !== '' && ! ( placeholder && value === placeholder ) ) {

				// EMAIL FIELDS
				if ( field.hasClass( 'm-email' ) ) {
					if ( ! emailValid( value ) ) {
						field.addClass( 'm-error' );
					}
					else {
						field.removeClass( 'm-error' );
						valid = true;
					}
				}

				// SELECT FIELD
				else if ( field.prop( 'tagName' ).toLowerCase() === 'select' ) {
					if ( value === null ) {
						field.addClass( 'm-error' );
					}
					else {
						field.removeClass( 'm-error' );
						valid = true;
					}
				}

				// DEFAULT FIELD
				else {
					field.removeClass( 'm-error' );
					valid = true;
				}

			}
			else {

				field.addClass( 'm-error' );

				// REVALIDATE ON CHANGE
				field.change(function(){
					field.lsvrIsFieldValid();
				});

			}

			return valid;

		};
	}

	/* -------------------------------------------------------------------------
		FLICKR FEED
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrFlickrFeed ) {
		$.fn.lsvrFlickrFeed = function() {
		// REQUIRED PLUGINS
		if ( $.fn.lsvrImagesLoaded ) {

			if ( $(this).find( '.widget-feed' ).length < 1 ) {
				$(this).append( '<div class="widget-feed"></div>' );
			}
			var $self = $(this),
				feed = $(this).find( '.widget-feed' ),
				feedId = $(this).data( 'id' ),
				feedLimit = $(this).data( 'limit' );

			if ( isNaN( feedLimit ) || feedLimit < 1 ) {
				feedLimit = 1;
			}
			feed.html( '<ul class="image-list clearfix"></ul>' );

			// GET THE FEED
			$.getJSON( 'http://api.flickr.com/services/feeds/photos_public.gne?id=' + feedId + '&lang=en-us&format=json&jsoncallback=?', function(data){

				// get number of images to be shown
				var numberOfImages = feedLimit;
				if ( data.items.length < feedLimit ) {
					numberOfImages = data.items.length;
				}

				// INSERT ITEMS
				var i;
				for ( i = 0; i < numberOfImages; i++ ){
					feed.find( 'ul' ).append( '<li class="image-list-item"><a href="' + data.items[i].link + '" style="background-image: url(' + data.items[i].media.m + ');" rel="external"><img class="image-list-thumb" src="' + data.items[i].media.m + '" alt="' + data.items[i].title + '" style="display: none;"></a></li>' );
				}

				// IMAGES LOADED
				$self.lsvrImagesLoaded(function(){
					$self.find( '.c-loading-anim' ).slideUp( 300, function(){
						$self.find( '.widget-feed' ).slideDown( 300, function(){
							$self.removeClass( 'loading' );
							$self.find( '.image-list > li' ).each(function(){
								var item = $(this),
								itemIndex = $(this).index();
								setTimeout( function(){
									item.fadeIn( 300 );
								}, itemIndex * 100 );
							});
						});
					});
				});

			});

		}};
	}

	/* -------------------------------------------------------------------------
		FLUID MEDIA
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrFluidEmbedMedia ) {
		$.fn.lsvrFluidEmbedMedia = function( ){

			var $this = $(this),
				allMedia;

			// CHECK FOR ANY LOOSE IFRAMES
			$this.find( 'iframe, embed' ).each(function(){

				if ( $(this).parents( '.embed-media' ).length < 1 ) {
					if ( $(this).parent().is( 'p' ) ) {
						$(this).unwrap();
					}
					$(this).wrap( '<div class="embed-media"></div>' );
				}

			});

			var reloadFluidMedia = function(){
				// Resize all media according to their own aspect ratio
				allMedia.each(function() {
					var el = $(this),
						elContainer = el.parents( '.embed-media' ),
						newWidth = elContainer.width();
					el.width( newWidth ).height( newWidth * el.attr( 'data-aspectratio' ) );
				});
				$.event.trigger({
					type: 'fluidMediaReloaded',
					message: 'Fluid media reloaded.',
					time: new Date()
				});
			};

			var generateFluidMedia = function(){
				// Find all media
				allMedia = $this.find( '.embed-media iframe, .embed-media embed' );
				// The element that is fluid width
				//$fluidEl = $('.embed-media').first();
				// Figure out and save aspect ratio for each media
				allMedia.each(function() {
					$(this).attr( 'data-aspectratio', $(this).height() / $(this).width() )
						.removeAttr( 'height' )
						.removeAttr( 'width' );
				});
				reloadFluidMedia();
			};

			if ( $this.find( '.embed-media' ).length > 0 ) {
				generateFluidMedia();
				$(window).resize(function(){
					reloadFluidMedia();
				});
			}

		};
	}

	/* -------------------------------------------------------------------------
		FORM VALIDATION
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrIsFormValid ) {
		$.fn.lsvrIsFormValid = function() {
		// REQUIRED PLUGINS
		if ( $.fn.lsvrIsFieldValid ) {

			// TRIM FIX FOR IE
			if ( typeof String.prototype.trim !== 'function' ) {
				String.prototype.trim = function() {
					return this.replace(/^\s+|\s+$/g, '');
				};
			}

			var form = $(this),
			formValid = true;

			// CHECK REQUIRED FIELDS
			form.find( 'input.m-required, textarea.m-required, select.m-required' ).each(function(){
				formValid = ! $(this).lsvrIsFieldValid() ? false : formValid;
			});

			// CHECK REQUIRED ONE FIELDS
			var requireOneValid = false;
			form.find( 'input.m-required-one, textarea.m-required-one, select.m-required-one' ).each(function(){
				if ( $(this).lsvrIsFieldValid() ) {
					requireOneValid = true;
					form.find( 'input.m-required-one, textarea.m-required-one, select.m-required-one' ).removeClass( 'm-error' );
				}
			});
			if ( form.find( '.m-require-one' ).length > 0 && ! requireOneValid ) {
				formValid = false;
			}
			if ( formValid ) {
				form.find( 'input.m-required-one, textarea.m-required-one, select.m-required-one' ).removeClass( 'm-error' );
			}

			form.find( '.m-error' ).first().focus();

			return formValid;

		}};
	}

	/* -------------------------------------------------------------------------
		GOOGLE MAP
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrGoogleMap ) {
		$.fn.lsvrGoogleMap = function( latitude, longitude ) {

			var $this = $(this),
				zoom = $this.data( 'zoom' ) ? $this.data( 'zoom' ) : 10,
				enableMouseWheel = $this.data( 'enable-mousewheel' ) && String( $this.data( 'enable-mousewheel' ) ) === 'true' ? true : false,
				mapType = $this.data( 'maptype' ) ? $this.data( 'maptype' ) : 'SATELLITE',
				latLng = new google.maps.LatLng( latitude, longitude ),
				elementId = $this.attr( 'id' );

			switch ( mapType ) {
				case 'roadmap':
					mapType = google.maps.MapTypeId.ROADMAP;
					break;
				case 'terrain':
					mapType = google.maps.MapTypeId.TERRAIN;
					break;
				case 'hybrid':
					mapType = google.maps.MapTypeId.HYBRID;
					break;
				default:
					mapType = google.maps.MapTypeId.SATELLITE;
			}

			var mapOptions = {
				center: latLng,
				zoom: zoom,
				mapTypeId: mapType,
				scrollwheel: enableMouseWheel,
			};

			var map = new google.maps.Map(document.getElementById( elementId ),
				mapOptions );

			var marker = new google.maps.Marker({
				position: latLng,
				map: map
			});

		};
	}

	if ( ! $.fn.lsvrGoogleMapsLoaded ) {
		$.fn.lsvrGoogleMapsLoaded = function() {
			$( '.c-gmap:not( .loaded )' ).each(function(){

				// OPTIONS
				var $this = $(this),
					latitude = $this.data( 'latitude' ) ? $this.data( 'latitude' ) : false,
					longitude = $this.data( 'longitude' ) ? $this.data( 'longitude' ) : false,
					address = $this.data( 'address' ) ? $this.data( 'address' ) : false,
					elementIndex = $this.index( '.c-gmap' );

				$this.addClass( 'loaded' );

				// ADD UNIQUE ID
				$this.attr( 'id', 'google-map-' + elementIndex );

				// GET LATITUDE AND LONGITUDE FROM ADDRESS
				if ( address ) {

					var geocoder = new google.maps.Geocoder();
					geocoder.geocode( { 'address': address }, function( results, status ) {
						if ( status == google.maps.GeocoderStatus.OK ) {
							latitude = results[0].geometry.location.lat();
							longitude = results[0].geometry.location.lng();
							$this.lsvrGoogleMap( latitude, longitude );
						}
						else if ( latitude && longitude ) {
							$this.lsvrGoogleMap( latitude, longitude );
						}
					});

				}
				// OR USE LATITUDE & LANGITUDE FROM ATTRIBUTES
				else if ( latitude && longitude ) {
					$this.lsvrGoogleMap( latitude, longitude );
				}

			});
		};
	}

	if ( ! $.fn.lsvrLoadGoogleMaps ) {
		// REQUIRED PLUGINS
		if ( $.fn.lsvrGoogleMapsLoaded && $.fn.lsvrGoogleMap ) {
			$.fn.lsvrLoadGoogleMaps = function() {

				// GET API KEY
				var apiKey = $( '.c-gmap[data-google-api-key]' ).first().length > 0 ? $( '.c-gmap' ).attr( 'data-google-api-key' ) : false;
				if ( apiKey !== false ) {

					// INSERT GOOGLE API JS
					if ( $( 'script.googleMapsApiScript' ).length < 1 ) {
						var script = document.createElement( 'script' );
						script.className = 'googleMapsApiScript';
						script.type = 'text/javascript';
						script.src = 'https://maps.googleapis.com/maps/api/js?key=' + apiKey + '&callback=jQuery.fn.lsvrGoogleMapsLoaded';
						document.body.appendChild( script );
					}
					else {
						$.fn.lsvrGoogleMapsLoaded();
					}

				}

			};
		}
	}

	/* -------------------------------------------------------------------------
		CHECKBOX INPUT
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrCheckboxInput ) {
		$.fn.lsvrCheckboxInput = function(){

			var input = $(this).removeClass( 'checkbox-input' ).hide(),
				wrapped = false,
				$this, label;

			if ( input.parent().is( 'label' ) ) {
				label = input.parent();
				label.wrap( '<span class="checkbox-input"></span>' );
				$this = label.parent();
			}
			else {
				input.wrap( '<span class="checkbox-input"></span>' );
				$this = input.parent();
				label = $this.next( 'label' ).length > 0 ? $this.next( 'label' ) : $this.prev( 'label' );
				label.appendTo( $this );
			}

			// INIT
			if ( input.is( ':checked' ) ) {
				$this.addClass( 'm-checked' );
			}

			// CLICK
			input.click(function(){
				$this.toggleClass( 'm-checked' );
				input.trigger( 'change' );
			});

		};
	}

	/* -------------------------------------------------------------------------
		IMAGES LOADED
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrImagesLoaded ) {
		$.fn.lsvrImagesLoaded = function( func ) {
			if ( $.isFunction( func ) ) {

				var images = $(this).find( 'img' ),
				loadedImages = 0,
				count = images.length;

				if ( count > 0 ) {
					images.one( 'load', function(){
						loadedImages++;
						if ( loadedImages === count ){
							func.call();
						}
					}).each(function() {
						if ( this.complete ) { $(this).load(); }
					});
				}
				else {
					func.call();
				}

			}
		};
	}

	/* -------------------------------------------------------------------------
		INSTAGRAM FEED
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrInstagramFeed ) {
		$.fn.lsvrInstagramFeed = function() {
		// REQUIRED PLUGINS
		if ( $.fn.lsvrImagesLoaded && $.fn.embedagram ) {

			if ( $(this).find( '.widget-feed' ).length < 1 ) {
				$(this).append( '<div class="widget-feed"></div>' );
			}
			var $self = $(this),
				feed = $(this).find( '.widget-feed' ),
				feedId = $(this).data( 'id' ),
				feedLimit = $(this).data( 'limit' );

			if ( isNaN( feedLimit ) || feedLimit < 1 ) {
				feedLimit = 1;
			}
			feed.html( '<ul class="image-list clearfix"></ul>' );

			// GET THE FEED
			feed.find( 'ul.image-list' ).embedagram({
				instagram_id: feedId,
				limit: feedLimit,
				success: function(){
					feed.find( 'a' ).each(function(){
						$(this).css( 'background-image', 'url(' + $(this).find( 'img' ).attr( 'src' ) + ')' );
						if ( $(this).find( 'img' ).attr( 'title' ) ) {
							$(this).find( 'img' ).removeAttr( 'title' );
						}
					});

					// IMAGES LOADED
					$self.lsvrImagesLoaded(function(){
						$self.find( '.c-loading-anim' ).fadeOut( 300, function(){
							$self.find( '.widget-feed' ).fadeIn( 300, function(){
								$self.removeClass( 'loading' );
								$self.find( '.image-list > li' ).each(function(){
									var item = $(this),
									itemIndex = $(this).index();
									setTimeout( function(){
										item.fadeIn( 300 );
									}, itemIndex * 100 );
								});
							});
						});
					});

				}
			});

		}};
	}

	/* ---------------------------------------------------------------------
		INVIEW ANIMATION
	--------------------------------------------------------------------- */

	if ( ! $.fn.lsvrInviewAnimation ) {
		$.fn.lsvrInviewAnimation = function() {

			var $this = $(this),
				animation = $(this).data( 'inview-anim' );
			$this.one( 'inview', function(){
				setTimeout(function(){
					$this.removeClass( 'visibility-hidden' );
					$this.addClass( 'animated ' + animation );
				}, 300);
			});

		};
	}

	/* -------------------------------------------------------------------------
		LIGHTBOX
	------------------------------------------------------------------------- */

	// LIGHTBOX SETUP
	if ( ! $.fn.magnificPopupSetup ) {
		$.fn.magnificPopupSetup = function(){
		// REQUIRED PLUGINS
		if ( $.fn.magnificPopup ) {

			$.extend( true, $.magnificPopup.defaults, {
				tClose: 'Close (Esc)',
				tLoading: 'Loading...',
				gallery: {
					tPrev: 'Previous (Left arrow key)', // Alt text on left arrow
					tNext: 'Next (Right arrow key)', // Alt text on right arrow
					tCounter: '%curr% / %total%' // Markup for "1 of 7" counter
				},
				image: {
					tError: '<a href="%url%">The image</a> could not be loaded.' // Error message when image could not be loaded
				},
				ajax: {
					tError: '<a href="%url%">The content</a> could not be loaded.' // Error message when ajax request failed
				}
			});

		}};
	}
	if ( $.fn.magnificPopupSetup ) {
		$.fn.magnificPopupSetup();
	}

	if ( ! $.fn.lsvrInitLightboxes ) {
		$.fn.lsvrInitLightboxes = function(){
		// REQUIRED PLUGINS
		if ( $.fn.magnificPopup ) {

			// IMAGES
			$(this).find( 'a.lightbox' ).magnificPopup({
				type: 'image',
				removalDelay: 300,
				mainClass: 'mfp-fade',
				gallery: {
					enabled: true
				}
			});

			// VIDEOS
			$(this).find( 'a.lightbox-video' ).magnificPopup({
				type: 'iframe',
				removalDelay: 300,
				mainClass: 'mfp-fade',
				gallery: {
					enabled: true
				}
			});

		}};
	}

	/* -------------------------------------------------------------------------
		LOAD HIRES IMAGES
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrLoadHiresImages ) {
		$.fn.lsvrLoadHiresImages = function() {
			if ( window.devicePixelRatio > 1 ) {
				$(this).find( 'img[data-hires]' ).each(function(){
					$(this).attr( 'src', $(this).data( 'hires' ) );
				});
			}
		};
	}

	/* -------------------------------------------------------------------------
		MAILCHIMP SUBSCRIBE FORM
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrMailchimpSubscribeForm ) {
		$.fn.lsvrMailchimpSubscribeForm = function(){
		// REQUIRED PLUGINS
		if ( $.fn.lsvrIsFormValid ) {

			var form = $(this),
				submitBtn = form.find( '.submit-btn' ),
				submitBtnDefault = submitBtn.html();

			form.submit(function(e){
				e.preventDefault();
				if ( ! form.hasClass( 'm-loading' ) ) {

					// FORM IS VALID
					if ( form.lsvrIsFormValid() ) {

						form.find( 'p.c-alert-message.m-warning.m-validation-error' ).slideUp(300);
						form.addClass( 'm-loading' );
						submitBtn.html( '<i class="fa fa-spinner fa-spin"></i>' );

						// SEND AJAX REQUEST
						$.ajax({
							type: form.attr( 'method' ),
							url: form.attr( 'action' ),
							data: form.serialize(),
							cache : false,
							dataType : 'json',
							contentType: "application/json; charset=utf-8",
							// WAIT FOR RESPONSE
							success: function( data ){

								if ( data.result === 'success' ) {
									form.find( '.c-alert-message' ).hide();
									form.find( '.c-alert-message.m-success' ).append( '<br>' + data.msg ).slideDown(300);
									form.find( '.form-fields' ).slideUp(300);
								}
								else {
									form.find( '.c-alert-message.m-validation-error' ).slideUp(300);
									form.find( '.c-alert-message.m-request-error' ).slideDown(300);
								}

								form.removeClass( 'm-loading' );
								submitBtn.html( submitBtnDefault );

							},
							error: function(){

								form.find( '.m-alert-message.m-validation-error' ).slideUp(300);
								form.find( '.m-alert-message.m-request-error' ).slideDown(300);
								form.removeClass( 'loading' );
								submitBtn.html( submitBtnDefault );

							}
						});

					}

					//  FORM IS INVALID
					else {
						form.find( 'p.c-alert-message.m-warning.m-validation-error' ).slideDown(300);
						return false;
					}

				}
			});

		}};
	}

	/* -------------------------------------------------------------------------
		MEDIA QUERY BREAKPOINT
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrGetMediaQueryBreakpoint ) {
		$.fn.lsvrGetMediaQueryBreakpoint = function() {

			if ( $( '#media-query-breakpoint' ).length < 1 ) {
				$( 'body' ).append( '<span id="media-query-breakpoint" style="display: none;"></span>' );
			}
			var value = $( '#media-query-breakpoint' ).css( 'font-family' );
			if ( typeof value !== 'undefined' ) {
				value = value.replace( "\"", "" ).replace( "\"", "" ).replace( "\'", "" ).replace( "\'", "" );
			}
			if ( isNaN( value ) ) {
				return $(window).width();
			}
			else {
				return parseInt( value );
			}

		};
	}

	/* -------------------------------------------------------------------------
		PARALLAX EFFECT
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrParallax ) {
		$.fn.lsvrParallax = function( xPosition, inertia ){
			// REQUIRED PLUGINS
			if ( $.fn.parallax ) {

				// WEBKIT "background-attachment:fixed" BUG FIX
				if ( 'WebkitAppearance' in document.documentElement.style ) {
					$(this).fadeOut(1).fadeIn(1);
				}

				// APPLY PARALLAX
				if ( mediaQueryBreakpoint > 1299 ) {
					$(this).parallax( xPosition, inertia );
				}

			}
		};
	}

	/* -------------------------------------------------------------------------
		PROGRESS BAR
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrProgressBar ) {
		$.fn.lsvrProgressBar = function(){

			var $this = $(this),
				percentage = $this.data( 'percentage' ) ? parseInt( $this.data( 'percentage' ) ) : 100,
				inner = $this.find( '> span' );

			$this.one( 'inview', function(){
				inner.css( 'width', percentage + '%' );
			});

		};
	}

	/* -------------------------------------------------------------------------
		RADIO INPUT
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrRadioInput ) {
		$.fn.lsvrRadioInput = function(){

			var input = $(this).removeClass( 'radio-input' ).hide(),
				wrapped = false,
				$this, label;

			if ( input.parent().is( 'label' ) ) {
				label = input.parent();
				label.wrap( '<span class="radio-input"></span>' );
				$this = label.parent();
			}
			else {
				input.wrap( '<span class="radio-input"></span>' );
				$this = input.parent();
				label = $this.next( 'label' ).length > 0 ? $this.next( 'label' ) : $this.prev( 'label' );
				label.appendTo( $this );
			}

			// INIT
			if ( input.is( ':checked' ) ) {
				$this.addClass( 'm-checked' );
			}

			// CLICK
			input.click(function(){

				// RADIO
				$( 'input[name="' + input.attr( 'name' ) + '"]' ).each(function(){
					$(this).parents( '.radio-input' ).removeClass( 'm-checked' );
				});
				$this.addClass( 'm-checked' );

			});

		};
	}

	/* -------------------------------------------------------------------------
		SCROLLSPY
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrScrollspy ) {
		$.fn.lsvrScrollspy = function( options ){

			var $this = $(this),
				defaults = {
					tolerance: 0,
					onEnter: false
				};
			options = $.extend( defaults, options );

			$( window ).scroll(function(){

				var documentTop = $(window).scrollTop(),
					elementTop = $this.offset().top,
					elementBottom = elementTop + $this.height();

				if ( ( elementTop <= documentTop + options.tolerance ) && ( elementBottom >= documentTop + options.tolerance ) ) {
					if ( ! $this.hasClass( 'scrolledin' ) ) {

						$( '.scrolledin' ).removeClass( 'scrolledin' );
						$this.addClass( 'scrolledin' );
						if ( options.onEnter && $.isFunction( options.onEnter ) ) {
							options.onEnter.call();
						}

					}
				}
				else {
					$this.removeClass( 'scrolledin' );
				}

			});

		};
	}

	/* -------------------------------------------------------------------------
		SELECTBOX INPUT
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrSelectboxInput ) {
		$.fn.lsvrSelectboxInput = function(){

			var $this = $(this);
			$this.wrap( '<div class="selectbox-input"></div>' );
			$this = $this.parent();
			var input = $this.find( 'select' ),
				fakeSelectHtml = '';
			input.removeClass( 'selectbox-input' );
			var value = input.val(),
				defaultValue = input.find( 'option[value="' + value + '"]' ).text() ? input.find( 'option[value="' + value + '"]' ).text() : input.find( 'option' ).first().text();

			// COPY CLASSES
			if ( input.hasClass( 'm-small' ) ) {
				$this.addClass( 'm-small' );
			}
			if ( input.hasClass( 'm-type-2' ) ) {
				$this.addClass( 'm-type-2' );
			}

			// CREATE ELEMENTS
			input.hide();
			$this.append( '<button type="button" class="toggle"><span>' + defaultValue + '</span></button>' );
			fakeSelectHtml = '<ul class="fake-selectbox" style="display: none;">';
			input.find( 'option' ).each(function(){
				fakeSelectHtml += '<li data-value="' + $(this).attr( 'value' ) + '">' + $(this).text() + '</li>';
			});
			fakeSelectHtml += '</ul>';
			$this.append( fakeSelectHtml );
			var toggle = $this.find( '.toggle' ),
			fakeSelect = $this.find( '.fake-selectbox' );

			// TOGGLE
			toggle.click(function(){
				fakeSelect.slideToggle(150);
				toggle.toggleClass( 'm-active' );
				$this.unbind( 'clickoutside' );
				if ( toggle.hasClass( 'm-active' ) ) {
					$this.bind( 'clickoutside', function(event){
						fakeSelect.slideUp(150);
						toggle.removeClass( 'm-active' );
						$this.unbind( 'clickoutside' );
					});
				}
			});

			// FAKE SELECTBOX CLICK
			fakeSelect.find( 'li' ).each(function(){
				$(this).click(function(){
					toggle.removeClass( 'm-active' ).find( 'span' ).text( $(this).text() );
					fakeSelect.slideUp(150);
					input.val( $(this).attr( 'data-value' ) );
					input.trigger( 'change' );
				});
			});

		};
	}

	/* -------------------------------------------------------------------------
		SLIDER
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrSlider ) {
		$.fn.lsvrSlider = function(){
		// REQUIRED PLUGINS
		if ( $.fn.owlCarousel ) {

			var slider = $(this),
				slideList = slider.find( '.slide-list' ),
				slideCount = slideList.find( '> .slide' ).length,
				slides = slideList.find( '> .slide' ),
				autoplay = slider.data( 'autoplay' ) && parseInt( slider.data( 'autoplay' ) ) > 0 ? true : false,
				autoplayTimeout = slider.data( 'autoplay' ) && parseInt( slider.data( 'autoplay' ) ) > 0 ? parseInt( slider.data( 'autoplay' ) ) : 0;

			// PARALLAX BG
			if ( slider.hasClass( 'm-parallax' ) && $.fn.lsvrParallax ) {
				if ( mediaQueryBreakpoint > 1299 ) {
					slider.lsvrParallax( '50%', 0.2 );
				}
			}

			if ( slideCount > 1 ) {

				slideList.owlCarousel({
					loop: true,
					nav: true,
					navText: Array( '<i class="im im-chevron-left"></i>', '<i class="im im-chevron-right"></i>' ),
					navRewind: true,
					dots: false,
					autoplay: autoplay,
					autoplayTimeout: autoplayTimeout,
					autoplayHoverPause: true,
					responsive:{
						0: {
							items: 1
						}
					},
					onTranslated: function(){

						// REFRESH INDICATOR
						if ( autoplay ) {
							slider.find( '.slider-indicator > span' ).stop( 0, 0 );
						}
						if ( autoplay && mediaQueryBreakpoint > 991 ) {
							slider.find( '.slider-indicator > span' ).css( 'width', 0 );
							if ( ! slider.hasClass( 'm-paused' ) ) {
								slider.find( '.slider-indicator > span' ).stop( 0, 0 ).animate({ width : "100%" }, autoplayTimeout );
							}
						}

					}
				});

				// AUTO SLIDE INDICATOR
				if ( autoplay ) {

					// CREATE
					slider.addClass( 'm-has-indicator' );
					slider.append( '<div class="slider-indicator"><span></span></div>' );

					// INITIAL ANIMATION
					slider.find( '.slider-indicator > span' ).animate({
						width : "100%"
					}, autoplayTimeout, 'linear' );

					// PAUSE
					var sliderPause = function(){
						slider.addClass( 'm-paused' );
						slider.find( '.slider-indicator > span' ).stop( 0, 0 );
					};
					var sliderResume = function(){
						slider.removeClass( 'm-paused' );
						slider.find( '.slider-indicator > span' ).stop( 0, 0 ).animate({
							width : "100%"
						}, autoplayTimeout, 'linear' );
					};

					slider.hover(function(){
						sliderPause();
					}, function(){
						sliderResume();
					});

					// STOP ON SMALLER RESOLUTIONS
					$( document ).on( 'screenTransition', function(){
						if ( mediaQueryBreakpoint <= 991 ) {
							sliderPause();
						}
					});
					if ( mediaQueryBreakpoint <= 991 ) {
						sliderPause();
					}

				}

			}

		}};
	}

	/* -------------------------------------------------------------------------
		TABS
	------------------------------------------------------------------------- */

	if ( ! $.fn.lsvrTabs ) {
		$.fn.lsvrTabs = function(){

			var $this = $(this),
				tabs = $this.find( '.tab-list > li' ),
				contents = $this.find( '.content-list > li' );

			tabs.click(function(){
				if ( ! $(this).hasClass( 'm-active' ) ) {
					var index = $(this).index();
					tabs.filter( '.m-active' ).removeClass( 'm-active' );
					$(this).addClass( 'm-active' );
					contents.filter( ':visible' ).slideUp( 300, function(){
						$(this).removeClass( 'm-active' );
					});
					contents.filter( ':eq(' + index + ')' ).slideDown(300).addClass( 'm-active' );
				}
			});

		};
	}


/* -----------------------------------------------------------------------------

	EVENTS

----------------------------------------------------------------------------- */

	/* -------------------------------------------------------------------------
		SCREEN SIZE TRANSITION
	------------------------------------------------------------------------- */

	var mediaQueryBreakpoint;
	if ( $.fn.lsvrGetMediaQueryBreakpoint ) {
		mediaQueryBreakpoint = $.fn.lsvrGetMediaQueryBreakpoint();
		$(window).resize(function(){
			if ( $.fn.lsvrGetMediaQueryBreakpoint() !== mediaQueryBreakpoint ) {
				mediaQueryBreakpoint = $.fn.lsvrGetMediaQueryBreakpoint();
				$.event.trigger({
					type: 'screenTransition',
					message: 'Screen transition completed.',
					time: new Date()
				});
			}
		});
	}
	else {
		mediaQueryBreakpoint = $(document).width();
	}

})(jQuery);