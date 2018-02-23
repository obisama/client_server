/**
 * Alerts Controller
 */
angular.module('RDash').controller('AppController', ['$cookies', '$scope', '$rootScope', '$state','$http', AppController]);

function AppController($cookies, $scope, $rootScope, $state,$http) {
    $scope.$state = $state;
    // Retrieving a cookie
    var token = $cookies.get('token');
    $scope.token=token;
    $rootScope.user = $cookies.getObject('user');
    if (!token) {
        console.log($rootScope.register)
              $state.go('Login');
    } else {
        if ($rootScope.user.userType === 'Admin') {
        	$state.go('App.Dashboard');
        } else {
        	$state.go('App.Maps');
        }
    }
}

