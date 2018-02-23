angular.module('RDash').controller("UsersController", ['$scope', '$http', 'Users','$cookies',function($scope, $http, Users,$cookies) {
    $scope.isAllSelected = false;
    $scope.updateUser = function(user) {
        //TODO update restful
        console.log(user);
        user.isEditable = false;
         Users.update({id:user._id},user,function(response)
         {
             console.log(success);
         })
    };
    $scope.createUser = function(newUser) {
        newUser.password = 'toto';
        Users.save(newUser, function(response) {
            console.log(response);
            $scope.personalDetails.push(response);
            $scope.newUser = {};
        });
    };
    $scope.deleteUsers = function() {
        var newDataList = [];
        //$scope.selectedAll = false;
        angular.forEach($scope.personalDetails, function(selected) {
            if (!selected.selected) {
                newDataList.push(selected);
            } else {
                console.log(selected);
                Users.delete({
                    id: selected._id
                }, function() {
                    console.log("user deleted");
                }, function(err) {
                    console.log("user not deleted");
                });
            }
            $scope.personalDetails = newDataList;
        });
    }
    $scope.personalDetails = [];
    init();

    function init() {
        Users.query(function(response) {
            console.log(response);
            $scope.myWelcome = response;
            console.log($scope.myWelcome);
            console.log($scope.myWelcome[0]);
            $scope.personalDetails = $scope.myWelcome;
        });
    }
   
    $scope.toggleAll = function() {
        var toggleStatus = $scope.isAllSelected;
        angular.forEach($scope.personalDetails, function(itm) {
            itm.selected = toggleStatus;
        });
    }
    $scope.optionToggled = function() {
        $scope.isAllSelected = $scope.personalDetails.every(function(itm) {
            return itm.selected;
        });
    }
}]);