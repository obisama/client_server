/**
 * Alerts Controller
 */

angular.module('RDash').controller('LoginController', ['$cookies', '$scope', '$state', '$http','Login','$rootScope', LoginController]);

function LoginController($cookies, $scope, $state, $http,Login,$rootScope) {
    // Retrieving a cookie
    var token = $cookies.get('token');
    var user = $cookies.get('user');
    if (token) {
        $state.go('App');
    }
    
    $scope.login = function() {
        //mail@admin.com"
        var data = {
                 email:$scope.email,
                 password: $scope.password
            }
            console.log(data);
       // Login.save(data,function(response)
       //  {
       //      console.log(response)
       //      $uibModalInstance.close();
       //  });
        $http({
            method: 'POST',
            url: "http://localhost:3000/authentificate",
             headers: {'Content-Type': 'application/json; charset=utf-8' },
            data: {
                 email:$scope.email,
                 password: $scope.password
            }
        }).then(function mySuccess(response) {
            // here we have to make a push notification ... to be done
            console.log(response)
            if (response.data.success) {
                $cookies.put('token', response.data.token);
                $cookies.putObject('user', response.data.user)
                $rootScope.register=false;
                $state.go('App');
            }
        }, function myError(response) {
//             ngToast.create({
//   className: 'error',
//   content: '<a href="#" class="">a message</a>'
// });

        });
        //CALL backend
    };

    $scope.register=function() {
        console.log("register is not found")
        $state.go('Register')
    }
}