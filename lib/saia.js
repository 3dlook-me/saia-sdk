import API from './api';
import Widget from './widget';

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
      host: 'https://saia-test.3dlook.me/api/v2/',
    };

    this.defaults = Object.assign(this.defaults, options);

    this.api = new API({
      host: this.defaults.host,
      key: this.defaults.key,
    });

    this.widget = {};
    this.widget.create = params => new Widget(Object.assign(params, {
      host: this.defaults.host,
      key: this.defaults.key,
    }));
  }
}

export default SAIA;
