import Person from './person';

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
    this.person = new Person(host, this.axios);
    this.cachedPersonId = null;
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
      .then((response) => {
        if (response.headers.location) {
          const matches = response.headers.location.match(/\/\d+\//gm);
          this.cachedPersonId = matches[0].replace(/\//g, '');
        }

        return response.data;
      });
  }

  /**
   * Check task status and if it is success, return person object
   *
   * @async
   * @private
   * @param {string} id - taskset id
   * @param {number} delay - delay before next check
   */
  checkStatus(id, delay) {
    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        this.get(id)
          .then((data) => {
            if (data.is_successful === undefined) {
              clearInterval(timer);

              resolve(data);
            }
          })
          .catch((err) => {
            reject(err);
            clearInterval(timer);
          });
      }, delay);
    });
  }

  /**
   * Get result of person processing
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
      this.checkStatus(id, finalDelay)
        .then((person) => {
          resolve(person);
        })
        .catch((err) => {
          // try to handle redirect error
          if (err.message === 'Network Error'
              || err.message === 'Request failed with status code 401') {
            return this.person.get(this.cachedPersonId)
              .then(r => resolve(r))
              .catch(e => reject(e));
          }

          return reject(err);
        });
    });
  }
}

export default Queue;
