
;(function () {

  angular.module('app', [
    // App dependencies.
    'ngRoute',      // $routeProvider for page navigation
    'ui.checkbox',  // Visual improvement over default HTML checkboxes
  ])

  // These Parse headers are tacked onto all AJAX requests.
  .constant('PARSE', {
    URL: 'https://api.parse.com/1/',
    CONFIG: {
      headers: {
        'X-Parse-Application-Id': 'OIFByyGW416J5jIA1MOKOKHqZEuja4krmNLjWAha',
        'X-Parse-REST-API-Key': '2Opu5BXRVfLZjyFbc3wbRhIMIQFh2BbPsGdPbZsh',
        'Content-Type': 'application/json'
      }
    }
  })

  // Router configuration.
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

