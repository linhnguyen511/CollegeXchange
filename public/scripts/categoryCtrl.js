app.controller("categoryCntrl",function($scope){
              $scope.categories = {
                  'Books':[],
                  'Apparel': ['Top','Bottom','Dress and Jumpsuit','Coats and Cardigan','Shoes','Accessories'],
                  'Furniture': ['Futons and Sofa', 'Desk and Desk Chairs','Bedroom Furniture','Bookcase and Shelves','Kitchen and Dining Furniture','Other Furniture'],
                  'School Supplies': ['Paper and Notebooks', 'Writing', 'Organization and Storage','Other Supplies']
                };
});
