
;(function() {
  'use strict';

  angular.module('app')

  .controller('NavCtrl', function ($scope, UsersFactory) {

    var user = UsersFactory.getCookie();

    if (user) {
      $scope.signedIn = true;
      $scope.user = user;
    } else {
      $scope.signedIn = false;
    }

    $scope.signIn = function (user) {
      console.log(user);
      // UsersFactory.signin(user);
    };

    $scope.signOut = function() {
      UsersFactory.signout();
    };

  });

}());

