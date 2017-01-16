app.controller("subcategoryController",function($scope,$http, $stateParams){
    $scope.products={};
    console.log('Enter top controller');
    // $http({ url: '/api/posts', method: "GET", json: true, headers: { "content-type": "application/json"}})
      $http.get('/api/subcategory', {params: {type:$stateParams.type}})
      .then(function(data){
          $scope.products = data.data;
          console.log(data.data);
      });

});
