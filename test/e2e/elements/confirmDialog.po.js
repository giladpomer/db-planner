var ConfirmDialog = function () {
    this.confirm = function () {
        element(by.css('md-dialog .md-confirm-button')).click();
    };
    this.cancel = function () {
        element(by.css('md-dialog .md-cancel-button')).click();
    };
};
module.exports = ConfirmDialog;