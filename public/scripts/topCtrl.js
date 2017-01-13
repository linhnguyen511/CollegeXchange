app.controller("topController",function($scope,$http){
    $scope.products={};
    console.log('Enter top controller');
    // $http({ url: '/api/posts', method: "GET", json: true, headers: { "content-type": "application/json"}})
    $http.get('/api/top')
      .then(function(data){
          $scope.products = data.data;
          console.log(data.data);
      });

});
