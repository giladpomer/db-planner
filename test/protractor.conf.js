exports.config = {
    framework: 'jasmine',
    baseUrl: 'http://localhost:3000/',
    specs: [
        'e2e/*.spec.js'
    ],

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            // disable "chrome is being controlled by automated software"
            'args': ['disable-infobars=true'],

            // disable Password manager popup
            'prefs': {
                'credentials_enable_service': false
            }
        }
    }
}