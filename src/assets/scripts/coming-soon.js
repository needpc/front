/**
 * Created by lokitheme on 4/10/2017.
 */
"use strict";
function initComingSoonCountdown() {
    jQuery('.lk-coming-soon-container').css('opacity', 0);
    var $window_height = jQuery(window).height(),
        $body_height = jQuery('body').outerHeight(),
        $counter_height = jQuery('.lk-coming-soon-container').outerHeight(),
        $midder = ($window_height - $counter_height) / 2;

    $midder = $midder <= 100 ? 100 : $midder;

    jQuery('.lk-coming-soon-container').css('margin-top', $midder + 'px');
    jQuery('.lk-coming-soon-container').css('opacity', 1);
    if($window_height < $body_height){
        jQuery('.lk-bg-overlay-full-dot').css('height',$body_height + 'px');
        if(jQuery('.ytplayer-container').length>0){
            jQuery('.ytplayer-container').css('height',$body_height + 'px');
        }
    }else{
        jQuery('.lk-bg-overlay-full-dot').css('height',$window_height + 'px');
        if(jQuery('.ytplayer-container').length>0){
            jQuery('.ytplayer-container').css('height',$window_height + 'px');
        }
    }

}
(function ($) {
    $(document).ready(function () {

        if($('body.lk-coming-soon-bg').length > 0){
            var $images = $('.lk-countdown-container', 'body.lk-coming-soon-bg').attr('data-images'),
                $src=[];
            $images = $images.split(',');
            for(var $i=0; $i<$images.length; $i++){
                $src.push({src:$images[$i] });
            }
            if (typeof $images != 'undefined') {
                $('body.lk-coming-soon-bg').vegas({
                    slides: $src
                });
            }
        }

        if($('body.lk-coming-soon-video').length>0){
            var $video_id= $('.lk-countdown-container','body.lk-coming-soon-video').attr('data-video-id'),
                $mute = $('.lk-countdown-container','body.lk-coming-soon-video').attr('data-mute');
            $mute = $mute==='0' ? false : true;
            $('body').YTPlayer({
                fitToBackground: true,
                videoId: $video_id,
                pauseOnScroll: false,
                mute: $mute,
                playerVars: {
                    modestbranding: 0,
                    autoplay: 1,
                    controls: 1,
                    showinfo: 0,
                    branding: 0,
                    rel: 0,
                    autohide: 0
                }
            });
        }

    });
    $(window).resize(function () {
        initComingSoonCountdown();
    });
})(jQuery);

