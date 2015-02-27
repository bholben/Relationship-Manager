
;(function() {

  angular.module('app')

  .controller('Gravatars', function($scope, AvatarFactory) {

    $scope.addGravatar = function (name) {
      AvatarFactory.add(name);
    };

    $scope.fetchGravatars = function () {
      AvatarFactory.fetch();
    };

  });

}());

