
;(function() {

  angular.module('app')

  .controller('Relationships', function($scope, $rootScope, RelationshipsFactory) {

    $scope.create = function (relationship) {
      RelationshipsFactory.create(relationship);
    };

    $scope.retrieve = function () {
      RelationshipsFactory.retrieve();
    };

    $scope.update = function (relationship) {
      RelationshipsFactory.update(relationship);
    };

    $scope.delete = function (relationship) {
      RelationshipsFactory.delete(relationship);
    };

    $scope.show = function (relationship) {
      $scope.relationship = relationship;
    };

    $rootScope.$on('relationships:created', function (event, relationship) {
      // To update the list view, I'm simply appending the new relationship to
      // the list instead of fetching a new collection (faster).
      $scope.relationships.push(relationship);
      $scope.relationship = {};
    });

    $rootScope.$on('relationships:retrieved', function (event, relationships) {
      $scope.relationships = relationships;
    });

    $rootScope.$on('relationships:deleted', function (event, relationship) {
      // To update the list view, I'm mutating the local list instead
      // of fetching a new collection (faster).
      $scope.relationships = $scope.relationships.filter(function (r) {
        return r.objectId !== relationship.objectId;
      });
      // Clear the form.
      $scope.relationship = '';
    });

    $scope.retrieve();

  });

}());

