angular.module('RDash').factory('Users', ['$resource', function($resource) {
    return $resource('http://localhost:3000/user/:id', {
        id: '@_id'
    },{
  update: {method:'PUT'}
 });
}]);
