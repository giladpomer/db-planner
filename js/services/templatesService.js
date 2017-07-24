angular.module('dbPlannerApp').factory('TemplatesService',
            ['$http', '$q',
    function ($http, $q) {
        var templatesBaseFolder = '/db-planner/templates/';
        var templateFolders = [
            'Android_SQLite'
        ];

        var templates = null;

        function getConfigFromFile(configContent) {
            try {
                eval(configContent);
                return config;
            } catch (e) {
                return { configError: e.toString() };
            }
        }

        return {
            get: function (onSuccess) {
                if (null != templates) {
                    //reload template config if there was any change
                    var newTemplates = [];
                    angular.forEach(templates, function (template) {
                        var templateFileContent = template.templateFileContent;
                        var sourceCode = template.sourceCode;

                        var newTemplate = getConfigFromFile(sourceCode);
                        newTemplate.templateFileContent = templateFileContent;
                        newTemplate.sourceCode = sourceCode;

                        newTemplates.push(newTemplate);
                    });

                    templates = newTemplates;
                    onSuccess(templates);
                } else {
                    templates = [];

                    var requestsData = {};
                    var requests = [];
                    angular.forEach(templateFolders, function (folderName) {
                        var requestUrl = templatesBaseFolder + folderName + '/config.js';
                        requestsData[requestUrl] = {
                            folderName: folderName
                        };
                        requests.push($http.get(requestUrl, { cache: false }));
                    });

                    $q.all(requests).then(function (results) {
                        requests = [];
                        angular.forEach(results, function (result) {

                            var folderName = requestsData[result.config.url].folderName;
                            var configContent = result.data;

                            var requestUrl = templatesBaseFolder + folderName + '/template.txt';
                            requestsData[requestUrl] = {
                                template: getConfigFromFile(configContent),
                                configContent: configContent
                            };
                            requests.push($http.get(requestUrl, { cache: false }));
                        });

                        $q.all(requests).then(function (results) {
                            angular.forEach(results, function (result) {
                                var data = requestsData[result.config.url];
                                var template = data.template;
                                var configContent = data.configContent;

                                template.templateFileContent = result.data;
                                template.sourceCode = configContent;
                                templates.push(template);
                            });

                            onSuccess(templates);
                        });
                    });
                }
            }
        };
    }]);