angular.module('RDash').factory('Accidents', ['$resource', function($resource) {
    return $resource('http://localhost:3000/accidents/id/:accidentId', {
        accidentId: '@_id'
    },{
  update: {method:'PUT'}
 });
}]);