
app.controller("categoryCntrl",function(Upload,$scope,$http,Flash,$location){
    //create map for category and subcategory
    $scope.categories = {
        'Books':[],
        'Apparel': ['Top','Bottom','Dress and Jumpsuit','Coats and Cardigan','Shoes','Accessories'],
        'Furniture': ['Futons and Sofa', 'Desk and Desk Chairs','Bedroom Furniture','Bookcase and Shelves','Kitchen and Dining Furniture','Other Furniture'],
        'School Supplies': ['Paper and Notebooks', 'Writing', 'Organization and Storage','Other Supplies']
      };

      //submit files front client to back-end
      $scope.submitForm = function() {
        Upload.upload({
                url: '/api/createpost', //webAPI exposed to upload the file
                data:$scope.myForm //pass file as data
        }).then(function (res) { //upload function returns a promise
                console.log (res);
                if (res.status == 200) {
                   console.log(res.data);
                   Flash.create('success', res.data);
                   $location.path("/");
                }
            }, function (res) { //catch error
                console.log('Error status: ' + res.status);
                if (res.status == 401) {
                   console.log(res.data);
                  //  $scope.myForm = {};
                   Flash.create('danger', res.data);
                }
            }, function (evt) {
        });
        console.log('Enter submit');
        console.log($scope.myForm);
      };

});
