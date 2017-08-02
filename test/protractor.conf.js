exports.config = {
    framework: 'jasmine',
    baseUrl: 'http://localhost:3000/',
	seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true,
    specs: [
        'e2e/**/*.spec.js'
    ],

    capabilities: {
        browserName: 'chrome',
        maxInstances: 3,
        shardTestFiles: true,
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