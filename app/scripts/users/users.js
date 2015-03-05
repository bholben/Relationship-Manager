
;(function() {
  'use strict';

  angular.module('app')

  .controller('Users', function ($scope, $rootScope, $location, UsersFactory) {

    // Redirect if signed in (and leave this controller).
    if (UsersFactory.getCookie()) return $location.path('/');

    $scope.signup = function (user) {

      if (user.password === user.cPassword) {
        delete user.cPassword;
        UsersFactory.signup(user);
      } else {
        $scope.error = 'Passwords don\'t match.  Please try again.'
        $scope.user.password = '';
        $scope.user.cPassword = '';
        $('#password').focus();
      }
    };

    $rootScope.$on('userAuth:signupError', function (event, r) {

      console.log(r);

      if (r.slice(0, 8) === 'username' && r.slice(-13) === 'already taken') {
        $scope.error = r.slice(9);
        $scope.resetPassword = 'Reset password?';
      }

      if (r === 'missing user password') {
        $scope.error = 'Password is required';
      }

    });

  });

}());

