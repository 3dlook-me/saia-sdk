/**
 * MTMClient class
 */
class MTMClient {
  /**
   * MTMClient's class constructor
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
    this.api = `${host}measurements/mtm-clients/`;
  }

  /**
   * Create mtm client
   *
   * @example
   * const saia = new SAIA({
    *   key: '<your key>',
    * });
    *
    * // create person only with metadata
    * // and get its id
    * saia.api.mtmClient.create({
    *   firstName: 'Stephen',
    *   lastName: 'King',
    *   unit: 'in',
    * })
    *   .then(mtmClientId => console.log(mtmClientId))
    *   .catch(err => console.log(err));
    * @async
    * @param {object} params - mtm client's parameters
    * @param {string} params.firstName - mtm client's first name
    * @param {string} [params.lastName] - mtm client's last name
    * @param {string} params.unit - mtm client's unit - cm or in
    * @param {string} [params.phone] - mtm client's phone number - cm or in
    * @param {string} [params.email] - mtm client's email - cm or in
    * @param {string} [params.source] - the source of the request - dashboard, widget
    * @param {string} [params.notes] - additional information about mtm client
    * @param {string} [params.widgetId] - widget object id
    * @returns {Promise<number>} mtm client's id
    */
  create(params) {
    if (!params) {
      throw new Error('No mtm client\'s parameters passed');
    }

    if (!params.unit) {
      throw new Error('unit is not specified');
    }

    return this.axios({
      url: this.api,
      method: 'post',
      data: {
        first_name: params.firstName,
        last_name: params.lastName,
        unit: params.unit,
        phone: params.phone,
        email: params.email,
        source: params.source,
        notes: params.notes,
        widget_id: params.widgetId,
      },
    }).then(response => response.data.id);
  }

  /**
   * Update mtm client
   *
   * @example
   * const saia = new SAIA({
    *   key: '<your key>',
    * });
    *
    * // update person only with metadata
    * // and get its id
    * const existingMtmClientId = 1;
    *
    * saia.api.mtmClient.update(existingMtmClientId, {
    *   firstName: 'Stephen',
    *   lastName: 'King',
    *   unit: 'in',
    * })
    *   .then(mtmClientId => console.log(mtmClientId))
    *   .catch(err => console.log(err));
    * @async
    * @param {object} params - mtm client's parameters
    * @param {string} params.firstName - mtm client's first name
    * @param {string} [params.lastName] - mtm client's last name
    * @param {string} params.unit - mtm client's unit - cm or in
    * @param {string} [params.phone] - mtm client's phone number - cm or in
    * @param {string} [params.email] - mtm client's email - cm or in
    * @param {string} [params.source] - the source of the request - dashboard, widget
    * @param {string} [params.notes] - additional information about mtm client
    * @param {string} [params.widgetId] - widget object id
    * @returns {Promise<number>} mtm client's id
    */
  update(id, params) {
    if (!id) {
      throw new Error('No mtm client\'s id passed');
    }

    if (!params) {
      throw new Error('No mtm client\'s parameters passed');
    }

    return this.axios({
      url: `${this.api}${id}/`,
      method: 'patch',
      data: params,
    }).then(response => response.data.id);
  }

  /**
   * Create person for mtm client only with metadata (gender and height)
   * or with photos (gender, height, frontImage, sideImage).
   *
   * If you create Person only with metadata, then you will
   * get Person's ID. If you create Person with metadata and images,
   * you will get Taskset ID
   *
   * @example
   * const saia = new SAIA({
    *   key: '<your key>',
    * });
    *
    * // create person only with metadata
    * // and get its id
    * saia.api.mtmClient.createPerson(mtmClientId, {
    *   gender: 'male',
    *   height: 180,
    * })
    *   .then(personId => console.log(personId))
    *   .catch(err => console.log(err));
    *
    * // create person only with metadata and images
    * // and get taskset id. You can use it to track
    * // calculation process by using saia.api.queue.getResults(taskSetId)
    * saia.api.mtmClient.createPerson(mtmClientId, {
    *   gender: 'male',
    *   height: 180,
    *   frontImage: <frontImage>,
    *   sideImage: <sideImage>,
    * })
    *   .then(taskSetId => console.log(taskSetId))
    *   .catch(err => console.log(err));
    * @async
    * @param {number} mtmClientId - mtm client id
    * @param {object} params - person's parameters
    * @param {string} params.gender - person's gender
    * @param {number} params.height - person's height
    * @param {string} [params.measurementsType] - type of measurements - all
    * @param {string} [params.frontImage] - person's Base64 encoded front photo
    * @param {string} [params.sideImage] - person's Base64 encoded side photo
    * @param {string} [params.weight] - person's weight in kg
    * @param {string} [params.weightTopBorder] - person's top weight border in kg
    * @param {string} [params.weightBottomBorder] - person's bottom weight border in kg
    * @returns {Promise<string|number>} person's id or taskset id
    */
  createPerson(mtmClientId, params) {
    if (!mtmClientId) {
      throw new Error('No mtm client id passed');
    }

    if (!params) {
      throw new Error('No mtm client\'s parameters passed');
    }

    if (!params.gender) {
      throw new Error('gender is not specified');
    }

    if (!params.height) {
      throw new Error('height is not specified');
    }

    const getParams = {};

    if (params.measurementsType) {
      getParams.measurements_type = params.measurementsType;
    }

    return this.axios({
      url: `${this.api}${mtmClientId}/persons/`,
      method: 'post',
      data: {
        height: params.height,
        gender: params.gender,
        front_image: params.frontImage,
        side_image: params.sideImage,
        weight: params.weight,
        weight_top_border: params.weightTopBorder,
        weight_bottom_border: params.weightBottomBorder,
      },
      params: getParams,
    })
      .then((response) => {
        if (!params.frontImage && !params.sideImage) {
          return response.data.id;
        }

        const taskSetUrl = response.headers.location;
        const taskSetId = /\/queue\/(.*)\//g.exec(taskSetUrl)[1];
        return taskSetId;
      });
  }
}

export default MTMClient;
