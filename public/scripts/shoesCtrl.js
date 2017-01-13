app.controller("shoesController",function($scope,$http){
    $scope.products={};
    // $http({ url: '/api/posts', method: "GET", json: true, headers: { "content-type": "application/json"}})
    $http.get('/api/shoes')
      .then(function(data){
          $scope.products = data.data;
          console.log(data.data);
      });

});
