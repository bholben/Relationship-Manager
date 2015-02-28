
;(function() {

  angular.module('app')

  .factory('RelationshipsFactory', function ($http, $rootScope, PARSE) {

    var createRelationshipObj = function (name) {
      var url = 'http://www.gravatar.com/avatar/',
          hash = CryptoJS.MD5(name).toString(),
          urlHash = url + hash;
      return {
        name: name,
        gravatarURL:   urlHash + '?s=300&d=monsterid'
      };
    };

    var broadcast = function (relationshipObj) {
      $rootScope.$broadcast('relationships:showDetails', relationshipObj);
    };

    var addRelationship = function(name) {
      var url = PARSE.URL + 'classes/Gravatars',
          obj = createRelationshipObj(name),
          config = PARSE.CONFIG;

      $http.post(url, obj, config)
        .success(function (data) { broadcast(obj); });
    };

    var showRelationship = function(name) {
      var relationshipObj = createRelationshipObj(name);
      broadcast(relationshipObj);
    };

    var fetchRelationships = function() {
      var url = PARSE.URL + 'classes/Gravatars',
          config = PARSE.CONFIG;
      return $http.get(url, config);
    };

    return {
      add: addRelationship,
      show: showRelationship,
      fetch: fetchRelationships
    };

  });

}());

