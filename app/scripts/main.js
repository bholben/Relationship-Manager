
;(function () {
  'use strict';

  angular.module('app', [
    // App dependencies.
    'ngRoute',      // $routeProvider for page navigation
    'ngCookies',    // $cookieStore for user auth
    'ui.bootstrap', // tooltip
    'ui.checkbox',  // Visual improvement over default HTML checkboxes (bootstrap dependency)
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

  .constant('PATHS', {
    HOME: '/',
    SECURE: ['/accounts', '/relationships', '/transactions']
  })

  // App configuration
  .config(function ($routeProvider) {

    // Router

    $routeProvider
      .when('/signup', {
        templateUrl: 'scripts/users/user.signup.html',
        controller: 'Users'
      })
      .when('/relationships', {
        templateUrl: 'scripts/relationships/relationship.manager.html',
        controller: 'Relationships'
      })
      // .when('/icons', {
      //   templateUrl: 'scripts/icons/icons.html'
      //   // controller: 'Icons'
      // })
      .otherwise('/relationships');
  })

  // Run once at setup
  .run(function ($rootScope, $location, UsersFactory, PATHS) {

    // Listeners

    $rootScope.$on('$routeChangeStart', function () {

      // Every time a route change is requested, add the
      // token to the PARSE.CONFIG.headers if it exists.
      var currentPath = $location.path(),
          secureRoute = _.contains(PATHS.SECURE, currentPath),
          signedIn = UsersFactory.tokenizeHeader();

      console.log('Route request: ', $location.path());
      console.log('Signed in: ', Boolean(signedIn));

      // Only allow a route change if the user is signed in.
      if (secureRoute && !signedIn) $location.path('/signup');

    });
  });

}());

