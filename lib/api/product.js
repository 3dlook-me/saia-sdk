/**
 * Product class
 */
class Product {
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
    this.api = `${host}products/`;
  }

  /**
   * Get sizes for product based on person parameters.
   * This method uses old implemendation of a size recommendation method
   *
   * @async
   * @example
   * const saia = new SAIA({
   *   key: '<your key>',
   * });
   *
   * saia.api.product.getSize({
   *   height: 173,
   *   gender: 'female',
   *   hips: 89,
   *   chest: 87,
   *   waist: 73,
   *   url: 'https://saia.3dlook.me/test-product',
   * })
   *   .then(size => console.log(size))
   *   .catch(err => console.log(err));
   * @param {Object} params - parameters
   * @param {number} params.height - person's height
   * @param {string} params.gender - person's gender
   * @param {number} params.hips - person's volume_params.hips
   * @param {number} params.chest - person's volume_params.chest
   * @param {number} params.waist - person's volume_params.waist
   * @param {string} params.url - product url
   * @returns {Promise<object>}
   */
  getSize(params) {
    if (!params) {
      throw new Error('params is not specified');
    }

    if (!params.height) {
      throw new Error('height is not specified');
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

    if (!params.url) {
      throw new Error('url is not specified');
    }

    return this.axios({
      url: `${this.api}product/get-size/`,
      method: 'post',
      data: params,
    })
      .then(response => response.data);
  }

  /**
   * Get size recommendations for a selected product based on user measurements.
   * This method uses new implementation of a size recommendation method.
   *
   * @async
   * @example
   * const saia = new SAIA({
   *   key: '<your key>',
   * });
   *
   * saia.api.product.getRecommendations({
   *   gender: 'female',
   *   hips: 89,
   *   chest: 87,
   *   waist: 73,
   *   url: 'https://saia.3dlook.me/test-product',
   * })
   *   .then(size => console.log(size))
   *   .catch(err => console.log(err));
   * @param {Object} params - parameters
   * @param {string} params.gender - person's gender
   * @param {number} params.hips - person's volume_params.hips
   * @param {number} params.chest - person's volume_params.chest
   * @param {number} params.waist - person's volume_params.waist
   * @param {string} params.url - product url
   * @returns {Promise<object>}
   */
  getRecommendations(params) {
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

    if (!params.url) {
      throw new Error('url is not specified');
    }

    return this.axios({
      url: `${this.api}size/recommendation/`,
      method: 'post',
      data: params,
    })
      .then(response => response.data);
  }
}

export default Product;
