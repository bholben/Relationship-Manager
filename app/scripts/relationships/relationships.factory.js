
;(function() {
  'use strict';

  angular.module('app')

  // Relationships factory.
  .factory('RelationshipsFactory', function ($http, $rootScope, PARSE) {

    var addGravatar = function (obj) {
      var url = 'http://www.gravatar.com/avatar/',
          hash = CryptoJS.MD5(obj.email || obj.name).toString(),
          size = 85, // pixel width
          defaultImg = obj.isOrg ? 'identicon' : 'monsterid';
      obj.gravatarURL = url + hash + '?s=' + size + '&d=' + defaultImg;
      return obj;
    };

    var url = function(id) {
      return PARSE.URL + 'classes/Relationships/' + (id || '');
    };

    var config = PARSE.CONFIG;

    var broadcast = function(action, obj) {
      $rootScope.$broadcast('relationships:' + action, obj);
    };

    return {

      // TODO - Handle AJAX failures.

      // AJAX POST request to ~/Relationships
      create: function(obj) {
        obj = addGravatar(obj);
        $http.post(url(), obj, config)
          .success(function (res) {
            // Include the objectId before attaching it to $rootScope.
            obj.objectId = res.objectId;
            broadcast('created', obj);
          });
      },

      // AJAX GET request to ~/Relationships
      retrieveAll: function() {
        $http.get(url(), config)
          .success(function (res) { broadcast('retrieved', res.results); });
      },

      // AJAX PUT request to ~/Relationships/:objectId
      update: function(obj) {
        var data = (obj.email) ? addGravatar(obj) : obj;
        $http.put(url(obj.objectId), data, config)
          .success(function () { broadcast('updated'); });
      },

      // AJAX DELETE request to ~/Relationships/:objectId
      delete: function(obj) {
        $http.delete(url(obj.objectId), config)
          .success(function () { broadcast('deleted', obj); });
      },

      validName: function(obj) {
        // Create an organization nickname if one is not entered.
        if (obj.isOrg) obj.nickname = obj.nickname || obj.bizName;
        // Create a screen name if required fields are present.
        if (obj.nickname || obj.fname && obj.lname) {
          obj.name = obj.nickname || obj.fname + ' ' + obj.lname;
          return obj;
        }
        // Nothing returned if invalid.
      }
    };

  });

}());

