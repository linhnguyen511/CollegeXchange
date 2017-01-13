'use strict';

var app = angular.module('CollegeXchangeApp',['ui.router']);
app.config(function($stateProvider,$urlRouterProvider){
      $urlRouterProvider.otherwise('/');

      $stateProvider
      //route for home page
      .state ('home', {
            url:'/',
            templateUrl:'productlist.html',
            controller:'contentController'
      })
      //route for books page
      .state ('books', {
            url:'/books',
            templateUrl:'productlist.html',
            controller:'booksController'
      })

      //--------FURNITURE ------------------------------------
      .state ('furniture', {
            url:'/furniture',
            templateUrl:'productlist.html',
            controller:'furnitureController'
      })
      .state ('apparel', {
            url:'/apparel',
            templateUrl:'productlist.html',
            controller:'apparelController'
      })
      .state ('top', {
            url:'/top',
            templateUrl:'productlist.html',
            controller:'topController'
      })
      .state ('bottom', {
            url:'/bottom',
            templateUrl:'productlist.html',
            controller:'bottomController'
      })
      .state ('dress', {
            url:'/dress',
            templateUrl:'productlist.html',
            controller:'dressController'
      })
      .state ('coat', {
            url:'/coat',
            templateUrl:'productlist.html',
            controller:'coatController'
      })
      .state ('shoes', {
            url:'/shoes',
            templateUrl:'productlist.html',
            controller:'shoesController'
      })
      .state ('accessories', {
            url:'/accessories',
            templateUrl:'productlist.html',
            controller:'accessoriesController'
      })

      //---------SUPPLIES ------------------------------------------
      .state ('supplies', {
            url:'/supplies',
            templateUrl:'productlist.html',
            controller:'suppliesController'
      })
      .state ('paper', {
            url:'/paper',
            templateUrl:'productlist.html',
            controller:'paperController'
      })
      //route for cart
      .state ('cart', {
            url:'/cart',
            templateUrl:'cart.html',
            controller:'cartController'
      })
      //route for dollarstore page
      .state ('dollarstore', {
            url:'/dollarstore',
            templateUrl:'productlist.html',
            controller:'dollarController'
      })
      .state ('post', {
            url:'/post',
            templateUrl:'post.html',
            controller:'categoryCntrl'
      })



});
