
;(function() {
  'use strict';

  angular.module('app')

  .controller('TopBar', function ($scope, $rootScope, UsersFactory) {

    $scope.closeMenus = function () {
      // If I attach this to the entire page, then the
      // toggleUserMenu() won't work.  Hmm.
      // $scope.showUserMenu = false;
    };

    $scope.toggleUserMenu = function () {
      $scope.showUserMenu = !$scope.showUserMenu;
    };

    var updateUserMenuState = function () {
      // $scope.user = UsersFactory.getCookie();
      // $scope.signedIn = ($scope.user) ? true : false;
      $scope.showUserMenu = false;

      var user = UsersFactory.getCookie();
      if (user) {
        $scope.signedIn = true;
        $scope.user = user;
      } else {
        $scope.signedIn = false;
      }
    };

    $scope.signIn = function (user) {
      UsersFactory.signin(user);
    };

    $scope.signOut = function() {
      UsersFactory.signout();
      updateUserMenuState();
      $scope.user = {};
    };

    // Listen for signin broadcast.
    $rootScope.$on('userAuth:signin', function () { updateUserMenuState(); });
    $rootScope.$on('userAuth:signup', function () { updateUserMenuState(); });

    updateUserMenuState();

  });

}());

