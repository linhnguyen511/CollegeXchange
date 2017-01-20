app.controller("itemsController",function($scope, $http, $stateParams,$location){
  $scope.products={};
  console.log($stateParams);
  console.log($location.url());

  $http.get('/api/items', {params: $stateParams})
    .then(function(data){
        $scope.products = data.data;
        console.log(data.data);
    });

});
