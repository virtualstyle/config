## @virtualstyle/config

#### Project Status & Docs:
[![Build Status](https://travis-ci.org/virtualstyle/config.svg?branch=master)](https://travis-ci.org/virtualstyle/config)
[![Coverage Status](https://coveralls.io/repos/github/virtualstyle/config/badge.svg?branch=master)](https://coveralls.io/github/virtualstyle/config?branch=master)
|
[Coverage Reports](https://virtualstyle.github.io/config/coverage)
|
[Docs](https://virtualstyle.github.io/config/)
___
### Project Info:
Simple configuration module to provide environment handling and overrides.

Written out of a frustration with other Node configuration options, This is my crude reinvention of the wheel for my projects. I'm publishing it only for my own convenience and don't recommend its use by anyone else.

That being said, I might as well explain how it works since it's out here.

This module is designed to accept and merge multiple configuration objects. It will look for a default configuration file, and an environment configuration file, and accept an object passed in. You can also specify an override file scheme as described below, using the configOverrides option. These objects are merged, in order, thus loading the default, then adding to/overriding that with the environment, then adding to that any override files, then adding to/overriding that with the passed in values.

### Install:
`yarn add @virtualstyle/config`

### Important Notes:
###### Error Handling
This module uses Node's require() to load config files. When a nonexistent file is found, the error is caught, an empty object is returned as the value for that require, and a warning emitted. If your app needs to die from missing config, you'll have to check after the load.
###### JavaScript (.js) Files for Configuration
This module uses plain Node modules for configuration. These can export functions that  taking the options sent to config as a parameter and return an object, or they can export objects directly. They can also be JSON files.
###### Directory Named "config" Expected in Root or Passed in "configDir" Option
The module expects a "config" directory to be present in the root of the calling module, or in a directory specified by passing a configDir option in the options object. Passing in the directory enables using this module in modules intended for global installation, and might be required for submodules, I haven't tried a module and a submodule that both use this module yet.
###### Default.js Module Expected in "config" Directory
The module will attempt to load a "default" Node module in the config directory to use as a base/default configuration. Failure returns an empty object and a warning.
###### NODE_ENV Configuration File
The module checks `process.env.NODE_ENV`, and if defined, attempts to load a config module of the same name. Failure returns an empty object and a warning.
###### Optional configOverrides Array
You can pass a configOverrides key in the options object to process files to override configurations. This is expected to be an array of filenames, which will be processed sequentially, with the last being given greatest priority. The module will look for both a module named the same as the overrrides array entry, or a file with the environment name, a dash, and the override name.

For example, passing {configOverrides: ['overrides', 'local']}, with NODE_ENV = "dev", the module looks for modules as follows, adding keys and overwriting any existing keys with later values (see the config directory and tests for this example):

- default
- dev
- overrides
- dev-overrides
- local
- dev-local
- passed in options object

### Example use:
(Also see the config directory and tests)
```javascript

var config = require('@virtualstyle/config')();

// Values passed in will override any values set in config files
var config = require('@virtualstyle/config')({
    someOption: 'SomeValue',
    anotherOption: 'anotherValue'});

// Example passing configDir option
var config = require('@virtualstyle/config')({configDir: 'path/to/config'});

```
