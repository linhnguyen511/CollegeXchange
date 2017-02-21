app.controller("delPostCtrl",function($scope, $http, $stateParams,Flash,$location){
  $scope.message={};

  // $http({ url: '/api/posts', method: "GET", json: true, headers: { "content-type": "application/json"}})
  $http.delete('/api/deletepost', {params: {type:$stateParams.type}})
    .then(function(res){
          if (res.status == 200) {
             Flash.create('success', res.data);
             $location.path("/");
          }
      }, function (res) { //catch error
          if (res.status == 401) {
            //  $scope.myForm = {};
             Flash.create('danger', res.data);
          }
      }, function (evt) {
    });
});
