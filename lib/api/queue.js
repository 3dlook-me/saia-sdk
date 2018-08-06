import utils from '../utils';

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
      method: 'get',
    })
      .then(response => response.data);
  }

  /**
   * Check task status and if it is success, return person object
   *
   * @async
   * @param {string} id - taskset id
   * @returns {Promise<object>}
   */
  getResults(id) {
    if (!id) {
      throw new Error('id is not specified');
    }

    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        this.get(id)
          .then((data) => {
            if (data.is_ready === true && data.is_successful === false) {
              clearInterval(timer);
              reject(new Error(utils.getTaskError(data.sub_tasks)));
            }

            if (data.is_successful === undefined) {
              clearInterval(timer);

              this.data.instanceURL = data.url;
              resolve(data);
            }
          })
          .catch((err) => {
            reject(err);
            clearInterval(timer);
          });
      }, 2000);
    });
  }
}

export default Queue;
