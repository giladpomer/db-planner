angular.module('dbPlannerApp').controller('TemplatesEditorDialogController',
                ['$scope', '$mdDialog', 'TemplatesService', 'CodeEditorService',
        function ($scope, $mdDialog, TemplatesService, CodeEditorService) {
            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            TemplatesService.get(function (templates) {
                $scope.templates = templates;
            });

            $scope.codeEditor = CodeEditorService;
        }]);