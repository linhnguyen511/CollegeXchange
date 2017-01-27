app.controller("verifyController",function($scope, $http, $stateParams,$location){
  $scope.message={};
  console.log($stateParams);
  $http.get('/api/verify', {params: $stateParams})
    .then(function(data){
        $scope.message = data.data;
    });

});
