angular.module('dbPlannerApp').factory('CodeEditorService',
    function () {
        return {
            getConfig: function (editorLanguage) {
                return "{" +
                    "onLoad: codeEditor.aceLoaded," +
                    "theme: 'tomorrow_night_bright'," +
                    "useWrapMode: true," +
                    "mode: '" + editorLanguage + "'" +
                    "}";
            },
            aceLoaded: function (_editor) {
                // This is to remove following warning message on console:
                // Automatically scrolling cursor into view after selection change this will be disabled in the next version
                _editor.$blockScrolling = Infinity;
            }
        };
    })