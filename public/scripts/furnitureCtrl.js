app.controller("furnitureController",function($scope,$http){
    $scope.products={};
    console.log("Enter controller");
    // $http({ url: '/api/posts', method: "GET", json: true, headers: { "content-type": "application/json"}})
    $http.get('/api/furniture')
      .then(function(data){
          $scope.products = data.data;
          console.log(data.data);
      });

});
