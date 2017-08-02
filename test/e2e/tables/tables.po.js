var Tables = function () {
    var TableItem = function (element) {
        this.getName = function () {
            return element
                .element(by.binding('table.name'))
                .getText();
        };
        this.delete = function () {
            element
                .element(by.css('.delete-table-button'))
                .click();
        };
    };

    var tableNameEditor = element(by.model('tableNameEditor'));
    var addTableButton = element(by.id('addTableButton'));
    var selectedTable = element(by.model('selectedTable.name'));
    var tablesList = element.all(by.repeater('table in getCurrentDatabase().tables'));

    this.getEditorText = function () {
        return tableNameEditor.getAttribute('value');
    };
    this.setEditorText = function (tableName) {
        tableNameEditor.sendKeys(tableName);
    };

    this.clickAdd = function () {
        addTableButton.click();
    };
    this.add = function (tableName) {
        this.setEditorText(tableName);
        this.clickAdd();
    };
    this.addMulti = function (tableNames) {
        for (var i = 0; i < tableNames.length; i++) {
            this.add(tableNames[i]);
        }
    };

    this.getSelectedTableName = function () {
        return selectedTable.getAttribute('value');
    };
    this.setSelectedTableName = function (tableName) {
        selectedTable.sendKeys(tableName);
    };

    this.count = function () {
        return tablesList.count();
    };
    this.select = function (index) {
        tablesList.get(index).click();
    };

    this.getFirst = function () {
        return new TableItem(tablesList.first());
    };
};
module.exports = Tables;