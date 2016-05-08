var myApp = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ui.tree', 'angucomplete-alt']);

myApp.controller('MainCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.changePath = function (path) {
        $location.path('/' + path);
    };
}]);