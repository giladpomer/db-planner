angular.module('dbPlannerApp').controller('TemplatesEditorDialogController',
                ['$scope', '$mdDialog', 'TemplatesService', 'CodeEditorService',
        function ($scope, $mdDialog, TemplatesService, CodeEditorService) {
            $scope.isLoading = true;

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.codeEditor = CodeEditorService;

            TemplatesService.get(function (templates) {
                $scope.templates = templates;
                $scope.isLoading = false;
            });
        }]);