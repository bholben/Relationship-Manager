
;(function() {

  angular.module('app')

  .factory('AvatarFactory', function ($http, $rootScope, PARSE) {

    var createGravatarObj = function (name) {
      var url = 'http://www.gravatar.com/avatar/',
          hash = CryptoJS.MD5(name).toString(),
          urlHash = url + hash;
      return {
        name: name,
        monsterURL:   urlHash + '?s=300&d=monsterid',
        identiconURL: urlHash + '?s=100&d=identicon',
        wavatarURL:   urlHash + '?s=100&d=wavatar',
        retroURL:     urlHash + '?s=100&d=retro'
      };
    };

    var broadcast = function (gravatarObj) {
      $rootScope.$broadcast('gravatars:showDetails', gravatarObj);
    };

    var addGravatar = function(name) {
      var url = PARSE.URL + 'classes/Gravatars',
          obj = createGravatarObj(name),
          config = PARSE.CONFIG;

      $http.post(url, obj, config)
        .success(function (data) { broadcast(obj); });
    };

    var showGravatar = function(name) {
      var gravatarObj = createGravatarObj(name);
      broadcast(gravatarObj);
    };

    var fetchGravatars = function() {
      var url = PARSE.URL + 'classes/Gravatars',
          config = PARSE.CONFIG;
      return $http.get(url, config);
    };

    return {
      add: addGravatar,
      show: showGravatar,
      fetch: fetchGravatars
    };

  });

}());

