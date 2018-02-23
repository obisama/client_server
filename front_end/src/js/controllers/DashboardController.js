/**
 * Alerts Controller
 */

angular
    .module('RDash')
    .controller('DashboardController', ['$scope', 'Users', 'Accidents', '$http','$cookies', DashboardController]);

function DashboardController($scope, Users, Accidents, $http,$cookies) {
    $scope.limit = 100;
    $scope.offset = 0;
    $scope.alerts = [];
    $scope.token = $cookies.get('token');
     
    $scope.addAlert = function() {
        $scope.alerts.push({
            msg: 'Another alert!'
        });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.nextAccidents = function(offset) {
        $scope.offset += offset;
        $scope.token = $cookies.get('token');
       
        if ($scope.offset>0) {
            $http({
                method: 'GET',
                url: "http://localhost:3000/accidents?limit="+$scope.limit+"&offset="+$scope.offset+"&token="+$scope.token,
                headers: {
                    'x-access-token': $scope.token
                }
            }).then(function mySuccess(response) {
                if (!$scope.accidents.length) {
                    $scope.disableNext = true;
                } else {
                    $scope.accidents = response.data;
                    $scope.disableNext = false;
                }
            }, function myError(response) {

            });
        } else {
            console.log('offset negative');
        }
    };

    init();

    function init() {
        Users.query(function(response) {
            $scope.users = response;
        });
          $scope.token = $cookies.get('token');
        $http({
            method: 'GET',
            url: "http://localhost:3000/accidents?limit="+$scope.limit+"&offset="+$scope.offset,
            headers: {
                 'x-access-token': $scope.token
            }
        }).then(function mySuccess(response) {

            $scope.accidents = response.data;
        }, function myError(response) {

        });
    }
}
