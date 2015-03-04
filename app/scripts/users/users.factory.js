
;(function() {
  'use strict';

  angular.module('app')

  .factory('UsersFactory', function ($http, $cookieStore, $location, PARSE, PATH) {

    return {

      setCookie: function (val) {
        $cookieStore.put('zenUser', val);
      },

      getCookie: function () {
        return $cookieStore.get('zenUser');
      },

      tokenizeHeader: function () {
        var c = this.getCookie();
        if (c) PARSE.CONFIG.headers['X-PARSE-Session-Token'] = c.sessionToken;
      },

      signup: function (userObj) {
        var self = this;
        $http.post(PARSE.URL + 'users', userObj, PARSE.CONFIG)
          .success(function (res) {
            console.log(res);
            self.setCookie(res);
            $location.path(PATH.SIGNIN);
          });
      },

      signin: function (userObj) {
        $http({
          method: 'GET',
          url: PARSE.URL + 'login',
          headers: PARSE.CONFIG.headers,
          params: userObj
        })
          .success(function (res) { $cookieStore.put('zenUser', res.data); });
      },

      signout: function () {
        $cookieStore.remove('zenUser');
        $location.path('/login');
      }

    };

  });

}());

