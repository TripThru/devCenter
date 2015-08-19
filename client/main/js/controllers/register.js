angular
.module('devCenter')
.controller("RegisterCtrl", ['$meteor', '$state', '$mdDialog',
  function($meteor, $state, $mdDialog){
    var vm = this;

    vm.credentials = {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      password: '',
      reason: ''
    };

    function allRequiredFieldsFilled() {
      return vm.credentials.firstName !== '' &&
              vm.credentials.lastName !== '' &&
              vm.credentials.companyName !== '' &&
              vm.credentials.email !== '' &&
              vm.credentials.password !== '';
    }

    vm.error = '';

    vm.register = function (){
      if(allRequiredFieldsFilled()) {
        $meteor.createUser({
          email: vm.credentials.email,
          password: vm.credentials.password,
          profile: {
            firstName: vm.credentials.firstName,
            lastName: vm.credentials.lastName,
            companyName: vm.credentials.companyName,
            reason: vm.credentials.reason
          }
        })
        .then(
          function(){
            var confirmationDialog = $mdDialog.alert()
                .parent(angular.element(document.body))
                .title('Registration complete')
                .content('Your API keys were sent to ' + vm.credentials.email)
                .ariaLabel('Registration complete')
                .ok('Got it!');
            $mdDialog
              .show(confirmationDialog)
              .then(function(){
                $state.go('welcome');
              });
          },
          function(err){
            var reason = err.reason;
            if(reason === 'Internal server error') {
              reason = 'Oops, an error ocurred. Try again later or talk to support.';
            }
            vm.error = reason;
          }
        );
      }
    };
  }
]);