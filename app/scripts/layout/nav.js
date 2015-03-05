
;(function() {
  'use strict';

  angular.module('app')

  .controller('NavCtrl', function ($scope, $rootScope, UsersFactory) {

    $scope.showUserMenu = false;

    var updateAuthMenuState = function () {
      // $scope.user = UsersFactory.getCookie();
      // $scope.signedIn = ($scope.user) ? true : false;

      var user = UsersFactory.getCookie();
      if (user) {
        $scope.signedIn = true;
        $scope.user = user;
      } else {
        $scope.signedIn = false;
      }
    };

    $scope.toggleUserMenu = function () {
      $scope.showUserMenu = !$scope.showUserMenu;
    };

    $scope.signIn = function (user) {
      UsersFactory.signin(user);
    };

    $scope.signOut = function() {
      UsersFactory.signout();
      updateAuthMenuState();
    };

    // Listen for signin broadcast.
    $rootScope.$on('userAuth:signin', function () { updateAuthMenuState(); });

    updateAuthMenuState();

  });

}());

