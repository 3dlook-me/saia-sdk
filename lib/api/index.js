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
   *   key: '<your key>',
   *   host: '<api host url>',
   * });
   * @param  {Object} options - options
   * @param  {string} options.host - API url
   * @param  {string} options.key - API key
   */
  constructor(options = {}) {
    if (!options.host) {
      throw new Error('You need to specify API host URL');
    }

    if (!options.key) {
      throw new Error('You need to specify API key');
    }

    this.host = options.host;
    this.key = options.key;
    this.axios = axios.create();
    this.axios.defaults.headers = {
      Authorization: `APIKey ${this.key}`,
    };

    this.person = new Person(this.host, this.axios);
    this.queue = new Queue(this.host, this.axios);
  }
}

export default API;
