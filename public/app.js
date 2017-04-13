'use strict';

angular.module('angularJSNgRepeatHashKey', [
    'ui.router'
]).config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
    });

}).run(function () {

});