/**
 * Alerts Controller
 */

angular
    .module('RDash')
    .controller('IndexController', ['$state','$rootScope', IndexController]);

function IndexController($state,$rootScope) {
    // todo rederict to dashboard if admin rederict to maps if user 
     $state.go('App');
     $rootScope.register=true;
     $rootScope.gotoregister=function()
     {
        $scope.register=true;
         $state.go('/');
     };
}