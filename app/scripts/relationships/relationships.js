
;(function() { angular.module('app')

  // Relationships controller.
  .controller('Relationships', function($scope, $rootScope, RelationshipsFactory) {

    var rf = RelationshipsFactory;

    // Initialize form
    $scope.new = true;
    $scope.r = {isOrg: true};


    // Behavior

    $scope.submitButtonText = function() {
      return $scope.new ? 'Create' : 'Update';
    };

    $scope.orgClicked = function (isOrg) {
      // Update the view
      $scope.r.isOrg = isOrg;
      // Eliminate meaningless names & avoid uniqueness conflicts.
      if (isOrg) {
        delete $scope.r.fname;
        delete $scope.r.lname;
      } else {
        delete $scope.r.bizName;
        delete $scope.r.nickname;
      }
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
      // Fill in the form.
      $scope.new = false;
      $scope.r = r;
      // Highlight the active list item.
      $scope.selectedIndex = index;
    };


    // CRUD operations

    var create = function (r) { if (rf.validName(r)) rf.create(r); };

    var retrieveAll = function () { rf.retrieveAll(); };

    // Currently sending the entire relationship object.
    var update = function (r) { if (rf.validName(r)) rf.update(r); };

    $scope.delete = function (r) { rf.delete(r); };

    $scope.submit = function(r) {
      if ($scope.new) {
        create(r);
      } else {
        update(r);
      }
    };


    // Listeners

    $rootScope.$on('relationships:created', function (event, r) {
      // To update the list view, I'm appending the new relationship to
      // the list instead of fetching a new collection (faster).
      $scope.relationships.push(r);
      $scope.resetForm();
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
      $scope.resetForm();
    });


    // Initialize list

    retrieveAll();

  });

}());

