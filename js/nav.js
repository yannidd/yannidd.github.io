$(document).ready(function () {
  /* SETUP */
  var transitionEnd = whichTransitionEvent();

  /* ELEMENTS DECLARATION */
  var nav = $("nav");
  var navButton = $("nav a");
  var menuToggle = $("#mobile_menu_toggle");
  var menuToggleLine = $("#mobile_menu_toggle div");

  menuToggle.on("click", function (ev) {
    if (nav.hasClass("fadein") && nav.hasClass("flex")) {
      menuToggleLine.removeClass('open');
      navButton.removeClass('fadeinSlide');
      nav.removeClass("fadein").one(transitionEnd, function () {
        nav.removeClass('flex'); // Reflow
      });
    }
    else {
      menuToggleLine.addClass('open');
      nav.addClass('flex').outerWidth(); // Reflow
      nav.addClass('fadein');
      navButton.addClass('fadeinSlide');
    }
    ev.preventDefault();
  });

  $(window).on('scroll', function () {
    if (window.pageYOffset > 10) {
      $('header').addClass('bg');
    }
    else {
      $('header').removeClass('bg');
    }
  });

  function whichTransitionEvent() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'MSTransition': 'msTransitionEnd',
      'OTransition': 'oTransitionEnd',
      'transition': 'transitionEnd'
    }

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  }
});