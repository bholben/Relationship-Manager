
;(function() {

  angular.module('app')

  .factory('AvatarFactory', function ($http, PARSE) {

    var createHash = function (name) {
      return CryptoJS.MD5(name).toString();
    };

    var createGravatars = function (name, hash) {
      return {
        name: name,
        monsterURL: 'http://www.gravatar.com/avatar/' + hash + '?s=300&d=monsterid',
        identiconURL: 'http://www.gravatar.com/avatar/' + hash + '?s=100&d=identicon',
        wavatarURL: 'http://www.gravatar.com/avatar/' + hash + '?s=100&d=wavatar',
        retroURL: 'http://www.gravatar.com/avatar/' + hash + '?s=100&d=retro'
      };
    };

    var updateView = function (gravatarObj) {
      var form = angular.element('#gravatarForm'),
          monsterImage = '<img src="' + gravatarObj.monsterURL + '" style="display: block;">',
          identiconImage = '<img src="' + gravatarObj.identiconURL + '">',
          wavatarImage = '<img src="' + gravatarObj.wavatarURL + '">',
          retroImage = '<img src="' + gravatarObj.retroURL + '">';

      form.find('input').val('');
      form.find('img').remove();

      form.append(monsterImage);
      form.append(identiconImage);
      form.append(wavatarImage);
      form.append(retroImage);
    };

    var postData = function (gravatarObj) {
      $http.post(PARSE.URL + 'classes/Gravatars', gravatarObj, PARSE.CONFIG)
        .success(function (data) {
          console.log(data);
          updateView(gravatarObj);
        });
    };

    var addGravatar = function(name) {
      var hash = createHash(name),
          gravatarObj = createGravatars(name, hash);
      postData(gravatarObj);
    };

    var fetchGravatars = function() {
      $http.get(PARSE.URL + 'classes/Monsters', PARSE.CONFIG);
    };

    return {
      add: addGravatar,
      fetch: fetchGravatars
    };

  });

}());

