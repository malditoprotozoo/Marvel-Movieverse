
/* carrousel velocidad */

$('carousel').carousel({

  interval:1000,
  pause:"hover"
})

$(document).ready(function () {
  var trigger = $('.hamburger'),
      overlay = $('.overlay'),
     isClosed = false;

    trigger.click(function () {
      hamburger_cross();      
    });

    function hamburger_cross() {

      if (isClosed == true) {          
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {   
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
  }
  
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  
});
=


/* star ratings */


// Using vanilla javascript:
StarRating.defaults.initialText = "Rate me";
clickFn: function (select) {
  console.log('I Clicked star #' + selected);
  $( '#star-rating-2' ).starrating({;
}

});

