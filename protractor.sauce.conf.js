// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  multiCapabilities: [{
    browserName: 'firefox',
    version: '32',
    platform: 'OS X 10.10',
    name: "firefox-tests",
    shardTestFiles: true,
    maxInstances: 25
  }, {
    browserName: 'chrome',
    version: '41',
    platform: 'Windows 7',
    name: "chrome-tests",
    shardTestFiles: true,
    maxInstances: 25
  }],
  //directConnect: false,
  //baseUrl: 'http://' + process.env.SAUCE_USERNAME + ':' + process.env.SAUCE_ACCESS_KEY + 'ondemand.saucelabs.com/wd/hub',
  //framework: 'jasmine',
  //jasmineNodeOpts: {
  //  showColors: true,
  //  defaultTimeoutInterval: 30000,
  //  print: function() {}
  //},
  //useAllAngular2AppRoots: true,
  //beforeLaunch: function() {
  //  require('ts-node').register({
  //    project: 'e2e'
  //  });
  //},
  onPrepare: function() {
    var caps = browser.getCapabilities()
  },
  onComplete: function() {
    var printSessionId = function(jobName) {
      browser.getSession().then(function(session) {
        console.log('SauceOnDemandSessionId=' + session.getId() + ' job-name=' + jobName);
      });
    }

    printSessionId('multipli');
  }
};
