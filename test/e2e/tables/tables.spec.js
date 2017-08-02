var Tables = require('./tables.po.js');
var Columns = require('../columns/columns.po.js');
var ConfirmDialog = require('../elements/confirmDialog.po.js');

describe('Tables', function () {
    var tables = new Tables();
    function expectOnlyTableNameToBe(tableName) {
        expect(tables.count()).toEqual(1);
        expect(tables.getFirst().getName()).toEqual(tableName);
        expect(tables.getSelectedTableName()).toEqual(tableName);
    }

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    it('should add and select table', function () {
        var tableName = 'MyTableName';

        expect(tables.count()).toEqual(0);
        tables.setEditorText(tableName);
        expect(tables.getEditorText()).toEqual(tableName);
        tables.clickAdd();
        expect(tables.getEditorText()).toEqual('');

        expect(tables.count()).toEqual(1);
        expect(tables.getFirst().getName()).toEqual(tableName);
        expect(tables.getSelectedTableName()).toEqual(tableName);
    });
    it('should switch selected table', function () {
        var tableNames = ['TableOne', 'TableTwo', 'TableThree'];
        tables.addMulti(tableNames);

        expect(tables.getSelectedTableName()).toEqual(tableNames[2]);

        var indexes = [0, 2, 1];
        for (var i = 0; i < indexes.length; i++) {
            var index = indexes[i];
            tables.select(index);
            expect(tables.getSelectedTableName()).toEqual(tableNames[index]);
        }
    });
    it('should edit table name', function () {
        var oldTableName = 'OldTableName';
        var newTableName = 'NewTableName';
        tables.add(oldTableName);

        //Before changing
        expectOnlyTableNameToBe(oldTableName);

        //Change the table name
        tables.setSelectedTableName(newTableName);

        //After changing
        expectOnlyTableNameToBe(newTableName);
    });

    describe('Delete', function () {
        beforeEach(function () {
            var tableName = 'TableName';
            tables.add(tableName);
            expectOnlyTableNameToBe(tableName);
        });

        it('empty table', function () {
            tables.getFirst().delete();
            expect(tables.count()).toEqual(0);
        });

        describe('Table with columns', function () {
            var columns = new Columns();
            var confirmDialog = new ConfirmDialog();

            beforeEach(function () {
                columns.add("TestColumn", columns.types.Text, false);
                tables.getFirst().delete();
            });

            it('and confirm', function () {
                confirmDialog.confirm();
                expect(tables.count()).toEqual(0);
            });

            it('and cancel', function () {
                confirmDialog.cancel();
                expect(tables.count()).toEqual(1);
            });
        });
    });
});