define(
    [
        'jquery',
        'underscore',
        'backbone',
        'models/checkin',
        'text!../../../template/checkin/detail.html',
        'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyCZlmX0xG2lcIvIIB0blTX4lpvczWTBWUA'
    ], function($,_,Backbone,CheckInModel,checkinDetailTemplate){

        var CheckInListView = Backbone.View.extend({
            el: '.checkin-template',
            mapEl: '.map',
            template : _.template(checkinDetailTemplate),

            render: function(id){
                console.log('checkinDetailTemplate Render');
                var self = this;
                checkInModel= new CheckInModel({
                    id:id.id
                    });
                checkInModel.fetch({
                    success: function (checkin){
                        /*console.log(self.$el);
                        console.log(checkin.models);
                        */

                        // google maps
                        var mapOptions = {
                            center: { lat: parseFloat(checkin.attributes.lat), lng: parseFloat(checkin.attributes.lng)},
                            zoom: 8
                        };
                        
                        self.$el.html(self.template({
                            checkinInfo: checkin.attributes.created_at,
                            userImg: checkin.attributes.user.picture,
                            userName: checkin.attributes.user.name
                        }));

                        $('#map').html();
                        var pos = new google.maps.LatLng(parseFloat(checkin.attributes.lat),parseFloat(checkin.attributes.lng));
                        var map = new google.maps.Map(document.getElementById('map'),mapOptions);
                        var markerOption = {
                            animation: google.maps.Animation.DROP,
                            map: map,
                            position: pos
                        };
                        var marker = new google.maps.Marker(markerOption);
                        console.log(checkin);

                        console.log('Succes');
                    }
                });
            }

        });

        return CheckInListView;

});