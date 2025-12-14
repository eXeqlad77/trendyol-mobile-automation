export const config = {
    user: "sleymanyce_84E6BZ",
    key: "gYagfs6isybr7hqFXcxg",

    services: [
        ['browserstack', {
            app: "bs://4fca7232a57811f6a792f49a77e275e85b6dcaf8",
            browserstackLocal: false
        }]
    ],

    runner: 'local',

    specs: [
        './features/**/*.feature'
    ],

    exclude: [],

    maxInstances: 1,

    capabilities: [{
        platformName: "Android",
        "appium:automationName": "UiAutomator2",

        "appium:deviceName": "Samsung Galaxy S23",

        "appium:platformVersion": "13.0",


        "appium:app": "bs://4fca7232a57811f6a792f49a77e275e85b6dcaf8",

        "bstack:options": {
            projectName: "Trendyol Automation",
            buildName: "Android Test Build",
            sessionName: "Shopping Flow Test",
            userName: "sleymanyce_84E6BZ",
            accessKey: "gYagfs6isybr7hqFXcxg"
        }
    }],

    logLevel: 'info',

    bail: 0,

    waitforTimeout: 30000,

    connectionRetryTimeout: 120000,

    connectionRetryCount: 3,

    framework: 'cucumber',

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    cucumberOpts: {
        require: ['./features/step-definitions/shopping.steps.js'],
        timeout: 60000
    }
}
