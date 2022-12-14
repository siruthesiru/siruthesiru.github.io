// responsive tables
$(document).ready(function () {
  $("table").wrap("<div class='table-responsive'></div>");
  $("table").addClass("table");
});

// responsive embed videos
$(document).ready(function () {
  $('iframe[src*="youtube.com"]').wrap(
    '<div class="embed-responsive embed-responsive-16by9"></div>'
  );
  $('iframe[src*="youtube.com"]').addClass("embed-responsive-item");
  $('iframe[src*="vimeo.com"]').wrap(
    '<div class="embed-responsive embed-responsive-16by9"></div>'
  );
  $('iframe[src*="vimeo.com"]').addClass("embed-responsive-item");
});

// Navigation Scripts to Show Header on Scroll-Up
jQuery(document).ready(function ($) {
  var MQL = 1170;

  //primary navigation slide-in effect
  if ($(window).width() > MQL) {
    var headerHeight = $(".navbar-custom").height(),
      bannerHeight = $(".intro-header .container").height();

    $(window).on(
      "scroll",
      {
        previousTop: 0,
      },
      function () {
        var currentTop = $(window).scrollTop(),
          $catalog = $(".side-catalog");

        //check if user is scrolling up by mouse or keyborad
        if (currentTop < this.previousTop) {
          //if scrolling up...
          if (currentTop > 0 && $(".navbar-custom").hasClass("is-fixed")) {
            $(".navbar-custom").addClass("is-visible");
          } else {
            $(".navbar-custom").removeClass("is-visible is-fixed");
          }
        } else {
          //if scrolling down...
          $(".navbar-custom").removeClass("is-visible");
          if (
            currentTop > headerHeight &&
            !$(".navbar-custom").hasClass("is-fixed")
          )
            $(".navbar-custom").addClass("is-fixed");
        }
        this.previousTop = currentTop;

        //adjust the appearance of side-catalog
        $catalog.show();
        if (currentTop > bannerHeight + 41) {
          $catalog.addClass("fixed");
        } else {
          $catalog.removeClass("fixed");
        }
      }
    );
  }
});

// add following things

// // smooth scroll to top or bottom
function smoothTo(target) {
  var coverOffset;
  if (target == "top") coverOffset = 0;
  else if (target == "bottom") coverOffset = $(document).height();
  else coverOffset = $(target).offset().top;
  $("body, html").animate(
    {
      scrollTop: coverOffset,
    },
    500
  );
}

function mobileNavToggle() {
  // close navbar
  if ($(".main-container").hasClass("open")) {
    // when transition end
    setTimeout(function () {
      $("html").toggleClass("open");
      $("body").toggleClass("open");
      $(".main-container").toggleClass("open-delay");
    }, 500);
  }
  // open navbar
  else {
    setTimeout(function () {
      $("html").toggleClass("open");
    }, 500);
    $("body").toggleClass("open");
    $(".main-container").toggleClass("open-delay");
  }
  $(".mobile-nav, .main-container").toggleClass("open");
}

$(".main-container").css("height", $(window).height() + "px");