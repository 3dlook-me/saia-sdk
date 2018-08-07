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
   * @example
   * const saia = new SAIA({
   *   key: '<your key>',
   * });
   *
   * saia.api.queue.get('4d563d3f-38ae-4b51-8eab-2b78483b153e')
   *   .then(task => console.log(task))
   *   .catch(err => console.log(err));
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
   * @example
   * const saia = new SAIA({
   *   key: '<your key>',
   * });
   *
   * saia.api.queue.getResults('4d563d3f-38ae-4b51-8eab-2b78483b153e')
   *   .then(person => console.log(person))
   *   .catch(err => console.log(err));
   *
   * // you also can specify the delay between checks
   * saia.api.queue.getResults('4d563d3f-38ae-4b51-8eab-2b78483b153e', 3400)
   *   .then(person => console.log(person))
   *   .catch(err => console.log(err));
   * @param {string} id - taskset id
   * @param {number} [delay] - delay before next check
   * @returns {Promise<object>}
   */
  getResults(id, delay) {
    if (!id) {
      throw new Error('id is not specified');
    }

    const finalDelay = delay || 2000;

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

              resolve(data);
            }
          })
          .catch((err) => {
            reject(err);
            clearInterval(timer);
          });
      }, finalDelay);
    });
  }
}

export default Queue;
