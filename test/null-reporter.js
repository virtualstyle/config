var mocha = require('mocha');
module.exports = nullReporter;

/**
 * Just a dummy to pass to Mocha on the command line, to suppress test output
 * when coverage is run.
 * @method nullReporter
 */
function nullReporter() {

}
