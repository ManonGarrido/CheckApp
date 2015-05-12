define(
	[
	// definition des dependances
	'jquery', //Chargement de lib/jquery/query)
	'underscore',
	'backbone',
	'config',//Config
	'view/checkin/list', // view/checkin/list.js 
	'view/checkin/details',
	'view/checkin/add'
	], function($,_,Backbone,Config,CheckInListView,CheckinDetailsView,CheckInAddView) {
		
		var Router = Backbone.Router.extend({
			routes:{
				'': 'home',
				'detailsCheckins/:id':'detailsCheckins',
				'checkin/add':'CheckInAdd'
			}

		});
		var initialize =function() {
			var routeur = new Router();

			$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
				options.url = Config.apiServer + options.url; // 'http://checkin-api.dev.cap-liberte.com'+ options.url;
				options.crossDomain = {
					crossDomain: true
				};
			});

			routeur.on('route:home',function(){
				
				checkInListView = new CheckInListView();
				checkInListView.render();
				console.log('Home');

			});



			routeur.on('route:detailsCheckins',function(id){
				checkinDetailsView = new CheckinDetailsView();
				checkinDetailsView.render({
					id:id
				});
			});
			
			routeur.on('route:CheckInAdd',function(){
				checkInAddView = new CheckInAddView();
				checkInAddView.render();
			});


			Backbone.history.start();
		};
		return{
			initialize: initialize
		};
				/*Ici on retourne ce qu'on veut pouvoir utiliser
				dans d'autre modules
				*/
	});
