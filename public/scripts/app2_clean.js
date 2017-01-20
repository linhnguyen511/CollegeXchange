'use strict';

var app = angular.module('CleanAppView',['ui.router']);
app.config(function($stateProvider,$urlRouterProvider){
      $urlRouterProvider.otherwise('/');

      $stateProvider
      //route for home page
    
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
