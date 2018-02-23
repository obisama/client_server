angular.module('RDash').factory('Login', ['$resource', function($resource) {
    return $resource('http://localhost:3000/authentificate', {
    },{
  update: {method:'PUT'}
 });
}]);