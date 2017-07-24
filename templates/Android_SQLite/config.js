var config = {
    title: 'Android (Java) & Sqlite',
    databaseEditorLanguage: 'sql',
    objectsEditorLanguage: 'java',
    objectFileExtension: 'java',

    objectDataTypes: {
        text: 'String',
        number: 'int',
        date: 'Date'
    },
    methods: {
        createTable: function (table) {
            var columns = [];
            var primaryKeys = [];
            var data = "user_id INT(20), user_isDeleted BIT, ";

            var sqlDataTypes = {
                text: 'VARCHAR',
                number: 'INT(10)',
                date: 'VARCHAR'
            };

            angular.forEach(table.columns, function (column) {
                columns.push(column.name + " " + sqlDataTypes[column.type]);
                if (column.isPrimaryKey) {
                    primaryKeys.push(column.name);
                }
            });

            if (primaryKeys.length > 0) {
                columns.push("PRIMARY KEY (" + primaryKeys.join(", ") + ")");
            }

            return "CREATE TABLE IF NOT EXISTS " + table.name + " (" + columns.join(", ") + ")";
        },
        fields: function (table) {
            var fields = [];
            angular.forEach(table.columns, function (column) {
                fields.push("private " + config.objectDataTypes[column.type] + " " + column.name + ";");
            });

            return fields.join("\n\t");
        },
        fieldsAsMethodParams: function (table) {
            var fields = [];
            angular.forEach(table.columns, function (column) {
                fields.push(config.objectDataTypes[column.type] + " " + column.name);
            });

            return fields.join(", ");
        },
        fieldsInConstructor: function (table) {
            var fields = [];
            angular.forEach(table.columns, function (column) {
                fields.push("this." + column.name + " = " + column.name + ";");
            });

            return fields.join("\n\t\t");
        },
        fieldsGetters: function (table, utils) {
            var fields = [];
            angular.forEach(table.columns, function (column) {
                var methodName = "get" + utils.upperCamelCase(column.name);

                fields.push("public " + config.objectDataTypes[column.type] + " " + methodName + "() {\n" +
                    "\t\treturn " + column.name + ";\n" +
                    "\t}");
            });

            return fields.join("\n\n\t");
        },
        fieldsInInsertValues: function (table) {
            var fields = [];
            angular.forEach(table.columns, function (column) {
                if ("date" === column.type) {
                    fields.push("\" + escape(formatDate(" + column.name + ")) + \"");
                } else {
                    fields.push("\" + escape(" + column.name + ") + \"");
                }
            });

            return fields.join(", ");
        },
        fieldsInGetAll: function (table) {
            var fields = [];
            angular.forEach(table.columns, function (column) {
                if ("date" === column.type) {
                    fields.push("getDate(c, \"" + column.name + "\")");
                } else if ("number" === column.type) {
                    fields.push("c.getInt(c.getColumnIndex(\"" + column.name + "\"))");
                } else {
                    fields.push("c.getString(c.getColumnIndex(\"" + column.name + "\"))");
                }
            });

            return fields.join(",\n\t\t\t\t\t");
        }
    }
}