// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/docs/referenceConf.js

/*global jasmine */
var SpecReporter = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  capabilities: {
    browserName: 'chrome',
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    isVerbose: false,
    includeStackTrace: false,
    print: function() {},
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e'
    });
  },
  onPrepare: function() {
    jasmine.getEnv().addReporter(new SpecReporter({
      displayStacktrace: 'none',
      displaySuccessfulSpec: false,     
      displayFailedSpec: false,         
      displayPendingSpec: false, 
    }));

    jasmine.getEnv().addReporter({
      suiteDone: function(result) {
        specDescription = result.description;
        specFullName = result.fullName;

        console.dir(result);
      },
      specDone: function(result) {
        specDescription = result.description;
        specFullName = result.fullName;

        console.dir(result);
      }
    });
//    jasmine.getEnv().topSuite().afterEach({fn: function(test) {
//      console.dir(this.getFullName());
//
//    }});
  }
};
