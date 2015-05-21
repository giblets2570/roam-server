// public/js/app.js
angular.module('agentApp', ['ngRoute','ngStorage','appRoutes', 
    'ProfileCtrl','AuthCtrl','PhoneCtrl','AddNumbersCtrl','AppointmentsCtrl',
    'PhoneDir','AddNumbersDir','AppointmentsDir'])

.run(['$rootScope','$location','$sessionStorage', function (root, location, session){
	
	root.$on("$routeChangeStart", function (event, next, current) {
        var nextUrl = next.$$route.originalPath;
        if (!session.token) {
            if (nextUrl != '/login') {
                location.path('/login');
            }
        }else{
            if (nextUrl == '/login') {
                location.path('/profile');
            }
        }
    });
}])

.factory('myHttpResponseInterceptor',['$q','$location','$sessionStorage',function($q, $location,session) { 
	return {
        request: function (config) {
            config.headers = config.headers || {};
            if (session.token) {
                config.headers.Authorization = 'Bearer ' + session.token;
            }
            return config;
        },
        responseError: function(response) {
            if(response.status === 401 || response.status === 403) {
                $location.path('/signin');
            }
            return $q.reject(response);
        }
    };
}])

.config(['$httpProvider',function($httpProvider) {
	$httpProvider.interceptors.push('myHttpResponseInterceptor');
}]);