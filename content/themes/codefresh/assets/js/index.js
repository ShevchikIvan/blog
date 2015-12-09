/*global angular, document*/

;(function() {
  "use strict";

  function cfRequestDemo() {
      return {
          scope: true,
          replace: true,
          templateUrl: '/partials/request.demo.html',
          controllerAs: 'vm',
          controller: function($scope, $http, $timeout, focus) {
            var vm = this;

            vm.state = {
              form: false,
              loading: false,
              success: false,
              error: false
            };

            vm.open = function() {
              vm.state.form = true;
            };

            vm.send = function() {
              vm.state.loading = true;
              vm.state.error = false;

              $http.post('http://codefresh.io/subscribe', { email: vm.email }).then(function() {
                vm.state.success = true;
                vm.state.loading = false;
              }, function() {
                vm.state.error = true;
                vm.state.loading = false;
              });
            };

            $scope.$watch(function() {
              return vm.state.form;
            }, function() {
              if (vm.state.form) {
                $timeout(function() {
                  focus('email');
                }, 300);
              }
            });
          }
      };
  }

  angular.module('codefresh', ['focusOn'])
    .directive('cfRequestDemo', cfRequestDemo);

  angular.bootstrap(document, ['codefresh']);

})();
