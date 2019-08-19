import API from './api';
import utils from './utils';

class SAIA {
  /**
   * SAIA class constructor
   *
   * @example
   * const saia = new SAIA({
   *   key: '<your key>'
   * });
   * @param {Object} options - config parameters
   * @param {string} options.key - api key
   * @param {string} options.host - api host url
   */
  constructor(options = {}) {
    this.defaults = {
      key: null,
      host: (typeof API_HOST !== 'undefined') ? API_HOST : 'https://saia.3dlook.me/api/v2/',
    };

    this.defaults = Object.assign(this.defaults, options);

    this.api = new API({
      host: this.defaults.host,
      key: this.defaults.key,
    });

    this.utils = utils;
  }
}

export default SAIA;
