var Databases = require('./databases.po.js');
var Tables = require('../tables/tables.po.js');
var ConfirmDialog = require('../elements/confirmDialog.po.js');

describe('Databases', function () {
    var databases = new Databases();

    beforeEach(function () {
        browser.get(browser.baseUrl);
    });

    it('should add and select database', function () {
        var databaseName = 'MyDatabase';

        databases.showList();
        expect(databases.count()).toEqual(1);
        databases.setEditorText(databaseName);
        expect(databases.getEditorText()).toEqual(databaseName);
        databases.clickAdd();
        databases.showList();
        expect(databases.getEditorText()).toEqual('');

        expect(databases.count()).toEqual(2);
        expect(databases.getLast().getName()).toEqual(databaseName);
        databases.hideList();
        expect(databases.getSelectedDatabaseName()).toEqual(databaseName);
    });
    it('should switch selected database', function () {
        var names = ['DatabaseOne', 'DatabaseTwo', 'DatabaseThree'];
        databases.addMulti(names);

        expect(databases.getSelectedDatabaseName()).toEqual(names[2]);

        var indexes = [0, 2, 1];
        for (var i = 0; i < indexes.length; i++) {
            var index = indexes[i];
            databases.showList();
            databases.select(index + 1);
            expect(databases.getSelectedDatabaseName()).toEqual(names[index]);
        }
    });
    it('should edit database name', function () {
        function expectLastDatabaseNameToBe(databaseName) {
            databases.showList();
            expect(databases.count()).toEqual(2);
            expect(databases.getLast().getName()).toEqual(databaseName);
            databases.hideList();
            expect(databases.getSelectedDatabaseName()).toEqual(databaseName);
        }

        var oldDatabaseName = 'OldDatabaseName';
        var newDatabaseName = 'NewDatabaseName';
        databases.showList();
        databases.add(oldDatabaseName);

        //Before changing
        expectLastDatabaseNameToBe(oldDatabaseName);

        //Change the table name
        databases.setSelectedDatabaseName(newDatabaseName);

        //After changing
        expectLastDatabaseNameToBe(newDatabaseName);
    });

    describe('Delete', function () {
        beforeEach(function () {
            var databaseName = 'DatabaseName';
            databases.showList();
            expect(databases.count()).toEqual(1);
            databases.add(databaseName);
            databases.showList();
            expect(databases.count()).toEqual(2);
        });

        it('empty database', function () {
            databases.getLast().delete();
            expect(databases.count()).toEqual(1);
        });

        describe('Database with Tables', function () {
            var tables = new Tables();
            var confirmDialog = new ConfirmDialog();

            beforeEach(function () {
                databases.hideList();
                tables.add('TableName');
                databases.showList();
                databases.getLast().delete();
            });

            it('and confirm', function () {
                confirmDialog.confirm();
                databases.showList();
                expect(databases.count()).toEqual(1);
            });

            it('and cancel', function () {
                confirmDialog.cancel();
                expect(databases.count()).toEqual(2);
            });
        });
    });
});