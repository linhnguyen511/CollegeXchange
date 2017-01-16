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
      //route for category page
      .state ('items', {
            url:'/items/:type',
            templateUrl:'productlist.html',
            controller:'itemsController'
      })
      //route for subcategory page
      .state ('subcategory', {
            url:'/subcategory/:type',
            templateUrl:'productlist.html',
            controller:'subcategoryController'
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
      .state ('signup', {
            url:'/signup',
            templateUrl:'signup.html',
            controller: 'stageController'

      })



});
