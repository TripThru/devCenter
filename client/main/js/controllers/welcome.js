angular.module('devCenter').controller('WelcomeCtrl', ['$scope', '$state',
  function($scope, $state, $swaggerUi){
    $scope.goToRegistration = function() {
      $state.go('register');
    };
    $scope.goToDocs = function() {
      $state.go('auth');
    };
    $scope.goToDemo = function() {
      $state.go('demo')
    };
    $scope.goToSupport = function() {

    };
  }
]);