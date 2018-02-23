angular.module('RDash').controller("AccidentsController", ['$scope', '$http', '$uibModal', 'Accidents','$cookies', function($scope, $http, $uibModal, Accidents,$cookies) {
    //// AIzaSyCb-JXMXTGnQC51W83a00_H6R-ble25hzw
    
    
    $scope.isAllSelected = false;
    $scope.limit = 100;
    $scope.offset = 0;

    
    $scope.deleteAccidents = function() {
        var newDataList = [];
        //$scope.selectedAll = false;
        angular.forEach($scope.personalDetails, function(selected) {
            if (!selected.selected) {
                newDataList.push(selected);
            } else {
                console.log(selected);
                Accidents.delete({
                    accidentId: selected._id
                }, function() {
                    console.log("accidents deleted");
                }, function(err) {
                    console.log("accidents not deleted");
                });
            }
            $scope.personalDetails = newDataList;
        });
    }
    $scope.personalDetails = [];

    $scope.nextAccidents = function(offset) {
        $scope.offset += offset;
        if ($scope.offset>0) {
             $scope.token = $cookies.get('token');
            $http({
                method: 'GET',
                url: "http://localhost:3000/accidents?limit="+$scope.limit+"&offset="+$scope.offset,
                headers: {
                     'x-access-token': $scope.token
                }
            }).then(function mySuccess(response) {
                if (!$scope.personalDetails.length) {
                    $scope.disableNext = true;
                } else {
                    $scope.personalDetails = response.data;
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
         $scope.token = $cookies.get('token');
        $http({
            method: 'GET',
            url: "http://localhost:3000/accidents?limit="+$scope.limit+"&offset="+$scope.offset,
            headers: {
                  'x-access-token': $scope.token
            }
        }).then(function mySuccess(response) {

            $scope.personalDetails = response.data;
        }, function myError(response) {

        });

        user = JSON.parse($cookies.get('user'));
        console.log(user)
        console.log(user.userType)

        if(user.userType==='Admin')
        {
        $scope.isEditable=true
        }
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
        })
    }
    $scope.openDetails = function(accident) {
        console.log(accident);
        var ModeCreating = false;
        var modalInstance = $uibModal.open({
            templateUrl: '/templates/Popuptemplate.html',
            controller: 'PopinController',
            resolve: {
                Accident: function() {
                    return accident
                },
                Mode: function() {
                    return ModeCreating
                }
            }
        });
    };
    $scope.openEditor = function() {
        var ModeCreating = true;
        var modalInstance = $uibModal.open({
            templateUrl: '/templates/Popuptemplate.html',
            controller: 'PopinController',
            resolve: {
                Accident: function() {
                    return null
                },
                Mode: function() {
                    return ModeCreating
                }
            }
        });
    };
}]);
angular.module('RDash').controller("PopinController", ['$scope', '$http', '$uibModalInstance', 'Accidents', 'Accident', 'Mode','$cookies', function($scope, $http, $uibModalInstance, Accidents, Accident, Mode,$cookies) {
    $scope.ok = function() {
        $uibModalInstance.dismiss('cancel');
    };
    console.log(Accident)
   
    $scope.closeDetails = function() {
        $uibModalInstance.close();
    }
    $scope.savedetails = function(accidentScope) {
        Accidents.update({
            accidentId: accidentScope._id
        }, accidentScope, function(response) {
            $uibModalInstance.close();
        })
    }
    $scope.createAccident=function(accident)
    {
        Accidents.save(accident,function(response)
        {
            console.log("Success")
            $uibModalInstance.close();
        })
    }
    $scope.ajouterCommentaire=function(content){
        var user = JSON.parse($cookies.get('user'));
        $scope.token = $cookies.get('token');
        $http({
            method: 'POST',
            url: "http://localhost:3000/comments/accidents",
             headers: {  'x-access-token': $scope.token },
            data: {
                 usersId:user._id,
                 accidentID: Accident._id,
                 Num_Comment:$scope.Nbr_Comments+1,
                 accidentNum:Accident.Num_acc,
                 content:content
            }
        }).then(function mySuccess(response) {
            // here we have to make a push notification ... to be done
            console.log(response)
            if (response.data.success) {
               init();
            }
        }, function myError(response) {
//             ngToast.create({
//   className: 'error',
//   content: '<a href="#" class="">a message</a>'
// });

        });
    }
   
    var init=function(){

         if( Accident)
        {$scope.accident=Accident}
    if (!Mode) {
         $scope.mode = false;
         $scope.token = $cookies.get('token');
     $http({
            method: 'GET',
            url: "http://localhost:3000/comments/accidents/"+Accident._id,
            headers: {
              'x-access-token': $scope.token 
            }
        }).then(function mySuccess(response) {
            console.log(response)
            $scope.comments = response.data.content;
        }, function myError(response) {

        });
       
    } else {
        $scope.mode = true;
    }
        
    }

     init();

    //http://localhost:3000/comments/accidents/5a8806052a7b64686887bfd8
}]);
