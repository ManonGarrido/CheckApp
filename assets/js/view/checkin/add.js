define(
    [
        'jquery',
        'underscore',
        'backbone',
        'models/checkin',
        'text!../../../template/checkin/add.html' // le plugin text permet de récupérer le template
    ], function($,_,Backbone,CheckInModel,checkinAddTemplate){

        var checkInAddView = Backbone.View.extend({
            el: '.checkin-template',
            template : _.template(checkinAddTemplate),
            events:{
                "submit #checkin-form":"saveCheckin"
            },
            render: function(){
                console.log('checkinAddTemplate Render');
                this.$el.html(this.template());   
            },
            saveCheckin: function(event){
                        event.preventDefault();

                        checkin = new CheckInModel();

                        serializeArray = $(event.currentTarget).serializeArray();

                        $.each(serializeArray, function(i, o){
                            checkin.set(o.name, o.value);
                        });
                        console.log(checkin);

                        checkin.save();

            }
        });

        return checkInAddView;

});