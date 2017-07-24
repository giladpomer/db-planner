angular.module('dbPlannerApp').factory('CurrentDatabaseService',
    function() {
        var databaseRef;

        return {
            get: function() {
                return databaseRef;
            },
            set: function(database) {
                databaseRef = database;
            }
        };
    });