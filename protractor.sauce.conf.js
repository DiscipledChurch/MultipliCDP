// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

/*global jasmine */
//var SpecReporter = require('jasmine-spec-reporter');

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
  directConnect: false,
  seleniumAddress: 'http://' + process.env.SAUCE_USERNAME + ':' + process.env.SAUCE_ACCESS_KEY + '@ondemand.saucelabs.com:80/wd/hub',
  baseUrl: 'http://multipli-test.herokuapp.com/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: false,
    includeStackTrace: false,
    print: function() {},
  },
  useAllAngular2AppRoots: true,
  //beforeLaunch: function() {
  //  require('ts-node').register({
  //    project: 'e2e'
  //  });
  //},
  onPrepare: function() {
  //   jasmine.getEnv().addReporter(new SpecReporter());
    
    require('ts-node').register({
      project: 'e2e'
    });

    jasmine.getEnv().addReporter({
      specDone: function(result) {
        specDescription = result.description;
        specFullName = result.fullName;

        browser.getSession().then(function(session) {

            var exec = require('child_process').exec;
//            var cmd = 'curl -X PUT -s -d \'{"name": "' + result.fullName + '", "passed": ' + (result.status == 'passed' ? 'true' : 'false') + '}\' -u ' + process.env.SAUCE_USERNAME + ':' + process.env.SAUCE_ACCESS_KEY + ' https://saucelabs.com/rest/v1/' + process.env.SAUCE_USERNAME + '/jobs/' + session.getId();
console.log(JSON.stringify(result));
            var cmd = 'curl -X PUT -s -d \'{"name": "' + result.fullName + '", "passed": false, "custom-data": ' + JSON.stringify(result) + '}\' -u ' + process.env.SAUCE_USERNAME + ':' + process.env.SAUCE_ACCESS_KEY + ' https://saucelabs.com/rest/v1/' + process.env.SAUCE_USERNAME + '/jobs/' + session.getId();

            exec(cmd, function(error, stdout, stderr) {
              console.log('stdout: ' + stdout);
              console.log('stderr: ' + stderr);

              if(error !== null)
              {
                  console.log('exec error: ' + error);
              }
            });

        });

      }
    });

    var caps = browser.getCapabilities()
  },
  onComplete: function() {

  }
};
