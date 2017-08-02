var Columns = function () {
    var columnNameEditor = element(by.model('columnNameEditor'));
    var columnTypeEditor = element(by.model('columnTypeEditor'));
    var isPrimaryKeyEditor = element(by.model('columnEditor.isPrimaryKey'));
    var addColumnButton = element(by.id('addColumnButton'));

    this.types = {
        Text: 'text',
        Number: 'number',
        Date: 'date'
    };

    this.add = function (name, type, isPrimaryKey) {
        columnNameEditor.sendKeys(name);
        columnTypeEditor.evaluate("columnTypeEditor = '" + type + "';");
        isPrimaryKeyEditor.evaluate("columnEditor.isPrimaryKey = " + isPrimaryKey + ";");

        addColumnButton.click();
    };
};
module.exports = Columns;