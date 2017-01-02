var app= angular.module("CollegeXchangeApp",[]);
app.controller("contentController",function(){
  products= [
      { name:'product title 1',
        image:'../images/image1.jpg',
        price:'20.00',
        condition: 'new'
      },
      { name:'product title 2',
        image:'../images/image1.jpg',
        price:'20.00',
        condition: 'new'
      },
      { name:'product title 3',
        image:'../images/image1.jpg',
        price:'20.00',
        condition: 'new'
      },
      { name:'product title 4',
        image:'../images/image2.jpg',
        price:'20.00',
        condition: 'new'
      },
      { name:'product title 5',
        image:'../images/image1.jpg',
        price:'20.00',
        condition: 'new'
      }
  ];
  this.products =products;
});
