
;(function() {

  angular.module('app')

  .controller('Gravatars', function($scope, $rootScope, AvatarFactory) {

    AvatarFactory.fetch().success(function (data) {
      $scope.gravatars = data.results;
    });

    $scope.add = function (name) {
      AvatarFactory.add(name);
    };

    $scope.show = function (gravatar) {
      AvatarFactory.show(gravatar.name);
    };

    $rootScope.$on('gravatars:showDetails', function (event, gravatar) {
      $scope.gravatar = gravatar;
    });

  });

}());

