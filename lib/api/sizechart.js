/**
 * Product class
 */
class Sizechart {
  /**
   * Product's class constructor
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
    this.api = `${host}sizecharts/`;
  }

  /**
   * Get sizes for brand and body part based on person parameters
   *
   * @async
   * @example
   * const saia = new SAIA({
   *   key: '<your key>',
   * });
   *
   * saia.api.sizechart.getSize({
   *   gender: 'female',
   *   hips: 89,
   *   chest: 87,
   *   waist: 73,
   *   body_part: 'top',
   *   brand: 'Nike',
   * })
   *   .then(size => console.log(size))
   *   .catch(err => console.log(err));
   * @param {Object} params - parameters
   * @param {string} params.gender - person's gender
   * @param {number} params.hips - person's volume_params.hips
   * @param {number} params.chest - person's volume_params.chest
   * @param {number} params.waist - person's volume_params.waist
   * @param {number} params.body_part - body part
   * @param {number} params.brand - brand name
   * @returns {Promise<object>}
   */
  getSize(params) {
    if (!params) {
      throw new Error('params is not specified');
    }

    if (!params.gender) {
      throw new Error('gender is not specified');
    }

    if (!params.hips) {
      throw new Error('hips is not specified');
    }

    if (!params.chest) {
      throw new Error('chest is not specified');
    }

    if (!params.waist) {
      throw new Error('waist is not specified');
    }

    if (!params.body_part) {
      throw new Error('body_part is not specified');
    }

    if (!params.brand) {
      throw new Error('brand is not specified');
    }

    return this.axios({
      url: `${this.api}size/recommendation/`,
      method: 'get',
      params,
    })
      .then(response => response.data)
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          return Promise.resolve(null);
        }

        return Promise.reject(error);
      });
  }
}

export default Sizechart;
