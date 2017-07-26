describe('Tables', function () {
    var tableNameEditor = element(by.model('tableNameEditor'));
    var addTableButton = element(by.id('addTableButton'));
    var tablesList = element.all(by.repeater('table in getCurrentDatabase().tables'));
    var selectedTable = element(by.model('selectedTable.name'));

    function addTable(tableName) {
        tableNameEditor.sendKeys(tableName);
        addTableButton.click();
    }
    function addTables(tableNames) {
        for (var i = 0; i < tableNames.length; i++) {
            addTable(tableNames[i]);
        }
    }
    function expectOnlyTableNameToBe(tableName) {
        expect(tablesList.count()).toEqual(1);
        expect(tablesList
            .first()
            .element(by.binding('table.name'))
            .getText())
            .toEqual(tableName);

        expect(selectedTable
            .getAttribute('value'))
            .toEqual(tableName);
    }

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    it('should add and select table', function () {
        var tableName = 'MyTableName';

        expect(tablesList.count()).toEqual(0);
        tableNameEditor.sendKeys(tableName);
        expect(tableNameEditor.getAttribute('value')).toEqual(tableName);
        addTableButton.click();
        expect(tableNameEditor.getAttribute('value')).toEqual('');
        expect(tablesList.count()).toEqual(1);

        expect(tablesList
            .first()
            .element(by.binding('table.name'))
            .getText())
            .toEqual(tableName);

        expect(selectedTable
            .getAttribute('value'))
            .toEqual(tableName);
    });
    it('should switch selected table', function () {
        var tableNames = ['TableOne', 'TableTwo', 'TableThree'];
        addTables(tableNames);

        expect(selectedTable
            .getAttribute('value'))
            .toEqual(tableNames[2]);

        var indexes = [0, 2, 1];
        for (var i = 0; i < indexes.length; i++) {
            var index = indexes[i];
            tablesList.get(index).click();
            expect(selectedTable
            .getAttribute('value'))
            .toEqual(tableNames[index]);
        }
    });
    it('should edit table name', function () {
        var oldTableName = 'OldTableName';
        var newTableName = 'NewTableName';
        addTable(oldTableName);

        //Before changing
        expectOnlyTableNameToBe(oldTableName);

        //Change the table name
        selectedTable.sendKeys(newTableName);

        //After changing
        expectOnlyTableNameToBe(newTableName);
    });
});