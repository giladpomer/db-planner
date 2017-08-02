var Databases = function () {
    var DatabaseItem = function (element) {
        this.getName = function () {
            return element
                .element(by.binding('database.name'))
                .getText();
        };
        this.delete = function () {
            element
                .element(by.css('.delete-database-button'))
                .click();
        };
    };

    var toggleDatabases = element(by.id('toggleDatabases'));
    var closeDatabases = element(by.id('closeDatabases'));
    var databaseNameEditor = element(by.model('databaseNameEditor'));
    var addDatabaseButton = element(by.id('addDatabaseButton'));
    var databasesList = element.all(by.repeater('database in databases'));

    this.showList = function () {
        toggleDatabases.click();
    };
    this.hideList = function () {
        closeDatabases.click();
    };

    this.setEditorText = function (databaseName) {
        databaseNameEditor.sendKeys(databaseName);
    };

    this.clickAdd = function () {
        addDatabaseButton.click();
    };
    this.add = function (databaseName) {
        this.setEditorText(databaseName);
        this.clickAdd();
    };

    this.count = function () {
        return databasesList.count();
    };

    this.getLast = function () {
        return new DatabaseItem(databasesList.last());
    };
};
module.exports = Databases;