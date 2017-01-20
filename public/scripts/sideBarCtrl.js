app.controller("sideBarControllerButton",function($scope){
    $scope.change=function(cb){
          console.log(cb);
          window.location.href ='#!sidebar/'+ cb;
    };
});

app.controller("sidebarController",function($scope,$http,$stateParams){
    $scope.products={};
    $http.get('/api/sidebar',{params: {type:$stateParams.type}})
      .then(function(data){
          $scope.products = data.data;
          console.log(data.data);
    });
    // $http({ url: '/api/posts', method: "GET", json: true, headers: { "content-type": "application/json"}})
});
