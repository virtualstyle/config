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
                option2: 'This is the dev overwrite of config option2',
                option3: 'This is the dev overwrite of config option3',
                option4: 'This is the dev overwrite of config option4',
                option5: 'This is the dev overwrite of config option5',
                option6: 'This is the dev overwrite of config option6',
                option7: 'This is an option defined in the dev config',
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
                option1: 'This is the default config option1',
                option2: 'This is the default config option2',
                option3: 'This is the default config option3',
                option4: 'This is the default config option4',
                option5: 'This is the default config option5',
                option6: 'This is the default config option6',
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
                option6: 'This is the default config option6',
            };
            assert(typeof config === 'object');
            assert.deepEqual(config, expectedConfig);

        });

        it('Test loading options parameter plus file from NODE_ENV'.italic,
            function () {

                process.env.NODE_ENV = 'dev';
                const config = new(require('../index'))({
                    option2: 'This is the arg overwrite config option2',
                });

                const expectedConfig = {
                    option1: 'This is the default config option1',
                    option2: 'This is the arg overwrite config option2',
                    option3: 'This is the dev overwrite of config option3',
                    option4: 'This is the dev overwrite of config option4',
                    option5: 'This is the dev overwrite of config option5',
                    option6: 'This is the dev overwrite of config option6',
                    option7: 'This is an option defined in the dev config',
                };

                assert(warningEmitted);
                warningEmitted = false;
                assert(typeof config === 'object');
                assert.deepEqual(config, expectedConfig);

            });

        it('Test loading options.configOverrides array'.italic, function () {

            //delete process.env.NODE_ENV;

            const config = new(require('../index'))({
                configOverrides: [
                    'override',
                    'local'
                ]
            });

            const expectedConfig = {
                option1: 'This is the default config option1',
                option2: 'This is the dev overwrite of config option2',
                option3: 'This is the override overwrite of config option3',
                option4: 'This is the dev-override overwrite of config option4',
                option5: 'This is the local overwrite of config option5',
                option6: 'This is the dev-local overwrite of config option6',
                option7: 'This is an option defined in the dev config',
                option8: 'This is an option defined in the override config',
                option9: 'This is an option defined in the dev-override config',
                option10: 'This is an option defined in the local override config',
                option11: 'This is an option defined in the dev-local override config'
            };
            assert(typeof config === 'object');
            assert.deepEqual(config, expectedConfig);

        });

        it('Test loading options.configOverrides array with undefined NODE_ENV'.italic, function () {

            delete process.env.NODE_ENV;

            const config = new(require('../index'))({
                configOverrides: [
                'override',
                'local'
            ]
            });

            const expectedConfig = {
                option1: 'This is the default config option1',
                option2: 'This is the default config option2',
                option3: 'This is the override overwrite of config option3',
                option4: 'This is the override overwrite of config option4',
                option5: 'This is the local overwrite of config option5',
                option6: 'This is the local overwrite of config option6',
                option8: 'This is an option defined in the override config',
                option10: 'This is an option defined in the local override config',
            };
            assert(typeof config === 'object');
            assert.deepEqual(config, expectedConfig);

        });

    });
