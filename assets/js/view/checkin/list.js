define(
    [
        'jquery',
        'underscore',
        'backbone',
        'geoloc',
        'collections/checkins',
        'text!../../../template/checkin/list.html', // le plugin text permet de récupérer le template
        'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCZlmX0xG2lcIvIIB0blTX4lpvczWTBWUA'
    ], function($,_,Backbone,Geoloc,CheckInCollection, checkinListTemplate){

        var CheckInListView = Backbone.View.extend({
            el: '.checkin-template',

            template : _.template(checkinListTemplate),

            render: function(){
                console.log('CheckInListView Render');
                var self = this;
                checkInCollection = new CheckInCollection();
                console.log(checkInCollection);
                checkInCollection.fetch({
                    success: function (checkins){
                        //console.log(self.$el);
                        //console.log(checkins.models);
                        console.log('Checkins success')

                        self.$el.html(self.template({
                            checkInList: checkins.models
                        }));
                        //Geolocation geoloc = new Geolocation();
                        //geoloc.getLocation();
                        
                        // google maps
                        var mapOptions = {
                            center: { lat: parseFloat(45), lng: parseFloat(5)}, //france
                            zoom: 5
                        };

                       

                        $('#map').html();
                        var map = new google.maps.Map(document.getElementById('map'),mapOptions);

                        //boucle pour les marker sur la map
                        for (var i = 0; i < checkins.models.length; i++) {
                            //console.log(i);
                            var id = checkins.models[i].attributes.id;
                            var content = "<a href=\"#detailsCheckins/"+id+"\">Checkin numero "+id+"</a>";
                            var infowindow = new google.maps.InfoWindow();

                            var pos = new google.maps.LatLng(parseFloat(checkins.models[i].attributes.lat),parseFloat(checkins.models[i].attributes.lng));
                            var markerOption = {
                                animation: google.maps.Animation.DROP,
                                map: map,
                                position: pos,
                            };
                            var marker = new google.maps.Marker(markerOption);
                            google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
                                return function() {
                                    infowindow.setContent(content);
                                    infowindow.open(map,marker);
                                };
                            })(marker,content,infowindow));
                        }

                        //Marker pour la geoloc

                        var geoloc = new Geolocation(function(position) {
                            var content = "<p>Ma position</p>";
                            var infowindow = new google.maps.InfoWindow();

                            var pos = new google.maps.LatLng(parseFloat(position.coords.latitude),parseFloat(position.coords.longitude));
                            var markerOption = {
                                animation: google.maps.Animation.DROP,
                                map: map,
                                position: pos,
                                icon: "./assets/img/icon.png"                            };
                            var marker = new google.maps.Marker(markerOption);
                            google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
                                return function() {
                                    infowindow.setContent(content);
                                    infowindow.open(map,marker);
                                };
                            })(marker,content,infowindow));

                            console.log(position.coords.latitude + "" + position.coords.longitude);
                        });

                        geoloc.getGeolocation();
                    }
                });
            }

        });

        return CheckInListView;

});
