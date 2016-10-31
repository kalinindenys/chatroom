angular.module('chatroom', [ 'ngRoute' ])
    .config(function ($routeProvider, $httpProvider) {
        $routeProvider.when('/', {
            templateUrl : 'index.html',
            controller : 'login'
        }).when('/login', {
            templateUrl : 'login.html',
            controller : 'login'
        }).otherwise('/');
    })
    .controller('login', function ($rootScope, $scope, $http, $location) {

        var authenticate = function (credentials, callback) {

            var headers = credentials ? {authorization: 'Basic ' + btoa(credentials.login + ':' + credentials.password)} : {};

            $http.get('user', {headers: headers}).success(function (data) {
                $rootScope.authenticated = data.name;
                callback && callback();
            }).error(function () {
                $rootScope.authenticated = false;
                callback && callback();
            });

        };

        authenticate();
        $scope.credentials = {};
        $scope.login = function () {
            authenticate($scope.credentials, function () {
                if ($rootScope.authenticated) {
                    $location.path('/');
                    $scope.error = false;
                } else {
                    $location.path('/login');
                    $scope.error = true;
                }
            })
        }

    });