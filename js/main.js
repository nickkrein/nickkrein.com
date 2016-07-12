// IIFE - Immediately Invoked Function Expression
(function(c) {

  // The global jQuery object is passed as a parameter
  c(window.jQuery, window, document);

}(function($, window, document) {
  // The $ is now locally scoped 
  var $devSwitch = $('.dev-switch');

  // Listen for the jQuery ready event on the document
  $(function() {
    // The DOM is ready!

    $(window).on('load', function() {
      $('header').animate({opacity: 1, top: 0}, 250, 'easeOutQuad', function(){
        $('#me').animate({opacity: 1}, 400, function() {
          $('#image-text').animate({opacity: 1, right: 0}, 250, 'easeOutQuad');
            $('.greeting').animate({opacity: .5, top: 0}, {duration: 250, easing: 'easeOutQuad', queue: false, complete: function () {
              $(".typed").typed({
                strings: ["^500Hello, World!^600\nMy name is Nick.^400\nLet's make something."],
                typeSpeed: 15,
                contentType: 'text'
              });
            }});
            $('.gradient-filter').animate({opacity: 1}, 400);
            $('footer').animate({opacity: 1, top: 0}, {duration: 250, easing: 'easeOutQuad', queue: false});
            
            var intervalId = setInterval(function(){

              if ($devSwitch.text() === "Web Developer") {
                $devSwitch.animate({right: '-200px', opacity: 0}, 'fast', 'easeOutQuad', function() {
                  $devSwitch.text("Problem Solver");
                });
                $devSwitch.animate({right: '0px', opacity: 1}, 'fast', 'easeOutQuad');
              } else if ($devSwitch.text() === "Problem Solver") {
                $devSwitch.animate({right: '-200px', opacity: 0}, 'fast', 'easeOutQuad', function() {
                  $devSwitch.text("Web Developer");
                });
                $devSwitch.animate({right: '0px', opacity: 1}, 'fast', 'easeOutQuad'); 
              } 
            }, 7000);
                
        });
      });
    });
    

    $('.icon-nav').click(function() {
      $('#header-nav').slideToggle(400, 'easeOutQuad');
    });
    
    $('#header-nav li a').hover(function() {
      $(this).animate({
        color: '#868a92'
      }, 200)
    }, function() {
      $(this).animate({
        color: '#FFF'
      }, 100)      
    });

    $('.arrow').click(function() {
      $('html, body').animate({scrollTop: 0}, 800);
      return false;
    });

  });

  // The rest of the code goes here!

}));