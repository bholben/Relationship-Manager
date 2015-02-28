
;(function() {

  angular.module('app')

  .controller('Relationships', function($scope, $rootScope, RelationshipsFactory) {

    // Fetch data and populate the list view.
    RelationshipsFactory.fetch().success(function (data) {
      $scope.relationships = data.results;
    });

    $scope.create = function (name) {
      RelationshipsFactory.create({name: name});
    };

    $scope.show = function (relationship) {
      // Set the detail view to the selected object.
      $scope.relationship = relationship;
    };

    $rootScope.$on('relationships:create', function (event, relationship) {
      // To update the list veiw, I'm simply appending the new relationship to
      // the list instead of fetching a new collection (faster).
      $scope.relationships.push(relationship);
      // Update the detail view.
      $scope.relationship = relationship;
    });

  });

}());

