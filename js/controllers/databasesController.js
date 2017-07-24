angular.module('dbPlannerApp').controller('DatabasesController',
                ['$scope', '$mdDialog', 'CurrentDatabaseService', 'FileGeneratorService', '$mdToast',
        function ($scope, $mdDialog, CurrentDatabaseService, FileGeneratorService, $mdToast) {
            $scope.databases = [];

            function showToast(text) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(text)
                    .position('bottom left')
                    .hideDelay(3000)
                );
            }

            /* Floating Button */
            $scope.noTablesInCurrentDB = function () {
                return $scope.databases.length === 0 || CurrentDatabaseService.get().tables.length === 0;
            };
            $scope.openGeneratedFilesDialog = function (ev) {
                $mdDialog.show({
                    controller: 'GeneratedFilesDialogController',
                    templateUrl: 'views/dialogs/generatedFilesDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                }).then(function (dataToDownload) {
                    if (dataToDownload.length === 1) {
                        showToast('Downloading ' + dataToDownload[0].fileName);
                    } else {
                        showToast('Downloading ' + dataToDownload.length + ' generated files');
                    }

                    angular.forEach(dataToDownload, function (objectFile) {
                        FileGeneratorService.download(objectFile.fileName, objectFile.code);
                    });
                });
            };
            $scope.downloadStructure = function () {
                showToast('Downloading DB structure file');
                var database = CurrentDatabaseService.get();
                var data = JSON.stringify(database);
                FileGeneratorService.download(database.name + '.json', data);
            };
            $scope.openTemplatesEditorDialog = function (ev) {
                $mdDialog.show({
                    controller: 'TemplatesEditorDialogController',
                    templateUrl: 'views/dialogs/templatesEditorDialog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true
                });
            };

            /* Selection */
            $scope.selectDatabase = function (database) {
                CurrentDatabaseService.set(database);
                $scope.tableNameEditor = '';
            };
            $scope.selectTable = function (table) {
                $scope.selectedTable = table;
            };
            $scope.getCurrentDatabase = function () {
                return CurrentDatabaseService.get();
            };

            /* Adding */
            $scope.addDatabase = function (name) {
                if (name.trim().length === 0) {
                    return;
                }

                var database = {
                    name: name,
                    tables: []
                };

                $scope.databases.push(database);
                $scope.databaseNameEditor = '';
                $scope.selectDatabase(database);
            };
            $scope.addTable = function (name) {
                if (name.trim().length === 0) {
                    return;
                }

                var table = {
                    name: name,
                    columns: []
                };

                CurrentDatabaseService.get().tables.push(table);
                $scope.tableNameEditor = '';
                $scope.selectTable(table);
            };

            /* Deleting */
            $scope.deleteDatabase = function (index) {
                var isSelected = $scope.databases[index] === CurrentDatabaseService.get();
                $scope.databases.splice(index, 1);

                if (isSelected && $scope.databases.length > 0) {
                    $scope.selectDatabase($scope.databases[0]);
                }
            };
            $scope.deleteTable = function (index) {
                var tables = CurrentDatabaseService.get().tables;
                var isSelected = tables[index] === $scope.selectedTable;
                tables.splice(index, 1);

                if (isSelected && tables.length > 0) {
                    $scope.selectTable(tables[0]);
                }
            };

            /* Columns Editor */
            $scope.columnEditor = {};
            $scope.addColumn = function (name) {
                if (name.trim().length === 0) {
                    return;
                }

                var column = {
                    name: name,
                    type: $scope.columnTypeEditor,
                    isPrimaryKey: $scope.columnEditor.isPrimaryKey
                };

                $scope.selectedTable.columns.push(column);
                $scope.columnNameEditor = '';
                $scope.columnEditor.isPrimaryKey = false;
            };
        }]);