angular.module("devCenter").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
      .state('welcome', {
        url: '/',
        templateUrl: 'client/main/views/welcome.ng.html',
        controller: 'WelcomeCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'client/main/views/register.ng.html',
        controller: 'RegisterCtrl',
        controllerAs: 'rc'
      })
      .state('auth', {
        url: '/docs/auth',
        templateUrl: 'client/main/views/docs/auth.ng.html',
        controller: 'DocsCtrl'
      })
      .state('recordroamingrequest', {
        url: '/docs/recordroamingrequest',
        templateUrl: 'client/main/views/docs/recordroamingrequest.ng.html',
        controller: 'DocsCtrl'
      })
      .state('demo', {
        url: '/docs/demo',
        templateUrl: 'client/main/views/swagger.ng.html',
        controller: 'SwaggerCtrl'
      });

    $urlRouterProvider.otherwise("/");
  }]);

  //Work around for bug https://github.com/angular-ui/ui-router/issues/679
  angular.module('devCenter').run(function($state){});