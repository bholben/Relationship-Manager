
;(function() { angular.module('app')

  // Relationships controller.
  .controller('Relationships', function($scope, $rootScope, RelationshipsFactory) {

    var rf = RelationshipsFactory;

    // Initialize form
    $scope.new = true;
    $scope.relationship = {isOrg: true};


    // CRUD operations

    $scope.create = function (r) {
      r.nickname = r.nickname || r.bizName;
      console.log(r);
      if (rf.validateName(r)) rf.create(r);
    };

    $scope.retrieve = function () {
      rf.retrieveAll();
    };

    $scope.update = function (r) {
      r.nickname = r.nickname || r.bizName;
      console.log(r);
      // Currently sending the entire relationship object.
      if (rf.validateName(r)) rf.update(r);
    };

    $scope.delete = function (r) {
      rf.delete(r);
    };


    // Behavior

    $scope.submitText = function() {
      return $scope.new ? 'Create' : 'Update';
    };

    $scope.orgClicked = function (isOrg) {
      $scope.relationship.isOrg = isOrg;
    };

    $scope.add = function() {
      $scope.new = true;
      $scope.relationship = '';
    };

    $scope.select = function (r, index) {
      $scope.new = false;
      $scope.relationship = r;
      $scope.selectedIndex = index;
    };


    // Listeners

    $rootScope.$on('relationships:created', function (event, r) {
      // To update the list view, I'm simply appending the new relationship to
      // the list instead of fetching a new collection (faster).
      $scope.relationships.push(r);
      $scope.relationship = {};
    });

    $rootScope.$on('relationships:retrieved', function (event, r) {
      $scope.relationships = r;
    });

    $rootScope.$on('relationships:deleted', function (event, r) {
      // To update the list view, I'm mutating the local list instead
      // of fetching a new collection (faster).
      $scope.relationships = $scope.relationships.filter(function (rel) {
        return rel.objectId !== r.objectId;
      });
      // Clear the form.
      $scope.relationship = '';
    });


    // Initialize list

    $scope.retrieve();

  });

}());

