
define([
	'jquery',
	'underscore',
	'backbone',
	'router'
	],	function($,_,Backbone,Router){
		var initialize = function(){
			$('.navbar-brand').html('CheckApp');
			Router.initialize();
		};
		return {
			initialize : initialize
		};
	}
);