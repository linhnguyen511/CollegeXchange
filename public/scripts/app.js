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
      //route for cart
      .state ('cart', {
            url:'/cart',
            templateUrl:'cart.html',
            controller:'cartController'
      })
      //route for dollarstore page
      .state ('dollarstore', {
            url:'/dollarstore',
            templateUrl:'productlist.html'
      })
      .state ('post', {
            url:'/post',
            templateUrl:'post.html'

      })


});