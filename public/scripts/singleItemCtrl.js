app.controller("singleItemCtrl",function($scope, $http, $stateParams){
  $scope.singleitem={};
  console.log($stateParams);

  // $http({ url: '/api/posts', method: "GET", json: true, headers: { "content-type": "application/json"}})
  $http.get('/api/singleitem', {params: {type:$stateParams.type}})
    .then(function(data){
        if (data.data.length >0 ){
          $scope.singleitem = data.data[0];
          console.log(data.data);
        }

    });

});
