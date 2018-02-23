'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').run(['$rootScope', '$state', function($rootScope, $state) {
$rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params, {location: 'replace'})
      }
    });
}]);