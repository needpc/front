"use strict";
(function ($) {
    $(document).ready(function () {
        /** Init carousel **/
        function initCarousel(){
            $('.lk-item-slide','.lk-main-slider').each(function($index){
                var $window_width = $(window).width(),
                    $window_height = $(window).height();
                $(this).css('width',$window_width + 'px');
                $(this).css('height', $window_height + 'px');
                if( ($index+1) == $('.lk-item-slide','.lk-main-slider').length){
                    $('.lk-main-slider').owlCarousel({
                        items: 1,
                        nav: true,
                        navText: ['<i class="fa fa-angle-left"></i> ', ' <i class="fa fa-angle-right"></i>'],
                        dots: false,
                        loop: true,
                        animateOut: 'fadeOut',
                        margin: 0,
                        autoplay: true
                    });
                }
            })


            /** Owl carousel **/
            if ($.isFunction($.fn.owlCarousel)) {
                $('.owl-carousel:not(.manual)').each(function () {
                    var $owl = $(this),
                        defaults = {
                            items: 4,
                            nav: false,
                            navText: ['<i class="fa fa-angle-left"></i> ', ' <i class="fa fa-angle-right"></i>'],
                            dots: false,
                            loop: true,
                            center: false,
                            mouseDrag: true,
                            touchDrag: true,
                            pullDrag: true,
                            freeDrag: false,
                            margin: 0,
                            stagePadding: 0,
                            merge: false,
                            mergeFit: true,
                            autoWidth: false,
                            startPosition: 0,
                            rtl: false,
                            smartSpeed: 500,
                            autoplay: false,
                            autoplayTimeout: 3000,
                            fluidSpeed: false,
                            dragEndSpeed: false,
                            autoplayHoverPause: true
                        };
                    var config = $.extend({}, defaults, $owl.data("owl-options"));
                    // Initialize Slider
                    var $owl_obj = $owl.owlCarousel(config);
                });
            }
        };

        /** Init popup gallery **/
        function initPopupGallery(){
            /** Magnific popup **/
            $('.magnific-popup:not(.manual)').off('click').on('click', function (event) {
                event.preventDefault();
                var $items = [],
                    $url = $(this).attr('data-url'),
                    $type = $(this).attr('data-popup-type');
                $items.push({
                    src: $url
                });
                if ($.isFunction($.fn.magnificPopup)) {
                    $.magnificPopup.open({
                        gallery: {
                            enabled: true
                        },
                        items: $items,
                        type: $type,
                        iframe: {
                            patterns: {
                                youtube: {
                                    index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).
                                    id: 'v=', // String that splits URL in a two parts, second part should be %id%
                                    // Or null - full URL will be returned
                                    // Or a function that should return %id%, for example:
                                    // id: function(url) { return 'parsed id'; }
                                    src: 'https://www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
                                },
                                vimeo: {
                                    index: 'vimeo.com/',
                                    id: '/',
                                    src: '//player.vimeo.com/video/%id%?autoplay=1'
                                },
                                // you may add here more sources
                            },
                            srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
                        },
                        mainClass: 'mfp-zoom-in',
                        removalDelay: 500, //delay removal by X to allow out-animation
                        callbacks: {
                            open: function () {
                                //overwrite default prev + next function. Add timeout for css3 crossfade animation
                                $.magnificPopup.instance.next = function () {
                                    var self = this;
                                    self.wrap.removeClass('mfp-image-loaded');
                                    setTimeout(function () {
                                        $.magnificPopup.proto.next.call(self);
                                    }, 120);
                                };
                                $.magnificPopup.instance.prev = function () {
                                    var self = this;
                                    self.wrap.removeClass('mfp-image-loaded');
                                    setTimeout(function () {
                                        $.magnificPopup.proto.prev.call(self);
                                    }, 120);
                                }
                            },
                            imageLoadComplete: function () {
                                var self = this;
                                setTimeout(function () {
                                    self.wrap.addClass('mfp-image-loaded');
                                }, 16);
                            }
                        },
                        closeOnContentClick: true,
                        midClick: true
                    });
                }
                return false;

            });

            /** Light gallery **/
            $('.light-gallery:not(.ajax-gallery)').off('click').on('click', function (event) {
                event.preventDefault();
                var $this = $(this),
                    $galleries = [],
                    $start_index = 0,
                    $data_gallery_id = $(this).attr('data-gallery-id');

                if(typeof $data_gallery_id !='undefined' && $data_gallery_id != ''){
                    var $index = 0;
                    $('a[data-gallery-id="' + $data_gallery_id + '"]').each(function(){
                        $galleries.push(
                            {
                                subHtml: $(this).attr('data-title'),
                                thumb: $(this).attr('data-url'),
                                src: $(this).attr('data-url')
                            }
                        )
                        if($(this).attr('data-url') === $this.attr('data-url')){
                            $start_index = $index;
                        }
                        $index++;
                    })
                }else{
                    $galleries.push(
                        {
                            subHtml: $(this).attr('data-title'),
                            thumb: $(this).attr('data-url'),
                            src: $(this).attr('data-url')
                        }
                    )
                }

                if ($.isFunction($.fn.lightGallery)) {
                    var $lg = $(this).lightGallery({
                        downloadUrl: false,
                        dynamic: true,
                        dynamicEl: $galleries,
                        hash: false,
                        index: $start_index
                    });
                    $lg.on('onAfterOpen.lg', function (event, index) {
                        $('.lg-thumb-outer').css('opacity', '0');
                        setTimeout(function () {
                            $('.lg-has-thumb').removeClass('lg-thumb-open');
                            $('.lg-thumb-outer').css('opacity', '1');
                        }, 700);
                    });
                }
                return false;
            });

            /** View gallery **/
            $('.light-gallery.ajax-gallery').off('click').on('click', function (event) {
                event.preventDefault();
                var $galleries = [
                    {subHtml: 'Qui eros mediocritatem ne', src: '../../assets/images/blogs/full/blog-09.jpg', thumb: '../../assets/images/blogs/70x70/blog-09.jpg'},
                    {subHtml: 'Vis nominavi consetetur in', src: '../../assets/images/blogs/full/blog-06.jpg', thumb: '../../assets/images/blogs/70x70/blog-06.jpg'},
                    {subHtml: 'Case liberavisse mediocritatem', src: '../../assets/images/blogs/full/blog-07.jpg', thumb: '../../assets/images/blogs/70x70/blog-07.jpg'},
                    {subHtml: 'Vel vero ceteros denique ', src: '../../assets/images/blogs/full/blog-04.jpg', thumb: '../../assets/images/blogs/70x70/blog-04.jpg'}
                ];
                if($(this).hasClass('portfolio-gallery')){
                    $galleries = [
                        {subHtml: 'Portfolio 12', src: '../../assets/images/portfolio/portfolio-12.jpg', thumb: '../../assets/images/portfolio/portfolio-12.jpg'},
                        {subHtml: 'Portfolio 13', src: '../../assets/images/portfolio/portfolio-13.jpg', thumb: '../../assets/images/portfolio/portfolio-13.jpg'},
                        {subHtml: 'Portfolio 14', src: '../../assets/images/portfolio/portfolio-14.jpg', thumb: '../../assets/images/portfolio/portfolio-14.jpg'},
                        {subHtml: 'Portfolio 11', src: '../../assets/images/portfolio/portfolio-11.jpg', thumb: '../../assets/images/portfolio/portfolio-11.jpg'},
                        {subHtml: 'Portfolio 10', src: '../../assets/images/portfolio/portfolio-10.jpg', thumb: '../../assets/images/portfolio/portfolio-10.jpg'}
                    ];
                }
                if ($.isFunction($.fn.lightGallery)) {
                    var $lg = $(this).lightGallery( {
                        downloadUrl: false,
                        dynamic: true,
                        dynamicEl: $galleries,
                        hash: false
                    });
                    $lg.on('onAfterOpen.lg', function (event, index) {
                        $('.lg-thumb-outer').css('opacity', '0');
                        setTimeout(function () {
                            $('.lg-has-thumb').removeClass('lg-thumb-open');
                            $('.lg-thumb-outer').css('opacity', '1');
                        }, 700);
                    });
                }
                return false;
            });
        };

        /** Isotope **/
        function initIsotope() {
            $('div[data-isotope="1"]').each(function () {
                var $container = $(this),
                    $colWidth = $container.attr('data-col-width'),
                    $percent = $container.attr('data-percent'),
                    $itemSelector = $container.attr('data-item-selector');

                if ($.isFunction($.fn.isotope) && $.isFunction($.fn.imagesLoaded)) {
                    $($container).imagesLoaded(function () {
                        setTimeout(function () {
                            $($container).isotope({
                                itemSelector: $itemSelector,
                                masonry: {
                                    columnWidth: $colWidth
                                },
                                percentPosition: $percent,
                                hiddenStyle: {
                                    opacity: 0,
                                    transform: 'translate3d(0, 100px, 0)'
                                },
                                visibleStyle: {
                                    opacity: 1,
                                    transform: 'translate3d(0, 0, 0)'
                                },
                                transitionDuration: '0.5s'
                            });
                        }, 500);
                    });
                }
            });
        };

        function initSocialShare() {
            $('.lk-blog-share').each(function () {
                var $share_wrap = $(this),
                    $share_popup = $('.social-share', this);
                if ($.isFunction($.fn.jsSocials)) {
                    $($share_popup).jsSocials(
                        {
                            shares: ["twitter", "facebook", "googleplus", "pinterest"],
                            url: $(this).attr('data-url'),
                            text: $(this).attr('data-title'),
                            showLabel: false,
                            shareIn: "popup",
                        });
                }
                $('a.show-social-share', $share_wrap).off('click').on('click', function (event) {
                    if ($share_popup.hasClass('show-popup')) {
                        $share_popup.removeClass('show-popup');
                    } else {
                        $('.social-share', '.lk-blog-share').removeClass('show-popup');
                        $share_popup.addClass('show-popup');
                    }
                    event.preventDefault();
                    return false;
                });
                $('body, .lk-blog-share .jssocials-shares a').click(function () {
                    $('.lk-blog-share .social-share').removeClass('show-popup');
                });
            });
        };

        function initPortfolioFilter() {
            $('.isotope-filter').each(function () {
                var $this = $(this);
                $('a', $this).on('click', function () {
                    var $category = $(this).attr('data-filter'),
                        $container = $this.closest($this.attr('data-container')),
                        $target = $this.attr('data-target-container');

                    $category = $category.split(',');
                    if ($category)
                        $('a.active', $this).removeClass('active');
                    $(this).addClass('active');
                    if ($.isFunction($.fn.isotope)) {
                        $($target,$container).isotope({
                            filter: function () {
                                var $is_match = false;
                                for (var $i = 0; $i < $category.length; $i++) {
                                    if ($(this).hasClass($category[$i].trim()) || $category[$i] == '*') {
                                        $is_match = true;
                                        break;
                                    }
                                }
                                if ($is_match) {
                                    $(this).addClass('has-animated');
                                } else {
                                    $(this).removeClass('infinited');
                                }
                                return $is_match;
                            }
                        });
                    }

                });
            });

        };

        function initMagicLine() {
            $('li a.active', '.lk-magic-line').each(function(){
                if(typeof $(this).closest('li') !='undefined'){
                    setMagicLinePosition( $(this).closest('li') );
                }
            });
            $('li', '.lk-magic-line').hover(function () {
                setMagicLinePosition($(this));
            }, function () {
                var $container = $(this).closest('.lk-magic-line'),
                    $elm = $('a.active', $container).closest('li');
                setMagicLinePosition($elm);
            });
        };

        function videoInit(){

            var mediaElements = document.querySelectorAll('.lk-media-container video, .lk-media-container audio'), i, total = mediaElements.length;

            for (i = 0; i < total; i++) {
                var player = new MediaElementPlayer(mediaElements[i], {
                    stretching: 'auto',
                    success: function (media) {
                        var renderer = $('> div:first', media);
                        media.addEventListener('loadedmetadata', function () {
                            var src = media.originalNode.getAttribute('src').replace('&amp;', '&');
                            if (src !== null && src !== undefined && typeof renderer!='undefined') {
                                $('.src',renderer).html('<a href="' + src + '" target="_blank">' + src + '</a>');
                                $('.renderer',renderer).html(media.rendererName);
                                $('.error',renderer).html('');
                            }
                        });
                        media.addEventListener('error', function (e) {
                            if(typeof renderer != 'undefined'){
                                $('.error',renderer).html('<strong>Error</strong>: ' + e.message);
                            }
                        });
                    }
                });
            };
        }

        function initSlider(){
            var $window_height = $(window).height(),
                $main_slider_height = $window_height,
                $main_slider = $('.lk-main-slider');

            $main_slider_height = $main_slider_height <=700 ? 700 : $main_slider_height;
            $main_slider_height = $main_slider_height > 950 ? 950: $main_slider_height;
            $($main_slider).css('height',$main_slider_height + 'px');
            $('.lk-item-slide',$main_slider).css('height',$main_slider_height + 'px');
        }

        function initSrollToTop(){
            var $scroll_height = $('.lk-scroll-to-top').attr('data-scroll-height');
            $scroll_height = typeof $scroll_height != 'undefined' ? $scroll_height : 500;
            if( $(window).scrollTop() > $scroll_height){
                $('.lk-scroll-to-top').addClass('show-up');
            }else{
                $('.lk-scroll-to-top').removeClass('show-up');
            }
        }

        function initHeaderFixed(){
            var $header_height_fixed = $('header').attr('data-heigh-fixed'),
                $header_height = $('header').outerHeight(),
                $window_width = $(window).width();

            if($window_width > 991){
                if(typeof $header_height_fixed !='undefined' && !isNaN($header_height_fixed)){
                    if( $(window).scrollTop() >= $header_height_fixed){
                        $('body:not(.has-header-float)').css('padding-top',$header_height + 'px');
                        $('header').addClass('header-fixed show-up');
                    }else{
                        $('body:not(.has-header-float)').css('padding-top','0px');
                        $('header').removeClass('show-up').removeClass('header-fixed');
                    }

                }
            }
        }

        function processSrollToTop(){
            $('a','.lk-scroll-to-top').off('click').on('click',function(){
                $('html,body').animate({ scrollTop: 0 }, 600);
            });
        }

        /** Tab process **/
        function processTab(){
            $('.lk-tab-container').each(function () {
                var $tab_container = $(this);
                $('.lk-tab a', $tab_container).on('click', function () {
                    var $tab_id = $(this).attr('data-tab'),
                        $tab = $('#' + $tab_id, $tab_container);
                    if ($tab_id.length > 0) {
                        $('.lk-tab-wrap li a.active', $tab_container).removeClass('active');
                        $(this).addClass('active');
                        $('.lk-tab-content', $tab_container).fadeOut(function () {
                            $('.lk-tab-content li.active',$tab_container).removeClass('active');
                            $tab.addClass('active');
                            $('.lk-tab-content', $tab_container).fadeIn();
                        });
                    }

                });
            });
        }

        /** Process animation element **/
        function animationElement() {
            $('.appear-animation:not(.manual):not(.has-animated)').each(function () {
                var $elm = $(this),
                    $animation = $elm.attr('data-animation'),
                    $percent = $elm.attr('data-animation-percent'),
                    $delay = $elm.attr('data-animation-delay');
                if (typeof $delay == 'undefined' && isNaN($delay)) {
                    $delay = 0;
                }
                if (typeof $percent == 'undefined' && isNaN($percent)) {
                    $percent = 0.8;
                }
                if (isAppear($elm, $percent)) {
                    setTimeout(function () {
                        var $delay_remove = 1500 + parseInt($delay);
                        $elm.addClass('animated ' + $animation);
                        $elm.addClass('has-animated');
                        setTimeout(function () {
                            $elm.removeClass('animated ' + $animation);
                            $elm.removeClass('appear-animation');
                        }, $delay_remove);
                    }, $delay);
                }
            });
        };

        /** Progressbar **/
        function progressBarRunning() {
            $('.lk-progressbar-container:not(.has-animated):not(.running-animation)').each(function () {
                var $container = $(this),
                    $is_running = true;
                if ($container.hasClass('appear-animation')) {
                    $is_running = isAppear($container,0.6);
                }
                if ($is_running) {
                    $('.lk-progressbar', $container).each(function () {
                        var $this = $(this),
                            $container = $this.closest('.lk-progressbar-container'),
                            $color = $this.attr('data-color'),
                            $percent = $this.attr('data-percent'),
                            $title = $('.lk-progressbar-title', $this),
                            $cricle = $('.lk-circle',$this),
                            $lk_bar_inner = $('.lk-bar-inner', $this),
                            $lk_bar_outer = $('.lk-bar-outer', $this),
                            $title_width = $title.width(),
                            $lk_bar_outer_width = $lk_bar_outer.width(),
                            $percent_title_right = $lk_bar_outer_width - $title_width,
                            $delay = parseInt($($this).attr('data-delay'), 0);

                        $title.attr('data-percent-end', $percent);
                        $lk_bar_inner.css('background-color', $color);
                        setTimeout(function () {
                            $title.addClass('lk-animated lkFly');
                            $percent = parseInt($percent, 0);
                            for (var $i = 1; $i <= $percent; $i++) {
                                (function ($index) {
                                    var $delay = 500 + ($index * 10);
                                    setTimeout(function () {
                                        $title.attr('data-percent', $index + '%');
                                        var $percent_end = parseInt($title.attr('data-percent-end'), 0);
                                        if (($index + 15) >= $percent_end) {
                                            $lk_bar_inner.css('width', $percent_end + '%');
                                        } else {
                                            $lk_bar_inner.css('width', ($index + 15) + '%');
                                        }
                                        $lk_bar_inner.attr('data-percent', $index);
                                    }, $delay);
                                })($i);
                            }
                        }, $delay);
                        $container.addClass('has-animated');
                    })
                }
            });

            if($.isFunction($.fn.knob)){
                $('.lk-progressbar-knob:not(.has-animated)').each(function(){
                    var $container = $(this),
                        $is_running = true;
                    if($container.hasClass('running-animation')){
                        $is_running = isAppear($container);
                    }
                    if($is_running){
                        $container.removeClass('running-animation').addClass('has-animated');
                        $('.lk-progressbar:not(.has-animated)', $container).each(function(){
                            var $input = $('input',this),
                                $percent = $input.attr('data-value');
                            $input.knob();
                            $input.css('opacity',1);
                            $(this).addClass('has-animated');
                            for (var $i = 1; $i <= $percent; $i++) {
                                (function ($index) {
                                    var $delay = 500 + ($index * 10);
                                    setTimeout(function () {
                                        $input.val($index).trigger('change');
                                    }, $delay);
                                })($i);
                            };
                        })
                    }
                })
            }
        };

        /** Counter **/
        function counterRunning() {
            $('.lk-counter-container:not(.has-animated)').each(function () {
                var $container = $(this),
                    $is_running = true;
                if ($container.hasClass('appear-animation')) {
                    $is_running = isAppear($container);
                }
                if ($is_running) {
                    $('.lk-counter-item', $container).each(function () {
                        var $data_start = $(this).attr('data-start'),
                            $data_end = $(this).attr('data-end'),
                            $data_duration = $(this).attr('data-duration'),
                            $data_delay = $(this).attr('data-delay'),
                            $counter_id = $(this).attr('data-counter-id');

                        setTimeout(function () {
                            new CountUp($counter_id, $data_start, $data_end).start();
                        }, $data_delay);
                        $container.addClass('has-animated');
                    });
                }
            });
        };

        /** Accordion **/
        function processAccordion() {
            $('.lk-accordion-content', '.lk-accordion-item.active').slideToggle();

            $('.lk-accordion-title', '.lk-accordion-container').on('click', function (event) {
                var $accordion_item = $(this).closest('.lk-accordion-item'),
                    $container = $accordion_item.closest('.lk-accordion-container'),
                    $close_prev = $container.attr('data-close-prev'),
                    $accordion_item_active = $('.lk-accordion-item.active', $container);
                $close_prev = typeof $close_prev != 'undefined' ? $close_prev : 0;
                if ($accordion_item.length > 0) {
                    if ($close_prev == 1) {
                        $('.lk-accordion-content', $accordion_item_active).slideUp();
                        if ($(this).closest('.lk-accordion-item').hasClass('active')) {
                            $accordion_item_active.removeClass('active');
                            return;
                        }
                    }
                    $accordion_item_active.removeClass('active');
                    $accordion_item.toggleClass('active');
                    $('.lk-accordion-content', $accordion_item).slideToggle();
                }
            });
        };

        /** Magic line **/
        function setMagicLinePosition($elm_active) {
            var $width = $('a', $elm_active).width(),
                $position = $('a', $elm_active).position(),
                $container = $($elm_active).closest('.lk-magic-line');

            if (typeof $position != 'undefined') {
                var $left = $('a', $elm_active).position().left,
                    $padding_left = $('a', $elm_active).css('padding-left').replace('px', '');

                $left = parseFloat($left) + parseFloat($padding_left);
                $('.magic-line-bottom', $container).css('left', $left + 'px');
                $('.magic-line-bottom', $container).css('width', $width + 'px');
            }
        };

        function isAppear(elm, percent_height) {
            var windowTop = $(window).scrollTop(),
                windowBottom = windowTop + $(window).height(),
                $height = $(elm).height(),
                elemTop = $(elm).offset().top,
                elemBottom = elemTop + $height,
                $height_appear = elemBottom - windowBottom;
            if (typeof percent_height == 'undefined' || isNaN(percent_height)) {
                percent_height = 0.8;
            }
            if (( $height_appear <= 0 || $height_appear <= ($height * percent_height) ) && (elemTop >= windowTop || windowBottom > elemBottom)) {
                return true;
            }
            return false;
        };

        function processMenuFloat(){
            $('a.icon-menu-float','.menu-float-container').off('click').on('click',function(){
               $('header').toggleClass('menu-float-open');
            });
            $('li.has-sub-menu a','.lk-menu-float').off('click').on('click',function(event){
                event.preventDefault();
                var $li = $(this).closest('li');
                if(typeof $li !='undefined'){
                    $li.toggleClass('open-sub-menu');
                }
                return false;
            });
        }

        function init() {
            animationElement();
            processTab();
            processAccordion();
            processSrollToTop();
            progressBarRunning();
            initCarousel();
            initPopupGallery();
            initIsotope();
            initMagicLine();
            initPortfolioFilter();
            videoInit();
            initSocialShare();
            processMenuFloat();
            initSlider();
            if($('body').hasClass('smooth-scroll')){
                if(typeof SmoothScroll =='function'){
                    SmoothScroll({ stepSize: 100 });
                }
            }
        }
        init();

        $(window).scroll(function () {
            animationElement();
            counterRunning();
            progressBarRunning();
            initSrollToTop();
            initHeaderFixed();
        });

        $(window).resize(function(){
            initSlider();
        })

    })
})(jQuery);
