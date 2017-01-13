app.controller("categoryCntrl",function($scope){
              $scope.categories = {
                  'Books':[],
                  'Apparel': ['Top','Bottom','Dress/Jumpsuit','Coats/Cardigan','Shoes','Accessories'],
                  'Furniture': ['Futons/Sofa', 'Desk/Desk Chairs','Bedroom Furniture','Bookcase/Shelves','Kitchen/Dining Furniture','Others'],
                  'School Supplies': ['Paper/Notebooks', 'Writing', 'Organization/Storage','Others']
                };
});
