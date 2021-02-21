(function($){"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// A function that animates text change
jQuery.fn.extend({
  changeText: function changeText(text) {
    return this.each(function () {
      var $el = $(this);
      if ($el.text() !== text) {
        $el.animate({ "opacity": 0 }, 200);
        setTimeout(function () {
          $el.text(text);
          $el.animate({ "opacity": 1 }, 200);
        }, 200);
      }
    });
  },
  changeTextUI: function changeTextUI(text, animation, speed) {
    if (typeof animation === "undefined") {
      var animation = "fade";
    }
    if (typeof speed === "undefined") {
      var speed = 400;
    }
    return this.each(function () {
      var $el = $(this);

      var animation_map = {
        fade: {
          name: "fade",
          show_attr: {},
          hide_attr: {}
        },
        counter: {
          name: "slide",
          show_attr: {
            direction: "down"
          },
          hide_attr: {
            direction: "up"
          }
        },
        slide_left: {
          name: "drop",
          show_attr: {
            direction: "left"
          },
          hide_attr: {
            direction: "right"
          }
        },
        drop_up: {
          name: "drop",
          show_attr: {
            direction: "up"
          },
          hide_attr: {
            direction: "down"
          }
        }

      };

      if ($el.text() !== text) {
        // $el
        //   .animate({"opacity": 0}, 200)
        // ;
        $el.hide(animation_map[animation].name, animation_map[animation].show_attr, speed / 2);
        setTimeout(function () {
          $el.text(text);
          // $el
          //   .animate({"opacity": 1}, 200)
          // ;
          $el.show(animation_map[animation].name, animation_map[animation].hide_attr, speed / 2);
        }, speed / 2);
      }
    });
  },
  changeCSS: function changeCSS(property, value) {
    return this.each(function () {
      var $el = $(this);
      if ($el.css(property) !== value) {
        $el.animate({ "opacity": 0 }, 200)
        // .css("transform", "translateY(-0.3rem)")
        // .css("transition", "transform 0.8s, color 0.4s")
        ;
        setTimeout(function () {
          $el.css(property, value);
          $el.animate({ "opacity": 1 }, 200)
          // .css("transform", "translateY(-0rem)")
          // .css("transition", "")
          ;
        }, 200);
      }
    });
  }
});

$(function () {
  $(document).foundation();

  $(document).flo_lqip();

  /* START: ANIMATE SECTION APPEARANCE - VIEWPORT CHECKER */
  $(window).on("startViewportChecker", function () {
    $([".layout-sections--scroll-normal .flo-section", ".flo_page > .flo-section:not(:first-of-type):not(.disable-appear)", "footer", ".to-appear", ".to-appear--custom", ".flo-post > *", ".widget"].join(",")).viewportChecker({
      classToAdd: 'visible',
      repeat: true,
      offset: 40,
      invertBottomOffset: false

    });
  }).trigger("startViewportChecker");
  /* END: ANIMATE SECTION APPEARANCE - VIEWPORT CHECKER */

  // START: BLOCK SCRIPTS
  $("[data-onready]").each(function () {
    var fnName = $(this).attr("data-onready");

    if (typeof window[fnName] === "function") {
      window[fnName](this);
    } else {
      console.log("data-onready error: Function", fnName, "does not exist");
    }
  });
  // END: BLOCK SCRIPTS

  // START: ANIMATE ON PAGE LOAD AND UNLOAD

  // START: BODY FADEIN
  // $(document).ready(function () {
  //   $("body").fadeIn();
  // });
  // END: BODY FADEIN

  // START: BODY FADEOUT
  // window.onbeforeunload = function () {
  //   $("body").fadeOut();
  // };
  // END: BODY FADEOUT

  //END: LOAD/UNLOAD ANIMATION


  /* START: MOBILE COOKIE */

  // add the cookie that is used to detect mobile and retina screens
  (function () {

    var is_mobile_screen,
        is_tablet_screen,
        mobile_cookie_name = "flo_small_screen",
        tablet_cookie_name = "flo_tablet_screen",
        mobile_cookie = floGetCookie(mobile_cookie_name),
        // Can return "1", "0", null;
    tablet_cookie = floGetCookie(tablet_cookie_name),
        // Can return "1", "0", null;
    set_mobile = function set_mobile(value) {
      createCookie(mobile_cookie_name, value, 1);
    },
        set_tablet = function set_tablet(value) {
      createCookie(tablet_cookie_name, value, 1);
    },


    //  we consider screens larger than 760 not beeing mobile
    is_mobile_screen = document.documentElement.clientWidth <= 760;

    is_tablet_screen = document.documentElement.clientWidth >= 761 && document.documentElement.clientWidth <= 1024;

    if (is_mobile_screen) {
      if (mobile_cookie === '' || mobile_cookie == "0") {
        set_mobile(1);
        set_tablet(0);
        location.reload();
      }
    } else if (is_tablet_screen) {
      if (tablet_cookie === '' || tablet_cookie == "0") {
        set_mobile(0);
        set_tablet(1);
        location.reload();
      }
    } else {
      if (tablet_cookie == '1' || mobile_cookie == "1") {
        set_mobile(0);
        set_tablet(0);
        location.reload();
      }
    }

    // Set the cookie for the retina devices
    // the cookie is used later to serve appropriate image size
    if (document.cookie.indexOf('flo_device_pixel_ratio') == -1 && 'devicePixelRatio' in window && window.devicePixelRatio == 2 && !is_mobile_screen) {

      var date = new Date();

      date.setTime(date.getTime() + 3600000);

      document.cookie = 'flo_device_pixel_ratio=' + window.devicePixelRatio + ';' + ' expires=' + date.toUTCString() + '; path=/';

      //if cookies are not blocked, reload the page

      if (document.cookie.indexOf('flo_device_pixel_ratio') != -1) {

        window.location.reload();
      }
    } else if (document.cookie.indexOf('flo_device_pixel_ratio') != -1 && floGetCookie('flo_device_pixel_ratio') != window.devicePixelRatio) {
      // delete the coockie if the saved cookie does not match the current device pixel reatio

      var dateO = new Date();
      dateO.setTime(dateO.getTime() - 3600000); // set a past date that will be used to make the cookie expired

      document.cookie = 'flo_device_pixel_ratio=' + window.devicePixelRatio + ';' + ' expires=' + dateO.toUTCString() + '; path=/';

      window.location.reload(); // reload the page after deletting the cookie
    }
  })();
});

function createCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function floGetCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
}

/* END: MOBILE COOKIE */

$(function () {

  $([".comments-block__top-bar-hide-button", ".comments-block__top-bar-show-button", ".comments-block__top-bar-toggle-button"].join(", ")).click(function () {
    $('.comments-block').toggleClass("comments-block--expanded").toggleClass("comments-block--collapsed");
    $(".comments-block__posts").slideToggle();
  });
});

$(function () {

  $('.page').on('submit', '.flo-form__built-in', function (e) {
    e.preventDefault();

    var form = $(this),
        container = '.contact-response'; // the div for the error response messages

    jQuery('.flo-name').removeClass('invalid');
    jQuery('.flo-email').removeClass('invalid');

    jQuery(container).html('');

    jQuery.ajax({
      url: ajaxurl,
      data: '&action=floSendContact&' + jQuery(form).serialize(),
      type: 'POST',
      dataType: "json",
      //      cache: false,
      success: function success(json) {

        //jQuery('#flo-loading').fadeOut('slow'); // loading effect

        if (json.contact_name) {
          jQuery('.flo-name').addClass('invalid');
          jQuery(container).append(json.contact_name);
        }

        if (json.contact_email) {
          jQuery('.flo-email').addClass('invalid');
          jQuery(container).append(json.contact_email);
        }

        if (json.error_message) {

          jQuery(container).append(json.error_message);
        }

        if (json.message) {
          jQuery('.flo-modal').fadeIn('slow');

          jQuery(form).find('input[type="text"], textarea').val('');

          setTimeout(function () {
            jQuery('.flo-modal').fadeOut('slow');
          }, 3000);
        }
      }

    });
  });
});

$(function () {

  var $form = $(".flo-form--newsletter");
  if ($form.length) {
    // Start: Validation
    $form.parsley();
    // End: Validation

    // Start: Mailchimp Subscription

    var $embed_code = unescape($form.parent().find(".embed_code").text());
    if (typeof $embed_code != 'undefined' && $($embed_code).find("form").length) {
      $embed_code = $("<div>").html($embed_code);
      var embed_form_action = $embed_code.find("form").attr("action").replace(/\\"/g, '');
      $form.attr("action", embed_form_action);
    }

    // End: Mailchimp Subscription`
  }
});

$(function () {
  $(".flo-video-embed").each(function () {
    var video_embed = $(this);
    var video_embed__loaded_class = "flo-video-embed--loaded";
    var video_screen = video_embed.find(".flo-video-embed__screen");
    var video_screen__embed_code = video_screen.attr("data-flo-video-embed-embed-code");
    var video_button = video_embed.find(".flo-video-embed__video-button");
    var video_start = function video_start() {
      video_screen.html(video_screen__embed_code);
      video_embed.addClass(video_embed__loaded_class);
    };
    var video_stop = function video_stop() {
      video_embed.removeClass(video_embed__loaded_class);
      video_screen.html("");
    };
    video_button.on("click", function (e) {
      e.preventDefault();
      switch (video_embed.hasClass(video_embed__loaded_class)) {
        case false:
          video_start();
          break;
        case true:
          video_stop();
          break;
      }
    });

    video_embed.on("floVideoEmbedStop", function () {
      video_stop();
    });
  });
});

$(document).imagesLoaded(function () {
  $('.flo-card-b__row').masonry({
    // options
    itemSelector: '.flo-card-b__item'
  });
});

$(document).imagesLoaded(function () {
  $('.flo-card-c-list').masonry({
    // options
    itemSelector: '.flo-card-c-list__column'
  });
});

window.flo_block_faq = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-faq";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  $el.find(dotb + "__qas-slides").on("init", function () {
    $el.find(dotb + "__qas-controls-counter-count").text($el.find(dotb + "__qas-slides .slick-slide:not(.slick-cloned)").length);
  }).on("init afterChange", function () {
    $el.find(dotb + "__qas-controls-counter-index").changeTextUI(parseInt($el.find(dotb + "__qas-slides .slick-current").attr("data-slick-index")) + 1, "counter");
  }).slick({
    prevArrow: $el.find(dotb + "__qas-controls-arrow--previous"),
    nextArrow: $el.find(dotb + "__qas-controls-arrow--next"),
    fade: true,
    adaptiveHeight: true
  });
};

window.flo_block_featured_links_1 = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-featured-links-1";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  $el.find(dotb + "__links").on("init", function () {
    $el.find(dotb + "__counter-count").text($el.find(".slick-slide:not(.slick-cloned)").length);
  }).on("init afterChange", function () {
    $el.find(dotb + "__counter-index").changeTextUI(parseInt($el.find(".slick-current").attr("data-slick-index")) + 1, "counter");
  }).slick({
    fade: true,
    prevArrow: $el.find(dotb + "__nav-bar-arrow--previous"),
    nextArrow: $el.find(dotb + "__nav-bar-arrow--next")
  });
};

window.flo_block_featured_links_2 = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-featured-links-2";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  var class_hovered = b + "__link--hovered";

  function do_hover(index) {
    if (!index) {
      index = 1;
    }
    var hovered_element = $el.find(dotb + "__link[data-link-index=" + index + "]");

    if (!hovered_element.hasClass(class_hovered)) {
      $(dotb + "__link").removeClass(class_hovered);
      setTimeout(function () {
        hovered_element.addClass(class_hovered);
        $el.find(dotb + "__image").css("background-image", "url(" + hovered_element.attr("data-link-image") + ")");
      });
    }

    $el.find(dotb + "__counter-index").changeTextUI(index, "counter");
  }

  // On Ready -> Set first element as hvoered;
  do_hover();

  /* START: LINK HOVER */
  $el.find(dotb + "__link").hover(function () {
    do_hover($(this).attr("data-link-index"));
  });
  /* END: LINK HOVER */

  /* START: COUNTER */
  $el.find(dotb + "__next-button").click(function () {
    var hovered_element = $el.find("." + class_hovered);

    if (hovered_element.next().length) {
      do_hover(hovered_element.next().attr("data-link-index"));
    } else {
      do_hover();
    }
  });
  /* END: COUNTER */

  /* START: COUNTER */
  $el.find(dotb + "__counter-count").text($el.find(dotb + "__link").length);
  /* END: COUNTER */
};

window.flo_block_featured_links_3 = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-featured-links-3";
  var dotb = "." + b;
  var image = $el.find(dotb + "__content-wrap");
  if ($(window).width() >= 768) {
    /* START: LINK HOVER */
    var links = $el.find(dotb + "__link");
    links.on("mouseenter", function () {

      var link = $(this);

      /* Get the data for this hovered element */
      var image_url = $(this).attr("data-image");
      var link_text = $(this).attr("data-text");
      var elements_color = $(this).attr("data-elements-color");
      var elements_background_color = $(this).attr("data-background-overlay-color");
      var elements_background_opacity = $(this).attr("data-background-overlay-opacity") / 100;

      /* On hover change background image */
      image.attr("style", image_url);

      /* On hover change color of the title */
      $el.find(dotb + "__link-title").css("color", elements_color);

      /* On hover change color of the text and the text content attached to the hovered element */
      $el.find(dotb + "__link-text").css("color", elements_color).changeText(link_text);

      /* On hover change the overlay background color and opacity amount */
      $el.find(dotb + "__background-overlay").css("background-color", elements_background_color).css("opacity", elements_background_opacity);
    });
    /* END: LINK HOVER */
  }
};

window.flo_block_testimonials_2 = function (el) {
  "use strict";

  var $el = $(el);
  var b = "flo-block-testimonials-2";
  var dotb = "." + b;
  var parent = $el.parents(".flo-block");

  function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
  }

  $el.find(dotb + "__testimonials").on("init", function () {
    $el.find(dotb + "__counter-count").text(pad($el.find(dotb + "__testimonial:not(.slick-cloned)").length, 2));
  }).on("init afterChange", function () {
    $el.find(dotb + "__counter-index").changeTextUI(pad(parseInt($el.find(".slick-current").attr("data-slick-index")) + 1, 2), "counter");

    $el.find(dotb + "__bottom-label").changeTextUI($el.find(".slick-current").attr("data-bottom-label-text")).attr("href", $el.find(".slick-current").attr("data-bottom-label-url"));

    $el.find(dotb + "__background").css("background-color", $el.find(".slick-current").attr("data-background-color"));

    $el.find([dotb + "__counter", dotb + "__arrow"].join(", ")).css("color", $el.find(".slick-current").attr("data-elements-color"));

    $el.find(dotb + "__testimonial-decorative-line").css("background-color", $el.find(".slick-current").attr("data-elements-color"));
  }).slick({
    fade: true,
    prevArrow: $el.find(dotb + "__arrow--prev"),
    nextArrow: $el.find(dotb + "__arrow--next"),
    responsive: [{
      breakpoint: 767,
      settings: {
        adaptiveHeight: true
      }
    }]
  });
};

$(function () {

  // Start: Scroll Up Button
  // Scroll to top
  $('.flo-footer__scroll-to-top-title,.listing-pagination-type-c__back-to-top,.listing-pagination-type-e__back-to-top').click(function () {
    $('body,html').animate({ scrollTop: 0 }, 800);
    return false;
  });
  $('.flo-footer-type-a__newsletter-btn').click(function () {
    // $('body').find(".flo-footer-type-a__form").toggleClass("flo-footer-type-a__form--active");
    $('body').find(".flo-footer-type-a__form").slideToggle("flo-footer-type-a__form--active");
    $('body,html').animate({
      scrollTop: $(".flo-footer-type-a__form").offset().top
    }, 800);
    return false;
  });
  $('.flo-footer-type-a__form-close').click(function () {
    $('body').find(".flo-footer-type-a__form").slideToggle("flo-footer-type-a__form--active");
    return false;
  });
  // End: Scroll Up Button

  // Start: Add Instagram Active Class
  if ($(".flo-footer .flo-shcode-instgm-container").length) {
    $(".flo-footer").addClass("flo-footer--instagram-plugin-active");
  }
  // End: Add Instagram Active Class
});

$(function () {

  /* START: SET SLIDER POSITION ACCORDING TO CLICKED THUMBNAIL */
  $(".flo-gallery-type-c__column img").click(function () {
    var index = $(this).parent().data("img-index");
    $(".flo-gallery-popup").foundation("open");
    setTimeout(function () {
      $(".flo-gallery-popup .flo-hero-5__slides").slick("slickGoTo", index);
      $(".flo-gallery-popup .flo-hero-5__slides").find('.slick-list').attr('tabindex', index).focus();
    }, 400);
  });
  /* END: SET SLIDER POSITION ACCORDING TO CLICKED THUMBNAIL */

  /* START: STOP VIDEO EMBED ON CLOSE BUTTON CLICK */
  $(".flo-gallery-popup__close").on("click", function () {
    $(".flo-hero-5 .flo-video-embed").trigger("floVideoEmbedStop");
  });
  /* END: STOP VIDEO EMBED ON CLOSE BUTTON CLICK */
});

function gallery_c_masonry() {
  var b = "flo-gallery-type-c";
  var dotb = "." + b;
  var row = $(dotb).find(dotb + "__row");
  var els = dotb + "__column";
  var img_el = $(dotb).find(dotb + "__image");

  /* START: Initialize MASONRY */
  function do_masonry() {
    row.masonry({
      itemSelector: dotb + "__column"
    });
  }

  do_masonry();
  /* END: Initialize MASONRY */

  /* START: viewportChecker; Lazy Loading */
  $(els).viewportChecker({
    classToAdd: "visible",
    classToRemove: "to-appear lazy",
    offset: 50,
    callbackFunction: function callbackFunction(elem, action) {
      if (action == "add" || !elem[0].hasAttribute("src")) {
        var elem_img = elem.find("img");
        elem_img.attr("src", elem_img.attr("data-src"));
        elem_img.imagesLoaded(function () {
          setTimeout(function () {
            do_masonry();
          });
        });
      }
    }
  });
  /* END: viewportChecker; Lazy Loading */
}

gallery_c_masonry();

$(window).on('resize', gallery_c_masonry());
$(function () {

  var flo_header__class = "flo-header";
  var $flo_header = $("." + flo_header__class);

  /* Start: Sticky Header */
  if (window.innerWidth >= 768) $("header.flo-header--sticky .flo-header").sticky({
    zIndex: 8
  });
  /* End: Sticky Header*/

  /* Start: Dropdown */
  var dropdown_elements = new Foundation.DropdownMenu($(".menu-item-has-children ul"));
  /* End: Dropdown */

  /* Start: Logo Center - split menu in half */
  if ($(".flo-header--menu-center").length) {
    setTimeout(function () {
      var $menu_donor = $(".flo-header__menu-donor"),
          $menu_donor_ul = $menu_donor.find("> div > ul"),
          $menu_donor_first_level = $menu_donor_ul.children("li"),
          $menu_left,
          $menu_right;

      if ($('.flo-header--menu-center').hasClass('flo-header__type-e')) {
        $menu_left = $(".flo-header__menu--left .menu");
        $menu_right = $(".flo-header__menu--right .menu");
      } else {
        $menu_left = $(".flo-header__menu--left > ul");
        $menu_right = $(".flo-header__menu--right > ul");
      }

      $menu_donor_first_level.each(function (index) {
        var $item = $(this),
            length = $menu_donor_first_level.length;
        if (index < length / 2) {
          $menu_left.append($item);
          console.log($menu_left);
        }
        if (index >= length / 2) {
          $menu_right.append($item);
        }
        if (index == length - 1) {
          $menu_donor.remove();
        }
      });
    }, 10);
  }
  /* End: Logo Center - split menu in half */

  /* Start: Search */
  var $search = $flo_header.find(".flo-header__search");
  var $search__wrap = $search.find(".flo-header__search-wrap");
  var $search__input = $search.find(".flo-header__search-input");

  var search__class_expanded = "flo-header--search-expanded";

  // Start: Return Headers with Specific Search States (active or inactive)
  var $header_with_search__active = function $header_with_search__active() {
    return $("." + flo_header__class + "." + search__class_expanded);
  };
  var $header_with_search__inactive = function $header_with_search__inactive() {
    return $("." + flo_header__class + ":not(." + search__class_expanded + ")");
  };
  // End: Return Headers with Specific Search States (active or inactive)

  // Start: Functions to Modify Search States
  var toggleTimeout = false;
  var search__toggle = function search__toggle() {
    if (toggleTimeout == false) {

      toggleTimeout = setTimeout(function () {
        clearTimeout(toggleTimeout);
        toggleTimeout = false;
      }, 500);

      $flo_header.toggleClass(search__class_expanded);
    }
  };
  var search__open = function search__open() {
    $flo_header.addClass(search__class_expanded);
  };
  var search__close = function search__close() {
    $flo_header.removeClass(search__class_expanded);
  };
  var search__focus = function search__focus() {
    $header_with_search__active().find(".flo-header__search-input").focus();
  };
  // End: Functions to Modify Search States

  // Start: Toggle Search on Trigger Click
  $(".flo-header__search-trigger").on("click", function () {
    search__toggle();
    search__focus();
  });
  // End: Toggle Search on Trigger Click

  // Start: Close Search on Focus Out
  $search__input.on("focusout", function () {
    search__toggle();
  });
  // End: Close Search on Focus Out

  /* End: Search */

  //Menu Trigger
  var sticky_update = function sticky_update() {
    if ($("header.flo-header--sticky .flo-header").length) {
      $("header.flo-header--sticky .flo-header").sticky("update");
    }
  };

  $('.flo-header__menu-trigger').click(function () {
    $(this).toggleClass('flo-header__menu-trigger--active');
    $('body').find('.flo-header__menu-container').slideToggle({
      start: function start() {
        sticky_update();
      },
      complete: function complete() {
        sticky_update();
      }
    })
    // .toggleClass('flo-header__menu-container--active')
    ;
  });
});

$(function () {
  // Start: Add Main Class
  $(".flo-header-mobile").first().addClass("is-main");
  // End: Add Main Class

  // Start: Sticky
  $(".flo-header-mobile").first().addClass("not-sticky");
  $(".flo-header-mobile.sticky").first().on("sticky-end", function () {
    $(this).addClass("not-sticky");
  }).on("sticky-start", function () {
    $(this).removeClass("not-sticky");
  }).sticky({
    zIndex: 1000,
    className: "is-sticky",
    wrapperClassName: "flo-header-mobile-sticky-wrapper"
  });
  // End: Sticky

  // Start: Display Mobile Submenu
  $('.flo-mobile-menu__item').click(function () {
    $(this).find('.flo-mobile-menu__submenu').slideToggle(400);
  });
  // End: Display Mobile Submenu

  // Start: Display Mobile Menu
  $('.flo-header-mobile__menu-trigger').click(function () {
    // $('body, html').find('.flo-mobile-menu').toggleClass('flo-mobile-menu--display');
    $('body, html').toggleClass('body--flo-header-mobile-menu-trigger-active');
  });
  // End: Display Mobile Menu

  // Start: Display Search
  $(".flo-header-mobile__search-button-1").on("click", function () {
    $(this).parents(".flo-header-mobile").toggleClass("flo-header-mobile--search-active");
  });
  // End: Display Search

  /* Start: Addons Carousel */
  $(".flo-mobile-menu__addons").slick({
    infinite: true,
    // centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: "<span class='flo-mobile-menu__addons-arrow flo-mobile-menu__addons-arrow--next'><i class='flo-icon-arrow-border-right'></i></span>",
    prevArrow: "<span class='flo-mobile-menu__addons-arrow flo-mobile-menu__addons-arrow--prev'><i class='flo-icon-arrow-border-left'></i></span>"
  });
  /* End: Addons Carousel */

  /* START: TOGGLE DROPDOWN */

  /* Start: Add dropdown toggles to every item with dropdown */
  $(".flo-mobile-menu__nav--style-collapsed > ul > li.menu-item-has-children").children("a").after("<div class='flo-mobile-menu__nav-dropdown-toggle'><i class='flo-icon-cross'></i></div>");

  $(".flo-mobile-menu").on("click", ".flo-mobile-menu__nav-dropdown-toggle", function (e) {
    $(this).siblings(".sub-menu").slideToggle("slow");
    $(this).parent().toggleClass("children-visible");
  });
  /* End: Add dropdown toggles to every item with dropdown */

  /* END: TOGGLE DROPDOWN */
});

$(function () {
  $(".flo-hero-3__slides").each(function () {
    var $slideshow = $(this);

    $slideshow
    // .on("init", function(){
    //   $(this).find('.slick-list').attr('tabindex', 0).focus();
    // })
    .on('beforeChange', function () {
      $(this).find(".flo-video-embed").trigger("floVideoEmbedStop");
    }).slick({
      arrows: true,
      slidesToShow: 1,
      adaptiveHeight: true,
      infinite: true,
      fade: true,
      prevArrow: $(this).siblings().find('.flo-featured-slideshow__prev'),
      nextArrow: $(this).siblings().find('.flo-featured-slideshow__next'),
      cssEase: "cubic-bezier(0.4445, 0.050, 0.550, 0.950)",
      responsive: [{
        breakpoint: 736,
        settings: {
          slidesToShow: 1,
          dots: false,
          arrows: true,
          centerPadding: 0,
          adaptiveHeight: true
        }
      }]
    });
  });
});

$(function () {

  $(".flo-hero-4__slides").on("init", function () {
    // $(this).find('.slick-list').attr('tabindex', 0).focus();
  }).on('beforeChange', function () {
    $(this).find(".flo-video-embed").trigger("floVideoEmbedStop");
  }).on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var slideshow__$ = $(this);
    var slideshow__list = slideshow__$.find(".slick-list");
    var slideshow__active_slide = slideshow__$.find(".slick-current");
    var slideshow__active_slide_img = slideshow__active_slide.find("img");

    /* Start: Set height of slider by image */
    if ($(window).width() < 768) {
      setTimeout(function () {
        slideshow__list.css("height", slideshow__active_slide_img.height());
      }, 500);
      slideshow__active_slide.find("img").on("load", function () {
        slideshow__list.css("height", slideshow__active_slide_img.height());
      });
    }
    /* End: Set height of slider by image */

    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.flo-gallery-type-a__slideshow-pages').text(i + '  of  ' + slick.slideCount);
  }).flo_lqip("setSlickPreload").slick({
    fade: false,
    arrows: true,
    lazyLoad: 'ondemand',
    lazyLoadBuffer: 0,
    prevArrow: $('.flo-gallery-type-a__slideshow-prev'),
    nextArrow: $('.flo-gallery-type-a__slideshow-next'),
    centerMode: false,
    infinite: true,
    cssEase: "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
    dots: true,
    dotsClass: 'custom_paging',

    responsive: [{
      breakpoint: 736,
      settings: {
        slidesToShow: 1,
        dots: false,
        arrows: true,
        centerPadding: 0,
        adaptiveHeight: true,
        variableWidth: false
      }
    }]
  });
});

$(function () {

  $(".flo-hero-5__slides").on("init", function () {
    setTimeout(function () {
      $(this).find('.slick-list').attr('tabindex', 0).focus();
    });
  }).on('beforeChange', function () {
    $(this).find(".flo-video-embed").trigger("floVideoEmbedStop");
  }).on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var slideshow__$ = $(this);
    var slideshow__list = slideshow__$.find(".slick-list");
    var slideshow__active_slide = slideshow__$.find(".slick-current");
    var slideshow__active_slide_img = slideshow__active_slide.find("img");

    /* Start: Set height of slider by image */
    if ($(window).width() < 768) {
      setTimeout(function () {
        slideshow__list.css("height", slideshow__active_slide_img.height());
      }, 500);
      slideshow__active_slide.find("img").on("load", function () {
        slideshow__list.css("height", slideshow__active_slide_img.height());
      });
    }
    /* End: Set height of slider by image */

    var i = (currentSlide ? currentSlide : 0) + 1;
    $('.flo-gallery-type-b__slideshow-pages').text(i + '  of  ' + slick.slideCount);
  }).flo_lqip("setSlickPreload").slick({
    arrows: true,
    nextArrow: "<span class='flo-hero-5__arrow flo-hero-5__arrow-prev'><i class='flo-icon-arrow-border-right'></i></span>",
    prevArrow: "<span class='flo-hero-5__arrow flo-hero-5__arrow-next'><i class='flo-icon-arrow-border-left'></i></span>",
    centerMode: true,
    lazyLoad: 'ondemand',
    variableWidth: true,
    cssEase: "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
    dots: true,
    dotsClass: 'custom_paging',
    responsive: [{
      breakpoint: 736,
      settings: {
        slidesToShow: 1,
        dots: false,
        arrows: true,
        centerPadding: 0,
        adaptiveHeight: true,
        variableWidth: false
      }
    }]
  });
});

$(function () {

  $(".flo-portfolio-grid .row").each(function () {
    $grid = $(this);

    function do_masonry($grid) {
      if (window.innerWidth > 768) $grid.masonry({
        itemSelector: ".column",
        columnWidth: 0
      });
    }

    do_masonry($grid);

    $(this).find("img").on("load", function () {
      do_masonry($grid);
    });
  });
});

var splash__show = function splash__show() {
  var splashScreen = $(".flo-splash");
  Foundation.Motion.animateIn(splashScreen, "fade-in");
};
var splash__hide = function splash__hide() {
  var splashScreen = $(".flo-splash");
  Foundation.Motion.animateOut(splashScreen, "fade-out");
};

window.onload = function () {
  var splashScreen = $(".flo-splash");
  splashScreen.css("opacity", "0");
  setTimeout(function () {
    splash__hide;
    splashScreen.hide();
  }, 400);
};

$(function () {

  // START: DISPLAY MOBILE MENU
  $('.flo-icon-sidebar').click(function () {
    $('.flo_page_wrap').find('.flo_sidebar').toggleClass('flo_sidebar--display');
    $("body").toggleClass("flo_sidebar--active");
  });
  // END: DISPLAY MOBILE MENU

  // START: SET PADDING TOP FOR SIDEBAR
  $(".flo_sidebar").css("top", $(".flo-header-mobile").outerHeight(true));
  // END: SET PADDING TOP FOR SIDEBAR
});

$(function () {
  $('.flo-page-about-type-a').each(function () {
    var $el = $(this);
    if ($el.parents('.flo-block').hasClass('to-appear')) {
      var block_id = $el.parents('.flo-block').attr('data-id');
      $('.flo-block--' + block_id).css('transform', 'none');
    }
  });
});

$(function () {

  $('.flo-block-with-links__links-item').each(function () {
    var itemHeight = $(this).height();
    $(this).find('.flo-block-with-links__links-title').css({ 'width': itemHeight + 'px' });
  });

  $('.flo-block-with-links__slides').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    dots: true,
    dotsClass: 'flo-block-with-links__pagination',

    responsive: [{
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        variableHeight: true,
        adaptiveHeight: true,

        breakpoint: 736,
        settings: {}
      }
    }],
    customPaging: function customPaging(slick, index) {
      return '<span class="flo-block-with-links__pagination-item" >' + '<span class="flo-block-with-links__pagination-text">' + (index + 1) + '</span> ' + '<i class="flo-block-with-links__pagination-symbol flo-icon-dot"></i> ' + '</span>';
    }
  });
});

$(function () {
  var slider__class = "flo-header-and-flo-page-hero-type-a";
  var slider__$ = $("." + slider__class);
  var slider__at_top_class = slider__class + "--at-top";
  var slider__description_class = "flo-header-and-flo-page-hero-type-a__description";
  var slider__description_$ = slider__$.find("." + slider__description_class);
  var slider__description_at_top_class = slider__description_class + "--at-top";

  $(document).on("scroll ready", function () {
    if ($(this).scrollTop() == 0) {
      slider__description_$.addClass(slider__description_at_top_class);
      slider__$.addClass(slider__at_top_class);
    } else {
      slider__description_$.removeClass(slider__description_at_top_class);
      slider__$.removeClass(slider__at_top_class);
    }
  });
});

$(function () {
  var slider__class = "flo-header-and-flo-page-hero-type-c";
  var slider__$ = $("." + slider__class);
  var slider__at_top_class = slider__class + "--at-top";
  var slider__description_class = "flo-header-and-flo-page-hero-type-c__description";
  var slider__description_$ = slider__$.find("." + slider__description_class);
  var slider__description_at_top_class = slider__description_class + "--at-top";

  $(document).on("scroll ready", function () {
    if ($(this).scrollTop() == 0) {
      slider__description_$.addClass(slider__description_at_top_class);
      slider__$.addClass(slider__at_top_class);
    } else {
      slider__description_$.removeClass(slider__description_at_top_class);
      slider__$.removeClass(slider__at_top_class);
    }
  });
});

$(function () {
  var _$$on$on$on$flo_lqip$;

  if ($(".flo-header-and-flo-page-hero").length) {
    $("body").addClass("body--has-page-hero");
    $(".flo-header-and-flo-page-hero .flo-header-mobile").addClass("is-inside-hero");
  }
  /* START: VIDEO EMBED */
  $(".flo-page-hero__slide--image_and_video_embed").each(function () {
    var active_slide__$ = $(this);
    var video_button = active_slide__$.find(".flo-hero-video-embed__button");
    var video_container = active_slide__$.find(".flo-hero-video-embed__container");
    var embed_code = active_slide__$.attr("data-embed-code");

    video_button.on("click", function () {
      if (!$("body").hasClass("body--flo-page-hero-video-is-playing")) {
        video_container.html(unescape(embed_code));
        $("body").addClass("body--flo-page-hero-video-is-playing");

        $(".flo-page-hero__slides").slick("slickSetOption", "autoplay", false, true);
      } else if ($("body").hasClass("body--flo-page-hero-video-is-playing")) {
        video_container.html("");
        $("body").removeClass("body--flo-page-hero-video-is-playing");

        var autoplay = $(".flo-page-hero__slides").attr("data-autoplay") == "true" ? true : false;
        $(".flo-page-hero__slides").slick("slickSetOption", "autoplay", autoplay, true);
      }
    });
  });
  /* END: VIDEO EMBED */

  /* START: SLIDESHOW INITIALIZATION */

  $([".flo-hero-1__slides, ", ".flo-hero-2__slides"].join("")).on("beforeChange", function () {
    var active_slide__$ = $(this).find(".slick-current");

    /* START: VIDEO EMBED CLOSE ON SLIDE CHANGE */
    if ($("body").hasClass("body--flo-page-hero-video-is-playing")) {}
    // active_slide__$.find(".flo-hero-video-embed__button").click();

    /* END: VIDEO EMBED CLOSE ON SLIDE CHANGE */
  }).on("init", function () {
    $(this).find('.slick-list').attr('tabindex', 0).focus();
  }).on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
    var active_slide__$ = $(".flo-header-and-flo-page-hero .slick-current");
    var active_slide__elements_color = active_slide__$.attr("data-elements-color");
    var active_slide__title = active_slide__$.attr("data-slide-title");
    var active_slide__subtitle = active_slide__$.attr("data-slide-subtitle");
    var active_slide__link = active_slide__$.attr("data-slide-link");

    /* START: SET LIGHT LOGO ON SLIDESHOW IF NEEDED */
    if (active_slide__elements_color) {
      // Start: Checking Color
      var c = active_slide__elements_color;
      var c = c.substring(1); // strip #
      var rgb = parseInt(c, 16); // convert rrggbb to decimal
      var r = rgb >> 16 & 0xff; // extract red
      var g = rgb >> 8 & 0xff; // extract green
      var b = rgb >> 0 & 0xff; // extract blue

      var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
      // End: Checking Color

      var active_slide__elements_color_is_light = luma > 40;

      if (active_slide__elements_color_is_light) {
        $("body").addClass("body--flo-page-hero-elements-color-is-light");
      } else {
        $("body").removeClass("body--flo-page-hero-elements-color-is-light");
      }
    }

    /* END: SET LIGHT LOGO ON SLIDESHOW IF NEEDED */

    /* START: BODY -> SET HAS VIDEO EMBED CLASS IF NEEDED */
    if (active_slide__$.hasClass("flo-page-hero__slide--image_and_video_embed")) {
      $("body").addClass("body--flo-page-hero__slide--has-video-embed");
    } else {
      $("body").removeClass("body--flo-page-hero__slide--has-video-embed");
    }
    /* END: BODY -> SET HAS VIDEO EMBED CLASS IF NEEDED */

    /* START: SLIDESHOW COUNTER */
    var counter = $('.flo-page-hero__slides').attr('data-counter');
    var i = (currentSlide ? currentSlide : 0) + 1;
    $(['.flo-header-and-flo-page-hero-type-a__paginator-text', '.flo-header-and-flo-page-hero-type-b__paginator', '.flo-header-and-flo-page-hero-type-c__paginator-text'].join(",")).text(i + '  ' + counter + '  ' + slick.slideCount);
    /* END: SLIDESHOW COUNTER */

    /* START: SLIDE TITLE & SUBTITLE */

    /* START: HIDE/SHOW ELEMENTS DEPENDING ON TITLE EMPTINESS */
    if ($.trim(active_slide__title) == "" && $.trim(active_slide__title) == "") {
      /* START: HIDE ELEMENTS */

      /* START: TYPE A */
      $(".flo-header-and-flo-page-hero-type-a__slide-title-area-block").hide("fast");
      if ($(".flo-header-and-flo-page-hero-type-a__slideshow-title").text().trim() == "") {
        $(".flo-header-and-flo-page-hero-type-a__slideshow-title-block").css("opacity", "0").hide("fast");
      }
      /* END: TYPE A */

      /* START: TYPE B */
      $(".flo-header-and-flo-page-hero-type-b__description-inner").css("border-color", "transparent");
      /* END: TYPE B */

      /* START: TYPE C */
      $(".flo-header-and-flo-page-hero-type-c__slide-title-area-block").css({
        "opacity": "0",
        "pointer-events": "none"
      });
      /* END: TYPE C */

      /* END: HIDE ELEMENTS */
    } else {
      /* START: SHOW ELEMENTS */

      /* START: TYPE A */
      $(".flo-header-and-flo-page-hero-type-a__slide-title-area-block").show("fast");
      if ($(".flo-header-and-flo-page-hero-type-a__slideshow-title").text().trim() == "") {
        $(".flo-header-and-flo-page-hero-type-a__slideshow-title-block").css("opacity", "0").show("fast");
      }
      /* END: TYPE A */

      /* START: TYPE B */
      $(".flo-header-and-flo-page-hero-type-b__description-inner").css("border-color", "");
      /* END: TYPE B */

      /* START: TYPE C */
      $(".flo-header-and-flo-page-hero-type-c__slide-title-area-block").css({
        "opacity": "1",
        "pointer-events": "initial"
      });
      /* END: TYPE C */

      /* END: SHOW ELEMENTS */
    }
    /* END: HIDE/SHOW ELEMENTS DEPENDING ON TITLE EMPTINESS */

    $(['.flo-header-and-flo-page-hero-type-a__slide-title', '.flo-header-and-flo-page-hero-type-b__slide-title', '.flo-header-and-flo-page-hero-type-c__slide-title'].join(",")).changeText(active_slide__title);
    $(['.flo-header-and-flo-page-hero-type-a__slide-subtitle', '.flo-header-and-flo-page-hero-type-c__slide-subtitle'].join(",")).changeText(active_slide__subtitle);
    $(['.flo-header-and-flo-page-hero-type-a__slide-link', '.flo-header-and-flo-page-hero-type-b__slide-link', '.flo-header-and-flo-page-hero-type-c__slide-link'].join(",")).attr("href", active_slide__link);
    /* END: SLIDE TITLE & SUBTITLE */

    /* START: CHANGE ELEMENTS COLOR */

    /* Start: Create Elements CSS */
    var elements_css__css = [

    /* Start: Header */
    ".flo-header-and-flo-page-hero :not(.is-sticky) .flo-header, ", ".flo-header-and-flo-page-hero :not(.is-sticky) .flo-header__logo, ", ".flo-header-and-flo-page-hero :not(.is-sticky) .flo-social-links__link, ", ".flo-header-and-flo-page-hero header :not(.is-sticky) .flo-header__menu-container > div > ul > .menu-item, ", ".flo-header-and-flo-page-hero header :not(.is-sticky) .flo-header__menu-container > div > ul > .menu-item > a, ", ".flo-header-and-flo-page-hero :not(.is-sticky) .flo-header__menu-trigger-text, ", ".flo-header-and-flo-page-hero :not(.is-sticky) .flo-header__search-trigger .flo-header__search-trigger-search-icon, ", ".flo-header-and-flo-page-hero :not(.is-sticky) .flo-header__search-trigger .flo-header__search-trigger-close-icon, ", ".flo-header-and-flo-page-hero :not(.is-sticky) .flo-header__search-input, ", ".flo-header-and-flo-page-hero :not(.is-sticky) .flo-post.flo-header__lang-switch, ", ".flo-header-and-flo-page-hero :not(.is-sticky) .flo-header__search-form-btn", "{", "color: " + active_slide__elements_color + ";", "}", ".flo-header-and-flo-page-hero :not(.is-sticky) .flo-header__menu-item-search:before, ", ".flo-header-and-flo-page-hero :not(.is-sticky) .flo-header__menu-trigger-item", "{", "background: " + active_slide__elements_color + ";", "}", ".flo-header-and-flo-page-hero :not(.is-sticky) .flo-header, ", ".flo-header--logo-left .flo-header__lang-switch:before, ", ".flo-header-and-flo-page-hero :not(.is-sticky) .flo-header__menu, ", ".flo-header-and-flo-page-hero :not(.is-sticky) .flo-header__item, ", ".flo-header-and-flo-page-hero :not(.is-sticky) .flo-header__menu-container ", "{", "border-color: " + active_slide__elements_color + ";", "}",
    /* End: Header */

    /* Start: Mobile Slideshow */
    ".flo-header-and-flo-page-hero .is-main.not-sticky .flo-header-mobile__search-input, ", ".flo-header-and-flo-page-hero .is-main.not-sticky .flo-header-mobile__search-submit, ", ".flo-header-and-flo-page-hero .is-main.not-sticky .flo-header-mobile__logo, ", ".flo-header-and-flo-page-hero .is-main.not-sticky .flo-header-mobile__menu", "{", "color: " + active_slide__elements_color + "!important;", "}", ".flo-header-and-flo-page-hero .is-main.not-sticky .flo-header-mobile__menu", "{", "border-color: " + active_slide__elements_color + ";", "}", ".flo-header-and-flo-page-hero .is-main.not-sticky .flo-header-mobile__menu-trigger-item", "{", "background-color: " + active_slide__elements_color + ";", "}", ".flo-header-and-flo-page-hero .is-main.not-sticky.flo-header-mobile {", "background-color: transparent;", "}",
    /* End: Mobile Slideshow */

    /* Start: Slideshow */
    ".flo-hero-video-embed__button", "{", "color: " + active_slide__elements_color + ";", "border-color: " + active_slide__elements_color + ";", "}",
    /* End: Slideshow */

    /* Start: Slideshow Type A */
    "@media (max-width: 767px) {", ".flo-header-and-flo-page-hero-type-a__slide-title {", "color: " + active_slide__elements_color + ";", "}", "}",
    /* End: Slideshow Type A*/

    /* Start: Slideshow Type B */
    ".flo-header-and-flo-page-hero .flo-header-and-flo-page-hero-type-b__slideshow-title, ", ".flo-header-and-flo-page-hero .flo-header-and-flo-page-hero-type-b__slide-title, ", ".flo-header-and-flo-page-hero .flo-header-and-flo-page-hero-type-b__arrow, ", ".flo-header-and-flo-page-hero .flo-header-and-flo-page-hero-type-b__paginator ", "{", "color: " + active_slide__elements_color + ";", "}", ".flo-header-and-flo-page-hero .flo-header-and-flo-page-hero-type-b__description-inner", "{", "border-color: " + active_slide__elements_color + ";", "}",
    /* End: Slideshow Type B */

    /* Start: Slideshow Type C */
    "@media (min-width: 768px) {", ".flo-header-and-flo-page-hero .flo-header-and-flo-page-hero-type-c__description--hiding-disabled .flo-header-and-flo-page-hero-type-c__arrow, ", ".flo-header-and-flo-page-hero .flo-header-and-flo-page-hero-type-c__description--hiding-enabled.flo-header-and-flo-page-hero-type-c__description--at-top .flo-header-and-flo-page-hero-type-c__arrow, ", ".flo-header-and-flo-page-hero .flo-header-and-flo-page-hero-type-c__description--hiding-enabled .flo-header-and-flo-page-hero-type-c__next", "{", "color: " + active_slide__elements_color + ";", "}", "}", "@media (max-width: 767px) {", ".flo-header-and-flo-page-hero-type-c__slide-title, ", ".flo-header-and-flo-page-hero-type-c__slide-subtitle, ", ".flo-header-and-flo-page-hero-type-c__paginator, ", ".flo-header-and-flo-page-hero-type-c__arrow", "{", "color: " + active_slide__elements_color + ";", "}", "}",
    /* End: Slideshow Type C */

    ""].join("\r\n");
    /* End: Create Elements CSS */

    /* Start: Apply Elements CSS */
    var elements_css__wrap_class = "flo-page-hero__elements-css";
    var elements_css__wrap_$ = $("." + elements_css__wrap_class);
    if (elements_css__wrap_$.length) {
      elements_css__wrap_$.html(elements_css__css);
    } else {
      $("head").append("<style class='" + elements_css__wrap_class + "'>" + elements_css__css + "</style>");
    }
    /* End: Apply Elements CSS */

    /* END: CHANGE ELEMENTS COLOR */

    /* START: VIDEO BACKGROUND */
    // Start: Pause all videos
    $(".flo-page-hero__slide--video_slide:not(.slick-current)").find("video").each(function () {
      this.pause();
    });
    // End: Pause all videos

    if (active_slide__$.hasClass("flo-page-hero__slide--video_slide")) {
      var video_container = active_slide__$.find(".flo-page-hero__slide-background-video");
      var video = video_container.find("video")[0];

      video.play();
    }
    /* END: VIDEO BACKGROUND */
  }).flo_lqip("setSlickPreload").slick((_$$on$on$on$flo_lqip$ = {
    fade: false,
    arrows: true,
    lazyLoad: 'ondemand',
    lazyLoadBuffer: 0,
    prevArrow: $(['.flo-header-and-flo-page-hero-type-a__prev', '.flo-header-and-flo-page-hero-type-b__prev', '.flo-header-and-flo-page-hero-type-c__prev'].join(",")),

    nextArrow: $(['.flo-header-and-flo-page-hero-type-a__next', '.flo-header-and-flo-page-hero-type-b__next', '.flo-header-and-flo-page-hero-type-c__next'].join(",")),

    centerMode: false,
    infinite: true,
    cssEase: "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
    pauseOnFocus: false

  }, _defineProperty(_$$on$on$on$flo_lqip$, "pauseOnFocus", false), _defineProperty(_$$on$on$on$flo_lqip$, "responsive", [{
    breakpoint: 770,
    settings: {
      breakpoint: 736,
      settings: {}
    }
  }]), _defineProperty(_$$on$on$on$flo_lqip$, "dots", true), _defineProperty(_$$on$on$on$flo_lqip$, "dotsClass", 'custom_paging'), _$$on$on$on$flo_lqip$));
  /* END: SLIDESHOW INITIALIZATION */
});

$(document).imagesLoaded(function () {
  $('.flo-featured-items__row').masonry({
    // options
    itemSelector: '.flo-featured-items__item',
    columnWidth: 1
  });
});

$(function () {
  $(window).on("resize", function () {
    var heightSlider = $(".flo-hero-3__slide-image").height();
    $(".flo-featured-slideshow__navigation").css('top', heightSlider);
  });
  $(window).trigger('resize');
});

$(function () {
  $(".flo-core-style").each(function () {
    var template = $(this);
    var style = template.html();
    $("head").append(style);
    template.remove();
  });
  var fadeInStyleTag = document.createElement("style");
  fadeInStyleTag.classList = "flo-core-fade-in";
  fadeInStyleTag.innerHTML = "\n    body * {\n      outline: solid transparent;\n    } \n    body {\n      opacity: 1!important;\n    }";
  $(fadeInStyleTag).appendTo("head");
});})(jQuery);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdsb2JhbC5qcyIsIjAvY29tbWVudHMtYmxvY2svY29tbWVudHMtYmxvY2subWFpbi5qcyIsIjAvZmxvLWZvcm0vZmxvLWZvcm0ubWFpbi5qcyIsIjAvZmxvLW5ld3NsZXR0ZXIvbmV3c2xldHRlci5tYWluLmpzIiwiMC9mbG8tdmlkZW8tZW1iZWQvZmxvLXZpZGVvLWVtYmVkLm1haW4uanMiLCIxL2NhcmQtdHlwZS1iL2NhcmQtdHlwZS1iLm1haW4uanMiLCIxL2NhcmQtdHlwZS1jL2NhcmQtdHlwZS1jLm1haW4uanMiLCIxL2Zsby1ibG9jay1mYXEvZmxvLWJsb2NrLWZhcS5tYWluLmpzIiwiMS9mbG8tYmxvY2stZmVhdHVyZWQtbGlua3MtMS9mbG8tYmxvY2stZmVhdHVyZWQtbGlua3MtMS5tYWluLmpzIiwiMS9mbG8tYmxvY2stZmVhdHVyZWQtbGlua3MtMi9mbG8tYmxvY2stZmVhdHVyZWQtbGlua3MtMi5tYWluLmpzIiwiMS9mbG8tYmxvY2stZmVhdHVyZWQtbGlua3MtMy9mbG8tYmxvY2stZmVhdHVyZWQtbGlua3MtMy5tYWluLmpzIiwiMS9mbG8tYmxvY2stdGVzdGltb25pYWxzLTIvZmxvLWJsb2NrLXRlc3RpbW9uaWFscy0yLm1haW4uanMiLCIxL2Zsby1mb290ZXIvZmxvLWZvb3Rlci5tYWluLmpzIiwiMS9mbG8tZ2FsbGVyeS1wb3B1cC9mbG8tZ2FsbGVyeS5wb3B1cC5tYWluLmpzIiwiMS9mbG8tZ2FsbGVyeS10eXBlLWMvZmxvLWdhbGxlcnktdHlwZS1jLm1haW4uanMiLCIxL2Zsby1oZWFkZXIvZmxvLWhlYWRlci5tYWluLmpzIiwiMS9mbG8taGVhZGVyLW1vYmlsZS1tZW51L2Zsby1oZWFkZXItbW9iaWxlLW1lbnUubWFpbi5qcyIsIjEvZmxvLWhlcm8tMy9mbG8taGVyby0zLm1haW4uanMiLCIxL2Zsby1oZXJvLTQvZmxvLWhlcm8tNC5tYWluLmpzIiwiMS9mbG8taGVyby01L2Zsby1oZXJvLTUubWFpbi5qcyIsIjEvZmxvLXBvcnRmb2xpby1ncmlkL2Zsby1wb3J0Zm9saW8tZ3JpZC5tYWluLmpzIiwiMS9mbG8tc3BsYXNoL2Zsby1zcGxhc2gubWFpbi5qcyIsIjEvc2lkZWJhci9zaWRlcmJhci5tYWluLmpzIiwiMi9mbG8tYWJvdXQvZmxvLXBhZ2UtYWJvdXRfX2xheW91dC0tdHlwZS1hLm1haW4uanMiLCIyL2Zsby1zZWN0aW9uLWJsb2NrLXdpdGgtbGlua3MvZmxvLWJsb2NrLXdpdGgtbGlua3MubWFpbi5qcyIsIjIvZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby9mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLS10eXBlLWEubWFpbi5qcyIsIjIvZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby9mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLS10eXBlLWMubWFpbi5qcyIsIjIvZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby9mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLm1haW4uanMiLCIyL2Zsby1zZWN0aW9uLWZlYXR1cmVkLWl0ZW1zL2Zsby1mZWF0dXJlZC1pdGVtcy5tYWluLmpzIiwiMi9mbG8tc2VjdGlvbi1mZWF0dXJlZC1zbGlkZXNob3cvZmxvLWZlYXR1cmVkLXNsaWRlc2hvdy5tYWluLmpzIiwic3R5bGUvc3R5bGUubWFpbi5qcyJdLCJuYW1lcyI6WyJqUXVlcnkiLCJmbiIsImV4dGVuZCIsImNoYW5nZVRleHQiLCJ0ZXh0IiwiZWFjaCIsIiRlbCIsIiQiLCJhbmltYXRlIiwic2V0VGltZW91dCIsImNoYW5nZVRleHRVSSIsImFuaW1hdGlvbiIsInNwZWVkIiwiYW5pbWF0aW9uX21hcCIsImZhZGUiLCJuYW1lIiwic2hvd19hdHRyIiwiaGlkZV9hdHRyIiwiY291bnRlciIsImRpcmVjdGlvbiIsInNsaWRlX2xlZnQiLCJkcm9wX3VwIiwiaGlkZSIsInNob3ciLCJjaGFuZ2VDU1MiLCJwcm9wZXJ0eSIsInZhbHVlIiwiY3NzIiwiZG9jdW1lbnQiLCJmb3VuZGF0aW9uIiwiZmxvX2xxaXAiLCJ3aW5kb3ciLCJvbiIsImpvaW4iLCJ2aWV3cG9ydENoZWNrZXIiLCJjbGFzc1RvQWRkIiwicmVwZWF0Iiwib2Zmc2V0IiwiaW52ZXJ0Qm90dG9tT2Zmc2V0IiwidHJpZ2dlciIsImZuTmFtZSIsImF0dHIiLCJjb25zb2xlIiwibG9nIiwiaXNfbW9iaWxlX3NjcmVlbiIsImlzX3RhYmxldF9zY3JlZW4iLCJtb2JpbGVfY29va2llX25hbWUiLCJ0YWJsZXRfY29va2llX25hbWUiLCJtb2JpbGVfY29va2llIiwiZmxvR2V0Q29va2llIiwidGFibGV0X2Nvb2tpZSIsInNldF9tb2JpbGUiLCJjcmVhdGVDb29raWUiLCJzZXRfdGFibGV0IiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50V2lkdGgiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvb2tpZSIsImluZGV4T2YiLCJkZXZpY2VQaXhlbFJhdGlvIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvVVRDU3RyaW5nIiwiZGF0ZU8iLCJkYXlzIiwiZXhwaXJlcyIsInRvR01UU3RyaW5nIiwiY25hbWUiLCJjYSIsInNwbGl0IiwiaSIsImxlbmd0aCIsImMiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJjbGljayIsInRvZ2dsZUNsYXNzIiwic2xpZGVUb2dnbGUiLCJlIiwicHJldmVudERlZmF1bHQiLCJmb3JtIiwiY29udGFpbmVyIiwicmVtb3ZlQ2xhc3MiLCJodG1sIiwiYWpheCIsInVybCIsImFqYXh1cmwiLCJkYXRhIiwic2VyaWFsaXplIiwidHlwZSIsImRhdGFUeXBlIiwic3VjY2VzcyIsImpzb24iLCJjb250YWN0X25hbWUiLCJhZGRDbGFzcyIsImFwcGVuZCIsImNvbnRhY3RfZW1haWwiLCJlcnJvcl9tZXNzYWdlIiwibWVzc2FnZSIsImZhZGVJbiIsImZpbmQiLCJ2YWwiLCJmYWRlT3V0IiwiJGZvcm0iLCJwYXJzbGV5IiwiJGVtYmVkX2NvZGUiLCJ1bmVzY2FwZSIsInBhcmVudCIsImVtYmVkX2Zvcm1fYWN0aW9uIiwicmVwbGFjZSIsInZpZGVvX2VtYmVkIiwidmlkZW9fZW1iZWRfX2xvYWRlZF9jbGFzcyIsInZpZGVvX3NjcmVlbiIsInZpZGVvX3NjcmVlbl9fZW1iZWRfY29kZSIsInZpZGVvX2J1dHRvbiIsInZpZGVvX3N0YXJ0IiwidmlkZW9fc3RvcCIsImhhc0NsYXNzIiwiaW1hZ2VzTG9hZGVkIiwibWFzb25yeSIsIml0ZW1TZWxlY3RvciIsImZsb19ibG9ja19mYXEiLCJlbCIsImIiLCJkb3RiIiwicGFyZW50cyIsInBhcnNlSW50Iiwic2xpY2siLCJwcmV2QXJyb3ciLCJuZXh0QXJyb3ciLCJhZGFwdGl2ZUhlaWdodCIsImZsb19ibG9ja19mZWF0dXJlZF9saW5rc18xIiwiZmxvX2Jsb2NrX2ZlYXR1cmVkX2xpbmtzXzIiLCJjbGFzc19ob3ZlcmVkIiwiZG9faG92ZXIiLCJpbmRleCIsImhvdmVyZWRfZWxlbWVudCIsImhvdmVyIiwibmV4dCIsImZsb19ibG9ja19mZWF0dXJlZF9saW5rc18zIiwiaW1hZ2UiLCJ3aWR0aCIsImxpbmtzIiwibGluayIsImltYWdlX3VybCIsImxpbmtfdGV4dCIsImVsZW1lbnRzX2NvbG9yIiwiZWxlbWVudHNfYmFja2dyb3VuZF9jb2xvciIsImVsZW1lbnRzX2JhY2tncm91bmRfb3BhY2l0eSIsImZsb19ibG9ja190ZXN0aW1vbmlhbHNfMiIsInBhZCIsInN0ciIsIm1heCIsInRvU3RyaW5nIiwicmVzcG9uc2l2ZSIsImJyZWFrcG9pbnQiLCJzZXR0aW5ncyIsInNjcm9sbFRvcCIsInRvcCIsImZvY3VzIiwiZ2FsbGVyeV9jX21hc29ucnkiLCJyb3ciLCJlbHMiLCJpbWdfZWwiLCJkb19tYXNvbnJ5IiwiY2xhc3NUb1JlbW92ZSIsImNhbGxiYWNrRnVuY3Rpb24iLCJlbGVtIiwiYWN0aW9uIiwiaGFzQXR0cmlidXRlIiwiZWxlbV9pbWciLCJmbG9faGVhZGVyX19jbGFzcyIsIiRmbG9faGVhZGVyIiwiaW5uZXJXaWR0aCIsInN0aWNreSIsInpJbmRleCIsImRyb3Bkb3duX2VsZW1lbnRzIiwiRm91bmRhdGlvbiIsIkRyb3Bkb3duTWVudSIsIiRtZW51X2Rvbm9yIiwiJG1lbnVfZG9ub3JfdWwiLCIkbWVudV9kb25vcl9maXJzdF9sZXZlbCIsImNoaWxkcmVuIiwiJG1lbnVfbGVmdCIsIiRtZW51X3JpZ2h0IiwiJGl0ZW0iLCJyZW1vdmUiLCIkc2VhcmNoIiwiJHNlYXJjaF9fd3JhcCIsIiRzZWFyY2hfX2lucHV0Iiwic2VhcmNoX19jbGFzc19leHBhbmRlZCIsIiRoZWFkZXJfd2l0aF9zZWFyY2hfX2FjdGl2ZSIsIiRoZWFkZXJfd2l0aF9zZWFyY2hfX2luYWN0aXZlIiwidG9nZ2xlVGltZW91dCIsInNlYXJjaF9fdG9nZ2xlIiwiY2xlYXJUaW1lb3V0Iiwic2VhcmNoX19vcGVuIiwic2VhcmNoX19jbG9zZSIsInNlYXJjaF9fZm9jdXMiLCJzdGlja3lfdXBkYXRlIiwic3RhcnQiLCJjb21wbGV0ZSIsImZpcnN0IiwiY2xhc3NOYW1lIiwid3JhcHBlckNsYXNzTmFtZSIsImluZmluaXRlIiwic2xpZGVzVG9TaG93Iiwic2xpZGVzVG9TY3JvbGwiLCJhZnRlciIsInNpYmxpbmdzIiwiJHNsaWRlc2hvdyIsImFycm93cyIsImNzc0Vhc2UiLCJkb3RzIiwiY2VudGVyUGFkZGluZyIsImV2ZW50IiwiY3VycmVudFNsaWRlIiwibmV4dFNsaWRlIiwic2xpZGVzaG93X18kIiwic2xpZGVzaG93X19saXN0Iiwic2xpZGVzaG93X19hY3RpdmVfc2xpZGUiLCJzbGlkZXNob3dfX2FjdGl2ZV9zbGlkZV9pbWciLCJoZWlnaHQiLCJzbGlkZUNvdW50IiwibGF6eUxvYWQiLCJsYXp5TG9hZEJ1ZmZlciIsImNlbnRlck1vZGUiLCJkb3RzQ2xhc3MiLCJ2YXJpYWJsZVdpZHRoIiwiJGdyaWQiLCJjb2x1bW5XaWR0aCIsInNwbGFzaF9fc2hvdyIsInNwbGFzaFNjcmVlbiIsIk1vdGlvbiIsImFuaW1hdGVJbiIsInNwbGFzaF9faGlkZSIsImFuaW1hdGVPdXQiLCJvbmxvYWQiLCJvdXRlckhlaWdodCIsImJsb2NrX2lkIiwiaXRlbUhlaWdodCIsInZhcmlhYmxlSGVpZ2h0IiwiY3VzdG9tUGFnaW5nIiwic2xpZGVyX19jbGFzcyIsInNsaWRlcl9fJCIsInNsaWRlcl9fYXRfdG9wX2NsYXNzIiwic2xpZGVyX19kZXNjcmlwdGlvbl9jbGFzcyIsInNsaWRlcl9fZGVzY3JpcHRpb25fJCIsInNsaWRlcl9fZGVzY3JpcHRpb25fYXRfdG9wX2NsYXNzIiwiYWN0aXZlX3NsaWRlX18kIiwidmlkZW9fY29udGFpbmVyIiwiZW1iZWRfY29kZSIsImF1dG9wbGF5IiwiYWN0aXZlX3NsaWRlX19lbGVtZW50c19jb2xvciIsImFjdGl2ZV9zbGlkZV9fdGl0bGUiLCJhY3RpdmVfc2xpZGVfX3N1YnRpdGxlIiwiYWN0aXZlX3NsaWRlX19saW5rIiwicmdiIiwiciIsImciLCJsdW1hIiwiYWN0aXZlX3NsaWRlX19lbGVtZW50c19jb2xvcl9pc19saWdodCIsInRyaW0iLCJlbGVtZW50c19jc3NfX2NzcyIsImVsZW1lbnRzX2Nzc19fd3JhcF9jbGFzcyIsImVsZW1lbnRzX2Nzc19fd3JhcF8kIiwicGF1c2UiLCJ2aWRlbyIsInBsYXkiLCJwYXVzZU9uRm9jdXMiLCJoZWlnaHRTbGlkZXIiLCJ0ZW1wbGF0ZSIsInN0eWxlIiwiZmFkZUluU3R5bGVUYWciLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiaW5uZXJIVE1MIiwiYXBwZW5kVG8iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBQSxPQUFBQyxFQUFBLENBQUFDLE1BQUEsQ0FBQTtBQUNBQyxjQUFBLG9CQUFBQyxJQUFBLEVBQUE7QUFDQSxXQUFBLEtBQUFDLElBQUEsQ0FBQSxZQUFBO0FBQ0EsVUFBQUMsTUFBQUMsRUFBQSxJQUFBLENBQUE7QUFDQSxVQUFBRCxJQUFBRixJQUFBLE9BQUFBLElBQUEsRUFBQTtBQUNBRSxZQUNBRSxPQURBLENBQ0EsRUFBQSxXQUFBLENBQUEsRUFEQSxFQUNBLEdBREE7QUFHQUMsbUJBQUEsWUFBQTtBQUNBSCxjQUFBRixJQUFBLENB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a0RBeVZBLElBelZBLHVEQTBWQSxlQTFWQTtBQTZWQTtBQUVBLENBOVhBOztBQ0FBeEosRUFBQXFCLFFBQUEsRUFBQTZGLFlBQUEsQ0FBQSxZQUFBO0FBQ0FsSCxJQUFBLDBCQUFBLEVBQUFtSCxPQUFBLENBQUE7QUFDQTtBQUNBQyxrQkFBQSwyQkFGQTtBQUdBOEcsaUJBQUE7QUFIQSxHQUFBO0FBS0EsQ0FOQTs7QUNBQWxPLEVBQUEsWUFBQTtBQUNBQSxJQUFBd0IsTUFBQSxFQUFBQyxFQUFBLENBQUEsUUFBQSxFQUFBLFlBQUE7QUFDQSxRQUFBaVAsZUFBQTFRLEVBQUEsMEJBQUEsRUFBQTBOLE1BQUEsRUFBQTtBQUNBMU4sTUFBQSxxQ0FBQSxFQUFBb0IsR0FBQSxDQUFBLEtBQUEsRUFBQXNQLFlBQUE7QUFDQSxHQUhBO0FBSUExUSxJQUFBd0IsTUFBQSxFQUFBUSxPQUFBLENBQUEsUUFBQTtBQUNBLENBTkE7O0FDQUFoQyxFQUFBLFlBQUE7QUFDQUEsSUFBQSxpQkFBQSxFQUFBRixJQUFBLENBQUEsWUFBQTtBQUNBLFFBQUE2USxXQUFBM1EsRUFBQSxJQUFBLENBQUE7QUFDQSxRQUFBNFEsUUFBQUQsU0FBQTVMLElBQUEsRUFBQTtBQUNBL0UsTUFBQSxNQUFBLEVBQUEyRixNQUFBLENBQUFpTCxLQUFBO0FBQ0FELGFBQUFyRixNQUFBO0FBQ0EsR0FMQTtBQU1BLE1BQUF1RixpQkFBQXhQLFNBQUF5UCxhQUFBLENBQUEsT0FBQSxDQUFBO0FBQ0FELGlCQUFBRSxTQUFBLEdBQUEsa0JBQUE7QUFDQUYsaUJBQUFHLFNBQUE7QUFPQWhSLElBQUE2USxjQUFBLEVBQUFJLFFBQUEsQ0FBQSxNQUFBO0FBQ0EsQ0FqQkEiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEEgZnVuY3Rpb24gdGhhdCBhbmltYXRlcyB0ZXh0IGNoYW5nZVxyXG5qUXVlcnkuZm4uZXh0ZW5kKHtcclxuICBjaGFuZ2VUZXh0OiBmdW5jdGlvbih0ZXh0KXtcclxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyICRlbCA9ICQodGhpcyk7XHJcbiAgICAgIGlmICgkZWwudGV4dCgpICE9PSB0ZXh0ICkge1xyXG4gICAgICAgICRlbFxyXG4gICAgICAgICAgLmFuaW1hdGUoe1wib3BhY2l0eVwiOiAwfSwgMjAwKVxyXG4gICAgICAgIDtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAkZWwudGV4dCh0ZXh0KTtcclxuICAgICAgICAgICRlbFxyXG4gICAgICAgICAgICAuYW5pbWF0ZSh7XCJvcGFjaXR5XCI6IDF9LCAyMDApXHJcbiAgICAgICAgICA7XHJcbiAgICAgICAgfSwgMjAwKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBjaGFuZ2VUZXh0VUk6IGZ1bmN0aW9uKHRleHQsIGFuaW1hdGlvbiwgc3BlZWQpe1xyXG4gICAgaWYgKHR5cGVvZiBhbmltYXRpb24gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgdmFyIGFuaW1hdGlvbiA9IFwiZmFkZVwiO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBzcGVlZCA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICB2YXIgc3BlZWQgPSA0MDA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciAkZWwgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgdmFyIGFuaW1hdGlvbl9tYXAgPSB7XHJcbiAgICAgICAgZmFkZToge1xyXG4gICAgICAgICAgbmFtZTogXCJmYWRlXCIsXHJcbiAgICAgICAgICBzaG93X2F0dHI6IHtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBoaWRlX2F0dHI6IHtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvdW50ZXI6IHtcclxuICAgICAgICAgIG5hbWU6IFwic2xpZGVcIixcclxuICAgICAgICAgIHNob3dfYXR0cjoge1xyXG4gICAgICAgICAgICBkaXJlY3Rpb246IFwiZG93blwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaGlkZV9hdHRyOiB7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogXCJ1cFwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzbGlkZV9sZWZ0OiB7XHJcbiAgICAgICAgICBuYW1lOiBcImRyb3BcIixcclxuICAgICAgICAgIHNob3dfYXR0cjoge1xyXG4gICAgICAgICAgICBkaXJlY3Rpb246IFwibGVmdFwiXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgaGlkZV9hdHRyOiB7XHJcbiAgICAgICAgICAgIGRpcmVjdGlvbjogXCJyaWdodFwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBkcm9wX3VwOiB7XHJcbiAgICAgICAgICBuYW1lOiBcImRyb3BcIixcclxuICAgICAgICAgIHNob3dfYXR0cjoge1xyXG4gICAgICAgICAgICBkaXJlY3Rpb246IFwidXBcIlxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGhpZGVfYXR0cjoge1xyXG4gICAgICAgICAgICBkaXJlY3Rpb246IFwiZG93blwiXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgkZWwudGV4dCgpICE9PSB0ZXh0ICkge1xyXG4gICAgICAgIC8vICRlbFxyXG4gICAgICAgIC8vICAgLmFuaW1hdGUoe1wib3BhY2l0eVwiOiAwfSwgMjAwKVxyXG4gICAgICAgIC8vIDtcclxuICAgICAgICAkZWwuaGlkZShhbmltYXRpb25fbWFwW2FuaW1hdGlvbl0ubmFtZSwgYW5pbWF0aW9uX21hcFthbmltYXRpb25dLnNob3dfYXR0ciwgc3BlZWQgLyAyKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAkZWwudGV4dCh0ZXh0KTtcclxuICAgICAgICAgIC8vICRlbFxyXG4gICAgICAgICAgLy8gICAuYW5pbWF0ZSh7XCJvcGFjaXR5XCI6IDF9LCAyMDApXHJcbiAgICAgICAgICAvLyA7XHJcbiAgICAgICAgICAkZWwuc2hvdyhhbmltYXRpb25fbWFwW2FuaW1hdGlvbl0ubmFtZSwgYW5pbWF0aW9uX21hcFthbmltYXRpb25dLmhpZGVfYXR0ciwgc3BlZWQgLyAyKTtcclxuICAgICAgICB9LCBzcGVlZCAvIDIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIGNoYW5nZUNTUzogZnVuY3Rpb24ocHJvcGVydHksIHZhbHVlKXtcclxuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgdmFyICRlbCA9ICQodGhpcyk7XHJcbiAgICAgIGlmICgkZWwuY3NzKHByb3BlcnR5KSAhPT0gdmFsdWUgKSB7XHJcbiAgICAgICAgJGVsXHJcbiAgICAgICAgICAuYW5pbWF0ZSh7XCJvcGFjaXR5XCI6IDB9LCAyMDApXHJcbiAgICAgICAgICAvLyAuY3NzKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWSgtMC4zcmVtKVwiKVxyXG4gICAgICAgICAgLy8gLmNzcyhcInRyYW5zaXRpb25cIiwgXCJ0cmFuc2Zvcm0gMC44cywgY29sb3IgMC40c1wiKVxyXG4gICAgICAgIDtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAkZWwuY3NzKHByb3BlcnR5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAkZWxcclxuICAgICAgICAgICAgLmFuaW1hdGUoe1wib3BhY2l0eVwiOiAxfSwgMjAwKVxyXG4gICAgICAgICAgICAvLyAuY3NzKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWSgtMHJlbSlcIilcclxuICAgICAgICAgICAgLy8gLmNzcyhcInRyYW5zaXRpb25cIiwgXCJcIilcclxuICAgICAgICAgIDtcclxuICAgICAgICB9LCAyMDApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn0pO1xyXG5cclxuJChmdW5jdGlvbigpe1xyXG4gICQoZG9jdW1lbnQpLmZvdW5kYXRpb24oKTtcclxuXHJcbiAgJChkb2N1bWVudCkuZmxvX2xxaXAoKTtcclxuXHJcbiAgLyogU1RBUlQ6IEFOSU1BVEUgU0VDVElPTiBBUFBFQVJBTkNFIC0gVklFV1BPUlQgQ0hFQ0tFUiAqL1xyXG4gICAgJCh3aW5kb3cpLm9uKFwic3RhcnRWaWV3cG9ydENoZWNrZXJcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgJChbXHJcbiAgICAgICAgXCIubGF5b3V0LXNlY3Rpb25zLS1zY3JvbGwtbm9ybWFsIC5mbG8tc2VjdGlvblwiLFxyXG4gICAgICAgIFwiLmZsb19wYWdlID4gLmZsby1zZWN0aW9uOm5vdCg6Zmlyc3Qtb2YtdHlwZSk6bm90KC5kaXNhYmxlLWFwcGVhcilcIixcclxuICAgICAgICBcImZvb3RlclwiLFxyXG4gICAgICAgIFwiLnRvLWFwcGVhclwiLFxyXG4gICAgICAgIFwiLnRvLWFwcGVhci0tY3VzdG9tXCIsXHJcbiAgICAgICAgXCIuZmxvLXBvc3QgPiAqXCIsXHJcbiAgICAgICAgXCIud2lkZ2V0XCJcclxuICAgICAgXS5qb2luKFwiLFwiKSkudmlld3BvcnRDaGVja2VyKHtcclxuICAgICAgICBjbGFzc1RvQWRkOiAndmlzaWJsZScsXHJcbiAgICAgICAgcmVwZWF0OiB0cnVlLFxyXG4gICAgICAgIG9mZnNldDogNDAsXHJcbiAgICAgICAgaW52ZXJ0Qm90dG9tT2Zmc2V0OiBmYWxzZVxyXG5cclxuICAgICAgfSk7XHJcbiAgICB9KS50cmlnZ2VyKFwic3RhcnRWaWV3cG9ydENoZWNrZXJcIik7XHJcbiAgLyogRU5EOiBBTklNQVRFIFNFQ1RJT04gQVBQRUFSQU5DRSAtIFZJRVdQT1JUIENIRUNLRVIgKi9cclxuXHJcbiAgLy8gU1RBUlQ6IEJMT0NLIFNDUklQVFNcclxuICAgICQoXCJbZGF0YS1vbnJlYWR5XVwiKS5lYWNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciBmbk5hbWUgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLW9ucmVhZHlcIik7XHJcblxyXG4gICAgICBpZiAodHlwZW9mIHdpbmRvd1tmbk5hbWVdID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICB3aW5kb3dbZm5OYW1lXSh0aGlzKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImRhdGEtb25yZWFkeSBlcnJvcjogRnVuY3Rpb25cIiwgZm5OYW1lLCBcImRvZXMgbm90IGV4aXN0XCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAvLyBFTkQ6IEJMT0NLIFNDUklQVFNcclxuICBcclxuICAvLyBTVEFSVDogQU5JTUFURSBPTiBQQUdFIExPQUQgQU5EIFVOTE9BRFxyXG5cclxuICAgIC8vIFNUQVJUOiBCT0RZIEZBREVJTlxyXG4gICAgICAvLyAkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XHJcbiAgICAgIC8vICAgJChcImJvZHlcIikuZmFkZUluKCk7XHJcbiAgICAgIC8vIH0pO1xyXG4gICAgLy8gRU5EOiBCT0RZIEZBREVJTlxyXG5cclxuICAgIC8vIFNUQVJUOiBCT0RZIEZBREVPVVRcclxuICAgICAgLy8gd2luZG93Lm9uYmVmb3JldW5sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyAgICQoXCJib2R5XCIpLmZhZGVPdXQoKTtcclxuICAgICAgLy8gfTtcclxuICAgIC8vIEVORDogQk9EWSBGQURFT1VUXHJcblxyXG4gIC8vRU5EOiBMT0FEL1VOTE9BRCBBTklNQVRJT05cclxuXHJcblxyXG4gIC8qIFNUQVJUOiBNT0JJTEUgQ09PS0lFICovXHJcblxyXG4gICAgLy8gYWRkIHRoZSBjb29raWUgdGhhdCBpcyB1c2VkIHRvIGRldGVjdCBtb2JpbGUgYW5kIHJldGluYSBzY3JlZW5zXHJcbiAgICAoZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdmFyIGlzX21vYmlsZV9zY3JlZW4sXHJcbiAgICAgICAgICAgIGlzX3RhYmxldF9zY3JlZW4sXHJcbiAgICAgICAgICAgIG1vYmlsZV9jb29raWVfbmFtZSA9IFwiZmxvX3NtYWxsX3NjcmVlblwiLFxyXG4gICAgICAgICAgICB0YWJsZXRfY29va2llX25hbWUgPSBcImZsb190YWJsZXRfc2NyZWVuXCIsXHJcbiAgICAgICAgICAgIG1vYmlsZV9jb29raWUgPSBmbG9HZXRDb29raWUobW9iaWxlX2Nvb2tpZV9uYW1lKSwgLy8gQ2FuIHJldHVybiBcIjFcIiwgXCIwXCIsIG51bGw7XHJcbiAgICAgICAgICAgIHRhYmxldF9jb29raWUgPSBmbG9HZXRDb29raWUodGFibGV0X2Nvb2tpZV9uYW1lKSwgLy8gQ2FuIHJldHVybiBcIjFcIiwgXCIwXCIsIG51bGw7XHJcbiAgICAgICAgICAgIHNldF9tb2JpbGUgPSBmdW5jdGlvbih2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlQ29va2llKG1vYmlsZV9jb29raWVfbmFtZSwgdmFsdWUsIDEpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBzZXRfdGFibGV0ID0gZnVuY3Rpb24odmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGNyZWF0ZUNvb2tpZSh0YWJsZXRfY29va2llX25hbWUsIHZhbHVlLCAxKTtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgLy8gIHdlIGNvbnNpZGVyIHNjcmVlbnMgbGFyZ2VyIHRoYW4gNzYwIG5vdCBiZWVpbmcgbW9iaWxlXHJcbiAgICAgICAgaXNfbW9iaWxlX3NjcmVlbiA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCA8PSA3NjA7XHJcblxyXG4gICAgICAgIGlzX3RhYmxldF9zY3JlZW4gPSAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoID49IDc2MSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggPD0gMTAyNCk7XHJcblxyXG4gICAgICAgIGlmIChpc19tb2JpbGVfc2NyZWVuKSB7XHJcbiAgICAgICAgICAgIGlmIChtb2JpbGVfY29va2llID09PSAnJyB8fCBtb2JpbGVfY29va2llID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRfbW9iaWxlKDEpO1xyXG4gICAgICAgICAgICAgICAgc2V0X3RhYmxldCgwKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfWVsc2UgaWYoaXNfdGFibGV0X3NjcmVlbil7XHJcbiAgICAgICAgICAgIGlmICh0YWJsZXRfY29va2llID09PSAnJyB8fCB0YWJsZXRfY29va2llID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRfbW9iaWxlKDApO1xyXG4gICAgICAgICAgICAgICAgc2V0X3RhYmxldCgxKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRhYmxldF9jb29raWUgPT0gJzEnIHx8IG1vYmlsZV9jb29raWUgPT0gXCIxXCIpIHtcclxuICAgICAgICAgICAgICAgIHNldF9tb2JpbGUoMCk7XHJcbiAgICAgICAgICAgICAgICBzZXRfdGFibGV0KDApO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgLy8gU2V0IHRoZSBjb29raWUgZm9yIHRoZSByZXRpbmEgZGV2aWNlc1xyXG4gICAgLy8gdGhlIGNvb2tpZSBpcyB1c2VkIGxhdGVyIHRvIHNlcnZlIGFwcHJvcHJpYXRlIGltYWdlIHNpemVcclxuICAgICAgaWYoIGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKCdmbG9fZGV2aWNlX3BpeGVsX3JhdGlvJykgPT0gLTEgJiYgJ2RldmljZVBpeGVsUmF0aW8nIGluIHdpbmRvdyAmJiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA9PSAyICYmICFpc19tb2JpbGVfc2NyZWVuICl7XHJcblxyXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuXHJcbiAgICAgICAgZGF0ZS5zZXRUaW1lKCBkYXRlLmdldFRpbWUoKSArIDM2MDAwMDAgKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gJ2Zsb19kZXZpY2VfcGl4ZWxfcmF0aW89JyArIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvICsgJzsnICsgJyBleHBpcmVzPScgKyBkYXRlLnRvVVRDU3RyaW5nKCkgKyc7IHBhdGg9Lyc7XHJcblxyXG4gICAgICAgIC8vaWYgY29va2llcyBhcmUgbm90IGJsb2NrZWQsIHJlbG9hZCB0aGUgcGFnZVxyXG5cclxuICAgICAgICBpZihkb2N1bWVudC5jb29raWUuaW5kZXhPZignZmxvX2RldmljZV9waXhlbF9yYXRpbycpICE9IC0xKSB7XHJcblxyXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICB9IGVsc2UgaWYoZG9jdW1lbnQuY29va2llLmluZGV4T2YoJ2Zsb19kZXZpY2VfcGl4ZWxfcmF0aW8nKSAhPSAtMSAmJiBmbG9HZXRDb29raWUoJ2Zsb19kZXZpY2VfcGl4ZWxfcmF0aW8nKSAhPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyl7XHJcbiAgICAgICAgICAgIC8vIGRlbGV0ZSB0aGUgY29vY2tpZSBpZiB0aGUgc2F2ZWQgY29va2llIGRvZXMgbm90IG1hdGNoIHRoZSBjdXJyZW50IGRldmljZSBwaXhlbCByZWF0aW9cclxuXHJcbiAgICAgICAgICAgIHZhciBkYXRlTyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgICAgIGRhdGVPLnNldFRpbWUoIGRhdGVPLmdldFRpbWUoKSAtIDM2MDAwMDAgKTsgLy8gc2V0IGEgcGFzdCBkYXRlIHRoYXQgd2lsbCBiZSB1c2VkIHRvIG1ha2UgdGhlIGNvb2tpZSBleHBpcmVkXHJcblxyXG4gICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSAnZmxvX2RldmljZV9waXhlbF9yYXRpbz0nICsgd2luZG93LmRldmljZVBpeGVsUmF0aW8gKyAnOycgKyAnIGV4cGlyZXM9JyArIGRhdGVPLnRvVVRDU3RyaW5nKCkgKyc7IHBhdGg9Lyc7XHJcblxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7IC8vIHJlbG9hZCB0aGUgcGFnZSBhZnRlciBkZWxldHRpbmcgdGhlIGNvb2tpZVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH0pKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVDb29raWUobmFtZSx2YWx1ZSxkYXlzKSB7XHJcbiAgICAgICAgdmFyIGV4cGlyZXMgPSBcIlwiO1xyXG4gICAgICAgIGlmIChkYXlzKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpKyhkYXlzKjI0KjYwKjYwKjEwMDApKTtcclxuICAgICAgICAgICAgZXhwaXJlcyA9IFwiOyBleHBpcmVzPVwiK2RhdGUudG9HTVRTdHJpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gbmFtZStcIj1cIit2YWx1ZStleHBpcmVzK1wiOyBwYXRoPS9cIjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmbG9HZXRDb29raWUoY25hbWUpIHtcclxuICAgICAgICB2YXIgbmFtZSA9IGNuYW1lICsgXCI9XCI7XHJcbiAgICAgICAgdmFyIGNhID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XHJcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8Y2EubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGMgPSBjYVtpXTtcclxuICAgICAgICAgICAgd2hpbGUgKGMuY2hhckF0KDApPT0nICcpIGMgPSBjLnN1YnN0cmluZygxKTtcclxuICAgICAgICAgICAgaWYgKGMuaW5kZXhPZihuYW1lKSA9PT0gMCkgcmV0dXJuIGMuc3Vic3RyaW5nKG5hbWUubGVuZ3RoLGMubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gIC8qIEVORDogTU9CSUxFIENPT0tJRSAqL1xyXG4iLCIkKGZ1bmN0aW9uKCl7XG5cbiAgICAkKFxuICAgICAgW1xuICAgICAgICBcIi5jb21tZW50cy1ibG9ja19fdG9wLWJhci1oaWRlLWJ1dHRvblwiLFxuICAgICAgICBcIi5jb21tZW50cy1ibG9ja19fdG9wLWJhci1zaG93LWJ1dHRvblwiLFxuICAgICAgICBcIi5jb21tZW50cy1ibG9ja19fdG9wLWJhci10b2dnbGUtYnV0dG9uXCJcbiAgICAgIF0uam9pbihcIiwgXCIpXG4gICAgKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICQoJy5jb21tZW50cy1ibG9jaycpLnRvZ2dsZUNsYXNzKFwiY29tbWVudHMtYmxvY2stLWV4cGFuZGVkXCIpLnRvZ2dsZUNsYXNzKFwiY29tbWVudHMtYmxvY2stLWNvbGxhcHNlZFwiKTtcbiAgICAgICAgJChcIi5jb21tZW50cy1ibG9ja19fcG9zdHNcIikuc2xpZGVUb2dnbGUoKTtcbiAgICB9KTtcblxufSk7XG4iLCIkKGZ1bmN0aW9uKCl7XG5cblx0JCgnLnBhZ2UnKS5vbignc3VibWl0JywnLmZsby1mb3JtX19idWlsdC1pbicsZnVuY3Rpb24oZSl7XG5cdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0dmFyIGZvcm0gPSAkKHRoaXMpLFxuXHRcdFx0Y29udGFpbmVyID0gJy5jb250YWN0LXJlc3BvbnNlJzsgIC8vIHRoZSBkaXYgZm9yIHRoZSBlcnJvciByZXNwb25zZSBtZXNzYWdlc1xuXG5cdFx0alF1ZXJ5KCcuZmxvLW5hbWUnKS5yZW1vdmVDbGFzcygnaW52YWxpZCcpO1xuXHRcdGpRdWVyeSgnLmZsby1lbWFpbCcpLnJlbW92ZUNsYXNzKCdpbnZhbGlkJyk7XG5cblx0XHRqUXVlcnkoY29udGFpbmVyKS5odG1sKCcnKTtcblxuXHRcdGpRdWVyeS5hamF4KHtcblx0XHRcdHVybDogYWpheHVybCxcblx0XHRcdGRhdGE6ICcmYWN0aW9uPWZsb1NlbmRDb250YWN0JicralF1ZXJ5KCBmb3JtICkuc2VyaWFsaXplKCksXG5cdFx0XHR0eXBlOiAnUE9TVCcsXG5cdFx0XHRkYXRhVHlwZTogXCJqc29uXCIsXG5cdC8vICAgICAgY2FjaGU6IGZhbHNlLFxuXHRcdFx0c3VjY2VzczogZnVuY3Rpb24gKGpzb24pIHtcblxuXHRcdFx0XHQvL2pRdWVyeSgnI2Zsby1sb2FkaW5nJykuZmFkZU91dCgnc2xvdycpOyAvLyBsb2FkaW5nIGVmZmVjdFxuXG5cdFx0XHRcdGlmKGpzb24uY29udGFjdF9uYW1lICl7XG5cdFx0XHRcdFx0alF1ZXJ5KCcuZmxvLW5hbWUnKS5hZGRDbGFzcygnaW52YWxpZCcpO1xuXHRcdFx0XHRcdGpRdWVyeShjb250YWluZXIpLmFwcGVuZChqc29uLmNvbnRhY3RfbmFtZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZihqc29uLmNvbnRhY3RfZW1haWwgKXtcblx0XHRcdFx0XHRqUXVlcnkoJy5mbG8tZW1haWwnKS5hZGRDbGFzcygnaW52YWxpZCcpO1xuXHRcdFx0XHRcdGpRdWVyeShjb250YWluZXIpLmFwcGVuZChqc29uLmNvbnRhY3RfZW1haWwpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYoanNvbi5lcnJvcl9tZXNzYWdlICl7XG5cdFx0XHRcdFxuXHRcdFx0XHRcdGpRdWVyeShjb250YWluZXIpLmFwcGVuZChqc29uLmVycm9yX21lc3NhZ2UpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0XG5cblx0XHRcdFx0aWYoanNvbi5tZXNzYWdlICl7XG5cdFx0XHRcdFx0alF1ZXJ5KCcuZmxvLW1vZGFsJykuZmFkZUluKCdzbG93Jyk7XG5cblx0XHRcdFx0XHRqUXVlcnkoIGZvcm0pLmZpbmQoJ2lucHV0W3R5cGU9XCJ0ZXh0XCJdLCB0ZXh0YXJlYScpLnZhbCgnJyk7XG5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0XHRqUXVlcnkoJy5mbG8tbW9kYWwnKS5mYWRlT3V0KCdzbG93Jyk7XG5cdFx0XHRcdFx0fSwzMDAwKTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9KTtcblx0fSk7XG5cbn0pO1xuIiwiJChmdW5jdGlvbigpe1xuXG4gIHZhciAkZm9ybSA9ICQoXCIuZmxvLWZvcm0tLW5ld3NsZXR0ZXJcIik7XG4gIGlmICgkZm9ybS5sZW5ndGgpIHtcbiAgICAvLyBTdGFydDogVmFsaWRhdGlvblxuICAgICAgJGZvcm0ucGFyc2xleSgpO1xuICAgIC8vIEVuZDogVmFsaWRhdGlvblxuXG4gICAgLy8gU3RhcnQ6IE1haWxjaGltcCBTdWJzY3JpcHRpb25cblxuICAgICAgdmFyXG4gICAgICAgICRlbWJlZF9jb2RlID1cbiAgICAgICAgICB1bmVzY2FwZShcbiAgICAgICAgICAgICRmb3JtLnBhcmVudCgpLmZpbmQoXCIuZW1iZWRfY29kZVwiKS50ZXh0KClcbiAgICAgICAgICApO1xuICAgICAgaWYoIHR5cGVvZiAkZW1iZWRfY29kZSAhPSAndW5kZWZpbmVkJyAmJiAkKCRlbWJlZF9jb2RlKS5maW5kKFwiZm9ybVwiKS5sZW5ndGgpe1xuICAgICAgICAkZW1iZWRfY29kZSA9ICQoXCI8ZGl2PlwiKS5odG1sKCRlbWJlZF9jb2RlKTtcbiAgICAgICAgdmFyIGVtYmVkX2Zvcm1fYWN0aW9uID0gJGVtYmVkX2NvZGUuZmluZChcImZvcm1cIikuYXR0cihcImFjdGlvblwiKS5yZXBsYWNlKC9cXFxcXCIvZywgJycpXG4gICAgICAgIDtcbiAgICAgICAgJGZvcm0uYXR0cihcImFjdGlvblwiLCBlbWJlZF9mb3JtX2FjdGlvbik7XG4gICAgICB9XG5cbiAgICAvLyBFbmQ6IE1haWxjaGltcCBTdWJzY3JpcHRpb25gXG4gIH1cbn0pO1xuIiwiJChmdW5jdGlvbigpe1xuICAkKFwiLmZsby12aWRlby1lbWJlZFwiKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgdmFyIHZpZGVvX2VtYmVkID0gJCh0aGlzKTtcbiAgICB2YXIgdmlkZW9fZW1iZWRfX2xvYWRlZF9jbGFzcyA9IFwiZmxvLXZpZGVvLWVtYmVkLS1sb2FkZWRcIjtcbiAgICB2YXIgdmlkZW9fc2NyZWVuID0gdmlkZW9fZW1iZWQuZmluZChcIi5mbG8tdmlkZW8tZW1iZWRfX3NjcmVlblwiKTtcbiAgICB2YXIgdmlkZW9fc2NyZWVuX19lbWJlZF9jb2RlID0gdmlkZW9fc2NyZWVuLmF0dHIoXCJkYXRhLWZsby12aWRlby1lbWJlZC1lbWJlZC1jb2RlXCIpO1xuICAgIHZhciB2aWRlb19idXR0b24gPSB2aWRlb19lbWJlZC5maW5kKFwiLmZsby12aWRlby1lbWJlZF9fdmlkZW8tYnV0dG9uXCIpO1xuICAgIHZhciB2aWRlb19zdGFydCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmlkZW9fc2NyZWVuLmh0bWwodmlkZW9fc2NyZWVuX19lbWJlZF9jb2RlKTtcbiAgICAgIHZpZGVvX2VtYmVkLmFkZENsYXNzKHZpZGVvX2VtYmVkX19sb2FkZWRfY2xhc3MpO1xuICAgIH1cbiAgICB2YXIgdmlkZW9fc3RvcCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmlkZW9fZW1iZWQucmVtb3ZlQ2xhc3ModmlkZW9fZW1iZWRfX2xvYWRlZF9jbGFzcyk7XG4gICAgICB2aWRlb19zY3JlZW4uaHRtbChcIlwiKTtcbiAgICB9XG4gICAgdmlkZW9fYnV0dG9uLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSl7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBzd2l0Y2ggKHZpZGVvX2VtYmVkLmhhc0NsYXNzKHZpZGVvX2VtYmVkX19sb2FkZWRfY2xhc3MpKSB7XG4gICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgdmlkZW9fc3RhcnQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICB2aWRlb19zdG9wKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmlkZW9fZW1iZWQub24oXCJmbG9WaWRlb0VtYmVkU3RvcFwiLCBmdW5jdGlvbigpIHtcbiAgICAgIHZpZGVvX3N0b3AoKTtcbiAgICB9KVxuXG5cblxuICB9KTtcbn0pO1xuIiwiJChkb2N1bWVudCkuaW1hZ2VzTG9hZGVkKGZ1bmN0aW9uKCl7XG4gICAgJCgnLmZsby1jYXJkLWJfX3JvdycpLm1hc29ucnkoe1xuICAgICAgICAvLyBvcHRpb25zXG4gICAgICAgIGl0ZW1TZWxlY3RvcjogJy5mbG8tY2FyZC1iX19pdGVtJ1xuICAgIH0pO1xufSk7XG5cbiIsIiQoZG9jdW1lbnQpLmltYWdlc0xvYWRlZChmdW5jdGlvbigpe1xuICAgICQoJy5mbG8tY2FyZC1jLWxpc3QnKS5tYXNvbnJ5KHtcbiAgICAgICAgLy8gb3B0aW9uc1xuICAgICAgICBpdGVtU2VsZWN0b3I6ICcuZmxvLWNhcmQtYy1saXN0X19jb2x1bW4nXG4gICAgfSk7XG59KTtcbiIsIndpbmRvdy5mbG9fYmxvY2tfZmFxID0gZnVuY3Rpb24oZWwpe1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRlbCA9ICQoZWwpO1xuICB2YXIgYiA9IFwiZmxvLWJsb2NrLWZhcVwiO1xuICB2YXIgZG90YiA9IFwiLlwiICsgYjtcbiAgdmFyIHBhcmVudCA9ICRlbC5wYXJlbnRzKFwiLmZsby1ibG9ja1wiKTtcblxuICAkZWwuZmluZChkb3RiICsgXCJfX3Fhcy1zbGlkZXNcIilcblxuICAgIC5vbihcImluaXRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fcWFzLWNvbnRyb2xzLWNvdW50ZXItY291bnRcIikudGV4dChcbiAgICAgICAgJGVsLmZpbmQoZG90YiArIFwiX19xYXMtc2xpZGVzIC5zbGljay1zbGlkZTpub3QoLnNsaWNrLWNsb25lZClcIikubGVuZ3RoXG4gICAgICApO1xuICAgIH0pXG5cbiAgICAub24oXCJpbml0IGFmdGVyQ2hhbmdlXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAkZWwuZmluZChkb3RiICsgXCJfX3Fhcy1jb250cm9scy1jb3VudGVyLWluZGV4XCIpLmNoYW5nZVRleHRVSShcbiAgICAgICAgcGFyc2VJbnQoJGVsLmZpbmQoZG90YiArIFwiX19xYXMtc2xpZGVzIC5zbGljay1jdXJyZW50XCIpLmF0dHIoXCJkYXRhLXNsaWNrLWluZGV4XCIpKSArIDEsXG4gICAgICAgIFwiY291bnRlclwiXG4gICAgICApO1xuICAgIH0pXG5cbiAgICAuc2xpY2soe1xuICAgICAgcHJldkFycm93OiAkZWwuZmluZChkb3RiICsgXCJfX3Fhcy1jb250cm9scy1hcnJvdy0tcHJldmlvdXNcIiksXG4gICAgICBuZXh0QXJyb3c6ICRlbC5maW5kKGRvdGIgKyBcIl9fcWFzLWNvbnRyb2xzLWFycm93LS1uZXh0XCIpLFxuICAgICAgZmFkZTogdHJ1ZSxcbiAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXG4gICAgfSlcbiAgO1xufVxuIiwid2luZG93LmZsb19ibG9ja19mZWF0dXJlZF9saW5rc18xID0gZnVuY3Rpb24oZWwpe1xuICBcInVzZSBzdHJpY3RcIjtcbiAgdmFyICRlbCA9ICQoZWwpO1xuICB2YXIgYiA9IFwiZmxvLWJsb2NrLWZlYXR1cmVkLWxpbmtzLTFcIjtcbiAgdmFyIGRvdGIgPSBcIi5cIiArIGI7XG4gIHZhciBwYXJlbnQgPSAkZWwucGFyZW50cyhcIi5mbG8tYmxvY2tcIik7XG5cbiAgJGVsLmZpbmQoZG90YiArIFwiX19saW5rc1wiKVxuICAgIC5vbihcImluaXRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fY291bnRlci1jb3VudFwiKS50ZXh0KFxuICAgICAgICAkZWwuZmluZChcIi5zbGljay1zbGlkZTpub3QoLnNsaWNrLWNsb25lZClcIikubGVuZ3RoXG4gICAgICApO1xuICAgIH0pXG4gICAgLm9uKFwiaW5pdCBhZnRlckNoYW5nZVwiLCBmdW5jdGlvbigpe1xuICAgICAgJGVsLmZpbmQoZG90YiArIFwiX19jb3VudGVyLWluZGV4XCIpLmNoYW5nZVRleHRVSShcbiAgICAgICAgcGFyc2VJbnQoJGVsLmZpbmQoXCIuc2xpY2stY3VycmVudFwiKS5hdHRyKFwiZGF0YS1zbGljay1pbmRleFwiKSkgKyAxLFxuICAgICAgICBcImNvdW50ZXJcIlxuICAgICAgKVxuICAgIH0pXG4gICAgLnNsaWNrKHtcbiAgICAgIGZhZGU6IHRydWUsXG4gICAgICBwcmV2QXJyb3c6ICRlbC5maW5kKGRvdGIgKyBcIl9fbmF2LWJhci1hcnJvdy0tcHJldmlvdXNcIiksXG4gICAgICBuZXh0QXJyb3c6ICRlbC5maW5kKGRvdGIgKyBcIl9fbmF2LWJhci1hcnJvdy0tbmV4dFwiKVxuICAgIH0pXG4gIDtcbn1cbiIsIndpbmRvdy5mbG9fYmxvY2tfZmVhdHVyZWRfbGlua3NfMiA9IGZ1bmN0aW9uKGVsKXtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG4gIHZhciAkZWwgPSAkKGVsKTtcbiAgdmFyIGIgPSBcImZsby1ibG9jay1mZWF0dXJlZC1saW5rcy0yXCI7XG4gIHZhciBkb3RiID0gXCIuXCIgKyBiO1xuICB2YXIgcGFyZW50ID0gJGVsLnBhcmVudHMoXCIuZmxvLWJsb2NrXCIpO1xuXG4gIHZhciBjbGFzc19ob3ZlcmVkID0gYiArIFwiX19saW5rLS1ob3ZlcmVkXCI7XG5cbiAgZnVuY3Rpb24gZG9faG92ZXIoaW5kZXgpICB7XG4gICAgaWYgKCFpbmRleCkge1xuICAgICAgaW5kZXggPSAxO1xuICAgIH1cbiAgICB2YXIgaG92ZXJlZF9lbGVtZW50ID0gJGVsLmZpbmQoZG90YiArIFwiX19saW5rW2RhdGEtbGluay1pbmRleD1cIisgaW5kZXggK1wiXVwiKSAgO1xuXG5cbiAgICBpZiAoIWhvdmVyZWRfZWxlbWVudC5oYXNDbGFzcyhjbGFzc19ob3ZlcmVkKSkge1xuICAgICAgJChkb3RiICsgXCJfX2xpbmtcIikucmVtb3ZlQ2xhc3MoY2xhc3NfaG92ZXJlZCk7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIGhvdmVyZWRfZWxlbWVudC5hZGRDbGFzcyhjbGFzc19ob3ZlcmVkKTtcbiAgICAgICAgJGVsLmZpbmQoZG90YiArIFwiX19pbWFnZVwiKS5jc3MoXG4gICAgICAgICAgXCJiYWNrZ3JvdW5kLWltYWdlXCIsXG4gICAgICAgICAgXCJ1cmwoXCIrXG4gICAgICAgICAgICBob3ZlcmVkX2VsZW1lbnQuYXR0cihcImRhdGEtbGluay1pbWFnZVwiKVxuICAgICAgICAgICtcIilcIlxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgJGVsLmZpbmQoZG90YiArIFwiX19jb3VudGVyLWluZGV4XCIpLmNoYW5nZVRleHRVSShcbiAgICAgIGluZGV4LFxuICAgICAgXCJjb3VudGVyXCJcbiAgICApO1xuXG4gIH1cblxuICAvLyBPbiBSZWFkeSAtPiBTZXQgZmlyc3QgZWxlbWVudCBhcyBodm9lcmVkO1xuICBkb19ob3ZlcigpO1xuXG4gIC8qIFNUQVJUOiBMSU5LIEhPVkVSICovXG4gICAgJGVsLmZpbmQoZG90YiArIFwiX19saW5rXCIpLmhvdmVyKGZ1bmN0aW9uKCl7XG4gICAgICBkb19ob3ZlcihcbiAgICAgICAgJCh0aGlzKS5hdHRyKFwiZGF0YS1saW5rLWluZGV4XCIpXG4gICAgICApO1xuICAgIH0pXG4gIC8qIEVORDogTElOSyBIT1ZFUiAqL1xuXG4gIC8qIFNUQVJUOiBDT1VOVEVSICovXG4gICAgJGVsLmZpbmQoZG90YiArIFwiX19uZXh0LWJ1dHRvblwiKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgdmFyIGhvdmVyZWRfZWxlbWVudCA9ICRlbC5maW5kKFwiLlwiICsgY2xhc3NfaG92ZXJlZCk7XG5cbiAgICAgIGlmIChob3ZlcmVkX2VsZW1lbnQubmV4dCgpLmxlbmd0aCkge1xuICAgICAgICBkb19ob3ZlcihcbiAgICAgICAgICBob3ZlcmVkX2VsZW1lbnQubmV4dCgpLmF0dHIoXCJkYXRhLWxpbmstaW5kZXhcIilcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvX2hvdmVyKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIC8qIEVORDogQ09VTlRFUiAqL1xuXG4gIC8qIFNUQVJUOiBDT1VOVEVSICovXG4gICAgJGVsLmZpbmQoZG90YiArIFwiX19jb3VudGVyLWNvdW50XCIpLnRleHQoXG4gICAgICAkZWwuZmluZChkb3RiICsgXCJfX2xpbmtcIikubGVuZ3RoXG4gICAgKTtcbiAgLyogRU5EOiBDT1VOVEVSICovXG59XG4iLCJ3aW5kb3cuZmxvX2Jsb2NrX2ZlYXR1cmVkX2xpbmtzXzMgPSBmdW5jdGlvbihlbCl7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgJGVsID0gJChlbCk7XG4gIHZhciBiID0gXCJmbG8tYmxvY2stZmVhdHVyZWQtbGlua3MtM1wiO1xuICB2YXIgZG90YiA9IFwiLlwiICsgYjtcbiAgdmFyIGltYWdlID0gJGVsLmZpbmQoZG90YiArIFwiX19jb250ZW50LXdyYXBcIik7XG4gIGlmICgkKCB3aW5kb3cgKS53aWR0aCgpID49IDc2OCkge1xuICAgIC8qIFNUQVJUOiBMSU5LIEhPVkVSICovXG4gICAgICB2YXIgbGlua3MgPSAkZWwuZmluZChkb3RiICsgXCJfX2xpbmtcIik7XG4gICAgICBsaW5rcy5vbihcIm1vdXNlZW50ZXJcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgbGluayA9ICQodGhpcyk7XG5cbiAgICAgICAgLyogR2V0IHRoZSBkYXRhIGZvciB0aGlzIGhvdmVyZWQgZWxlbWVudCAqL1xuICAgICAgICB2YXIgaW1hZ2VfdXJsID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1pbWFnZVwiKTtcbiAgICAgICAgdmFyIGxpbmtfdGV4dCA9ICQodGhpcykuYXR0cihcImRhdGEtdGV4dFwiKTtcbiAgICAgICAgdmFyIGVsZW1lbnRzX2NvbG9yID0gJCh0aGlzKS5hdHRyKFwiZGF0YS1lbGVtZW50cy1jb2xvclwiKTtcbiAgICAgICAgdmFyIGVsZW1lbnRzX2JhY2tncm91bmRfY29sb3IgPSAkKHRoaXMpLmF0dHIoXCJkYXRhLWJhY2tncm91bmQtb3ZlcmxheS1jb2xvclwiKTtcbiAgICAgICAgdmFyIGVsZW1lbnRzX2JhY2tncm91bmRfb3BhY2l0eSA9ICQodGhpcykuYXR0cihcImRhdGEtYmFja2dyb3VuZC1vdmVybGF5LW9wYWNpdHlcIikgLyAxMDA7XG5cbiAgICAgICAgLyogT24gaG92ZXIgY2hhbmdlIGJhY2tncm91bmQgaW1hZ2UgKi9cbiAgICAgICAgaW1hZ2UuYXR0cihcInN0eWxlXCIsIGltYWdlX3VybCk7XG5cbiAgICAgICAgLyogT24gaG92ZXIgY2hhbmdlIGNvbG9yIG9mIHRoZSB0aXRsZSAqL1xuICAgICAgICAkZWwuZmluZChkb3RiICsgXCJfX2xpbmstdGl0bGVcIikuY3NzKFwiY29sb3JcIiwgZWxlbWVudHNfY29sb3IpO1xuXG4gICAgICAgIC8qIE9uIGhvdmVyIGNoYW5nZSBjb2xvciBvZiB0aGUgdGV4dCBhbmQgdGhlIHRleHQgY29udGVudCBhdHRhY2hlZCB0byB0aGUgaG92ZXJlZCBlbGVtZW50ICovXG4gICAgICAgICRlbC5maW5kKGRvdGIgKyBcIl9fbGluay10ZXh0XCIpXG4gICAgICAgICAgLmNzcyhcImNvbG9yXCIsIGVsZW1lbnRzX2NvbG9yKVxuICAgICAgICAgIC5jaGFuZ2VUZXh0KGxpbmtfdGV4dClcbiAgICAgICAgO1xuXG4gICAgICAgIC8qIE9uIGhvdmVyIGNoYW5nZSB0aGUgb3ZlcmxheSBiYWNrZ3JvdW5kIGNvbG9yIGFuZCBvcGFjaXR5IGFtb3VudCAqL1xuICAgICAgICAkZWwuZmluZChkb3RiICsgXCJfX2JhY2tncm91bmQtb3ZlcmxheVwiKVxuICAgICAgICAgIC5jc3MoXCJiYWNrZ3JvdW5kLWNvbG9yXCIsZWxlbWVudHNfYmFja2dyb3VuZF9jb2xvcilcbiAgICAgICAgICAuY3NzKFwib3BhY2l0eVwiLGVsZW1lbnRzX2JhY2tncm91bmRfb3BhY2l0eSlcbiAgICAgICAgO1xuICAgICAgfSk7XG4gICAgLyogRU5EOiBMSU5LIEhPVkVSICovXG4gIH1cbn1cbiIsIndpbmRvdy5mbG9fYmxvY2tfdGVzdGltb25pYWxzXzIgPSBmdW5jdGlvbihlbCl7XG4gIFwidXNlIHN0cmljdFwiO1xuICB2YXIgJGVsID0gJChlbCk7XG4gIHZhciBiID0gXCJmbG8tYmxvY2stdGVzdGltb25pYWxzLTJcIjtcbiAgdmFyIGRvdGIgPSBcIi5cIiArIGI7XG4gIHZhciBwYXJlbnQgPSAkZWwucGFyZW50cyhcIi5mbG8tYmxvY2tcIik7XG5cbiAgZnVuY3Rpb24gcGFkIChzdHIsIG1heCkge1xuICAgIHN0ciA9IHN0ci50b1N0cmluZygpO1xuICAgIHJldHVybiBzdHIubGVuZ3RoIDwgbWF4ID8gcGFkKFwiMFwiICsgc3RyLCBtYXgpIDogc3RyO1xuICB9XG5cbiAgJGVsLmZpbmQoZG90YiArIFwiX190ZXN0aW1vbmlhbHNcIilcbiAgICAub24oXCJpbml0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICAkZWwuZmluZChkb3RiICsgXCJfX2NvdW50ZXItY291bnRcIikudGV4dChcbiAgICAgICAgcGFkKCRlbC5maW5kKGRvdGIgKyBcIl9fdGVzdGltb25pYWw6bm90KC5zbGljay1jbG9uZWQpXCIpLmxlbmd0aCwgMilcbiAgICAgICk7XG4gICAgfSlcbiAgICAub24oXCJpbml0IGFmdGVyQ2hhbmdlXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAkZWwuZmluZChkb3RiICsgXCJfX2NvdW50ZXItaW5kZXhcIikuY2hhbmdlVGV4dFVJKFxuICAgICAgICBwYWQoIHBhcnNlSW50KCRlbC5maW5kKFwiLnNsaWNrLWN1cnJlbnRcIikuYXR0cihcImRhdGEtc2xpY2staW5kZXhcIikpICsgMSwgMiksXG4gICAgICAgIFwiY291bnRlclwiXG4gICAgICApO1xuXG4gICAgICAkZWwuZmluZChkb3RiICsgXCJfX2JvdHRvbS1sYWJlbFwiKVxuICAgICAgICAuY2hhbmdlVGV4dFVJKFxuICAgICAgICAgICRlbC5maW5kKFwiLnNsaWNrLWN1cnJlbnRcIikuYXR0cihcImRhdGEtYm90dG9tLWxhYmVsLXRleHRcIilcbiAgICAgICAgKVxuICAgICAgICAuYXR0cihcbiAgICAgICAgICBcImhyZWZcIixcbiAgICAgICAgICAkZWwuZmluZChcIi5zbGljay1jdXJyZW50XCIpLmF0dHIoXCJkYXRhLWJvdHRvbS1sYWJlbC11cmxcIilcbiAgICAgICAgKVxuICAgICAgO1xuXG4gICAgICAkZWwuZmluZChkb3RiICsgXCJfX2JhY2tncm91bmRcIikuY3NzKFxuICAgICAgICBcImJhY2tncm91bmQtY29sb3JcIixcbiAgICAgICAgJGVsLmZpbmQoXCIuc2xpY2stY3VycmVudFwiKS5hdHRyKFwiZGF0YS1iYWNrZ3JvdW5kLWNvbG9yXCIpXG4gICAgICApO1xuXG4gICAgICAkZWwuZmluZChbXG4gICAgICAgIGRvdGIgKyBcIl9fY291bnRlclwiLFxuICAgICAgICBkb3RiICsgXCJfX2Fycm93XCJcbiAgICAgIF0uam9pbihcIiwgXCIpKS5jc3MoXG4gICAgICAgIFwiY29sb3JcIixcbiAgICAgICAgJGVsLmZpbmQoXCIuc2xpY2stY3VycmVudFwiKS5hdHRyKFwiZGF0YS1lbGVtZW50cy1jb2xvclwiKVxuICAgICAgKTtcblxuICAgICAgJGVsLmZpbmQoZG90YiArIFwiX190ZXN0aW1vbmlhbC1kZWNvcmF0aXZlLWxpbmVcIikuY3NzKFxuICAgICAgICBcImJhY2tncm91bmQtY29sb3JcIixcbiAgICAgICAgJGVsLmZpbmQoXCIuc2xpY2stY3VycmVudFwiKS5hdHRyKFwiZGF0YS1lbGVtZW50cy1jb2xvclwiKVxuICAgICAgKTtcbiAgICB9KVxuICAgIC5zbGljayh7XG4gICAgICBmYWRlOiB0cnVlLFxuICAgICAgcHJldkFycm93OiAkZWwuZmluZChkb3RiICsgXCJfX2Fycm93LS1wcmV2XCIpLFxuICAgICAgbmV4dEFycm93OiAkZWwuZmluZChkb3RiICsgXCJfX2Fycm93LS1uZXh0XCIpLFxuICAgICAgcmVzcG9uc2l2ZTogW3tcbiAgICAgICAgYnJlYWtwb2ludDogNzY3LFxuICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH1dXG4gICAgfSlcbiAgO1xufVxuIiwiJChmdW5jdGlvbigpe1xyXG5cclxuICAgIC8vIFN0YXJ0OiBTY3JvbGwgVXAgQnV0dG9uXHJcbiAgICAvLyBTY3JvbGwgdG8gdG9wXHJcbiAgICAkKCcuZmxvLWZvb3Rlcl9fc2Nyb2xsLXRvLXRvcC10aXRsZSwubGlzdGluZy1wYWdpbmF0aW9uLXR5cGUtY19fYmFjay10by10b3AsLmxpc3RpbmctcGFnaW5hdGlvbi10eXBlLWVfX2JhY2stdG8tdG9wJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoeyBzY3JvbGxUb3A6IDB9LCA4MDApO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgJCgnLmZsby1mb290ZXItdHlwZS1hX19uZXdzbGV0dGVyLWJ0bicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyAkKCdib2R5JykuZmluZChcIi5mbG8tZm9vdGVyLXR5cGUtYV9fZm9ybVwiKS50b2dnbGVDbGFzcyhcImZsby1mb290ZXItdHlwZS1hX19mb3JtLS1hY3RpdmVcIik7XHJcbiAgICAgICAgJCgnYm9keScpLmZpbmQoXCIuZmxvLWZvb3Rlci10eXBlLWFfX2Zvcm1cIikuc2xpZGVUb2dnbGUoXCJmbG8tZm9vdGVyLXR5cGUtYV9fZm9ybS0tYWN0aXZlXCIpO1xyXG4gICAgICAgICQoJ2JvZHksaHRtbCcpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6ICQoXCIuZmxvLWZvb3Rlci10eXBlLWFfX2Zvcm1cIikub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgfSwgODAwKTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgICQoJy5mbG8tZm9vdGVyLXR5cGUtYV9fZm9ybS1jbG9zZScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkKCdib2R5JykuZmluZChcIi5mbG8tZm9vdGVyLXR5cGUtYV9fZm9ybVwiKS5zbGlkZVRvZ2dsZShcImZsby1mb290ZXItdHlwZS1hX19mb3JtLS1hY3RpdmVcIik7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICAvLyBFbmQ6IFNjcm9sbCBVcCBCdXR0b25cclxuXHJcbiAgICAvLyBTdGFydDogQWRkIEluc3RhZ3JhbSBBY3RpdmUgQ2xhc3NcclxuICAgICAgaWYgKCQoXCIuZmxvLWZvb3RlciAuZmxvLXNoY29kZS1pbnN0Z20tY29udGFpbmVyXCIpLmxlbmd0aCkge1xyXG4gICAgICAgICQoXCIuZmxvLWZvb3RlclwiKS5hZGRDbGFzcyhcImZsby1mb290ZXItLWluc3RhZ3JhbS1wbHVnaW4tYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICAvLyBFbmQ6IEFkZCBJbnN0YWdyYW0gQWN0aXZlIENsYXNzXHJcblxyXG59KTtcclxuIiwiJChmdW5jdGlvbigpe1xuXG4gIC8qIFNUQVJUOiBTRVQgU0xJREVSIFBPU0lUSU9OIEFDQ09SRElORyBUTyBDTElDS0VEIFRIVU1CTkFJTCAqL1xuICAgICQoXCIuZmxvLWdhbGxlcnktdHlwZS1jX19jb2x1bW4gaW1nXCIpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgaW5kZXggPSAkKHRoaXMpLnBhcmVudCgpLmRhdGEoXCJpbWctaW5kZXhcIik7XG4gICAgICAkKFwiLmZsby1nYWxsZXJ5LXBvcHVwXCIpLmZvdW5kYXRpb24oXCJvcGVuXCIpO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAkKFwiLmZsby1nYWxsZXJ5LXBvcHVwIC5mbG8taGVyby01X19zbGlkZXNcIikuc2xpY2soXCJzbGlja0dvVG9cIiwgaW5kZXgpO1xuICAgICAgICAkKFwiLmZsby1nYWxsZXJ5LXBvcHVwIC5mbG8taGVyby01X19zbGlkZXNcIikuZmluZCgnLnNsaWNrLWxpc3QnKS5hdHRyKCd0YWJpbmRleCcsIGluZGV4KS5mb2N1cygpO1xuICAgICAgfSwgNDAwKTtcbiAgICB9KTtcbiAgLyogRU5EOiBTRVQgU0xJREVSIFBPU0lUSU9OIEFDQ09SRElORyBUTyBDTElDS0VEIFRIVU1CTkFJTCAqL1xuXG4gIC8qIFNUQVJUOiBTVE9QIFZJREVPIEVNQkVEIE9OIENMT1NFIEJVVFRPTiBDTElDSyAqL1xuICAgICQoXCIuZmxvLWdhbGxlcnktcG9wdXBfX2Nsb3NlXCIpLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICQoXCIuZmxvLWhlcm8tNSAuZmxvLXZpZGVvLWVtYmVkXCIpLnRyaWdnZXIoXCJmbG9WaWRlb0VtYmVkU3RvcFwiKTtcbiAgICB9KTtcbiAgLyogRU5EOiBTVE9QIFZJREVPIEVNQkVEIE9OIENMT1NFIEJVVFRPTiBDTElDSyAqL1xufSk7XG4iLCJmdW5jdGlvbiBnYWxsZXJ5X2NfbWFzb25yeSgpe1xuICB2YXIgYiA9IFwiZmxvLWdhbGxlcnktdHlwZS1jXCI7XG4gIHZhciBkb3RiID0gXCIuXCIgKyBiO1xuICB2YXIgcm93ID0gJChkb3RiKS5maW5kKGRvdGIgKyBcIl9fcm93XCIpO1xuICB2YXIgZWxzID0gZG90YiArIFwiX19jb2x1bW5cIjtcbiAgdmFyIGltZ19lbCA9ICQoZG90YikuZmluZChkb3RiICsgXCJfX2ltYWdlXCIpO1xuICBcbiAgLyogU1RBUlQ6IEluaXRpYWxpemUgTUFTT05SWSAqL1xuICAgIGZ1bmN0aW9uIGRvX21hc29ucnkoKSB7XG4gICAgICByb3cubWFzb25yeSh7XG4gICAgICAgICAgaXRlbVNlbGVjdG9yOiBkb3RiICsgXCJfX2NvbHVtblwiXG4gICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgZG9fbWFzb25yeSgpO1xuICAvKiBFTkQ6IEluaXRpYWxpemUgTUFTT05SWSAqL1xuICBcbiAgLyogU1RBUlQ6IHZpZXdwb3J0Q2hlY2tlcjsgTGF6eSBMb2FkaW5nICovXG4gICAgJChlbHMpLnZpZXdwb3J0Q2hlY2tlcih7XG4gICAgICBjbGFzc1RvQWRkOiBcInZpc2libGVcIixcbiAgICAgIGNsYXNzVG9SZW1vdmU6IFwidG8tYXBwZWFyIGxhenlcIixcbiAgICAgIG9mZnNldDogNTAsXG4gICAgICBjYWxsYmFja0Z1bmN0aW9uOiBmdW5jdGlvbihlbGVtLCBhY3Rpb24pe1xuICAgICAgICBpZiAoYWN0aW9uID09IFwiYWRkXCIgfHwgIWVsZW1bMF0uaGFzQXR0cmlidXRlKFwic3JjXCIpKSB7XG4gICAgICAgICAgdmFyIGVsZW1faW1nID0gZWxlbS5maW5kKFwiaW1nXCIpO1xuICAgICAgICAgIGVsZW1faW1nLmF0dHIoXCJzcmNcIiwgZWxlbV9pbWcuYXR0cihcImRhdGEtc3JjXCIpKTtcbiAgICAgICAgICBlbGVtX2ltZy5pbWFnZXNMb2FkZWQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgZG9fbWFzb25yeSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuICB9KTtcbiAgLyogRU5EOiB2aWV3cG9ydENoZWNrZXI7IExhenkgTG9hZGluZyAqL1xufVxuXG5nYWxsZXJ5X2NfbWFzb25yeSgpO1xuXG4kKHdpbmRvdykub24oJ3Jlc2l6ZScsIGdhbGxlcnlfY19tYXNvbnJ5KCkpOyIsIiQoZnVuY3Rpb24oKXtcblxuICB2YXIgZmxvX2hlYWRlcl9fY2xhc3MgPSBcImZsby1oZWFkZXJcIjtcbiAgdmFyICRmbG9faGVhZGVyID0gJChcIi5cIiArIGZsb19oZWFkZXJfX2NsYXNzKTtcblxuICAvKiBTdGFydDogU3RpY2t5IEhlYWRlciAqL1xuICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSA3NjgpICQoXCJoZWFkZXIuZmxvLWhlYWRlci0tc3RpY2t5IC5mbG8taGVhZGVyXCIpLnN0aWNreSh7XG4gICAgICB6SW5kZXg6IDhcbiAgICB9KTtcbiAgLyogRW5kOiBTdGlja3kgSGVhZGVyKi9cblxuICAvKiBTdGFydDogRHJvcGRvd24gKi9cbiAgICB2YXIgZHJvcGRvd25fZWxlbWVudHMgPSBuZXcgRm91bmRhdGlvbi5Ecm9wZG93bk1lbnUoXG4gICAgICAkKFwiLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4gdWxcIilcbiAgICApXG4gIC8qIEVuZDogRHJvcGRvd24gKi9cblxuICAvKiBTdGFydDogTG9nbyBDZW50ZXIgLSBzcGxpdCBtZW51IGluIGhhbGYgKi9cbiAgICBpZiAoJChcIi5mbG8taGVhZGVyLS1tZW51LWNlbnRlclwiKS5sZW5ndGgpe1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICRtZW51X2Rvbm9yID0gJChcIi5mbG8taGVhZGVyX19tZW51LWRvbm9yXCIpLFxuICAgICAgICAgICRtZW51X2Rvbm9yX3VsID0gJG1lbnVfZG9ub3IuZmluZChcIj4gZGl2ID4gdWxcIiksXG4gICAgICAgICAgJG1lbnVfZG9ub3JfZmlyc3RfbGV2ZWwgPSAkbWVudV9kb25vcl91bC5jaGlsZHJlbihcImxpXCIpLFxuICAgICAgICAgICRtZW51X2xlZnQsICRtZW51X3JpZ2h0O1xuICAgICAgICAgIFxuICAgICAgICBpZiAoJCgnLmZsby1oZWFkZXItLW1lbnUtY2VudGVyJykuaGFzQ2xhc3MoJ2Zsby1oZWFkZXJfX3R5cGUtZScpKSB7XG4gICAgICAgICAgJG1lbnVfbGVmdCA9ICQoXCIuZmxvLWhlYWRlcl9fbWVudS0tbGVmdCAubWVudVwiKTtcbiAgICAgICAgICAkbWVudV9yaWdodCA9ICQoXCIuZmxvLWhlYWRlcl9fbWVudS0tcmlnaHQgLm1lbnVcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJG1lbnVfbGVmdCA9ICQoXCIuZmxvLWhlYWRlcl9fbWVudS0tbGVmdCA+IHVsXCIpO1xuICAgICAgICAgICRtZW51X3JpZ2h0ID0gJChcIi5mbG8taGVhZGVyX19tZW51LS1yaWdodCA+IHVsXCIpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAkbWVudV9kb25vcl9maXJzdF9sZXZlbC5lYWNoKGZ1bmN0aW9uKGluZGV4KXtcbiAgICAgICAgICB2YXJcbiAgICAgICAgICAgICRpdGVtID0gJCh0aGlzKSxcbiAgICAgICAgICAgIGxlbmd0aCA9ICRtZW51X2Rvbm9yX2ZpcnN0X2xldmVsLmxlbmd0aFxuICAgICAgICAgIDtcbiAgICAgICAgICBpZiAoaW5kZXggPCBsZW5ndGggLyAyKSB7XG4gICAgICAgICAgICAkbWVudV9sZWZ0LmFwcGVuZCgkaXRlbSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkbWVudV9sZWZ0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGluZGV4ID49IGxlbmd0aCAvIDIpIHtcbiAgICAgICAgICAgICRtZW51X3JpZ2h0LmFwcGVuZCgkaXRlbSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpbmRleCA9PSBsZW5ndGgtMSkge1xuICAgICAgICAgICAgJG1lbnVfZG9ub3IucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0sIDEwKTtcbiAgICB9XG4gIC8qIEVuZDogTG9nbyBDZW50ZXIgLSBzcGxpdCBtZW51IGluIGhhbGYgKi9cblxuICAvKiBTdGFydDogU2VhcmNoICovXG4gICAgdmFyICRzZWFyY2ggPSAkZmxvX2hlYWRlci5maW5kKFwiLmZsby1oZWFkZXJfX3NlYXJjaFwiKTtcbiAgICB2YXIgJHNlYXJjaF9fd3JhcCA9ICRzZWFyY2guZmluZChcIi5mbG8taGVhZGVyX19zZWFyY2gtd3JhcFwiKTtcbiAgICB2YXIgJHNlYXJjaF9faW5wdXQgPSAkc2VhcmNoLmZpbmQoXCIuZmxvLWhlYWRlcl9fc2VhcmNoLWlucHV0XCIpO1xuXG4gICAgdmFyIHNlYXJjaF9fY2xhc3NfZXhwYW5kZWQgPSBcImZsby1oZWFkZXItLXNlYXJjaC1leHBhbmRlZFwiO1xuXG4gICAgLy8gU3RhcnQ6IFJldHVybiBIZWFkZXJzIHdpdGggU3BlY2lmaWMgU2VhcmNoIFN0YXRlcyAoYWN0aXZlIG9yIGluYWN0aXZlKVxuICAgICAgdmFyICRoZWFkZXJfd2l0aF9zZWFyY2hfX2FjdGl2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJChcIi5cIiArIGZsb19oZWFkZXJfX2NsYXNzICsgXCIuXCIgKyBzZWFyY2hfX2NsYXNzX2V4cGFuZGVkKTtcbiAgICAgIH1cbiAgICAgIHZhciAkaGVhZGVyX3dpdGhfc2VhcmNoX19pbmFjdGl2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJChcIi5cIiArIGZsb19oZWFkZXJfX2NsYXNzICsgXCI6bm90KC5cIiArIHNlYXJjaF9fY2xhc3NfZXhwYW5kZWQgKyBcIilcIik7XG4gICAgICB9XG4gICAgLy8gRW5kOiBSZXR1cm4gSGVhZGVycyB3aXRoIFNwZWNpZmljIFNlYXJjaCBTdGF0ZXMgKGFjdGl2ZSBvciBpbmFjdGl2ZSlcblxuICAgIC8vIFN0YXJ0OiBGdW5jdGlvbnMgdG8gTW9kaWZ5IFNlYXJjaCBTdGF0ZXNcbiAgICAgIHZhciB0b2dnbGVUaW1lb3V0ID0gZmFsc2U7XG4gICAgICB2YXIgc2VhcmNoX190b2dnbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRvZ2dsZVRpbWVvdXQgPT0gZmFsc2UpIHtcblxuICAgICAgICAgIHRvZ2dsZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodG9nZ2xlVGltZW91dCk7XG4gICAgICAgICAgICB0b2dnbGVUaW1lb3V0ID0gZmFsc2U7XG4gICAgICAgICAgfSwgNTAwKTtcblxuICAgICAgICAgICRmbG9faGVhZGVyLnRvZ2dsZUNsYXNzKHNlYXJjaF9fY2xhc3NfZXhwYW5kZWQpO1xuXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBzZWFyY2hfX29wZW4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgJGZsb19oZWFkZXIuYWRkQ2xhc3Moc2VhcmNoX19jbGFzc19leHBhbmRlZCk7XG4gICAgICB9XG4gICAgICB2YXIgc2VhcmNoX19jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkZmxvX2hlYWRlci5yZW1vdmVDbGFzcyhzZWFyY2hfX2NsYXNzX2V4cGFuZGVkKTtcbiAgICAgIH1cbiAgICAgIHZhciBzZWFyY2hfX2ZvY3VzID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICRoZWFkZXJfd2l0aF9zZWFyY2hfX2FjdGl2ZSgpLmZpbmQoXCIuZmxvLWhlYWRlcl9fc2VhcmNoLWlucHV0XCIpLmZvY3VzKCk7XG4gICAgICB9XG4gICAgLy8gRW5kOiBGdW5jdGlvbnMgdG8gTW9kaWZ5IFNlYXJjaCBTdGF0ZXNcblxuICAgIC8vIFN0YXJ0OiBUb2dnbGUgU2VhcmNoIG9uIFRyaWdnZXIgQ2xpY2tcbiAgICAgICQoXCIuZmxvLWhlYWRlcl9fc2VhcmNoLXRyaWdnZXJcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuICAgICAgICBzZWFyY2hfX3RvZ2dsZSgpO1xuICAgICAgICBzZWFyY2hfX2ZvY3VzKCk7XG4gICAgICB9KTtcbiAgICAvLyBFbmQ6IFRvZ2dsZSBTZWFyY2ggb24gVHJpZ2dlciBDbGlja1xuXG4gICAgLy8gU3RhcnQ6IENsb3NlIFNlYXJjaCBvbiBGb2N1cyBPdXRcbiAgICAgICRzZWFyY2hfX2lucHV0Lm9uKFwiZm9jdXNvdXRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgc2VhcmNoX190b2dnbGUoKTtcbiAgICAgIH0pO1xuICAgIC8vIEVuZDogQ2xvc2UgU2VhcmNoIG9uIEZvY3VzIE91dFxuXG4gIC8qIEVuZDogU2VhcmNoICovXG5cblxuICAvL01lbnUgVHJpZ2dlclxuICB2YXIgc3RpY2t5X3VwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICgkKFwiaGVhZGVyLmZsby1oZWFkZXItLXN0aWNreSAuZmxvLWhlYWRlclwiKS5sZW5ndGgpIHtcbiAgICAgICQoXCJoZWFkZXIuZmxvLWhlYWRlci0tc3RpY2t5IC5mbG8taGVhZGVyXCIpLnN0aWNreShcInVwZGF0ZVwiKTtcbiAgICB9XG4gIH1cblxuICAkKCcuZmxvLWhlYWRlcl9fbWVudS10cmlnZ2VyJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdmbG8taGVhZGVyX19tZW51LXRyaWdnZXItLWFjdGl2ZScpO1xuICAgICQoJ2JvZHknKS5maW5kKCcuZmxvLWhlYWRlcl9fbWVudS1jb250YWluZXInKVxuICAgICAgLnNsaWRlVG9nZ2xlKHtcbiAgICAgICAgc3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHN0aWNreV91cGRhdGUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHN0aWNreV91cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC8vIC50b2dnbGVDbGFzcygnZmxvLWhlYWRlcl9fbWVudS1jb250YWluZXItLWFjdGl2ZScpXG4gICAgO1xuICB9KTtcblxufSk7XG4iLCIkKGZ1bmN0aW9uKCl7XG4gIC8vIFN0YXJ0OiBBZGQgTWFpbiBDbGFzc1xuICAgICQoXCIuZmxvLWhlYWRlci1tb2JpbGVcIikuZmlyc3QoKS5hZGRDbGFzcyhcImlzLW1haW5cIik7XG4gIC8vIEVuZDogQWRkIE1haW4gQ2xhc3NcblxuICAvLyBTdGFydDogU3RpY2t5XG4gICAgJChcIi5mbG8taGVhZGVyLW1vYmlsZVwiKS5maXJzdCgpLmFkZENsYXNzKFwibm90LXN0aWNreVwiKTtcbiAgICAkKFwiLmZsby1oZWFkZXItbW9iaWxlLnN0aWNreVwiKS5maXJzdCgpXG4gICAgICAub24oXCJzdGlja3ktZW5kXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykuYWRkQ2xhc3MoXCJub3Qtc3RpY2t5XCIpO1xuICAgICAgfSlcbiAgICAgIC5vbihcInN0aWNreS1zdGFydFwiLCBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwibm90LXN0aWNreVwiKTtcbiAgICAgIH0pXG4gICAgICAuc3RpY2t5KHtcbiAgICAgICAgekluZGV4OiAxMDAwLFxuICAgICAgICBjbGFzc05hbWU6IFwiaXMtc3RpY2t5XCIsXG4gICAgICAgIHdyYXBwZXJDbGFzc05hbWU6IFwiZmxvLWhlYWRlci1tb2JpbGUtc3RpY2t5LXdyYXBwZXJcIlxuICAgICAgfSlcbiAgICA7XG4gIC8vIEVuZDogU3RpY2t5XG5cbiAgLy8gU3RhcnQ6IERpc3BsYXkgTW9iaWxlIFN1Ym1lbnVcbiAgICAkKCcuZmxvLW1vYmlsZS1tZW51X19pdGVtJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgJCh0aGlzKS5maW5kKCcuZmxvLW1vYmlsZS1tZW51X19zdWJtZW51Jykuc2xpZGVUb2dnbGUoNDAwKTtcbiAgICB9KTtcbiAgLy8gRW5kOiBEaXNwbGF5IE1vYmlsZSBTdWJtZW51XG5cbiAgLy8gU3RhcnQ6IERpc3BsYXkgTW9iaWxlIE1lbnVcbiAgICAkKCcuZmxvLWhlYWRlci1tb2JpbGVfX21lbnUtdHJpZ2dlcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vICQoJ2JvZHksIGh0bWwnKS5maW5kKCcuZmxvLW1vYmlsZS1tZW51JykudG9nZ2xlQ2xhc3MoJ2Zsby1tb2JpbGUtbWVudS0tZGlzcGxheScpO1xuICAgICAgJCgnYm9keSwgaHRtbCcpLnRvZ2dsZUNsYXNzKCdib2R5LS1mbG8taGVhZGVyLW1vYmlsZS1tZW51LXRyaWdnZXItYWN0aXZlJyk7XG4gICAgfSk7XG4gIC8vIEVuZDogRGlzcGxheSBNb2JpbGUgTWVudVxuXG4gIC8vIFN0YXJ0OiBEaXNwbGF5IFNlYXJjaFxuICAgICQoXCIuZmxvLWhlYWRlci1tb2JpbGVfX3NlYXJjaC1idXR0b24tMVwiKS5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAkKHRoaXMpLnBhcmVudHMoXCIuZmxvLWhlYWRlci1tb2JpbGVcIikudG9nZ2xlQ2xhc3MoXCJmbG8taGVhZGVyLW1vYmlsZS0tc2VhcmNoLWFjdGl2ZVwiKTtcbiAgICB9KTtcbiAgLy8gRW5kOiBEaXNwbGF5IFNlYXJjaFxuXG4gIC8qIFN0YXJ0OiBBZGRvbnMgQ2Fyb3VzZWwgKi9cbiAgICAkKFwiLmZsby1tb2JpbGUtbWVudV9fYWRkb25zXCIpLnNsaWNrKHtcbiAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgLy8gY2VudGVyTW9kZTogdHJ1ZSxcbiAgICAgIHNsaWRlc1RvU2hvdzogMyxcbiAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzLFxuICAgICAgbmV4dEFycm93OiBcIjxzcGFuIGNsYXNzPSdmbG8tbW9iaWxlLW1lbnVfX2FkZG9ucy1hcnJvdyBmbG8tbW9iaWxlLW1lbnVfX2FkZG9ucy1hcnJvdy0tbmV4dCc+PGkgY2xhc3M9J2Zsby1pY29uLWFycm93LWJvcmRlci1yaWdodCc+PC9pPjwvc3Bhbj5cIixcbiAgICAgIHByZXZBcnJvdzogXCI8c3BhbiBjbGFzcz0nZmxvLW1vYmlsZS1tZW51X19hZGRvbnMtYXJyb3cgZmxvLW1vYmlsZS1tZW51X19hZGRvbnMtYXJyb3ctLXByZXYnPjxpIGNsYXNzPSdmbG8taWNvbi1hcnJvdy1ib3JkZXItbGVmdCc+PC9pPjwvc3Bhbj5cIlxuICAgIH0pO1xuICAvKiBFbmQ6IEFkZG9ucyBDYXJvdXNlbCAqL1xuXG4gIC8qIFNUQVJUOiBUT0dHTEUgRFJPUERPV04gKi9cblxuICAgIC8qIFN0YXJ0OiBBZGQgZHJvcGRvd24gdG9nZ2xlcyB0byBldmVyeSBpdGVtIHdpdGggZHJvcGRvd24gKi9cbiAgICAgICQoXCIuZmxvLW1vYmlsZS1tZW51X19uYXYtLXN0eWxlLWNvbGxhcHNlZCA+IHVsID4gbGkubWVudS1pdGVtLWhhcy1jaGlsZHJlblwiKVxuICAgICAgICAuY2hpbGRyZW4oXCJhXCIpXG4gICAgICAgICAgLmFmdGVyKFwiPGRpdiBjbGFzcz0nZmxvLW1vYmlsZS1tZW51X19uYXYtZHJvcGRvd24tdG9nZ2xlJz48aSBjbGFzcz0nZmxvLWljb24tY3Jvc3MnPjwvaT48L2Rpdj5cIilcbiAgICAgIDtcblxuICAgICAgJChcIi5mbG8tbW9iaWxlLW1lbnVcIikub24oXCJjbGlja1wiLCBcIi5mbG8tbW9iaWxlLW1lbnVfX25hdi1kcm9wZG93bi10b2dnbGVcIiwgZnVuY3Rpb24oZSl7XG4gICAgICAgICQodGhpcykuc2libGluZ3MoXCIuc3ViLW1lbnVcIikuc2xpZGVUb2dnbGUoXCJzbG93XCIpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKFwiY2hpbGRyZW4tdmlzaWJsZVwiKTtcbiAgICAgIH0pO1xuICAgIC8qIEVuZDogQWRkIGRyb3Bkb3duIHRvZ2dsZXMgdG8gZXZlcnkgaXRlbSB3aXRoIGRyb3Bkb3duICovXG5cbiAgLyogRU5EOiBUT0dHTEUgRFJPUERPV04gKi9cblxufSk7XG4iLCIkKGZ1bmN0aW9uKCl7XG4gICQoXCIuZmxvLWhlcm8tM19fc2xpZGVzXCIpLmVhY2goZnVuY3Rpb24oKXtcbiAgICB2YXIgJHNsaWRlc2hvdyA9ICQodGhpcyk7XG5cbiAgICAkc2xpZGVzaG93XG4gICAgICAvLyAub24oXCJpbml0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICAvLyAgICQodGhpcykuZmluZCgnLnNsaWNrLWxpc3QnKS5hdHRyKCd0YWJpbmRleCcsIDApLmZvY3VzKCk7XG4gICAgICAvLyB9KVxuICAgICAgLm9uKCdiZWZvcmVDaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAkKHRoaXMpLmZpbmQoXCIuZmxvLXZpZGVvLWVtYmVkXCIpLnRyaWdnZXIoXCJmbG9WaWRlb0VtYmVkU3RvcFwiKTtcbiAgICAgIH0pXG4gICAgICAuc2xpY2soe1xuICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWUsXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICBmYWRlOiB0cnVlLFxuICAgICAgICBwcmV2QXJyb3c6ICQodGhpcykuc2libGluZ3MoKS5maW5kKCcuZmxvLWZlYXR1cmVkLXNsaWRlc2hvd19fcHJldicpLFxuICAgICAgICBuZXh0QXJyb3c6ICQodGhpcykuc2libGluZ3MoKS5maW5kKCcuZmxvLWZlYXR1cmVkLXNsaWRlc2hvd19fbmV4dCcpLFxuICAgICAgICBjc3NFYXNlOiBcImN1YmljLWJlemllcigwLjQ0NDUsIDAuMDUwLCAwLjU1MCwgMC45NTApXCIsXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBicmVha3BvaW50OiA3MzYsXG4gICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDEsXG4gICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgICAgIGNlbnRlclBhZGRpbmc6IDAsXG4gICAgICAgICAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgIH0pXG4gICAgO1xuXG4gIH0pO1xufSk7XG4iLCIkKGZ1bmN0aW9uKCl7XG5cbiAgICAkKFwiLmZsby1oZXJvLTRfX3NsaWRlc1wiKVxuICAgICAgLm9uKFwiaW5pdFwiLCBmdW5jdGlvbigpe1xuICAgICAgICAvLyAkKHRoaXMpLmZpbmQoJy5zbGljay1saXN0JykuYXR0cigndGFiaW5kZXgnLCAwKS5mb2N1cygpO1xuICAgICAgfSlcbiAgICAgIC5vbignYmVmb3JlQ2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgJCh0aGlzKS5maW5kKFwiLmZsby12aWRlby1lbWJlZFwiKS50cmlnZ2VyKFwiZmxvVmlkZW9FbWJlZFN0b3BcIik7XG4gICAgICB9KVxuICAgICAgLm9uKCdpbml0IHJlSW5pdCBhZnRlckNoYW5nZScsIGZ1bmN0aW9uIChldmVudCwgc2xpY2ssIGN1cnJlbnRTbGlkZSwgbmV4dFNsaWRlKSB7XG4gICAgICAgIHZhciBzbGlkZXNob3dfXyQgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgc2xpZGVzaG93X19saXN0ID0gc2xpZGVzaG93X18kLmZpbmQoXCIuc2xpY2stbGlzdFwiKTtcbiAgICAgICAgdmFyIHNsaWRlc2hvd19fYWN0aXZlX3NsaWRlID0gc2xpZGVzaG93X18kLmZpbmQoXCIuc2xpY2stY3VycmVudFwiKTtcbiAgICAgICAgdmFyIHNsaWRlc2hvd19fYWN0aXZlX3NsaWRlX2ltZyA9IHNsaWRlc2hvd19fYWN0aXZlX3NsaWRlLmZpbmQoXCJpbWdcIik7XG5cbiAgICAgICAgLyogU3RhcnQ6IFNldCBoZWlnaHQgb2Ygc2xpZGVyIGJ5IGltYWdlICovXG4gICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDwgNzY4KSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgc2xpZGVzaG93X19saXN0LmNzcyhcImhlaWdodFwiLCBzbGlkZXNob3dfX2FjdGl2ZV9zbGlkZV9pbWcuaGVpZ2h0KCkpO1xuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgIHNsaWRlc2hvd19fYWN0aXZlX3NsaWRlLmZpbmQoXCJpbWdcIikub24oXCJsb2FkXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIHNsaWRlc2hvd19fbGlzdC5jc3MoXCJoZWlnaHRcIiwgc2xpZGVzaG93X19hY3RpdmVfc2xpZGVfaW1nLmhlaWdodCgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgLyogRW5kOiBTZXQgaGVpZ2h0IG9mIHNsaWRlciBieSBpbWFnZSAqL1xuXG5cbiAgICAgICAgdmFyIGkgPSAoY3VycmVudFNsaWRlID8gY3VycmVudFNsaWRlIDogMCkgKyAxO1xuICAgICAgICAkKCcuZmxvLWdhbGxlcnktdHlwZS1hX19zbGlkZXNob3ctcGFnZXMnKS50ZXh0KGkgKyAnICBvZiAgJyArIHNsaWNrLnNsaWRlQ291bnQpO1xuICAgICAgfSlcbiAgICAgIC5mbG9fbHFpcChcInNldFNsaWNrUHJlbG9hZFwiKVxuICAgICAgLnNsaWNrKHtcbiAgICAgICAgZmFkZTogZmFsc2UsXG4gICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXG4gICAgICAgIGxhenlMb2FkQnVmZmVyOiAwLFxuICAgICAgICBwcmV2QXJyb3c6ICQoJy5mbG8tZ2FsbGVyeS10eXBlLWFfX3NsaWRlc2hvdy1wcmV2JyksXG4gICAgICAgIG5leHRBcnJvdzogJCgnLmZsby1nYWxsZXJ5LXR5cGUtYV9fc2xpZGVzaG93LW5leHQnKSxcbiAgICAgICAgY2VudGVyTW9kZTogZmFsc2UsXG4gICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICBjc3NFYXNlOiBcImN1YmljLWJlemllcigwLjQ0NSwgMC4wNTAsIDAuNTUwLCAwLjk1MClcIixcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgZG90c0NsYXNzOiAnY3VzdG9tX3BhZ2luZycsXG5cbiAgICAgICAgcmVzcG9uc2l2ZTogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDczNixcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogMCxcbiAgICAgICAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgIHZhcmlhYmxlV2lkdGg6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgfSlcbiAgICA7XG5cbn0pO1xuIiwiJChmdW5jdGlvbigpe1xuXG4gICAgJChcIi5mbG8taGVyby01X19zbGlkZXNcIilcbiAgICAgICAgLm9uKFwiaW5pdFwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICQodGhpcykuZmluZCgnLnNsaWNrLWxpc3QnKS5hdHRyKCd0YWJpbmRleCcsIDApLmZvY3VzKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignYmVmb3JlQ2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAkKHRoaXMpLmZpbmQoXCIuZmxvLXZpZGVvLWVtYmVkXCIpLnRyaWdnZXIoXCJmbG9WaWRlb0VtYmVkU3RvcFwiKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdpbml0IHJlSW5pdCBhZnRlckNoYW5nZScsIGZ1bmN0aW9uIChldmVudCwgc2xpY2ssIGN1cnJlbnRTbGlkZSwgbmV4dFNsaWRlKSB7XG4gICAgICAgICAgICB2YXIgc2xpZGVzaG93X18kID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBzbGlkZXNob3dfX2xpc3QgPSBzbGlkZXNob3dfXyQuZmluZChcIi5zbGljay1saXN0XCIpO1xuICAgICAgICAgICAgdmFyIHNsaWRlc2hvd19fYWN0aXZlX3NsaWRlID0gc2xpZGVzaG93X18kLmZpbmQoXCIuc2xpY2stY3VycmVudFwiKTtcbiAgICAgICAgICAgIHZhciBzbGlkZXNob3dfX2FjdGl2ZV9zbGlkZV9pbWcgPSBzbGlkZXNob3dfX2FjdGl2ZV9zbGlkZS5maW5kKFwiaW1nXCIpO1xuXG4gICAgICAgICAgICAvKiBTdGFydDogU2V0IGhlaWdodCBvZiBzbGlkZXIgYnkgaW1hZ2UgKi9cbiAgICAgICAgICAgICAgaWYgKCQod2luZG93KS53aWR0aCgpIDwgNzY4KSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICBzbGlkZXNob3dfX2xpc3QuY3NzKFwiaGVpZ2h0XCIsIHNsaWRlc2hvd19fYWN0aXZlX3NsaWRlX2ltZy5oZWlnaHQoKSk7XG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgICAgICAgICBzbGlkZXNob3dfX2FjdGl2ZV9zbGlkZS5maW5kKFwiaW1nXCIpLm9uKFwibG9hZFwiLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgc2xpZGVzaG93X19saXN0LmNzcyhcImhlaWdodFwiLCBzbGlkZXNob3dfX2FjdGl2ZV9zbGlkZV9pbWcuaGVpZ2h0KCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiBFbmQ6IFNldCBoZWlnaHQgb2Ygc2xpZGVyIGJ5IGltYWdlICovXG5cbiAgICAgICAgICAgIHZhciBpID0gKGN1cnJlbnRTbGlkZSA/IGN1cnJlbnRTbGlkZSA6IDApICsgMTtcbiAgICAgICAgICAgICQoJy5mbG8tZ2FsbGVyeS10eXBlLWJfX3NsaWRlc2hvdy1wYWdlcycpLnRleHQoaSArICcgIG9mICAnICsgc2xpY2suc2xpZGVDb3VudCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5mbG9fbHFpcChcInNldFNsaWNrUHJlbG9hZFwiKVxuICAgICAgICAuc2xpY2soe1xuICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgbmV4dEFycm93OiBcIjxzcGFuIGNsYXNzPSdmbG8taGVyby01X19hcnJvdyBmbG8taGVyby01X19hcnJvdy1wcmV2Jz48aSBjbGFzcz0nZmxvLWljb24tYXJyb3ctYm9yZGVyLXJpZ2h0Jz48L2k+PC9zcGFuPlwiLFxuICAgICAgICAgICAgcHJldkFycm93OiBcIjxzcGFuIGNsYXNzPSdmbG8taGVyby01X19hcnJvdyBmbG8taGVyby01X19hcnJvdy1uZXh0Jz48aSBjbGFzcz0nZmxvLWljb24tYXJyb3ctYm9yZGVyLWxlZnQnPjwvaT48L3NwYW4+XCIsXG4gICAgICAgICAgICBjZW50ZXJNb2RlOiB0cnVlLFxuICAgICAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXG4gICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiB0cnVlLFxuICAgICAgICAgICAgY3NzRWFzZTogXCJjdWJpYy1iZXppZXIoMC40NDUsIDAuMDUwLCAwLjU1MCwgMC45NTApXCIsXG4gICAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgICAgZG90c0NsYXNzOiAnY3VzdG9tX3BhZ2luZycsXG4gICAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3MzYsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2hvdzogMSxcbiAgICAgICAgICAgICAgICAgIGRvdHM6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgYXJyb3dzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgY2VudGVyUGFkZGluZzogMCxcbiAgICAgICAgICAgICAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgdmFyaWFibGVXaWR0aDogZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgIH0pO1xuXG59KTtcbiIsIiQoZnVuY3Rpb24oKXtcblxuICAkKFwiLmZsby1wb3J0Zm9saW8tZ3JpZCAucm93XCIpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAkZ3JpZCA9ICQodGhpcyk7XG5cbiAgICBmdW5jdGlvbiBkb19tYXNvbnJ5KCRncmlkKSB7XG4gICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpICRncmlkLm1hc29ucnkoe1xuICAgICAgICBpdGVtU2VsZWN0b3IgOiBcIi5jb2x1bW5cIixcbiAgICAgICAgY29sdW1uV2lkdGggOiAwXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBkb19tYXNvbnJ5KCRncmlkKTtcblxuICAgICAkKHRoaXMpLmZpbmQoXCJpbWdcIikub24oXCJsb2FkXCIsIGZ1bmN0aW9uKCl7XG4gICAgICBkb19tYXNvbnJ5KCRncmlkKTtcbiAgICB9KTtcblxuICB9KTtcblxufSk7XG4iLCJ2YXIgc3BsYXNoX19zaG93ID0gZnVuY3Rpb24oKSB7XG4gIGxldCBzcGxhc2hTY3JlZW4gPSAkKFwiLmZsby1zcGxhc2hcIik7XG4gIEZvdW5kYXRpb24uTW90aW9uLmFuaW1hdGVJbihzcGxhc2hTY3JlZW4sIFwiZmFkZS1pblwiKTtcbn1cbnZhciBzcGxhc2hfX2hpZGUgPSBmdW5jdGlvbigpIHtcbiAgbGV0IHNwbGFzaFNjcmVlbiA9ICQoXCIuZmxvLXNwbGFzaFwiKTtcbiAgRm91bmRhdGlvbi5Nb3Rpb24uYW5pbWF0ZU91dChzcGxhc2hTY3JlZW4sIFwiZmFkZS1vdXRcIik7XG59XG5cbndpbmRvdy5vbmxvYWQgPSAoKSA9PiB7XG4gIGxldCBzcGxhc2hTY3JlZW4gPSAkKFwiLmZsby1zcGxhc2hcIik7XG4gIHNwbGFzaFNjcmVlblxuICAuY3NzKFwib3BhY2l0eVwiLCBcIjBcIik7XG4gIHNldFRpbWVvdXQoICgpID0+IHtcbiAgICBzcGxhc2hfX2hpZGU7XG4gICAgc3BsYXNoU2NyZWVuLmhpZGUoKTtcbiAgfSwgNDAwKTtcbn07XG4iLCIkKGZ1bmN0aW9uKCl7XG5cbiAgLy8gU1RBUlQ6IERJU1BMQVkgTU9CSUxFIE1FTlVcbiAgICAkKCcuZmxvLWljb24tc2lkZWJhcicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICQoJy5mbG9fcGFnZV93cmFwJykuZmluZCgnLmZsb19zaWRlYmFyJykudG9nZ2xlQ2xhc3MoJ2Zsb19zaWRlYmFyLS1kaXNwbGF5Jyk7XG4gICAgICAkKFwiYm9keVwiKS50b2dnbGVDbGFzcyhcImZsb19zaWRlYmFyLS1hY3RpdmVcIik7XG4gICAgfSk7XG4gIC8vIEVORDogRElTUExBWSBNT0JJTEUgTUVOVVxuXG4gIC8vIFNUQVJUOiBTRVQgUEFERElORyBUT1AgRk9SIFNJREVCQVJcbiAgICAkKFwiLmZsb19zaWRlYmFyXCIpLmNzcyhcInRvcFwiLCAkKFwiLmZsby1oZWFkZXItbW9iaWxlXCIpLm91dGVySGVpZ2h0KHRydWUpICk7XG4gIC8vIEVORDogU0VUIFBBRERJTkcgVE9QIEZPUiBTSURFQkFSXG5cbn0pO1xuIiwiJChmdW5jdGlvbigpe1xuICAkKCcuZmxvLXBhZ2UtYWJvdXQtdHlwZS1hJykuZWFjaChmdW5jdGlvbigpe1xuICAgIHZhciAkZWwgPSAkKHRoaXMpO1xuICAgIGlmKCRlbC5wYXJlbnRzKCcuZmxvLWJsb2NrJykuaGFzQ2xhc3MoJ3RvLWFwcGVhcicpKXtcbiAgICAgIHZhciBibG9ja19pZCA9ICRlbC5wYXJlbnRzKCcuZmxvLWJsb2NrJykuYXR0cignZGF0YS1pZCcpO1xuICAgICAgJCgnLmZsby1ibG9jay0tJytibG9ja19pZCkuY3NzKCd0cmFuc2Zvcm0nLCAnbm9uZScpO1xuICAgIH1cbiAgfSlcbn0pO1xuIiwiJChmdW5jdGlvbigpe1xuXG4gICAgJCgnLmZsby1ibG9jay13aXRoLWxpbmtzX19saW5rcy1pdGVtJykuZWFjaCggZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGl0ZW1IZWlnaHQgPSAkKHRoaXMpLmhlaWdodCgpO1xuICAgICAgICAkKHRoaXMpLmZpbmQoJy5mbG8tYmxvY2std2l0aC1saW5rc19fbGlua3MtdGl0bGUnKS5jc3Moeyd3aWR0aCc6IGl0ZW1IZWlnaHQgKyAncHgnfSk7XG5cbiAgICB9KTtcblxuICAgICQoJy5mbG8tYmxvY2std2l0aC1saW5rc19fc2xpZGVzJykuc2xpY2soe1xuICAgICAgICBpbmZpbml0ZTogdHJ1ZSxcbiAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICBzbGlkZXNUb1Njcm9sbDogMyxcbiAgICAgICAgYXJyb3dzOiBmYWxzZSxcbiAgICAgICAgZG90czogdHJ1ZSxcbiAgICAgICAgZG90c0NsYXNzOiAnZmxvLWJsb2NrLXdpdGgtbGlua3NfX3BhZ2luYXRpb24nLFxuXG4gICAgICAgIHJlc3BvbnNpdmU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA3NjcsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMSxcbiAgICAgICAgICAgICAgICAgICAgdmFyaWFibGVIZWlnaHQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGFkYXB0aXZlSGVpZ2h0OiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDczNixcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgY3VzdG9tUGFnaW5nOiBmdW5jdGlvbihzbGljayxpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuICAnPHNwYW4gY2xhc3M9XCJmbG8tYmxvY2std2l0aC1saW5rc19fcGFnaW5hdGlvbi1pdGVtXCIgPicgK1xuICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJmbG8tYmxvY2std2l0aC1saW5rc19fcGFnaW5hdGlvbi10ZXh0XCI+JyArIChpbmRleCArIDEpICsgJzwvc3Bhbj4gJyArXG4gICAgICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cImZsby1ibG9jay13aXRoLWxpbmtzX19wYWdpbmF0aW9uLXN5bWJvbCBmbG8taWNvbi1kb3RcIj48L2k+ICcgK1xuICAgICAgICAgICAgICAgICAgICAnPC9zcGFuPic7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSk7XG5cbiIsIiQoZnVuY3Rpb24oKXtcbiAgdmFyIHNsaWRlcl9fY2xhc3MgPSBcImZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8tdHlwZS1hXCI7XG4gIHZhciBzbGlkZXJfXyQgPSAkKFwiLlwiICsgc2xpZGVyX19jbGFzcyk7XG4gIHZhciBzbGlkZXJfX2F0X3RvcF9jbGFzcyA9IHNsaWRlcl9fY2xhc3MgKyBcIi0tYXQtdG9wXCI7XG4gIHZhciBzbGlkZXJfX2Rlc2NyaXB0aW9uX2NsYXNzID0gXCJmbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtYV9fZGVzY3JpcHRpb25cIjtcbiAgdmFyIHNsaWRlcl9fZGVzY3JpcHRpb25fJCA9IHNsaWRlcl9fJC5maW5kKFwiLlwiICsgc2xpZGVyX19kZXNjcmlwdGlvbl9jbGFzcyk7XG4gIHZhciBzbGlkZXJfX2Rlc2NyaXB0aW9uX2F0X3RvcF9jbGFzcyA9IHNsaWRlcl9fZGVzY3JpcHRpb25fY2xhc3MgKyBcIi0tYXQtdG9wXCI7XG5cbiAgJChkb2N1bWVudCkub24oXCJzY3JvbGwgcmVhZHlcIiwgZnVuY3Rpb24oKXtcbiAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA9PSAwKSB7XG4gICAgICBzbGlkZXJfX2Rlc2NyaXB0aW9uXyQuYWRkQ2xhc3Moc2xpZGVyX19kZXNjcmlwdGlvbl9hdF90b3BfY2xhc3MpO1xuICAgICAgc2xpZGVyX18kLmFkZENsYXNzKHNsaWRlcl9fYXRfdG9wX2NsYXNzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2xpZGVyX19kZXNjcmlwdGlvbl8kLnJlbW92ZUNsYXNzKHNsaWRlcl9fZGVzY3JpcHRpb25fYXRfdG9wX2NsYXNzKTtcbiAgICAgIHNsaWRlcl9fJC5yZW1vdmVDbGFzcyhzbGlkZXJfX2F0X3RvcF9jbGFzcyk7XG4gICAgfVxuICB9KTtcbn0pO1xuIiwiJChmdW5jdGlvbigpe1xuICB2YXIgc2xpZGVyX19jbGFzcyA9IFwiZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWNcIjtcbiAgdmFyIHNsaWRlcl9fJCA9ICQoXCIuXCIgKyBzbGlkZXJfX2NsYXNzKTtcbiAgdmFyIHNsaWRlcl9fYXRfdG9wX2NsYXNzID0gc2xpZGVyX19jbGFzcyArIFwiLS1hdC10b3BcIjtcbiAgdmFyIHNsaWRlcl9fZGVzY3JpcHRpb25fY2xhc3MgPSBcImZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8tdHlwZS1jX19kZXNjcmlwdGlvblwiO1xuICB2YXIgc2xpZGVyX19kZXNjcmlwdGlvbl8kID0gc2xpZGVyX18kLmZpbmQoXCIuXCIgKyBzbGlkZXJfX2Rlc2NyaXB0aW9uX2NsYXNzKTtcbiAgdmFyIHNsaWRlcl9fZGVzY3JpcHRpb25fYXRfdG9wX2NsYXNzID0gc2xpZGVyX19kZXNjcmlwdGlvbl9jbGFzcyArIFwiLS1hdC10b3BcIjtcblxuICAkKGRvY3VtZW50KS5vbihcInNjcm9sbCByZWFkeVwiLCBmdW5jdGlvbigpe1xuICAgIGlmICgkKHRoaXMpLnNjcm9sbFRvcCgpID09IDApIHtcbiAgICAgIHNsaWRlcl9fZGVzY3JpcHRpb25fJC5hZGRDbGFzcyhzbGlkZXJfX2Rlc2NyaXB0aW9uX2F0X3RvcF9jbGFzcyk7XG4gICAgICBzbGlkZXJfXyQuYWRkQ2xhc3Moc2xpZGVyX19hdF90b3BfY2xhc3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzbGlkZXJfX2Rlc2NyaXB0aW9uXyQucmVtb3ZlQ2xhc3Moc2xpZGVyX19kZXNjcmlwdGlvbl9hdF90b3BfY2xhc3MpO1xuICAgICAgc2xpZGVyX18kLnJlbW92ZUNsYXNzKHNsaWRlcl9fYXRfdG9wX2NsYXNzKTtcbiAgICB9XG4gIH0pO1xufSk7XG4iLCIkKGZ1bmN0aW9uKCl7XG4gIGlmICgkKFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm9cIikubGVuZ3RoKSB7XG4gICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJib2R5LS1oYXMtcGFnZS1oZXJvXCIpO1xuICAgICQoXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVybyAuZmxvLWhlYWRlci1tb2JpbGVcIikuYWRkQ2xhc3MoXCJpcy1pbnNpZGUtaGVyb1wiKTtcbiAgfVxuICAvKiBTVEFSVDogVklERU8gRU1CRUQgKi9cbiAgICAkKFwiLmZsby1wYWdlLWhlcm9fX3NsaWRlLS1pbWFnZV9hbmRfdmlkZW9fZW1iZWRcIikuZWFjaChmdW5jdGlvbigpe1xuICAgICAgbGV0IGFjdGl2ZV9zbGlkZV9fJCA9ICQodGhpcyk7XG4gICAgICB2YXIgdmlkZW9fYnV0dG9uID0gYWN0aXZlX3NsaWRlX18kLmZpbmQoXCIuZmxvLWhlcm8tdmlkZW8tZW1iZWRfX2J1dHRvblwiKTtcbiAgICAgIHZhciB2aWRlb19jb250YWluZXIgPSBhY3RpdmVfc2xpZGVfXyQuZmluZChcIi5mbG8taGVyby12aWRlby1lbWJlZF9fY29udGFpbmVyXCIpO1xuICAgICAgdmFyIGVtYmVkX2NvZGUgPSBhY3RpdmVfc2xpZGVfXyQuYXR0cihcImRhdGEtZW1iZWQtY29kZVwiKTtcblxuICAgICAgdmlkZW9fYnV0dG9uLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKCEkKFwiYm9keVwiKS5oYXNDbGFzcyhcImJvZHktLWZsby1wYWdlLWhlcm8tdmlkZW8taXMtcGxheWluZ1wiKSkge1xuICAgICAgICAgIHZpZGVvX2NvbnRhaW5lci5odG1sKHVuZXNjYXBlKGVtYmVkX2NvZGUpKTtcbiAgICAgICAgICAkKFwiYm9keVwiKS5hZGRDbGFzcyhcImJvZHktLWZsby1wYWdlLWhlcm8tdmlkZW8taXMtcGxheWluZ1wiKTtcblxuICAgICAgICAgICQoXCIuZmxvLXBhZ2UtaGVyb19fc2xpZGVzXCIpLnNsaWNrKFwic2xpY2tTZXRPcHRpb25cIiwgXCJhdXRvcGxheVwiLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoJChcImJvZHlcIikuaGFzQ2xhc3MoXCJib2R5LS1mbG8tcGFnZS1oZXJvLXZpZGVvLWlzLXBsYXlpbmdcIikpIHtcbiAgICAgICAgICB2aWRlb19jb250YWluZXIuaHRtbChcIlwiKTtcbiAgICAgICAgICAkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcImJvZHktLWZsby1wYWdlLWhlcm8tdmlkZW8taXMtcGxheWluZ1wiKTtcblxuICAgICAgICAgIHZhciBhdXRvcGxheSA9ICQoXCIuZmxvLXBhZ2UtaGVyb19fc2xpZGVzXCIpLmF0dHIoXCJkYXRhLWF1dG9wbGF5XCIpID09IFwidHJ1ZVwiID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICQoXCIuZmxvLXBhZ2UtaGVyb19fc2xpZGVzXCIpLnNsaWNrKFwic2xpY2tTZXRPcHRpb25cIiwgXCJhdXRvcGxheVwiLCBhdXRvcGxheSAsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgLyogRU5EOiBWSURFTyBFTUJFRCAqL1xuXG4gIC8qIFNUQVJUOiBTTElERVNIT1cgSU5JVElBTElaQVRJT04gKi9cblxuICAgICQoXG4gICAgICBbXG4gICAgICAgIFwiLmZsby1oZXJvLTFfX3NsaWRlcywgXCIsXG4gICAgICAgIFwiLmZsby1oZXJvLTJfX3NsaWRlc1wiXG4gICAgICBdLmpvaW4oXCJcIilcbiAgICApXG4gICAgICAub24oXCJiZWZvcmVDaGFuZ2VcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGFjdGl2ZV9zbGlkZV9fJCA9ICQodGhpcykuZmluZChcIi5zbGljay1jdXJyZW50XCIpO1xuXG4gICAgICAgIC8qIFNUQVJUOiBWSURFTyBFTUJFRCBDTE9TRSBPTiBTTElERSBDSEFOR0UgKi9cbiAgICAgICAgICBpZiAoJChcImJvZHlcIikuaGFzQ2xhc3MoXCJib2R5LS1mbG8tcGFnZS1oZXJvLXZpZGVvLWlzLXBsYXlpbmdcIikpIHtcbiAgICAgICAgICAgIC8vIGFjdGl2ZV9zbGlkZV9fJC5maW5kKFwiLmZsby1oZXJvLXZpZGVvLWVtYmVkX19idXR0b25cIikuY2xpY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIC8qIEVORDogVklERU8gRU1CRUQgQ0xPU0UgT04gU0xJREUgQ0hBTkdFICovXG5cbiAgICAgIH0pXG4gICAgICAub24oXCJpbml0XCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgICQodGhpcykuZmluZCgnLnNsaWNrLWxpc3QnKS5hdHRyKCd0YWJpbmRleCcsIDApLmZvY3VzKCk7XG4gICAgICB9KVxuICAgICAgLm9uKCdpbml0IHJlSW5pdCBhZnRlckNoYW5nZScsIGZ1bmN0aW9uIChldmVudCwgc2xpY2ssIGN1cnJlbnRTbGlkZSwgbmV4dFNsaWRlKSB7XG4gICAgICAgIHZhciBhY3RpdmVfc2xpZGVfXyQgPSAkKFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8gLnNsaWNrLWN1cnJlbnRcIik7XG4gICAgICAgIHZhciBhY3RpdmVfc2xpZGVfX2VsZW1lbnRzX2NvbG9yID0gYWN0aXZlX3NsaWRlX18kLmF0dHIoXCJkYXRhLWVsZW1lbnRzLWNvbG9yXCIpO1xuICAgICAgICB2YXIgYWN0aXZlX3NsaWRlX190aXRsZSA9IGFjdGl2ZV9zbGlkZV9fJC5hdHRyKFwiZGF0YS1zbGlkZS10aXRsZVwiKTtcbiAgICAgICAgdmFyIGFjdGl2ZV9zbGlkZV9fc3VidGl0bGUgPSBhY3RpdmVfc2xpZGVfXyQuYXR0cihcImRhdGEtc2xpZGUtc3VidGl0bGVcIik7XG4gICAgICAgIHZhciBhY3RpdmVfc2xpZGVfX2xpbmsgPSBhY3RpdmVfc2xpZGVfXyQuYXR0cihcImRhdGEtc2xpZGUtbGlua1wiKTtcblxuICAgICAgICAvKiBTVEFSVDogU0VUIExJR0hUIExPR08gT04gU0xJREVTSE9XIElGIE5FRURFRCAqL1xuICAgICAgICAgIGlmIChhY3RpdmVfc2xpZGVfX2VsZW1lbnRzX2NvbG9yKSB7XG4gICAgICAgICAgICAvLyBTdGFydDogQ2hlY2tpbmcgQ29sb3JcbiAgICAgICAgICAgICAgdmFyIGMgPSBhY3RpdmVfc2xpZGVfX2VsZW1lbnRzX2NvbG9yO1xuICAgICAgICAgICAgICB2YXIgYyA9IGMuc3Vic3RyaW5nKDEpOyAgICAgIC8vIHN0cmlwICNcbiAgICAgICAgICAgICAgdmFyIHJnYiA9IHBhcnNlSW50KGMsIDE2KTsgICAvLyBjb252ZXJ0IHJyZ2diYiB0byBkZWNpbWFsXG4gICAgICAgICAgICAgIHZhciByID0gKHJnYiA+PiAxNikgJiAweGZmOyAgLy8gZXh0cmFjdCByZWRcbiAgICAgICAgICAgICAgdmFyIGcgPSAocmdiID4+ICA4KSAmIDB4ZmY7ICAvLyBleHRyYWN0IGdyZWVuXG4gICAgICAgICAgICAgIHZhciBiID0gKHJnYiA+PiAgMCkgJiAweGZmOyAgLy8gZXh0cmFjdCBibHVlXG5cbiAgICAgICAgICAgICAgdmFyIGx1bWEgPSAwLjIxMjYgKiByICsgMC43MTUyICogZyArIDAuMDcyMiAqIGI7IC8vIHBlciBJVFUtUiBCVC43MDlcbiAgICAgICAgICAgIC8vIEVuZDogQ2hlY2tpbmcgQ29sb3JcblxuICAgICAgICAgICAgdmFyIGFjdGl2ZV9zbGlkZV9fZWxlbWVudHNfY29sb3JfaXNfbGlnaHQgPSBsdW1hID4gNDA7XG5cbiAgICAgICAgICAgIGlmIChhY3RpdmVfc2xpZGVfX2VsZW1lbnRzX2NvbG9yX2lzX2xpZ2h0KSB7XG4gICAgICAgICAgICAgICQoXCJib2R5XCIpLmFkZENsYXNzKFwiYm9keS0tZmxvLXBhZ2UtaGVyby1lbGVtZW50cy1jb2xvci1pcy1saWdodFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiYm9keS0tZmxvLXBhZ2UtaGVyby1lbGVtZW50cy1jb2xvci1pcy1saWdodFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgLyogRU5EOiBTRVQgTElHSFQgTE9HTyBPTiBTTElERVNIT1cgSUYgTkVFREVEICovXG5cbiAgICAgICAgLyogU1RBUlQ6IEJPRFkgLT4gU0VUIEhBUyBWSURFTyBFTUJFRCBDTEFTUyBJRiBORUVERUQgKi9cbiAgICAgICAgICBpZiAoYWN0aXZlX3NsaWRlX18kLmhhc0NsYXNzKFwiZmxvLXBhZ2UtaGVyb19fc2xpZGUtLWltYWdlX2FuZF92aWRlb19lbWJlZFwiKSkge1xuICAgICAgICAgICAgJChcImJvZHlcIikuYWRkQ2xhc3MoXCJib2R5LS1mbG8tcGFnZS1oZXJvX19zbGlkZS0taGFzLXZpZGVvLWVtYmVkXCIpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiYm9keS0tZmxvLXBhZ2UtaGVyb19fc2xpZGUtLWhhcy12aWRlby1lbWJlZFwiKVxuICAgICAgICAgIH1cbiAgICAgICAgLyogRU5EOiBCT0RZIC0+IFNFVCBIQVMgVklERU8gRU1CRUQgQ0xBU1MgSUYgTkVFREVEICovXG5cbiAgICAgICAgLyogU1RBUlQ6IFNMSURFU0hPVyBDT1VOVEVSICovXG4gICAgICAgICAgdmFyIGNvdW50ZXIgPSAkKCcuZmxvLXBhZ2UtaGVyb19fc2xpZGVzJykuYXR0cignZGF0YS1jb3VudGVyJyk7XG4gICAgICAgICAgdmFyIGkgPSAoY3VycmVudFNsaWRlID8gY3VycmVudFNsaWRlIDogMCkgKyAxO1xuICAgICAgICAgICQoXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICcuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWFfX3BhZ2luYXRvci10ZXh0JyxcbiAgICAgICAgICAgICAgJy5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtYl9fcGFnaW5hdG9yJyxcbiAgICAgICAgICAgICAgJy5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtY19fcGFnaW5hdG9yLXRleHQnLFxuICAgICAgICAgICAgXS5qb2luKFwiLFwiKVxuICAgICAgICAgIClcbiAgICAgICAgICAgIC50ZXh0KGkgKyAnICAnICsgY291bnRlciArICcgICcgKyBzbGljay5zbGlkZUNvdW50KVxuICAgICAgICAgIDtcbiAgICAgICAgLyogRU5EOiBTTElERVNIT1cgQ09VTlRFUiAqL1xuXG4gICAgICAgIC8qIFNUQVJUOiBTTElERSBUSVRMRSAmIFNVQlRJVExFICovXG5cbiAgICAgICAgICAvKiBTVEFSVDogSElERS9TSE9XIEVMRU1FTlRTIERFUEVORElORyBPTiBUSVRMRSBFTVBUSU5FU1MgKi9cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgJC50cmltKGFjdGl2ZV9zbGlkZV9fdGl0bGUpID09IFwiXCJcbiAgICAgICAgICAgICAgJiYgJC50cmltKGFjdGl2ZV9zbGlkZV9fdGl0bGUpID09IFwiXCJcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAvKiBTVEFSVDogSElERSBFTEVNRU5UUyAqL1xuXG4gICAgICAgICAgICAgICAgLyogU1RBUlQ6IFRZUEUgQSAqL1xuICAgICAgICAgICAgICAgICAgJChcIi5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtYV9fc2xpZGUtdGl0bGUtYXJlYS1ibG9ja1wiKS5oaWRlKFwiZmFzdFwiKVxuICAgICAgICAgICAgICAgICAgaWYgKCQoXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWFfX3NsaWRlc2hvdy10aXRsZVwiKS50ZXh0KCkudHJpbSgpID09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIi5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtYV9fc2xpZGVzaG93LXRpdGxlLWJsb2NrXCIpLmNzcyhcIm9wYWNpdHlcIiwgXCIwXCIpLmhpZGUoXCJmYXN0XCIpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qIEVORDogVFlQRSBBICovXG5cbiAgICAgICAgICAgICAgICAvKiBTVEFSVDogVFlQRSBCICovXG4gICAgICAgICAgICAgICAgICAkKFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8tdHlwZS1iX19kZXNjcmlwdGlvbi1pbm5lclwiKS5jc3MoXCJib3JkZXItY29sb3JcIiwgXCJ0cmFuc3BhcmVudFwiKTtcbiAgICAgICAgICAgICAgICAvKiBFTkQ6IFRZUEUgQiAqL1xuXG4gICAgICAgICAgICAgICAgLyogU1RBUlQ6IFRZUEUgQyAqL1xuICAgICAgICAgICAgICAgICAgJChcIi5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtY19fc2xpZGUtdGl0bGUtYXJlYS1ibG9ja1wiKS5jc3Moe1xuICAgICAgICAgICAgICAgICAgICBcIm9wYWNpdHlcIjogXCIwXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicG9pbnRlci1ldmVudHNcIjogXCJub25lXCJcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIC8qIEVORDogVFlQRSBDICovXG5cbiAgICAgICAgICAgICAgLyogRU5EOiBISURFIEVMRU1FTlRTICovXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvKiBTVEFSVDogU0hPVyBFTEVNRU5UUyAqL1xuXG4gICAgICAgICAgICAgICAgLyogU1RBUlQ6IFRZUEUgQSAqL1xuICAgICAgICAgICAgICAgICAgJChcIi5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtYV9fc2xpZGUtdGl0bGUtYXJlYS1ibG9ja1wiKS5zaG93KFwiZmFzdFwiKVxuICAgICAgICAgICAgICAgICAgaWYgKCQoXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWFfX3NsaWRlc2hvdy10aXRsZVwiKS50ZXh0KCkudHJpbSgpID09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgJChcIi5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtYV9fc2xpZGVzaG93LXRpdGxlLWJsb2NrXCIpLmNzcyhcIm9wYWNpdHlcIiwgXCIwXCIpLnNob3coXCJmYXN0XCIpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8qIEVORDogVFlQRSBBICovXG5cbiAgICAgICAgICAgICAgICAvKiBTVEFSVDogVFlQRSBCICovXG4gICAgICAgICAgICAgICAgICAkKFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8tdHlwZS1iX19kZXNjcmlwdGlvbi1pbm5lclwiKS5jc3MoXCJib3JkZXItY29sb3JcIiwgXCJcIik7XG4gICAgICAgICAgICAgICAgLyogRU5EOiBUWVBFIEIgKi9cblxuICAgICAgICAgICAgICAgIC8qIFNUQVJUOiBUWVBFIEMgKi9cbiAgICAgICAgICAgICAgICAgICQoXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWNfX3NsaWRlLXRpdGxlLWFyZWEtYmxvY2tcIikuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgXCJvcGFjaXR5XCI6IFwiMVwiLFxuICAgICAgICAgICAgICAgICAgICBcInBvaW50ZXItZXZlbnRzXCI6IFwiaW5pdGlhbFwiXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAvKiBFTkQ6IFRZUEUgQyAqL1xuXG4gICAgICAgICAgICAgIC8qIEVORDogU0hPVyBFTEVNRU5UUyAqL1xuICAgICAgICAgICAgfVxuICAgICAgICAgIC8qIEVORDogSElERS9TSE9XIEVMRU1FTlRTIERFUEVORElORyBPTiBUSVRMRSBFTVBUSU5FU1MgKi9cblxuICAgICAgICAgICQoXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICcuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWFfX3NsaWRlLXRpdGxlJyxcbiAgICAgICAgICAgICAgJy5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtYl9fc2xpZGUtdGl0bGUnLFxuICAgICAgICAgICAgICAnLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8tdHlwZS1jX19zbGlkZS10aXRsZSdcbiAgICAgICAgICAgIF0uam9pbihcIixcIilcbiAgICAgICAgICApLmNoYW5nZVRleHQoYWN0aXZlX3NsaWRlX190aXRsZSk7XG4gICAgICAgICAgJChcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgJy5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtYV9fc2xpZGUtc3VidGl0bGUnLFxuICAgICAgICAgICAgICAnLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8tdHlwZS1jX19zbGlkZS1zdWJ0aXRsZSdcbiAgICAgICAgICAgIF0uam9pbihcIixcIilcbiAgICAgICAgICApLmNoYW5nZVRleHQoYWN0aXZlX3NsaWRlX19zdWJ0aXRsZSk7XG4gICAgICAgICAgJChcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgJy5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtYV9fc2xpZGUtbGluaycsXG4gICAgICAgICAgICAgICcuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWJfX3NsaWRlLWxpbmsnLFxuICAgICAgICAgICAgICAnLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8tdHlwZS1jX19zbGlkZS1saW5rJ1xuICAgICAgICAgICAgXS5qb2luKFwiLFwiKVxuICAgICAgICAgICkuYXR0cihcImhyZWZcIiwgYWN0aXZlX3NsaWRlX19saW5rKTtcbiAgICAgICAgLyogRU5EOiBTTElERSBUSVRMRSAmIFNVQlRJVExFICovXG5cbiAgICAgICAgLyogU1RBUlQ6IENIQU5HRSBFTEVNRU5UUyBDT0xPUiAqL1xuXG4gICAgICAgICAgLyogU3RhcnQ6IENyZWF0ZSBFbGVtZW50cyBDU1MgKi9cbiAgICAgICAgICAgICAgdmFyIGVsZW1lbnRzX2Nzc19fY3NzID0gW1xuXG4gICAgICAgICAgICAgIC8qIFN0YXJ0OiBIZWFkZXIgKi9cbiAgICAgICAgICAgICAgICBcIi5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvIDpub3QoLmlzLXN0aWNreSkgLmZsby1oZWFkZXIsIFwiLFxuICAgICAgICAgICAgICAgIFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8gOm5vdCguaXMtc3RpY2t5KSAuZmxvLWhlYWRlcl9fbG9nbywgXCIsXG4gICAgICAgICAgICAgICAgXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVybyA6bm90KC5pcy1zdGlja3kpIC5mbG8tc29jaWFsLWxpbmtzX19saW5rLCBcIixcblxuICAgICAgICAgICAgICAgIFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8gaGVhZGVyIDpub3QoLmlzLXN0aWNreSkgLmZsby1oZWFkZXJfX21lbnUtY29udGFpbmVyID4gZGl2ID4gdWwgPiAubWVudS1pdGVtLCBcIixcbiAgICAgICAgICAgICAgICBcIi5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvIGhlYWRlciA6bm90KC5pcy1zdGlja3kpIC5mbG8taGVhZGVyX19tZW51LWNvbnRhaW5lciA+IGRpdiA+IHVsID4gLm1lbnUtaXRlbSA+IGEsIFwiLFxuXG4gICAgICAgICAgICAgICAgXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVybyA6bm90KC5pcy1zdGlja3kpIC5mbG8taGVhZGVyX19tZW51LXRyaWdnZXItdGV4dCwgXCIsXG5cbiAgICAgICAgICAgICAgICBcIi5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvIDpub3QoLmlzLXN0aWNreSkgLmZsby1oZWFkZXJfX3NlYXJjaC10cmlnZ2VyIC5mbG8taGVhZGVyX19zZWFyY2gtdHJpZ2dlci1zZWFyY2gtaWNvbiwgXCIsXG4gICAgICAgICAgICAgICAgXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVybyA6bm90KC5pcy1zdGlja3kpIC5mbG8taGVhZGVyX19zZWFyY2gtdHJpZ2dlciAuZmxvLWhlYWRlcl9fc2VhcmNoLXRyaWdnZXItY2xvc2UtaWNvbiwgXCIsXG5cbiAgICAgICAgICAgICAgICBcIi5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvIDpub3QoLmlzLXN0aWNreSkgLmZsby1oZWFkZXJfX3NlYXJjaC1pbnB1dCwgXCIsXG4gICAgICAgICAgICAgICAgXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVybyA6bm90KC5pcy1zdGlja3kpIC5mbG8tcG9zdC5mbG8taGVhZGVyX19sYW5nLXN3aXRjaCwgXCIsXG4gICAgICAgICAgICAgICAgXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVybyA6bm90KC5pcy1zdGlja3kpIC5mbG8taGVhZGVyX19zZWFyY2gtZm9ybS1idG5cIixcbiAgICAgICAgICAgICAgICBcIntcIixcbiAgICAgICAgICAgICAgICAgIFwiY29sb3I6IFwiICsgYWN0aXZlX3NsaWRlX19lbGVtZW50c19jb2xvciArIFwiO1wiLFxuICAgICAgICAgICAgICAgIFwifVwiLFxuXG4gICAgICAgICAgICAgICAgXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVybyA6bm90KC5pcy1zdGlja3kpIC5mbG8taGVhZGVyX19tZW51LWl0ZW0tc2VhcmNoOmJlZm9yZSwgXCIsXG4gICAgICAgICAgICAgICAgXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVybyA6bm90KC5pcy1zdGlja3kpIC5mbG8taGVhZGVyX19tZW51LXRyaWdnZXItaXRlbVwiLFxuICAgICAgICAgICAgICAgIFwie1wiLFxuICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kOiBcIiArIGFjdGl2ZV9zbGlkZV9fZWxlbWVudHNfY29sb3IgKyBcIjtcIixcbiAgICAgICAgICAgICAgICBcIn1cIixcblxuICAgICAgICAgICAgICAgIFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8gOm5vdCguaXMtc3RpY2t5KSAuZmxvLWhlYWRlciwgXCIsXG4gICAgICAgICAgICAgICAgXCIuZmxvLWhlYWRlci0tbG9nby1sZWZ0IC5mbG8taGVhZGVyX19sYW5nLXN3aXRjaDpiZWZvcmUsIFwiLFxuICAgICAgICAgICAgICAgIFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8gOm5vdCguaXMtc3RpY2t5KSAuZmxvLWhlYWRlcl9fbWVudSwgXCIsXG4gICAgICAgICAgICAgICAgXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVybyA6bm90KC5pcy1zdGlja3kpIC5mbG8taGVhZGVyX19pdGVtLCBcIixcbiAgICAgICAgICAgICAgICBcIi5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvIDpub3QoLmlzLXN0aWNreSkgLmZsby1oZWFkZXJfX21lbnUtY29udGFpbmVyIFwiLFxuICAgICAgICAgICAgICAgIFwie1wiLFxuICAgICAgICAgICAgICAgICAgXCJib3JkZXItY29sb3I6IFwiICsgYWN0aXZlX3NsaWRlX19lbGVtZW50c19jb2xvciArIFwiO1wiLFxuICAgICAgICAgICAgICAgIFwifVwiLFxuICAgICAgICAgICAgICAvKiBFbmQ6IEhlYWRlciAqL1xuXG4gICAgICAgICAgICAgIC8qIFN0YXJ0OiBNb2JpbGUgU2xpZGVzaG93ICovXG4gICAgICAgICAgICAgICAgXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVybyAuaXMtbWFpbi5ub3Qtc3RpY2t5IC5mbG8taGVhZGVyLW1vYmlsZV9fc2VhcmNoLWlucHV0LCBcIixcbiAgICAgICAgICAgICAgICBcIi5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvIC5pcy1tYWluLm5vdC1zdGlja3kgLmZsby1oZWFkZXItbW9iaWxlX19zZWFyY2gtc3VibWl0LCBcIixcblxuICAgICAgICAgICAgICAgIFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8gLmlzLW1haW4ubm90LXN0aWNreSAuZmxvLWhlYWRlci1tb2JpbGVfX2xvZ28sIFwiLFxuICAgICAgICAgICAgICAgIFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8gLmlzLW1haW4ubm90LXN0aWNreSAuZmxvLWhlYWRlci1tb2JpbGVfX21lbnVcIixcbiAgICAgICAgICAgICAgICBcIntcIixcbiAgICAgICAgICAgICAgICAgIFwiY29sb3I6IFwiICsgYWN0aXZlX3NsaWRlX19lbGVtZW50c19jb2xvciArIFwiIWltcG9ydGFudDtcIixcbiAgICAgICAgICAgICAgICBcIn1cIixcblxuICAgICAgICAgICAgICAgIFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8gLmlzLW1haW4ubm90LXN0aWNreSAuZmxvLWhlYWRlci1tb2JpbGVfX21lbnVcIixcbiAgICAgICAgICAgICAgICBcIntcIixcbiAgICAgICAgICAgICAgICAgIFwiYm9yZGVyLWNvbG9yOiBcIiArIGFjdGl2ZV9zbGlkZV9fZWxlbWVudHNfY29sb3IgKyBcIjtcIixcbiAgICAgICAgICAgICAgICBcIn1cIixcblxuICAgICAgICAgICAgICAgIFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8gLmlzLW1haW4ubm90LXN0aWNreSAuZmxvLWhlYWRlci1tb2JpbGVfX21lbnUtdHJpZ2dlci1pdGVtXCIsXG4gICAgICAgICAgICAgICAgXCJ7XCIsXG4gICAgICAgICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3I6IFwiICsgYWN0aXZlX3NsaWRlX19lbGVtZW50c19jb2xvciArIFwiO1wiLFxuICAgICAgICAgICAgICAgIFwifVwiLFxuICAgICAgICAgICAgICAgIFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8gLmlzLW1haW4ubm90LXN0aWNreS5mbG8taGVhZGVyLW1vYmlsZSB7XCIsXG4gICAgICAgICAgICAgICAgICBcImJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1wiLFxuICAgICAgICAgICAgICAgIFwifVwiLFxuICAgICAgICAgICAgICAvKiBFbmQ6IE1vYmlsZSBTbGlkZXNob3cgKi9cblxuICAgICAgICAgICAgICAvKiBTdGFydDogU2xpZGVzaG93ICovXG4gICAgICAgICAgICAgICAgXCIuZmxvLWhlcm8tdmlkZW8tZW1iZWRfX2J1dHRvblwiLFxuICAgICAgICAgICAgICAgIFwie1wiLFxuICAgICAgICAgICAgICAgICAgXCJjb2xvcjogXCIgKyBhY3RpdmVfc2xpZGVfX2VsZW1lbnRzX2NvbG9yICsgXCI7XCIsXG4gICAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xvcjogXCIgKyBhY3RpdmVfc2xpZGVfX2VsZW1lbnRzX2NvbG9yICsgXCI7XCIsXG4gICAgICAgICAgICAgICAgXCJ9XCIsXG4gICAgICAgICAgICAgIC8qIEVuZDogU2xpZGVzaG93ICovXG5cbiAgICAgICAgICAgICAgLyogU3RhcnQ6IFNsaWRlc2hvdyBUeXBlIEEgKi9cbiAgICAgICAgICAgICAgICBcIkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1wiLFxuXG4gICAgICAgICAgICAgICAgICBcIi5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtYV9fc2xpZGUtdGl0bGUge1wiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbG9yOiBcIiArIGFjdGl2ZV9zbGlkZV9fZWxlbWVudHNfY29sb3IgKyBcIjtcIixcbiAgICAgICAgICAgICAgICAgIFwifVwiLFxuXG4gICAgICAgICAgICAgICAgXCJ9XCIsXG4gICAgICAgICAgICAgIC8qIEVuZDogU2xpZGVzaG93IFR5cGUgQSovXG5cbiAgICAgICAgICAgICAgLyogU3RhcnQ6IFNsaWRlc2hvdyBUeXBlIEIgKi9cbiAgICAgICAgICAgICAgICBcIi5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvIC5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtYl9fc2xpZGVzaG93LXRpdGxlLCBcIixcbiAgICAgICAgICAgICAgICBcIi5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvIC5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtYl9fc2xpZGUtdGl0bGUsIFwiLFxuICAgICAgICAgICAgICAgIFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8gLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8tdHlwZS1iX19hcnJvdywgXCIsXG4gICAgICAgICAgICAgICAgXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVybyAuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWJfX3BhZ2luYXRvciBcIixcbiAgICAgICAgICAgICAgICBcIntcIixcbiAgICAgICAgICAgICAgICAgIFwiY29sb3I6IFwiICsgYWN0aXZlX3NsaWRlX19lbGVtZW50c19jb2xvciArIFwiO1wiLFxuICAgICAgICAgICAgICAgIFwifVwiLFxuXG4gICAgICAgICAgICAgICAgXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVybyAuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWJfX2Rlc2NyaXB0aW9uLWlubmVyXCIsXG4gICAgICAgICAgICAgICAgXCJ7XCIsXG4gICAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xvcjogXCIgKyBhY3RpdmVfc2xpZGVfX2VsZW1lbnRzX2NvbG9yICsgXCI7XCIsXG4gICAgICAgICAgICAgICAgXCJ9XCIsXG4gICAgICAgICAgICAgIC8qIEVuZDogU2xpZGVzaG93IFR5cGUgQiAqL1xuXG4gICAgICAgICAgICAgIC8qIFN0YXJ0OiBTbGlkZXNob3cgVHlwZSBDICovXG4gICAgICAgICAgICAgICAgXCJAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcIixcbiAgICAgICAgICAgICAgICAgIFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8gLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8tdHlwZS1jX19kZXNjcmlwdGlvbi0taGlkaW5nLWRpc2FibGVkIC5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtY19fYXJyb3csIFwiLFxuICAgICAgICAgICAgICAgICAgXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVybyAuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWNfX2Rlc2NyaXB0aW9uLS1oaWRpbmctZW5hYmxlZC5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtY19fZGVzY3JpcHRpb24tLWF0LXRvcCAuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWNfX2Fycm93LCBcIixcbiAgICAgICAgICAgICAgICAgIFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8gLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8tdHlwZS1jX19kZXNjcmlwdGlvbi0taGlkaW5nLWVuYWJsZWQgLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8tdHlwZS1jX19uZXh0XCIsXG4gICAgICAgICAgICAgICAgICBcIntcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvcjogXCIgKyBhY3RpdmVfc2xpZGVfX2VsZW1lbnRzX2NvbG9yICsgXCI7XCIsXG4gICAgICAgICAgICAgICAgICBcIn1cIixcbiAgICAgICAgICAgICAgICBcIn1cIixcbiAgICAgICAgICAgICAgICBcIkBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1wiLFxuXG4gICAgICAgICAgICAgICAgICBcIi5mbG8taGVhZGVyLWFuZC1mbG8tcGFnZS1oZXJvLXR5cGUtY19fc2xpZGUtdGl0bGUsIFwiLFxuICAgICAgICAgICAgICAgICAgXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWNfX3NsaWRlLXN1YnRpdGxlLCBcIixcbiAgICAgICAgICAgICAgICAgIFwiLmZsby1oZWFkZXItYW5kLWZsby1wYWdlLWhlcm8tdHlwZS1jX19wYWdpbmF0b3IsIFwiLFxuICAgICAgICAgICAgICAgICAgXCIuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWNfX2Fycm93XCIsXG4gICAgICAgICAgICAgICAgICBcIntcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb2xvcjogXCIgKyBhY3RpdmVfc2xpZGVfX2VsZW1lbnRzX2NvbG9yICsgXCI7XCIsXG4gICAgICAgICAgICAgICAgICBcIn1cIixcblxuICAgICAgICAgICAgICAgIFwifVwiLFxuICAgICAgICAgICAgICAvKiBFbmQ6IFNsaWRlc2hvdyBUeXBlIEMgKi9cblxuXG4gICAgICAgICAgICAgIFwiXCJcbiAgICAgICAgICAgIF0uam9pbihcIlxcclxcblwiKTtcbiAgICAgICAgICAvKiBFbmQ6IENyZWF0ZSBFbGVtZW50cyBDU1MgKi9cblxuICAgICAgICAgIC8qIFN0YXJ0OiBBcHBseSBFbGVtZW50cyBDU1MgKi9cbiAgICAgICAgICAgIHZhciBlbGVtZW50c19jc3NfX3dyYXBfY2xhc3MgPSBcImZsby1wYWdlLWhlcm9fX2VsZW1lbnRzLWNzc1wiO1xuICAgICAgICAgICAgdmFyIGVsZW1lbnRzX2Nzc19fd3JhcF8kID0gJChcIi5cIiArIGVsZW1lbnRzX2Nzc19fd3JhcF9jbGFzcyk7XG4gICAgICAgICAgICBpZiAoZWxlbWVudHNfY3NzX193cmFwXyQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGVsZW1lbnRzX2Nzc19fd3JhcF8kLmh0bWwoZWxlbWVudHNfY3NzX19jc3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJChcImhlYWRcIikuYXBwZW5kKFxuICAgICAgICAgICAgICAgIFwiPHN0eWxlIGNsYXNzPSdcIiArIGVsZW1lbnRzX2Nzc19fd3JhcF9jbGFzcyArIFwiJz5cIiArIGVsZW1lbnRzX2Nzc19fY3NzICsgXCI8L3N0eWxlPlwiXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgLyogRW5kOiBBcHBseSBFbGVtZW50cyBDU1MgKi9cblxuICAgICAgICAvKiBFTkQ6IENIQU5HRSBFTEVNRU5UUyBDT0xPUiAqL1xuXG4gICAgICAgIC8qIFNUQVJUOiBWSURFTyBCQUNLR1JPVU5EICovXG4gICAgICAgICAgLy8gU3RhcnQ6IFBhdXNlIGFsbCB2aWRlb3NcbiAgICAgICAgICAgICQoXCIuZmxvLXBhZ2UtaGVyb19fc2xpZGUtLXZpZGVvX3NsaWRlOm5vdCguc2xpY2stY3VycmVudClcIikuZmluZChcInZpZGVvXCIpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gRW5kOiBQYXVzZSBhbGwgdmlkZW9zXG5cbiAgICAgICAgICBpZiAoYWN0aXZlX3NsaWRlX18kLmhhc0NsYXNzKFwiZmxvLXBhZ2UtaGVyb19fc2xpZGUtLXZpZGVvX3NsaWRlXCIpKSB7XG4gICAgICAgICAgICB2YXIgdmlkZW9fY29udGFpbmVyID0gYWN0aXZlX3NsaWRlX18kLmZpbmQoXCIuZmxvLXBhZ2UtaGVyb19fc2xpZGUtYmFja2dyb3VuZC12aWRlb1wiKTtcbiAgICAgICAgICAgIHZhciB2aWRlbyA9IHZpZGVvX2NvbnRhaW5lci5maW5kKFwidmlkZW9cIilbMF07XG5cbiAgICAgICAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICAgICAgICB9XG4gICAgICAgIC8qIEVORDogVklERU8gQkFDS0dST1VORCAqL1xuICAgICAgfSlcbiAgICAgIC5mbG9fbHFpcChcInNldFNsaWNrUHJlbG9hZFwiKVxuICAgICAgLnNsaWNrKHtcbiAgICAgICAgICBmYWRlOiBmYWxzZSxcbiAgICAgICAgICBhcnJvd3M6IHRydWUsXG4gICAgICAgICAgbGF6eUxvYWQ6ICdvbmRlbWFuZCcsXG4gICAgICAgICAgbGF6eUxvYWRCdWZmZXI6IDAsXG4gICAgICAgICAgcHJldkFycm93OlxuICAgICAgICAgICAgJChcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICcuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWFfX3ByZXYnLFxuICAgICAgICAgICAgICAgICcuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWJfX3ByZXYnLFxuICAgICAgICAgICAgICAgICcuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWNfX3ByZXYnXG4gICAgICAgICAgICAgIF0uam9pbihcIixcIilcbiAgICAgICAgICAgIClcbiAgICAgICAgICAsXG4gICAgICAgICAgbmV4dEFycm93OlxuICAgICAgICAgICAgJChcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICcuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWFfX25leHQnLFxuICAgICAgICAgICAgICAgICcuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWJfX25leHQnLFxuICAgICAgICAgICAgICAgICcuZmxvLWhlYWRlci1hbmQtZmxvLXBhZ2UtaGVyby10eXBlLWNfX25leHQnXG4gICAgICAgICAgICAgIF0uam9pbihcIixcIilcbiAgICAgICAgICAgIClcbiAgICAgICAgICAsXG4gICAgICAgICAgY2VudGVyTW9kZTogZmFsc2UsXG4gICAgICAgICAgaW5maW5pdGU6IHRydWUsXG4gICAgICAgICAgY3NzRWFzZTogXCJjdWJpYy1iZXppZXIoMC40NDUsIDAuMDUwLCAwLjU1MCwgMC45NTApXCIsXG4gICAgICAgICAgcGF1c2VPbkZvY3VzOiBmYWxzZSxcblxuICAgICAgICAgIC8vIHNwZWVkOiBoZXJvX3RyYW5zaXRpb25fc3BlZWQsXG4gICAgICAgICAgLy8gYXV0b3BsYXk6IGhlcm9fYXV0b3BsYXksXG4gICAgICAgICAgLy8gYXV0b3BsYXlTcGVlZDogaGVyb19hdXRvcGxheV9kZWxheSxcbiAgICAgICAgICAvLyBwYXVzZU9uSG92ZXI6IGhlcm9fcGF1c2Vfb25faG92ZXIsXG4gICAgICAgICAgcGF1c2VPbkZvY3VzOiBmYWxzZSxcbiAgICAgICAgICByZXNwb25zaXZlOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDc3MCxcbiAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNzM2LFxuICAgICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICBkb3RzOiB0cnVlLFxuICAgICAgICAgIGRvdHNDbGFzczogJ2N1c3RvbV9wYWdpbmcnXG4gICAgICB9KVxuICAgIDtcbiAgLyogRU5EOiBTTElERVNIT1cgSU5JVElBTElaQVRJT04gKi9cblxufSk7XG4iLCIkKGRvY3VtZW50KS5pbWFnZXNMb2FkZWQoZnVuY3Rpb24oKXtcbiAgICAkKCcuZmxvLWZlYXR1cmVkLWl0ZW1zX19yb3cnKS5tYXNvbnJ5KHtcbiAgICAgICAgLy8gb3B0aW9uc1xuICAgICAgICBpdGVtU2VsZWN0b3I6ICcuZmxvLWZlYXR1cmVkLWl0ZW1zX19pdGVtJyxcbiAgICAgICAgY29sdW1uV2lkdGg6IDFcbiAgICB9KTtcbn0pO1xuIiwiJChmdW5jdGlvbigpe1xuICAkKHdpbmRvdykub24oXCJyZXNpemVcIiwgZnVuY3Rpb24oKXtcbiAgICB2YXIgaGVpZ2h0U2xpZGVyID0gJChcIi5mbG8taGVyby0zX19zbGlkZS1pbWFnZVwiKS5oZWlnaHQoKTtcbiAgICAkKFwiLmZsby1mZWF0dXJlZC1zbGlkZXNob3dfX25hdmlnYXRpb25cIikuY3NzKCd0b3AnLCBoZWlnaHRTbGlkZXIpO1xuICB9KVxuICAkKHdpbmRvdykudHJpZ2dlcigncmVzaXplJyk7XG59KTtcbiIsIiQoZnVuY3Rpb24oKXtcbiAgJChcIi5mbG8tY29yZS1zdHlsZVwiKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgdmFyIHRlbXBsYXRlID0gJCh0aGlzKTtcbiAgICB2YXIgc3R5bGUgPSB0ZW1wbGF0ZS5odG1sKCk7XG4gICAgJChcImhlYWRcIikuYXBwZW5kKHN0eWxlKTtcbiAgICB0ZW1wbGF0ZS5yZW1vdmUoKTtcbiAgfSk7XG5cdGxldCBmYWRlSW5TdHlsZVRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblx0ZmFkZUluU3R5bGVUYWcuY2xhc3NMaXN0ID0gXCJmbG8tY29yZS1mYWRlLWluXCI7XG5cdGZhZGVJblN0eWxlVGFnLmlubmVySFRNTCA9IGBcbiAgICBib2R5ICoge1xuICAgICAgb3V0bGluZTogc29saWQgdHJhbnNwYXJlbnQ7XG4gICAgfSBcbiAgICBib2R5IHtcbiAgICAgIG9wYWNpdHk6IDEhaW1wb3J0YW50O1xuICAgIH1gO1xuICAkKGZhZGVJblN0eWxlVGFnKS5hcHBlbmRUbyggXCJoZWFkXCIgKTtcbn0pO1xuIl19
