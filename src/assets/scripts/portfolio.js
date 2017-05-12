/**
 * Created by lokitheme on 3/29/2017.
 */
"use strict";
(function ($) {
    var PortfolioSingle = new function () {

        this.init = function () {
            this.init_single_carousel();
            this.init_play_video();
        };

        this.init_play_video = function(){
            $('.play-video', '.lk-portfolio-single-container').on('click',function(){
                var $index = $(this).attr('data-index');
                $(".main-slide", ".lk-portfolio-single-container").trigger('to.owl.carousel', [$index, 100]);
                setTimeout(function(){
                    var $iframe = $('iframe','.main-slide a[data-index="' + $index + '"]');
                    if($iframe.length>0 && $iframe[0].src.indexOf('?')>-1){
                        $iframe[0].src += "&autoplay=1";
                    }else{
                        $iframe[0].src += "?autoplay=1";
                    }
                },500);

            });
        };

        this.init_single_carousel = function () {
            $('.owl-carousel.main-slide', '.lk-portfolio-single-container').owlCarousel({
                items: 1,
                nav: true,
                navText: ['<i class="fa fa-angle-left"></i> ', ' <i class="fa fa-angle-right"></i>'],
                dots: false,
                loop: false,
                margin: 0,
                onTranslated:function(event){
                    var $index = event.item.index,
                        $a_nav = $('a[data-index="' + $index + '"]'),
                        $thumb_slide = $(".thumb-slide", ".lk-portfolio-single-container");
                    $('.thumb', '.lk-portfolio-single-container').removeClass('active');
                    $a_nav.parent().addClass('active');
                    $thumb_slide.trigger('to.owl.carousel', [$index, 300]);                }
            });

            $('.owl-carousel.thumb-slide','.lk-portfolio-single-container').owlCarousel({
                items: 4,
                nav: false,
                margin: 15,
                dots: false,
                loop: false,
                responsive:{
                    0:{
                        items:2,
                    },
                    768:{
                        items:3
                    },
                    992:{
                        items:4
                    }
                },
                onInitialized: function () {
                    $('a.nav-thumb','.thumb-slide').on('click',function () {
                        var index = $(this).attr('data-index');
                        index = parseInt(index,0);
                        $(".thumb-slide", ".lk-portfolio-single-container").attr('data-current-index', index);
                        $(".main-slide", ".lk-portfolio-single-container").trigger('to.owl.carousel', [index, 300]);
                    })
                }
            });
        };
    };

    $(document).ready(function () {
        PortfolioSingle.init();
    })
})(jQuery);