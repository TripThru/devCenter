angular.module('devCenter',[
  'angular-meteor',
  'ui.router',
  'angularUtils.directives.dirPagination',
  'ngMaterial',
  'ngFileUpload',
  'ngImgCrop',
  'xeditable',
  'angular-sortable-view',
  'swaggerUi'
])
.config(function($mdThemingProvider, $mdIconProvider){
  $mdIconProvider
    .iconSet("social",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
    .iconSet("action",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
    .iconSet("navigation",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
    .iconSet("content",
             "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg");

  $mdThemingProvider.theme('default')
    .primaryPalette('blue')
    .accentPalette('orange');
});

function onReady() {
  angular.bootstrap(document, ['devCenter']);
}

if (Meteor.isCordova)
  angular.element(document).on("deviceready", onReady);
else
  angular.element(document).ready(onReady);
