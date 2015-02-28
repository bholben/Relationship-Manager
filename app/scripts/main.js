
;(function () {

  angular.module('app', ['ngRoute'])

  .constant('PARSE', {
    URL: 'https://api.parse.com/1/',
    CONFIG: {
      headers: {
        // 'X-Parse-Application-Id': 'FgjTDBzvvX7lRwBn2UqEODHWscZOaTPtWuxl3pgf',
        // 'X-Parse-REST-API-Key': 'UXb3qtdbcWyPnX6eQtBQTGK4UdzCtmHPxrtQV8ZS',
        'X-Parse-Application-Id': 'OIFByyGW416J5jIA1MOKOKHqZEuja4krmNLjWAha',
        'X-Parse-REST-API-Key': '2Opu5BXRVfLZjyFbc3wbRhIMIQFh2BbPsGdPbZsh',
        'Content-Type': 'application/json'
      }
    }
  })

  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'scripts/relationships/relationships.html',
        controller: 'Relationships'
      })

      .when('/relationships', {
        templateUrl: 'scripts/relationships/relationships.html',
        controller: 'Relationships'
      })

      .when('/fonts', {
        templateUrl: 'scripts/fonts/fonts.html',
        controller: 'Fonts'
      })

      .otherwise('/');

  });

}());

