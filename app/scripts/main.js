
;(function () {

  angular.module('app', ['ngRoute'])

  .constant('PARSE', {
    URL: 'https://api.parse.com/1/',
    CONFIG: {
      headers: {
        'X-Parse-Application-Id': 'FgjTDBzvvX7lRwBn2UqEODHWscZOaTPtWuxl3pgf',
        'X-Parse-REST-API-Key': 'UXb3qtdbcWyPnX6eQtBQTGK4UdzCtmHPxrtQV8ZS',
        'Content-Type': 'application/json'
      }
    }
  })

  .config(function ($routeProvider) {

    $routeProvider
      .when('/', {
        templateUrl: 'scripts/gravatars/gravatars.html',
        controller: 'Gravatars'
      })

      .when('/gravatars', {
        templateUrl: 'scripts/gravatars/gravatars.html',
        controller: 'Gravatars'
      })

      .when('/fonts', {
        templateUrl: 'scripts/fonts/fonts.html',
        controller: 'Fonts'
      })

      .otherwise('/');

  });

}());

