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

        browser.getSession().then(function(session) {

          
          var data = {
              name: result.fullName,
              passed: result.status === 'passed' ? true : false,
              tags: [ "id-" + process.env.TRAVIS_BUILD_ID, "buildNo-" + process.env.TRAVIS_BUILD_NUMBER, "commit-" + process.env.TRAVIS_COMMIT, process.env.TRAVIS_BRANCH ],
              _customData: result
          };

          var formattedData = JSON.stringify(data).replace(/_customData/, "custom-data")
                                                  .replace(/'/g, "*");


            var exec = require('child_process').exec;
            var cmd = "curl -X PUT -s -d \'" + formattedData + "\' -u " + process.env.SAUCE_USERNAME + ":" + process.env.SAUCE_ACCESS_KEY + " https://saucelabs.com/rest/v1/" + process.env.SAUCE_USERNAME + "/jobs/" + session.getId();

            exec(cmd, function(error, stdout, stderr) {
              if(!!error) console.log('exec error: ' + error);
            });
        });
      }
    });

    var caps = browser.getCapabilities()
  }
};
