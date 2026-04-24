(function ($) {

  "use strict";

  // ------------------------------------------------------------------------------ //
  // Overlay Menu Navigation
  // ------------------------------------------------------------------------------ //
  var overlayMenu = function () {

    if (!$('.nav-overlay').length) {
      return false;
    }

    var body = undefined;
    var menu = undefined;
    var menuItems = undefined;
    var init = function init() {
      body = document.querySelector('body');
      menu = document.querySelector('.menu-btn');
      menuItems = document.querySelectorAll('.nav__list-item');
      applyListeners();
    };
    var applyListeners = function applyListeners() {
      menu.addEventListener('click', function () {
        return toggleClass(body, 'nav-active');
      });
    };
    var toggleClass = function toggleClass(element, stringClass) {
      if (element.classList.contains(stringClass)) element.classList.remove(stringClass); else element.classList.add(stringClass);
    };
    init();
  }


  // Portfolio Slider
  var swiper = new Swiper(".portfolio-Swiper", {
    slidesPerView: 4,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      300: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  // Animate Texts (Letter-by-letter for specific headings)
  var initTextFx = function () {
    $('.txt-fx').each(function () {
      var newstr = '';
      var count = 0;
      var delay = 100;
      var stagger = 10;
      var words = this.textContent.split(/\s/);
      var arrWords = new Array();
      
      $.each( words, function( key, value ) {
        newstr = '<span class="word">';

        for ( var i = 0, l = value.length; i < l; i++ ) {
          newstr += "<span class='letter' style='transition-delay:"+ ( delay + stagger * count ) +"ms;'>"+ value[ i ] +"</span>";
          count++;
        }
        newstr += '</span>';

        arrWords.push(newstr);
        count++;
      });

      this.innerHTML = arrWords.join("<span class='letter' style='transition-delay:"+ delay +"ms;'>&nbsp;</span>");
    });
  }

  // Premium Reveal Animations (Block-level)
  var initRevealAnimations = function() {
    console.log("Animation System: Initializing...");
    
    // Safety: Force all reveal-text elements to be visible immediately
    $('.reveal-text, .hero-image-container').addClass('reveal-visible');
    console.log("Animation System: Forced visibility on load.");

    if (!('IntersectionObserver' in window)) {
      console.warn("Animation System: IntersectionObserver not supported.");
      return;
    }

    var observerOptions = {
      threshold: 0.05,
      rootMargin: "0px 0px -20px 0px"
    };

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          console.log("Animation System: Element reveal triggered:", entry.target.className);
          entry.target.classList.add('reveal-visible');
          // Optionally unobserve after first reveal
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    $('.reveal-text, .hero-image-container').each(function() {
      observer.observe(this);
    });
  }

  // Sidebar Nav Indicator Logic
  var initNavIndicator = function() {
    var $menu = $('#one-page-menu');
    if (!$menu.length) return;

    var $indicator = $('<div class="nav-indicator"></div>').appendTo($menu);
    
    var updateIndicator = function() {
      var $activeLink = $menu.find('.nav-link.active');
      if ($activeLink.length) {
        var menuOffset = $menu.offset().top;
        var linkOffset = $activeLink.offset().top;
        var linkHeight = $activeLink.outerHeight();
        var indicatorHeight = 24; // matches CSS
        
        $indicator.css({
          top: (linkOffset - menuOffset) + (linkHeight / 2) - (indicatorHeight / 2),
          height: indicatorHeight
        }).addClass('visible');
      } else {
        $indicator.removeClass('visible');
      }
    };

    // Robust Scroll Tracking Fallback
    var updateActiveSection = function() {
      var scrollPos = $(window).scrollTop();
      var windowHeight = $(window).height();
      var docHeight = $(document).height();
      
      // Edge case: Bottom of page
      if (scrollPos + windowHeight >= docHeight - 50) {
        $menu.find('.nav-link').removeClass('active');
        $menu.find('.nav-link').last().addClass('active');
        updateIndicator();
        return;
      }

      $('section[id]').each(function() {
        var top = $(this).offset().top - 250; // Increased offset for better trigger
        var bottom = top + $(this).outerHeight();
        if (scrollPos >= top && scrollPos < bottom) {
          var id = $(this).attr('id');
          var $targetLink = $menu.find('.nav-link[href="#' + id + '"]');
          if ($targetLink.length) {
            $menu.find('.nav-link').removeClass('active');
            $targetLink.addClass('active');
          }
        }
      });
      updateIndicator();
    };

    // Smooth Scroll Implementation
    $menu.find('.nav-link').on('click', function(e) {
      var targetId = $(this).attr('href');
      if (targetId && targetId.startsWith('#')) {
        var $targetElement = $(targetId);
        if ($targetElement.length) {
          e.preventDefault();
          
          // Calculate offset - desktop has fixed sidebar
          var isDesktop = window.innerWidth >= 992;
          var offset = 0; // Default for mobile
          
          $('html, body').animate({
            scrollTop: $targetElement.offset().top - offset
          }, 800, function() {
            // Update active state after scroll
            window.location.hash = targetId;
            updateActiveSection();
          });
          
          // Mobile menu auto-close
          if (window.innerWidth < 992 && $('body').hasClass('nav-active')) {
            $('body').removeClass('nav-active');
          }
        }
      }
    });

    // Sync events
    setTimeout(updateActiveSection, 500);
    $(window).on('scroll', updateActiveSection);
    $(window).on('resize', updateIndicator);
  }

  // init Isotope
  var initIsotope = function() {
    
    $('.grid').each(function(){

      // $('.grid').imagesLoaded( function() {
        // images have loaded
        var $buttonGroup = $( '.button-group' );
        var $checked = $buttonGroup.find('.is-checked');
        var filterValue = $checked.attr('data-filter');
  
        var $grid = $('.grid').isotope({
          itemSelector: '.portfolio-item',
          // layoutMode: 'fitRows',
          filter: filterValue
        });
    
        // bind filter button click
        $('.button-group').on( 'click', 'a', function(e) {
          e.preventDefault();
          filterValue = $( this ).attr('data-filter');
          $grid.isotope({ filter: filterValue });
        });
    
        // change is-checked class on buttons
        $('.button-group').each( function( i, buttonGroup ) {
          $buttonGroup.on( 'click', 'a', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
          });
        });
      // });

    });
  }

  // init Chocolat light box
  var initChocolat = function() {
    Chocolat(document.querySelectorAll('.image-link'), {
      imageSize: 'contain',
      loop: true,
    })
  }

  $(document).ready(function () {

    overlayMenu();
    initTextFx();
    initChocolat();

    // mobile menu
    $('.menu-btn').click(function(e){
      e.preventDefault();
      $('body').toggleClass('nav-active');
    });

    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1200,
        once: true,
      })
    }

    initRevealAnimations();
    initNavIndicator();

  });


  // window load
  $(window).load(function () {
    $(".preloader").fadeOut("slow");
    initIsotope();
  })


})(jQuery);