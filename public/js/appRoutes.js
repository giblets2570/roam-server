// public/js/appRoutes.js
    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function(route, location) {

    route.
        when('/profile',{
            templateUrl: 'views/profile.html',
            controller: 'ProfileController'
        }).
        when('/login',{
            templateUrl: 'views/login.html',
            controller: 'AuthController'
        }).
        otherwise({
            redirectTo: '/login'
        });

    location.html5Mode(true);

}]);