angular.module('RDash').controller("MapsController", ['$scope', 'NgMap', '$http', 'Accidents','$cookies',
  function($scope, NgMap, $http, Accidents,$cookies) {
    var vm = this;
    vm.center = [47.08, -2.39];
    vm.circles = []
    vm.circle = {}

    vm.circles.push(vm.circle);


    vm.getlocation = function() {
      var Mydata = {
        addr: vm.addr,
        radius: vm.radius
      }
      vm.raduis1 = vm.raduis

      $http.post('http://localhost:3000/localize', Mydata).success(function(data, status, headers, config) {
        if (data) {
          $scope.PostDataResponse = data;
          var position = [data.result[0].latitude, data.result[0].longitude];
          vm.setPositions(position)
          vm.circles = [];
          vm.circle = {
            raduis: vm.raduis1,
            position: position
          }
          vm.circles.push(vm.circle);
          vm.center = vm.circle.position;
        }

         $scope.token = $cookies.get('token');
        $http({
          method: "GET",
          url: "http://localhost:3000/accidents/raduis",
          params: { raduis: vm.raduis, lat: data.result[0].latitude, long: data.result[0].longitude },
          headers: {
                 'x-access-token': $scope.token
          }
        }).then(function mySuccess(response) {

          // vm.accidents=response.result[0];
          console.log(response.data.result);
          vm.accidents = response.data.result;
          for (var k in vm.accidents) {
            vm.accidents[k].pos = [response.data.result[k].coord.lat, response.data.result[k].coord.long]
            vm.accidents[k].name = k
          }
          vm.setPositions(vm.accidents);
        }, function myError(response) {
          vm.accidents = null;
        });


      }).error(function(data, status, header, config) {
        console.log(data);
      });
    };
    vm.setPositions = function(pos) {
      vm.positions = angular.copy(pos);
    };
    NgMap.getMap().then(function(map) {
      vm.map = map;
    });
    vm.currentIndex = 0;
    $scope.place = {};
  }
]);
