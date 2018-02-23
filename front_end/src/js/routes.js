'use strict';
/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function($stateProvider, $urlRouterProvider, $httpProvider) {
        // For unmatched routes
        $urlRouterProvider.otherwise('/');
        // Application routes
        $stateProvider.state('Index', {
            url: '/',
            controller: 'IndexController',
        }).state('Login', {
            url: '/login',
            templateUrl: 'templates/login.template.html',
            controller: 'LoginController',
        }).state('Register', {
            url: '/register',
            templateUrl: 'templates/register.template.html',
            controller: 'RegisterController',
        }).state('App', {
            url: '/app',
            templateUrl: 'templates/app.template.html',
            controller: 'AppController',
        }).state('App.Dashboard', {
            url: '/dashboard',
            templateUrl: 'templates/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'Dashboard',
        }).state('App.Accidents', {
            url: '/accidents',
            templateUrl: 'templates/accidents.template.html',
            controller: 'AccidentsController',
        }).state('App.Users', {
            url: '/users',
            templateUrl: 'templates/users.template.html',
            controller: 'UsersController'
        }).state('App.Maps', {
            url: '/maps',
            templateUrl: 'templates/maps.template.html'
        }).state('App.Profile', {
            url: '/profile',
            controller: 'UserController',
            templateUrl: 'templates/user.template.html'
        });
        //adding our x-access-token-header
        // $httpProvider.interceptors.push('httpRequestInterceptor');
        // $httpProvider.interceptors.push(function($q, $cookies) {
        //     return {
        //         'request': function(parmconfig) {
        //             parmconfig.headers['x-access-token'] = $cookies.get('token');
        //             return parmconfig;
        //         }
        //     };
        // });
    }
]);