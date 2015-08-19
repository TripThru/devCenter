angular
.module('devCenter')
.controller('SwaggerCtrl', function($scope){
    // init form
    $scope.url = $scope.swaggerUrl = 'swagger.json';
    // error management
    $scope.myErrorHandler = function(data, status){
      $scope.swaggerError = 'Sorry, an error ocurred. Please try again later.'
    };
    // transform API explorer requests
    $scope.myTransform = function(request){
        request.headers['api_key'] = 's5hredf5hy41er8yhee58';
    };
});