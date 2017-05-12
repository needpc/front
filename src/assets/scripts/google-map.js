/**
 * Created by lokitheme on 4/5/2017.
 */
"use strict";
function lk_google_map_callback() {
    jQuery(document).ready(function () {

        var styledMapWaterType = new google.maps.StyledMapType([
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#6699ff'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ff9900'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ff9900'}]
            }
        ], {name: 'Style Map Blue'});

        jQuery('.lk-google-map-container').each(function () {
            var $container = jQuery(this),
                $this = jQuery('.lk-google-map', $container),
                $lat_x = $this.attr('data-latude-x'),
                $lat_y = $this.attr('data-latude-y'),
                $zoom = $this.attr('data-zoom'),
                $marker = $this.attr('data-marker') == 'true',
                $marker_icon = $this.attr('data-marker-icon'),
                $marker_info_show_default = $this.attr('data-marker-info-show-default') == 'true',
                $map_type = $this.attr('data-map-type'); //satellite, roadmap, hybrid, terrain

            $zoom = typeof $zoom != 'undefined' ? $zoom : 10;
            $map_type = typeof $map_type != 'undefined' ? $map_type : 'ROADMAP';

            if (typeof  $lat_x != 'undefined' && typeof $lat_y != 'undefined') {
                var map = null,
                    mapCenter = new google.maps.LatLng($lat_x, $lat_y),
                    options = {
                        center: mapCenter,
                        zoom: parseInt($zoom, 10),
                        type: $map_type,
                        mapTypeControlOptions: {
                                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
                        }
                    };

                map = new google.maps.Map($this[0], options);

                if ($marker) {
                    jQuery('.lk-google-map-marker-container .lk-google-map-marker-info', $container).each(function () {
                        var $marker_coords_x = jQuery(this).attr('data-latude-x'),
                            $marker_coords_y = jQuery(this).attr('data-latude-y');

                        if (typeof $marker_icon != 'undefined' && $marker_icon != '') {
                            var map_marker = new google.maps.Marker({
                                position: new google.maps.LatLng($marker_coords_x, $marker_coords_y),
                                icon: $marker_icon
                            });
                        } else {
                            var map_marker = new google.maps.Marker({
                                position: new google.maps.LatLng($marker_coords_x, $marker_coords_y),
                            });
                        }

                        map_marker.setMap(map);
                        var marker_info = new google.maps.InfoWindow({
                            content: jQuery(this).html(),
                            coords: [$marker_coords_x, $marker_coords_y]
                        });
                        google.maps.event.addListener(map_marker, 'click', function () {
                            marker_info.open(map, map_marker);
                        });
                        if ($marker_info_show_default) {
                            marker_info.open(map, map_marker);
                        }

                        google.maps.event.addDomListener(window, "resize", function() {
                            var center = map.getCenter();
                            google.maps.event.trigger(map, "resize");
                            map.setCenter(center);
                        });

                    });
                }
                ;

                map.mapTypes.set('styled_map', styledMapWaterType);
                map.setMapTypeId('styled_map');
            } else {
                jQuery(this).append('Please set map coordinates !');
            }
        });


    })
}


