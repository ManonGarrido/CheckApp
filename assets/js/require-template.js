define(
	[
	// definition des dependances
	'jquery', //Chargement de lib/jquery/query)
	], function($) {
		// On pase Jquery en parametre de la fonction
		//ce qui permet l'utilisation par la suite.
		// exemple: $('exemeple').hide();
		var initialize =function() {
			$('.navbar-brand').html('RequireJs Marche');
		}
		return{
			initialize: initialize
		};
		/*Ici on retourne ce qu'on veut pouvoir utiliser
		dans d'autre modules
		*/
	});
