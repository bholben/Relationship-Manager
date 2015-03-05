
;(function() {
  'use strict';

  angular.module('app')

  .factory('UsersFactory', function ($http, $rootScope, $cookieStore, $location, PARSE, PATHS, RelationshipsFactory) {

    var broadcast = function(action, obj) {
      $rootScope.$broadcast('userAuth:' + action, obj);
    };

    return {

      setCookie: function (val) {
        $cookieStore.put('zenUser', val);
      },

      getCookie: function () {
        return $cookieStore.get('zenUser');
      },

      tokenizeHeader: function () {
        var c = this.getCookie();
        if (c) return PARSE.CONFIG.headers['X-PARSE-Session-Token'] = c.sessionToken;
      },

      signup: function (userObj) {
        var self = this;
        delete userObj.cPassword;
        userObj.email = userObj.username;
        userObj = RelationshipsFactory.addGravatar(userObj);
        console.log(userObj);
        $http.post(PARSE.URL + 'users', userObj, PARSE.CONFIG)
          .success(function (res) {
            self.setCookie(_.extend(userObj, res));
            $location.path(PATHS.HOME);
            broadcast('signup');
          })
          .error(function (res) {
            broadcast('signupError', res.error);
          });
      },

      signin: function (userObj) {
        return $http({
          method: 'GET',
          url: PARSE.URL + 'login',
          headers: PARSE.CONFIG.headers,
          params: userObj
        })
          .success(function (res) {
            console.log(res);
            $cookieStore.put('zenUser', res);
            $location.path(PATHS.HOME);
            broadcast('signin');
          });
      },

      signout: function () {
        $cookieStore.remove('zenUser');
        $location.path('/login');
      }

    };

  });

}());

