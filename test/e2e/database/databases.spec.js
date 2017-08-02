var Databases = require('./databases.po.js');
var Tables = require('../tables/tables.po.js');
var ConfirmDialog = require('../elements/confirmDialog.po.js');

describe('Databases', function () {
    var databases = new Databases();

    beforeEach(function () {
        browser.get(browser.baseUrl);
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