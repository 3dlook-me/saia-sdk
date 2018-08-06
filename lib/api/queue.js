/**
 * Queue class
 */
class Queue {
  /**
   * Queue's class constructor
   *
   * @param {string} host - host url
   * @param {Axios} axios - axios instance
   */
  constructor(host, axios) {
    if (!host) {
      throw new Error('host is not specified');
    }

    if (!axios) {
      throw new Error('axios is not specified');
    }

    this.axios = axios;
    this.api = `${host}queue/`;
  }

  /**
   * Get information about tasks by taskset id
   *
   * @async
   * @param {string} id - taskset id
   * @returns {Promise<object>}
   */
  get(id) {
    if (!id) {
      throw new Error('id is not specified');
    }

    return this.axios({
      url: `${this.api}${id}/`,
      headers: this.headers,
      method: 'get',
    })
      .then(response => response.data);
  }
}

export default Queue;
