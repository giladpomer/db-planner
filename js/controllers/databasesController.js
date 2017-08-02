angular.module('dbPlannerApp').controller('DatabasesController',
                ['$scope', '$mdDialog', '$mdToast', '$mdSidenav', '$mdComponentRegistry', 'CurrentDatabaseService', 'FileGeneratorService',
        function ($scope, $mdDialog, $mdToast, $mdSidenav, $mdComponentRegistry, CurrentDatabaseService, FileGeneratorService) {
            $scope.setFocus = function (elementId) {
                document.getElementById(elementId).focus();
            };

            function showToast(text) {
                $mdToast.show(
                    $mdToast.simple()
                    .textContent(text)
                    .position('bottom left')
                    .hideDelay(3000)
                );
            }

            /* Databases */
            $scope.databases = [];

            $scope.toggleDatabases = function () {
                $mdSidenav('databases').toggle()
                    .then(function () {
                        $scope.setFocus('databaseNameEditor');
                    });
            };
            $scope.closeDatabases = function () {
                $mdComponentRegistry.when('databases').then(function () {
                    var sidenav = $mdSidenav('databases');
                    if (sidenav.isOpen()) {
                        sidenav.close();
                        $scope.setFocus('tableNameEditor');
                    }
                });
            };

            $scope.selectDatabase = function (database) {
                CurrentDatabaseService.set(database);
                $scope.tableNameEditor = '';
                $scope.closeDatabases();
            };
            $scope.getCurrentDatabase = function () {
                return CurrentDatabaseService.get();
            };
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
            $scope.deleteDatabase = function (ev, index) {
                var database = $scope.databases[index];

                function deleteWithoutConfirm(index) {
                    var isSelected = database === CurrentDatabaseService.get();
                    $scope.databases.splice(index, 1);

                    if (isSelected && $scope.databases.length > 0) {
                        $scope.selectDatabase($scope.databases[0]);
                    }
                }

                var confirm = $mdDialog.confirm()
                  .clickOutsideToClose(true)
                  .title('Delete database: ' + database.name + '?')
                  .ariaLabel('Confirm delete database')
                  .targetEvent(ev)
                  .ok('Delete')
                  .cancel('Cancel');

                if (database.tables.length > 0) {
                    $mdDialog.show(confirm).then(function () {
                        deleteWithoutConfirm(index);
                    });
                } else {
                    deleteWithoutConfirm(index);
                }
            };

            /* Tables */
            $scope.selectTable = function (table) {
                $scope.selectedTable = table;
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
            $scope.deleteTable = function (index) {
                var tables = CurrentDatabaseService.get().tables;
                var isSelected = tables[index] === $scope.selectedTable;
                tables.splice(index, 1);

                if (isSelected && tables.length > 0) {
                    $scope.selectTable(tables[0]);
                }
            };

            /* Columns */
            $scope.columnEditor = {};
            $scope.addColumn = function (name) {
                if (undefined == name || name.trim().length === 0) {
                    return;
                }

                var column = {
                    name: name,
                    type: $scope.columnTypeEditor,
                    isPrimaryKey: $scope.columnEditor.isPrimaryKey
                };

                $scope.selectedTable.columns.push(column);
                $scope.columnEditor.isPrimaryKey = false;
                $scope.columnNameEditor = '';
                $scope.setFocus('columnNameEditor');
            };
            $scope.focusOnNextColumn = function (currentColumnIndex) {
                var columnNames = document.getElementsByClassName("columnName");
                if (currentColumnIndex + 1 < columnNames.length) {
                    columnNames[currentColumnIndex + 1].focus();
                } else {
                    $scope.setFocus('columnNameEditor');
                }
            };

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

            $scope.addDatabase("Untitled Database");
        }]);