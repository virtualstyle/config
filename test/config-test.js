var assert = require('assert');
var colors = require('colors');

var nodeGenConfig = new(require('../index'))();

var warningEmitted = false;

const p = process.on('warning', (warning) => {
    warningEmitted = true;
});

describe('Testing @virtualstyle/node-gen-test config'.bold.underline,
    function () {

        beforeEach(function () {});

        it('nodeGenConfig is an object'.italic, function () {
            assert(typeof nodeGenConfig === 'object');
        });

        it('Test loading existing file from NODE_ENV'.italic, function () {

            const expectedConfig = {
                option1: 'This is the default config option1',
                option2: 'This is the dev override of config option2',
                option3: 'This is the default config option3',
                option4: 'This is the default config option4',
                option5: 'This is the default config option5',
                option6: 'This is an option defined in the dev config'
            }

            process.env.NODE_ENV = 'dev';
            const config = new(require('../index'))();
            assert(typeof config === 'object');
            assert.deepEqual(config, expectedConfig);
        });

        it('Test configDir option'.italic, function () {

            delete process.env.NODE_ENV;
            const config = new(require('../index'))({
                configDir: '..'
            });
            const expectedConfig = {
                configDir: '..',
                option1: 'This is the default config option1',
                option2: 'This is the default config option2',
                option3: 'This is the default config option3',
                option4: 'This is the default config option4',
                option5: 'This is the default config option5',
            };
            assert(typeof config === 'object');
            assert.deepEqual(config, expectedConfig);

        });

        it('Test loading nonexistent file from NODE_ENV'.italic, function () {

            process.env.NODE_ENV = 'nonexistent';
            const config = new(require('../index'))();
            const expectedConfig = {
                option1: 'This is the default config option1',
                option2: 'This is the default config option2',
                option3: 'This is the default config option3',
                option4: 'This is the default config option4',
                option5: 'This is the default config option5',
            };
            assert(typeof config === 'object');
            assert.deepEqual(config, expectedConfig);

        });

        it('Test loading overrides plus file from NODE_ENV'.italic,
            function () {

                process.env.NODE_ENV = 'dev';
                const config = new(require('../index'))({
                    option2: 'This is the override arg config option2',
                });

                const expectedConfig = {
                    option1: 'This is the default config option1',
                    option2: 'This is the override arg config option2',
                    option3: 'This is the default config option3',
                    option4: 'This is the default config option4',
                    option5: 'This is the default config option5',
                    option6: 'This is an option defined in the dev config'
                };

                assert(warningEmitted);
                warningEmitted = false;
                assert(typeof config === 'object');
                assert.deepEqual(config, expectedConfig);

            });

    });
