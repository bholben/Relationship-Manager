
;(function() {

  angular.module('app')

  .factory('RelationshipsFactory', function ($http, $rootScope, PARSE) {

    var addGravatar = function (relationship) {
      var url = 'http://www.gravatar.com/avatar/',
          hash = CryptoJS.MD5(relationship.name).toString(),
          urlHash = url + hash;
      relationship.gravatarURL = urlHash + '?s=300&d=monsterid';
      return relationship;
    };

    var createRelationship = function(relationship) {
      var url = PARSE.URL + 'classes/Relationships',
          data = addGravatar(relationship),
          config = PARSE.CONFIG;

      $http.post(url, data, config)
        .success(function () {
          $rootScope.$broadcast('relationships:created', data);
        });
    };

    var retrieveRelationships = function() {
      var url = PARSE.URL + 'classes/Relationships',
          config = PARSE.CONFIG;
      $http.get(url, config)
        .success(function (response) {
          $rootScope.$broadcast('relationships:retrieved', response.results);
        });
    };

    var updateRelationship = function(relationship) {
      var url = PARSE.URL + 'classes/Relationships/' + relationship.objectId,
          data = addGravatar(relationship),
          config = PARSE.CONFIG;
      $http.put(url, data, config)
        .success(function () {
          $rootScope.$broadcast('relationships:updated');
        })
    };

    var deleteRelationship = function(relationship) {
      var url = PARSE.URL + 'classes/Relationships/' + relationship.objectId,
          config = PARSE.CONFIG;
      $http.delete(url, config)
        .success(function () {
          $rootScope.$broadcast('relationships:deleted');
        })
    };

    return {
      create: createRelationship,
      retrieve: retrieveRelationships,
      update: updateRelationship,
      delete: deleteRelationship
    };

  });

}());

