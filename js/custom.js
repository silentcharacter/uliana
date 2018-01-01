APP = {
    delay: false,

    scrollAction: function(wd) {
        if (APP.delay) return;

        APP.delay = true;
        setTimeout(function(){APP.delay = false}, 300)

        var a = $("a[name!=''][name]");
        if(wd < 0) {
          for(var i = 0 ; i < a.length ; i++) {
            var t = a[i].getClientRects()[0].top;
            if(t >= 40) break;
          }
        }
        else {
          for(var i = a.length-1 ; i >= 0 ; i--) {
            var t = a[i].getClientRects()[0].top;
            if(t < -20) break;
          }
        }

        if(i >= 0 && i < a.length) {
            $('html,body').animate(
                {scrollTop: a[i].offsetTop},
                {duration: 1000, easing: "swing"}
            );
        }
    },

    bindScrollEvents: function() {
        $(document).on('mousewheel DOMMouseScroll', function (event) {
            event.preventDefault();
            var wd = event.originalEvent.wheelDelta || -event.originalEvent.detail;
            APP.scrollAction(wd);
        });

        $("body").keydown(function (event) {
            //alert(event.which);
            if (event.which == 38 || event.which == 33) {
                event.preventDefault();
                APP.scrollAction(1);
            }
            if (event.which == 40 || event.which == 34) {
                event.preventDefault();
                APP.scrollAction(-1);
            }
        });
    },

    projectsItemsEvents: function() {
        $('.img-wrapper img').hover(function () {
            var position = $(this).position();
            var height = $(this).height();
            var width = $(this).width();
            $('.img-overlay.title').text($(this).data('title'));
            $('#overlay').css({top: position.top, left: position.left, height: height, width: width});
            $('#overlay').animate({opacity: "toggle"}, 1);
        });

        $('.img-wrapper img').click(function () {

        });
    },

    bindBackToTop: function () {
        $('.to-top a').click(function() {
            var a = $("a[name!=''][name]");
            $('html,body').animate(
                {scrollTop: a[0].offsetTop},
                {duration: 1000, easing: "swing"}
            );
        });
    },

    bindMenu: function () {

        $('.menu-link').click(function() {
            setTimeout(function(){
                $('.padding').toggle();
            }, 100);
        });

        var percentWidth = '65vw';
        if ($(window).width() < 1000) {
            percentWidth = '65vw';
        }
        $('.menu-link').bigSlide({menuWidth: percentWidth});
    }
};

$(document).ready(function () {
    if ($(window).width() >= 800) {
        APP.bindScrollEvents();
    }
    APP.bindMenu();
    APP.projectsItemsEvents();
    APP.bindBackToTop();

    // jQuery( window ).on( "swipe", function( event ) {
    //     alert('dsad')
    //     event.stopImmediatePropagation();
    //     return false;
    // } );
    // jQuery('*').on( "swipe", function( event ) {
    //     alert('dsad')
    //     event.stopImmediatePropagation();
    //     return false;
    // } );
});
