'use strict';
/**
 * Simple configuration module to provide environment handling and overrides.
 *
 * Written out of a frustration with other Node configuration options, This
 * is my simple reinvention of the wheel for my projects. I'm publishing it
 * only for my own convenience and don't recommend its use by anyone else.
 *
 * @module @virtualstyle/config
 * @version 0.3.0
 * @exports config
 * @license MIT
 *
 */
const config = require('./lib/config');
module.exports = config;
