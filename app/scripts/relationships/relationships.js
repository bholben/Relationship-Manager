
;(function() { angular.module('app')

  // Relationships controller.
  .controller('Relationships', function($scope, $rootScope, RelationshipsFactory) {

    var rf = RelationshipsFactory;

    // Initialize form
    $scope.new = true;
    $scope.r = {isOrg: true};


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
      $scope.r.isOrg = isOrg;
    };

    $scope.resetForm = function() {
      // Reset the header
      $scope.new = true;
      // Clear the form
      $scope.r = {isOrg: true};
      // Remove active class from item in list
      $scope.selectedIndex = -1;
    };

    $scope.select = function (r, index) {
      $scope.new = false;
      $scope.r = r;
      $scope.selectedIndex = index;
      // console.log(r);
    };

    var resetForm = function() {

    };


    // Listeners

    $rootScope.$on('relationships:created', function (event, r) {
      // To update the list view, I'm appending the new relationship to
      // the list instead of fetching a new collection (faster).
      $scope.relationships.push(r);
      $scope.resetForm();

      // TODO: Figure out how to pass the objectId into the rendered list
      // so that deletes can happen on new objects (without triggering
      // a reload/retrieveAll).
      // Need to loop through $scope.relationships and find the matching
      // relationship with same bizName or fname/lname and then
      // add the objectId key.

    });

    $rootScope.$on('relationships:retrieved', function (event, r) {
      $scope.relationships = r;
    });

    $rootScope.$on('relationships:updated', function () {
      $scope.resetForm();
    });

    $rootScope.$on('relationships:deleted', function (event, r) {
      // To update the list view, I'm mutating the local list instead
      // of fetching a new collection (faster).
      $scope.relationships = $scope.relationships.filter(function (rel) {
        return rel.objectId !== r.objectId;
      });
      // Clear the form.
      $scope.r = '';
    });


    // Initialize list

    $scope.retrieve();

  });

}());

