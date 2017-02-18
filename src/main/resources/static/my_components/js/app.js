(function(){
	'use strict';
	// cria um modulo chamado App injetando a diretiva ngRoute
	var app = angular.module('App', ['ui.router'])
		// assim que o angular for iniciado a rota home sera selecionada
		.run(['$state', function ($state) {
		   $state.transitionTo('home');
		}]);

	// configura o $routeProvider a fim de definir as rotas
	app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', { // cria o estado home
				url: '/home', // cria uma rota para o index '/'
				templateUrl: 'pages/home.html', // exibie dentro do ng-view esse conteudo
				controller: 'HomeController'
			})
			.state('user', { // cria o estado user
				url: '/user/:id', // cria uma rota com um parametro em /user/
				controller: 'UserController' // injeta o controller UserController no escopo da rota
			})
			.state('about', { // cria o estado about
				url: '/about', // cria uma rota para /about
				templateUrl: 'pages/about.html', // usa templateUrl para inserir um arquivo .html
				controller: 'AboutController' // injeta o controller UserController no escopo da rota
			})
			.state('contact', { // cria o estado contact
				url: '/contact', // cria uma rota para /contact
				controller: 'ContactController', // injeta o controller UserController no escopo da rota
				views: { // cria views parciais na rota /contact
					'': {templateUrl: 'pages/contact.html'}, // view parcial para ng-view default
					'maps@contact': {templateUrl: 'pages/contact-maps.html'}, // view parcial para ng-view com nome maps
					'form@contact': { // view parcial para ng-view com nome form
						templateUrl: 'pages/contact-form.html',
						controller: 'ContactFormController'
					}
				}
			});
		
			// habilita o modo html5 que retira o '#" das rotas
			// com isso faz-se necessario configurar o servidor para reenviar essas rotas ao Angular
			$locationProvider.html5Mode(true);
	});

	// cria o controller UserController injetando $scope e $routeParams
	app.controller('UserController', function($scope, $routeParams) {
		// imprime o valor do parametro da rota id (/user/:id)
		console.log($routeParams.id);
	});
	app.controller('HomeController', function($scope) {
	  $scope.message = 'Routing pages with ngRoute is damn awesome!';
	});

	app.controller('AboutController', function($scope) {
	  $scope.message = 'You can see more about ngRoute in the oficial website.';
	});

	app.controller('ContactController', function($scope) {
	  $scope.message = 'No. :P';
	});

	app.controller('ContactFormController', function($scope) {
	  $scope.message = 'Contact Form Controller';
	});
})();