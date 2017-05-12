/*!
 *  Howler.js Audio Player Demo
 *  howlerjs.com
 *
 *  (c) 2013-2017, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */
(function ($) {
  $(document).ready(function () {
    // Cache references to DOM elements.
    var elms = ['track', 'timer', 'duration', 'playBtn', 'pauseBtn', 'prevBtn', 'nextBtn', 'playlistBtn', 'volumeBtn', 'progress', 'bar', 'wave', 'loading', 'playlist', 'list', 'volume', 'barEmpty', 'barFull', 'sliderBtn'];
    elms.forEach(function(elm) {
      window[elm] = document.getElementById(elm);
    });

    /**
     * Player class containing the state of our playlist and where we are in it.
     * Includes all methods for playing, skipping, updating the display, etc.
     * @param {Array} playlist Array of objects with playlist song details ({title, file, howl}).
     */
    var Player = function(playlist, container) {
      this.playlist = playlist;
      this.index = 0;
      this.container = container;

      // Display the title of the first track.

      if($('.track',this.container).length>0){
        //track.innerHTML = '1. ' + playlist[0].title;
        $('.track',this.container).html('1. ' + playlist[0].title);
      }


      // Setup the playlist display.
      playlist.forEach(function(song) {
        var $div = $('<div class="list-song"></div>'),
            $list = $('.list', this.container);

        $div.html(song.title);
        $div.on('click',function() {
          player.skipTo(playlist.indexOf(song));
        });
        if($list.length > 0){
          $list.append($div);
        }
      });
    };
    Player.prototype = {
      /**
       * Play a song in the playlist.
       * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
       */
      play: function(index) {
        var self = this;
        var sound;

        index = typeof index === 'number' ? index : self.index;
        var data = self.playlist[index];

        // If we already loaded this track, use the current one.
        // Otherwise, setup and load a new Howl.
        if (data.howl) {
          sound = data.howl;
        } else {
          sound = data.howl = new Howl({
            src: data.file,// [ data.file + '.webm',  data.file + '.mp3'],
            html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
            onplay: function() {
              // Display the duration.
              var $duration = $('.duration',this.container),
                  $bar = $('.bar',this.container),
                  $pauseBtn = $('.pauseBtn',this.container),
                  $waveform = $('.waveform', this.container);

              if($duration.length>0){
                $duration.html( self.formatTime(Math.round(sound.duration())) );
              }

              // Start upating the progress of the track.
              requestAnimationFrame(self.step.bind(self));

              // Start the wave animation if we have already loaded
              $waveform.show();
              $bar.hide();
              $pauseBtn.show();
            },
            onload: function() {
              var $bar = $('.bar',this.container),
                  $waveform = $('.waveform', this.container),
                  $loading = $('.loading', this.container);
              // Start the wave animation.
              $waveform.show();
              if($bar.length>0){
                $bar.hide();
              }
              if($loading.length > 0){
                $loading.hide();
              }
            },
            onend: function() {
              var $bar = $('.bar',this.container),
                  $waveform = $('.waveform', this.container),
                  $pauseBtn = $('.pauseBtn',this.container),
                  $playBtn = $('.playBtn', this.container);

              // Stop the wave animation.
              $waveform.hide();
              if($bar.length>0){
                $bar.show();
              }
              $pauseBtn.hide();
              $playBtn.show();
              //self.skip('right'); re-play
            },
            onpause: function() {
              var $bar = $('.bar',this.container),
                  $waveform = $('.waveform', this.container);
              // Stop the wave animation.
              $waveform.hide();
              if($bar.length>0){
                $bar.show();
              }
            },
            onstop: function() {
              var $bar = $('.bar',this.container),
                  $waveform = $('.waveform', this.container);
              // Stop the wave animation.
              $waveform.hide();
              if($bar.length>0){
                $bar.show();
              }
            }
          });
        }

        // Begin playing the sound.
        sound.play();

        // Update the track display.
        //track.innerHTML = (index + 1) + '. ' + data.title;
        $('.track',this.container).html((index + 1) + '. ' + data.title);

        // Show the pause button.
        var $playBtn = $('.playBtn', this.container),
            $pauseBtn = $('.pauseBtn',this.container);

        if($pauseBtn.length > 0 && $playBtn.length > 0){
          if (sound.state() === 'loaded') {
            $playBtn.hide();
            $pauseBtn.show();
          } else {
            $('.loading',this.container).show();
            $playBtn.hide();
            $pauseBtn.hide();
          }
        }
        // Keep track of the index we are currently playing.
        self.index = index;
      },

      /**
       * Pause the currently playing track.
       */
      pause: function() {
        var self = this;

        // Get the Howl we want to manipulate.
        var sound = self.playlist[self.index].howl;

        // Puase the sound.
        sound.pause();

        // Show the play button.
        var $playBtn = $('.playBtn', this.container),
            $pauseBtn = $('.pauseBtn',this.container);
        if($playBtn.length>0 && $pauseBtn.length>0){
          $playBtn.show();
          $pauseBtn.hide();
        }
      },

      /**
       * Skip to the next or previous track.
       * @param  {String} direction 'next' or 'prev'.
       */
      skip: function(direction) {
        var self = this;

        // Get the next track based on the direction of the track.
        var index = 0;
        if (direction === 'prev') {
          index = self.index - 1;
          if (index < 0) {
            index = self.playlist.length - 1;
          }
        } else {
          index = self.index + 1;
          if (index >= self.playlist.length) {
            index = 0;
          }
        }

        self.skipTo(index);
      },

      /**
       * Skip to a specific track based on its playlist index.
       * @param  {Number} index Index in the playlist.
       */
      skipTo: function(index) {
        var self = this,
            $progress = $('.progress',this.container);

        // Stop the current track.
        if (self.playlist[self.index].howl) {
          self.playlist[self.index].howl.stop();
        }

        // Reset progress.
        if($progress.length>0){
          //progress.style.width = '0%';
          $progress.css('width','0%');
        }


        // Play the new track.
        self.play(index);
      },

      /**
       * Set the volume and update the volume slider display.
       * @param  {Number} val Volume between 0 and 1.
       */
      volume: function(val) {
        var self = this,
            $barFull = $('.barFull',this.container),
            $sliderBtn = $('.sliderBtn',this.container),
            $containerWidth = $(this.container).width();

        // Update the global volume (affecting all Howls).
        Howler.volume(val);

        // Update the display on the slider.
        var barWidth = (val * 90) / 100;
        if(barWidth <= 0.9 && barWidth>=0){
          $barFull.css('width', (barWidth * 100) + '%' );
          $sliderBtn.css('left', ($containerWidth * barWidth + $containerWidth * 0.05 - 25) + 'px' );
          $(this.container).removeClass('volume-off');
          $(this.container).removeClass('volume-down');
          if(barWidth>=0 && barWidth <=0.02){
            $(this.container).addClass('volume-off');
          }
          if(barWidth>0.02 && barWidth < 0.5){
            $(this.container).addClass('volume-down');
          }
        }
      },

      /**
       * Seek to a new position in the currently playing track.
       * @param  {Number} per Percentage through the song to skip.
       */
      seek: function(per) {
        var self = this;

        // Get the Howl we want to manipulate.
        var sound = self.playlist[self.index].howl;

        // Convert the percent into a seek position.
        if (sound.playing()) {
          sound.seek(sound.duration() * per);
        }
      },

      /**
       * The step called within requestAnimationFrame to update the playback position.
       */
      step: function() {
        var self = this,
            $progress = $('.progress',this.container);

        // Get the Howl we want to manipulate.
        var sound = self.playlist[self.index].howl;

        // Determine our current seek position.
        var seek = sound.seek() || 0,
            $timer = $('.timer',this.container);
        if($timer.length>0){
          $timer.html( self.formatTime(Math.round(seek)) );
        }
        $progress.css('width', (((seek / sound.duration()) * 100) || 0) + '%' );
        //progress.style.width = (((seek / sound.duration()) * 100) || 0) + '%';

        // If the sound is still playing, continue stepping.
        if (sound.playing()) {
          requestAnimationFrame(self.step.bind(self));
        }
      },

      /**
       * Toggle the playlist display on/off.
       */
      togglePlaylist: function() {
        var self = this,
            $playlist = $('.playlist',this.container);

        var display = $playlist.is(':visible') ? 'none' : 'block';

        setTimeout(function() {
          $playlist.css('display', display);
        }, (display === 'block') ? 0 : 500);
        if(display==='block'){
          $playlist.fadeIn();
        }else{
          $playlist.fadeOut();
        }
        //playlist.className = (display === 'block') ? 'fadein' : 'fadeout';
      },

      /**
       * Toggle the volume display on/off.
       */
      toggleVolume: function() {
        var self = this,
            $volume = $('.volume',this.container);
        if($volume.length>0){
          var display = ($volume.css('display') === 'block') ? 'none' : 'block';

          setTimeout(function() {
            $volume.css('display', display);
          }, (display === 'block') ? 0 : 500);
          if(display==='block'){
            $volume.fadeIn();
          }else{
            $volume.fadeOut();
          }
          //$volume.className = (display === 'block') ? 'fadein' : 'fadeout';
        }
      },

      /**
       * Format the time from seconds to M:SS.
       * @param  {Number} secs Seconds to format.
       * @return {String}      Formatted time.
       */
      formatTime: function(secs) {
        var minutes = Math.floor(secs / 60) || 0;
        var seconds = (secs - minutes * 60) || 0;

        return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      }
    };

    $('.howler-audio-container').each(function(){
      var $container = $(this),
          $audio_title = $container.attr('data-audio-title'),
          $audio_file = $container.attr('data-audio-file');

// Setup our new audio player class and pass it the playlist.
      var player = new Player([
        {
          title: $audio_title,
          file: $audio_file,
          howl: null
        }
      ], $container);

// Bind our player controls.
      var $playBtn = $('.playBtn', $container),
          $pauseBtn = $('.pauseBtn', $container),
          $prevBtn = $('.prevBtn', $container),
          $nextBtn = $('.nextBtn', $container),
          $waveform = $('.waveform', $container),
          $playlistBtn = $('.playlistBtn',$container),
          $playlist = $('.playlist',$container),
          $volumeBtn = $('.volumeBtn', $container),
          $volume = $('.volume', $container),
          $barEmpty = $('.barEmpty', $container),
          $sliderBtn = $('.sliderBtn', $container);


      $playBtn.on('click', function() {
        player.play();
      });
      $pauseBtn.on('click', function() {
        player.pause();
      });
      $prevBtn.on('click', function() {
        player.skip('prev');
      });
      $nextBtn.on('click', function() {
        player.skip('next');
      });
      $waveform.on('click', function(event) {
        player.seek(event.clientX / window.innerWidth);
      });
      $playlistBtn.on('click', function() {
        player.togglePlaylist();
      });
      $playlist.on('click', function() {
        player.togglePlaylist();
      });
      $volumeBtn.on('click', function() {
        player.toggleVolume();
      });
      $volume.on('click', function() {
        player.toggleVolume();
      });

// Setup the event listeners to enable dragging of volume slider.
      $barEmpty.on('click', function(event) {
        var $barEmptyWidth = $(this).width(),
            offset = $(this).offset(),
            layerX = (event.pageX - offset.left);
            per = layerX / parseFloat($barEmptyWidth);
        player.volume(per);
      });
      $sliderBtn.on('mousedown', function() {
        window.sliderDown = true;
      });
      $sliderBtn.on('touchstart', function() {
        window.sliderDown = true;
      });
      $volume.on('mouseup', function() {
        window.sliderDown = false;
      });
      $volume.on('touchend', function() {
        window.sliderDown = false;
      });

      var move = function(event) {
        if (window.sliderDown) {
          var offset = $(this).offset(),
              $sliderBtnWidth = $('.sliderBtn',this.container).width(),
              $barEmptyWidth = $('.barEmpty',this.container).width(),
              layerX = (event.pageX - offset.left - $sliderBtnWidth);
          per = layerX / parseFloat($barEmptyWidth);
          player.volume(per);
        }
      };

      $volume.on('mousemove', move);
      $volume.on('touchmove', move);

// Setup the "waveform" animation.
      var wave = new SiriWave({
        container: $waveform,
        width: $container.width(),
        height: $container.height() * 0.3,
        cover: true,
        speed: 0.03,
        amplitude: 0.7,
        frequency: 2
      });
      wave.start();

// Update the height of the wave animation.
// These are basically some hacks to get SiriWave.js to do what we want.
      var resize = function() {
        var height = $(window).width() * 0.3;
        var width = $(window).height();
        wave.height = height;
        wave.height_2 = height / 2;
        wave.MAX = wave.height_2 - 4;
        wave.width = width;
        wave.width_2 = width / 2;
        wave.width_4 = width / 4;

        $(wave.canvas).attr('height', height);
        $(wave.canvas).attr('width', width);
        $(wave.container).css('margin',-(height / 2) + 'px auto');

        // Update the position of the slider.
        var sound = player.playlist[player.index].howl;
        if (sound) {
          var vol = sound.volume();
          var barWidth = (vol * 0.9),
              $slideBtn = $('.slideBtn',this.container);
          $($slideBtn).css('left', (width * barWidth + height * 0.05 - 25) + 'px');
        }
      };
     /* window.addEventListener('resize', resize);
      resize();*/
    });
  })
})(jQuery)

