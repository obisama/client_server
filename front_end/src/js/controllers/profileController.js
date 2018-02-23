angular.module('RDash').controller("UserController", ['$scope', 'Users','$cookies', function($scope, Users,$cookies) {

 user = JSON.parse($cookies.get('user'));
 var olduser=user;


 $scope.update=function(){
 	var newUser={};
 	newUser=olduser;
 	newUser.username=$scope.user.username
 	if( $scope.user.password)
 		newUser.Password=$scope.user.password
 	console.log(newUser)

 	   Users.update({id:newUser._id},newUser, function(response) {
         console.log(response);
         });
 }
}])