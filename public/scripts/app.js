'use strict';

var app = angular.module('CollegeXchangeApp',['ui.router']);
app.config(function($stateProvider,$urlRouterProvider){
      $urlRouterProvider.otherwise('/items');

      $stateProvider
      //route for home page
      .state ('home', {
            url:'/',
            templateUrl:'productlist.html',
            controller:'contentController'
      })
      //route for category page
      .state ('items', {
            url:'/items/:category/:subcategory/:condition/:price',
            templateUrl:'productlist.html',
            controller:'itemsController',
            params: {
                category: { squash: true, value: null },
                subcategory: { squash: true, value: null },
                condition: { squash: true, value: null },
                price: { squash: true, value: null },

            }
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
      .state ('singleitem', {
            url:'/singleitem/:type',
            templateUrl:'singleItem.html',
            controller:'singleItemCtrl'
      })
      .state ('search', {
            url:'/search/:keyword',
            templateUrl:'productlist.html',
            controller:'searchController'
      })
      .state ('emailverification', {
            url:'/emailverification',
            templateUrl:'emailVerification.html',

      })
      .state ('privacy', {
            url:'/privacy',
            templateUrl:'privacy.html',

      })


});
