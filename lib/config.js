'use strict';
/**
 * A function to require configuration files and handle errors
 *
 * Loads files, applying default first, then any environment config files,
 * then any options passed in the parameter object, adding new keys to the
 * config object, ond overwriting existing keys in the order applied,
 * i.e. default, environment, passed in parameters.
 *
 * @memberof module:@virtualstyle/config
 * @method config
 * @param  {object} options An object containing configuration
 *                          passthrus and overrides.
 * @return {object}
 */
module.exports = function config(options) {

    const defaultConfig = loadConfig('default', options);

    // If NODE_ENV environment variable is defined, load a config
    // module with the filename equal to the value of NODE_ENV.
    let environmentConfig = {};
    if (typeof process.env.NODE_ENV !== 'undefined') {
      environmentConfig = loadConfig(process.env.NODE_ENV, options);
    }

    // Use Object.assign to merge our various config values,
    // in order of priority
    return Object.assign({},
        defaultConfig,
        environmentConfig,
        options
    );
  };

/**
 * Method to handle requiring config files, quietly recovering from errors,
 * emitting a warning and returning an empty object.
 *
 * @memberof module:@virtualstyle/config
 * @method loadConfig
 * @param  {string}   configModule The module name/path
 * @param  {object}   options      An object with passthru/override values
 * @return {object}
 */
function loadConfig(configModule, options) {

    options = options || {};

  /**
   * Initialize an empty object to hold any environment config data.
   * @type {Object}
   */
  let config = {};

  // Global vs local and potential nesting issues with determining the correct
  // config directory can be resolved by passing in a configDir option.
  // We look for a directory named config on that directory, or else in the
  // immediate parent directory.
  let configDir = '..';
  if (typeof options.configDir !== 'undefined') {
    configDir = options.configDir;
  }

  // Using a try block because require will die on nonexistent files.
  // Instead, we'll emit a warning and return an empty object.
  try {
    config = require(configDir + '/config/' + configModule)(options);
  } catch (e) {
    process.emitWarning('CONFIG FILE NOT FOUND config/' +
        configModule + '.js.', 'VSConfigWarning');
  }

  return config;
}
