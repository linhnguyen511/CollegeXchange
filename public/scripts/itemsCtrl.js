app.controller("itemsController",function($scope, $http, $stateParams){
  $scope.products={};
  console.log($stateParams);

  // $http({ url: '/api/posts', method: "GET", json: true, headers: { "content-type": "application/json"}})
  $http.get('/api/items', {params: {type:$stateParams.type}})
    .then(function(data){
        $scope.products = data.data;
        console.log(data.data);
    });

});
