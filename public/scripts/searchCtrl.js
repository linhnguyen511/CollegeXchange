app.controller("searchController",function($scope,$http,$stateParams){
    $scope.products={};
    $http.get('/api/search',{params: {type:$stateParams.keyword}})
      .then(function(data){
          $scope.products = data.data;
          console.log(data.data);
    });
    // $http({ url: '/api/posts', method: "GET", json: true, headers: { "content-type": "application/json"}})
});

app.controller("searchButtonController",function($scope){
    $scope.searchFunction=function(kw){
      window.location.href ='#!search/'+ kw;
    };
});
