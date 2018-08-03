import axios from 'axios';
import Person from './person';
import Queue from './queue';

/**
 * API wrapper class
 */
class API {
  /**
   * Class constructor
   *
   * @example
   * const api = new API({
   *   apiKey: '<your key>',
   *   apiHost: '<api host url>',
   * });
   * @param  {Object} options - options
   * @param  {string} options.apiHost - API url
   * @param  {string} options.apiKey - API key
   * @param  {number} options.delay - delay that determines how often API will check
   * status of SAIA tasks
   */
  constructor(options = {}) {
    if (!options.apiHost) {
      throw new Error('You need to specify API host URL');
    }

    if (!options.apiKey) {
      throw new Error('You need to specify API key');
    }

    this.host = options.apiHost;
    this.key = options.apiKey;
    this.axios = axios.create();
    this.axios.defaults.headers = {
      Authorization: `APIKey ${this.key}`,
    };

    this.person = new Person(this.host, this.axios);
    this.queue = new Queue(this.host, this.axios);
  }
}

export default API;
