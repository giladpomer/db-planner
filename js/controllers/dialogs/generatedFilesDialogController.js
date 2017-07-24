angular.module('dbPlannerApp').controller('GeneratedFilesDialogController',
                ['$scope', '$mdDialog', 'CurrentDatabaseService', 'TemplatesService', 'CodeEditorService',
        function ($scope, $mdDialog, CurrentDatabaseService, TemplatesService, CodeEditorService) {
            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.download = function (dataToDownload) {
                $mdDialog.hide(dataToDownload);
            };

            function toCamelCase(input, isUpper) {
                var result = '';

                if (input.length > 0) {
                    if (isUpper) {
                        result += input.charAt(0).toUpperCase();
                    } else {
                        result += input.charAt(0).toLowerCase();
                    }

                }
                if (input.length > 1) {
                    result += input.substr(1);
                }

                return result;
            }

            var utils = {
                upperCamelCase: function (input) {
                    return toCamelCase(input, true);
                },
                lowerCamelCase: function (input) {
                    return toCamelCase(input, false);
                }
            };

            TemplatesService.get(function (templates) {
                $scope.templates = templates;
                angular.forEach($scope.templates, function (template) {
                    template.objectsCode = [];

                    var createStatements = [];
                    angular.forEach(CurrentDatabaseService.get().tables, function (table) {
                        String.prototype.replaceAll = function (search, replacement) {
                            var target = this;
                            return target.split(search).join(replacement);
                        };

                        var result = template.templateFileContent;

                        var builtInKeywords = {
                            tableName: table.name,
                            DatabaseName: CurrentDatabaseService.get().name
                        };

                        angular.forEach(builtInKeywords, function (value, keyword) {
                            result = result
                                    .replaceAll('{{' + toCamelCase(keyword, true) + '}}', toCamelCase(value, true))
                                    .replaceAll('{{' + toCamelCase(keyword, false) + '}}', toCamelCase(value, false));
                        });

                        angular.forEach(template.methods, function (method, keyword) {
                            var data = '';
                            try {
                                data = method(table, utils);
                            } catch (e) {
                                template.configError = e.toString() + " in " + keyword;
                            }

                            result = result.replaceAll('{{' + keyword + '}}', data);

                            if ("createTable" === keyword) {
                                createStatements.push(data);
                            }
                        });

                        template.objectsCode.push({
                            fileName: table.name + "." + template.objectFileExtension,
                            code: result
                        });
                    });
                    template.createCode = createStatements.join("\n");
                });
            });

            $scope.codeEditor = CodeEditorService;
        }]);