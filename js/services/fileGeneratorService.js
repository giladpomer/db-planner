angular.module('dbPlannerApp').factory('FileGeneratorService',
    function() {
        return {
            download: function(fileName, content) {
                var a = window.document.createElement('a');
                a.href = window.URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8;' }));
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }
    });