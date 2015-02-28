
;(function() {

  angular.module('app')

  .controller('Relationships', function($scope, $rootScope, RelationshipsFactory) {

    // Fetch data and populate the list view.
    RelationshipsFactory.fetch().success(function (data) {
      $scope.relationships = data.results;
    });

    $scope.add = function (name) {
      RelationshipsFactory.add(name);
    };

    $scope.show = function (relationship) {
      RelationshipsFactory.show(relationship.name);
    };

    $rootScope.$on('relationships:showDetails', function (event, relationship) {
      // To update the list veiw, I'm simply appending the new relationship to
      // the list instead of fetching a new collection (faster).
      $scope.relationships.push(relationship);
      // Update the detail view.
      $scope.relationship = relationship;
    });

  });

}());

