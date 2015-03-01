
;(function() {

  angular.module('app')

  .factory('RelationshipsFactory', function ($http, $rootScope, PARSE) {

    var addGravatar = function (obj) {
      var url = 'http://www.gravatar.com/avatar/',
          hash = CryptoJS.MD5(obj.email).toString(),
          urlHash = url + hash;
      obj.gravatarURL = urlHash + '?s=300&d=monsterid';
      return obj;
    };

    var url = function(id) {
      return PARSE.URL + 'classes/Relationships/' + (id || '');
    };

    var config = PARSE.CONFIG;

    var broadcast = function(action, obj) {
      $rootScope.$broadcast('relationships:' + action, obj);
    };

    // AJAX POST request to ~/Relationships
    var createRelationship = function(obj) {
      var data = addGravatar(obj);
      $http.post(url(), data, config)
        .success(function () { broadcast('created', data); });
    };

    // AJAX GET request to ~/Relationships
    var retrieveRelationships = function() {
      $http.get(url(), config)
        .success(function (res) { broadcast('retrieved', res.results); });
    };

    // AJAX PUT request to ~/Relationships/:objectId
    var updateRelationship = function(obj) {
      var data = (obj.email) ? addGravatar(obj) : obj;
      $http.put(url(obj.objectId), data, config)
        .success(function () { broadcast('updated'); });
    };

    // AJAX DELETE request to ~/Relationships/:objectId
    var deleteRelationship = function(obj) {
      $http.delete(url(obj.objectId), config)
        .success(function () { broadcast('deleted', obj); });
    };

    return {
      create: createRelationship,
      retrieve: retrieveRelationships,
      update: updateRelationship,
      delete: deleteRelationship
    };

  });

}());

