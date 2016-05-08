myApp.config(['$routeProvider', '$httpProvider', '$locationProvider',
    function($routeProvider, $httpProvider, $locationProvider) {

        $routeProvider.
            when('/terminals', {
                templateUrl: 'views/terminals.html',
                controller: 'TerminalsCtrl'
            }).
            when('/rules', {
                templateUrl: 'views/rules.html',
                controller: 'RulesCtrl'
            }).
            when('/generation', {
                templateUrl: 'views/generation.html',
                controller: 'GenerationCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);