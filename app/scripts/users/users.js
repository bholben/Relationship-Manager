
;(function() {
  'use strict';

  angular.module('app')

  .controller('Users', function ($scope, $location, UsersFactory) {

    // Redirect if signed in (and leave this controller).
    if (UsersFactory.getCookie()) return $location.path('/');

    $scope.signup = function (user) {
      console.log(user);
      UsersFactory.signup(user);
    };

  });

}());

