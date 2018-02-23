angular.module('RDash').controller('RegisterController',
 ['$scope', '$state', '$http','Login', registercontroller]);

function registercontroller($scope, $state, $http,Login) {

console.log("We ARE IN REGISTER FUCK YOU")

$scope.register2=function(){
$http({
            method: 'POST',
            url: "http://localhost:3000/register",
             headers: {'Content-Type': 'application/json; charset=utf-8' },
            data: {
                 email:$scope.email,
                 password: $scope.password,
                 username:$scope.username,
            }
        }).then(function mySuccess(response) {
            // here we have to make a push notification ... to be done
            console.log(response)
           	console.log(response)
      		if( response.data.success)
      		{
      			$state.go('Login');
      		}
      	

            
        }, function myError(response) {
//             ngToast.create({
//   className: 'error',
//   content: '<a href="#" class="">a message</a>'
 });

//         });
	console.log($scope.username)
	console.log($scope.email)
	console.log($scope.password)
        //CALL backend
    };
};