
;(function() {

  angular.module('app')

  .controller('Relationships', function($scope, $rootScope, RelationshipsFactory) {

    RelationshipsFactory.fetch();

    $scope.create = function (relationship) {
      RelationshipsFactory.create(relationship);
    };

    $scope.show = function (relationship) {
      $scope.relationship = relationship;
    };

    $rootScope.$on('relationships:fetched', function (event, relationships) {
      $scope.relationships = relationships;
    });

    $rootScope.$on('relationships:created', function (event, relationship) {
      // To update the list veiw, I'm simply appending the new relationship to
      // the list instead of fetching a new collection (faster).
      $scope.relationships.push(relationship);
      $scope.relationship = relationship;
    });

  });

}());

