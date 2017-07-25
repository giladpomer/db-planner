angular.module('dbPlannerApp', ['ngMaterial', 'ngAnimate', 'ui.ace'])
    .config(function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('light-blue');
    })
    .directive('onEnterKey', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.onEnterKey);
                    });

                    event.preventDefault();
                }
            });
        };
    })
    .directive('databasesSection', function () {
        return {
            templateUrl: 'views/databasesSection.html'
        };
    })
    .directive('tablesSection', function () {
        return {
            templateUrl: 'views/tablesSection.html'
        };
    })
    .directive('columnsSection', function () {
        return {
            templateUrl: 'views/columnsSection.html'
        };
    })
    .directive('floatingButton', function () {
        return {
            templateUrl: 'views/floatingButton.html'
        };
    });