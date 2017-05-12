/**
 * Created by lokitheme on 3/29/2017.
 */
"use strict";
(function ($) {
    $(document).ready(function () {

        function lk_count_down_callback(event, $this) {
            var seconds = parseInt(event.offset.seconds, 0),
                minutes = parseInt(event.offset.minutes, 0),
                hours = parseInt(event.offset.hours, 0),
                days = parseInt(event.offset.totalDays, 0),
                color = '';

            if($this.hasClass('lk-countdown-cricle')){
                $('.lk-countdown-second', $this).val(seconds).trigger('change');
                $('.lk-countdown-minute', $this).val(minutes).trigger('change');
                $('.lk-countdown-hour', $this).val(hours).trigger('change');
                $('.lk-countdown-day', $this).val(days).trigger('change');
            }

            seconds = seconds > 9 ? seconds : '0' + seconds;
            minutes = minutes > 9 ? minutes : '0' + minutes;
            hours = hours > 9 ? hours : '0' + hours;
            days = days > 9 ? days : '0' + days;

            if($('.lk-countdown-second-number', $this).length>0){
                $('.lk-countdown-second-number', $this).html(seconds);
            }
            if($('.lk-countdown-minute-number', $this).length>0){
                $('.lk-countdown-minute-number', $this).html(minutes);
            }
            if($('.lk-countdown-hour-number', $this).length> 0){
                $('.lk-countdown-hour-number', $this).html(hours);
            }
            if($('.lk-countdown-day-number', $this).length >0){
                $('.lk-countdown-day-number', $this).html(days);
            }

            if ($this.hasClass('lk-countdown-multiple-color')) {
                color = $('.lk-countdown-second', $this).attr('data-fgColor');
                $('.lk-countdown-second-number', $this).css('color', color);

                color = $('.lk-countdown-minute', $this).attr('data-fgColor');
                $('.lk-countdown-minute-number', $this).css('color', color);

                color = $('.lk-countdown-hour', $this).attr('data-fgColor');
                $('.lk-countdown-hour-number', $this).css('color', color);

                color = $('.lk-countdown-day', $this).attr('data-fgColor');
                $('.lk-countdown-hour-day-number', $this).css('color', color);
            }

        };

        $('.lk-countdown-container').each(function () {
            var $countdown_container = $(this),
                $date_end = $(this).attr('data-date-end'),
                $data_callback = $(this).attr('data-callback');

            if (typeof $date_end != 'undefined' && $date_end != '') {

                $('.lk-countdown-item', $countdown_container).each(function () {
                    var $input = $('input', this);
                    if(typeof $input !='undefined'){
                        $input.knob({
                            displayInput: false
                        });
                        $input.css('opacity', 1);
                    }
                });

                $countdown_container.countdown($date_end, function (event) {
                    lk_count_down_callback(event, $countdown_container);
                    if(typeof $data_callback!= 'undefined' && $data_callback != ''){
                        window[$data_callback]();
                    }
                }).on('update.countdown', function (event) {
                    lk_count_down_callback(event, $countdown_container);
                }).on('finish.countdown', function (event) {
                    $('.countdown-seconds', $countdown_container).html('00');
                });
            }

        });
    })
})(jQuery);