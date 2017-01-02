'use strict';

var app = angular.module('CollegeXchangeApp',['ngRoute']);
app.config(function($routeProvider){
      $routeProvider

      //route for home page
      .when ('/', {
            templateUrl:'productlist.html',
            controller:'contentController'
      })
      .when ('/books', {
            templateUrl:'sidebar.html'
      })
      .when ('/dollarstore', {
            templateUrl:'sidebar.html'
      })
      .otherwise ('/');
});
