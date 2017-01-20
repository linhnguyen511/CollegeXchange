var conditionA = []
app.controller("sideBarControllerButton",function($scope,$location,$http,$stateParams,$state){
    $scope.change=function(cb){
          console.log($stateParams);
          
          $stateParams.condition=cb;

          //  $state.go('items', $stateParams);
          // window.location.href = $location.url()+'/'+ cb;

          $http.get('/api/items', {params: $stateParams, condition:cb})
            .then(function(data){
                $scope.products = data.data;
                console.log(data.data);
          });
    };
});
