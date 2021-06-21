/**
 * Person class
 */
class Person {
  /**
   * Person's class constructor
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
    this.api = `${host}persons/`;
  }

  /**
   * Create person only with metadata (gender and height)
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
   * saia.api.person.create({
   *   gender: 'male',
   *   height: 180,
   * })
   *   .then(personId => console.log(personId))
   *   .catch(err => console.log(err));
   *
   * // create person only with metadata and images
   * // and get taskset id. You can use it to track
   * // calculation process by using saia.api.queue.getResults(taskSetId)
   * saia.api.person.create({
   *   gender: 'male',
   *   height: 180,
   *   frontImage: <frontImage>,
   *   sideImage: <sideImage>,
   * })
   *   .then(taskSetId => console.log(taskSetId))
   *   .catch(err => console.log(err));
   * @async
   * @param {object} params - person's parameters
   * @param {string} params.gender - person's gender
   * @param {number} params.height - person's height
   * @param {string} [params.measurementsType] - type of measurements - all
   * @param {boolean} [params.hasVirtualTryOn] - should apply virtual try on
   * @param {any} [params.product] - product sku which would be used for virtual try on
   * @param {string} [params.frontImage] - person's Base64 encoded front photo
   * @param {string} [params.sideImage] - person's Base64 encoded side photo
   * @param {string} [params.weight] - person's weight in kg
   * @param {string} [params.weightTopBorder] - person's top weight border in kg
   * @param {string} [params.weightBottomBorder] - person's bottom weight border in kg
   * @param {Object} [params.deviceCoordinates] - user device x, y, z coordinates during photos
   * @param {Object} params.deviceCoordinates.frontPhoto - user device x, y, z coordinates
   * during Front photo
   * @param {number} params.deviceCoordinates.frontPhoto.betaX - value represents
   * the motion of the device around the x axis, represented in degrees with values
   * ranging from -180 to 180. This represents a front to back motion of the device.
   * @param {number} params.deviceCoordinates.frontPhoto.gammaY - value represents the motion
   * of the device around the y axis, represented in degrees with values ranging from -90 to 90.
   * This represents a left to right motion of the device.
   * @param {number} params.deviceCoordinates.frontPhoto.alphaZ - value represents the motion
   * of the device around the z axis, represented in degrees with values ranging from 0 to 360.
   * @param {Object} params.deviceCoordinates.sidePhoto - user device x, y, z coordinates
   * during Side photo
   * @param {number} params.deviceCoordinates.sidePhoto.betaX - value represents
   * the motion of the device around the x axis, represented in degrees with values
   * ranging from -180 to 180. This represents a front to back motion of the device.
   * @param {number} params.deviceCoordinates.sidePhoto.gammaY - value represents the motion
   * of the device around the y axis, represented in degrees with values ranging from -90 to 90.
   * This represents a left to right motion of the device.
   * @param {number} params.deviceCoordinates.sidePhoto.alphaZ - value represents the motion
   * of the device around the z axis, represented in degrees with values ranging from 0 to 360.
   * @param {string} params.photoFlowType - photo flow type ("friend" or "hand").
   * @returns {Promise<string|number>} person's id or taskset id
   */
  create(params) {
    if (!params) {
      throw new Error('No person\'s parameters passed');
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

    if (params.hasVirtualTryOn) {
      getParams.virtual_tryon = true;
    }

    if (params.product) {
      getParams.product_sku = params.product;
    }

    return this.axios({
      url: this.api,
      method: 'post',
      data: {
        height: params.height,
        gender: params.gender,
        front_image: params.frontImage,
        side_image: params.sideImage,
        weight: params.weight,
        weight_top_border: params.weightTopBorder,
        weight_bottom_border: params.weightBottomBorder,
        phone_position: params.deviceCoordinates,
        photo_flow: params.photoFlowType,
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

  /**
   * Get a specific Person by ID
   *
   * @async
   * @example
   * const saia = new SAIA({
   *   key: '<your key>',
   * });
   *
   * saia.api.person.get(40)
   *   .then(person => console.log(person))
   *   .catch(err => console.log(err));
   * @param {number} id - Person's ID
   * @returns {Promise<Object>} Person
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
   * Full or Partial update Person by ID. Returns person's object
   * with metadate.
   *
   * @async
   * @example
   * const saia = new SAIA({
   *   key: '<your key>',
   * });
   *
   * saia.api.person.update(personId, {
   *   frontImage: <frontImage>,
   *   sideImage: <sideImage>,
   * })
   *   .then(updatedFields => console.log(updatedFields))
   *   .catch(err => console.log(err));
   * @param {number} id - Person''s ID
   * @param {Object} params - Person's parameters
   * @param {string} [params.gender] - Person's parameters
   * @param {number} [params.height] - Person's height
   * @param {string} [params.frontImage] - Person's Base64 encoded frontImage
   * @param {string} [params.sideImage] - Person's Base64 encoded sideImage
   * @param {string} [params.weight] - person's weight in kg
   * @param {string} [params.weightTopBorder] - person's top weight border in kg
   * @param {string} [params.weightBottomBorder] - person's bottom weight border in kg
   * @param {Object} [params.deviceCoordinates] - user device x, y, z coordinates during photo
   * @param {Object} params.deviceCoordinates.frontPhoto - user device x, y, z coordinates
   * during Front photo
   * @param {number} params.deviceCoordinates.frontPhoto.betaX - value represents
   * the motion of the device around the x axis, represented in degrees with values
   * ranging from -180 to 180. This represents a front to back motion of the device.
   * @param {number} params.deviceCoordinates.frontPhoto.gammaY - value represents the motion
   * of the device around the y axis, represented in degrees with values ranging from -90 to 90.
   * This represents a left to right motion of the device.
   * @param {number} params.deviceCoordinates.frontPhoto.alphaZ - value represents the motion
   * of the device around the z axis, represented in degrees with values ranging from 0 to 360.
   * @param {Object} params.deviceCoordinates.sidePhoto - user device x, y, z coordinates
   * during Side photo
   * @param {number} params.deviceCoordinates.sidePhoto.betaX - value represents
   * the motion of the device around the x axis, represented in degrees with values
   * ranging from -180 to 180. This represents a front to back motion of the device.
   * @param {number} params.deviceCoordinates.sidePhoto.gammaY - value represents the motion
   * of the device around the y axis, represented in degrees with values ranging from -90 to 90.
   * This represents a left to right motion of the device.
   * @param {number} params.deviceCoordinates.sidePhoto.alphaZ - value represents the motion
   * of the device around the z axis, represented in degrees with values ranging from 0 to 360.
   * @param {string} params.photoFlowType - photo flow type ("friend" or "hand").
   * @returns {Promise<Object>} updated parameters
   */
  update(id, params) {
    if (!id) {
      throw new Error('id is not specified');
    }

    if (!params) {
      throw new Error('params is not specified');
    }

    if (!params.gender && !params.height && !params.frontImage && !params.sideImage) {
      throw new Error('params is empty');
    }

    return this.axios({
      url: `${this.api}${id}/`,
      method: 'patch',
      data: {
        height: params.height,
        gender: params.gender,
        front_image: params.frontImage,
        side_image: params.sideImage,
        weight: params.weight,
        weight_top_border: params.weightTopBorder,
        weight_bottom_border: params.weightBottomBorder,
        phone_position: params.deviceCoordinates,
        photo_flow: params.photoFlowType,
      },
    })
      .then(response => response.data);
  }

  /**
   * Update a new Person by ID with calculation start.
   * Returns person's task set id.
   *
   * @async
   * @example
   * const saia = new SAIA({
    *   key: '<your key>',
    * });
    *
    * saia.api.person.updateAndCalculate(personId, {
    *   frontImage: <frontImage>,
    *   sideImage: <sideImage>,
    * })
    *   .then(taskSetUrl => saia.api.queue.getResults(taskSetUrl))
    *   .then(person => console.log(person))
    *   .catch(err => console.log(err));
    * @param {number} id - Person''s ID
    * @param {Object} params - Person's parameters
    * @param {string} [params.measurementsType] - type of measurements - all
    * @param {boolean} [params.hasVirtualTryOn] - should apply virtual try on
    * @param {any} [params.product] - product sku which would be used for virtual try on
    * @param {string} [params.gender] - Person's parameters
    * @param {number} [params.height] - Person's height
    * @param {string} [params.frontImage] - Person's Base64 encoded frontImage
    * @param {string} [params.sideImage] - Person's Base64 encoded sideImage
    * @param {string} [params.weight] - person's weight in kg
    * @param {string} [params.weightTopBorder] - person's top weight border in kg
    * @param {string} [params.weightBottomBorder] - person's bottom weight border in kg
    * @param {Object} [params.deviceCoordinates] - user device x, y, z coordinates during photo
    * @param {Object} params.deviceCoordinates.frontPhoto - user device x, y, z coordinates
    * during Front photo
    * @param {number} params.deviceCoordinates.frontPhoto.betaX - value represents
    * the motion of the device around the x axis, represented in degrees with values
    * ranging from -180 to 180. This represents a front to back motion of the device.
    * @param {number} params.deviceCoordinates.frontPhoto.gammaY - value represents the motion
    * of the device around the y axis, represented in degrees with values ranging from -90 to 90.
    * This represents a left to right motion of the device.
    * @param {number} params.deviceCoordinates.frontPhoto.alphaZ - value represents the motion
    * of the device around the z axis, represented in degrees with values ranging from 0 to 360.
    * @param {Object} params.deviceCoordinates.sidePhoto - user device x, y, z coordinates
    * during Side photo
    * @param {number} params.deviceCoordinates.sidePhoto.betaX - value represents
    * the motion of the device around the x axis, represented in degrees with values
    * ranging from -180 to 180. This represents a front to back motion of the device.
    * @param {number} params.deviceCoordinates.sidePhoto.gammaY - value represents the motion
    * of the device around the y axis, represented in degrees with values ranging from -90 to 90.
    * This represents a left to right motion of the device.
    * @param {number} params.deviceCoordinates.sidePhoto.alphaZ - value represents the motion
    * of the device around the z axis, represented in degrees with values ranging from 0 to 360.
    * @param {string} params.photoFlowType - photo flow type ("friend" or "hand").
    * @returns {Promise<string>} task set url
    */
  updateAndCalculate(id, params) {
    if (!id) {
      throw new Error('id is not specified');
    }

    if (!params) {
      throw new Error('params is not specified');
    }

    if (!params.gender && !params.height && !params.frontImage && !params.sideImage) {
      throw new Error('params is empty');
    }

    const getParams = {};

    if (params.measurementsType) {
      getParams.measurements_type = params.measurementsType;
    }

    if (params.hasVirtualTryOn) {
      getParams.virtual_tryon = true;
    }

    if (params.product) {
      getParams.product_sku = params.product;
    }

    return this.axios({
      url: `${this.api}${id}/`,
      method: 'put',
      data: {
        height: params.height,
        gender: params.gender,
        front_image: params.frontImage,
        side_image: params.sideImage,
        weight: params.weight,
        weight_top_border: params.weightTopBorder,
        weight_bottom_border: params.weightBottomBorder,
        phone_position: params.deviceCoordinates,
        photo_flow: params.photoFlowType,
      },
      params: getParams,
    })
      .then((response) => {
        const taskSetUrl = response.headers.location;
        const taskSetId = /\/queue\/(.*)\//g.exec(taskSetUrl)[1];
        return taskSetId;
      });
  }

  /**
   * Manual recalculate Person's parameters by ID
   *
   * @async
   * @example
   * // in this example we update person's images
   * // and then manually start recalculation
   * const saia = new SAIA({
   *   key: '<your key>',
   * });
   *
   * saia.api.person.update({
   *   frontImage: <frontImage>,
   *   sideImage: <sideImage>,
   * })
   *   .then(updatedFields => saia.api.person.calculate(updatedFields.id))
   *   .then(taskSetId => console.log(taskSetId))
   *   .catch(err => console.log(err));
   * @param {number} id - Person's ID
   * @returns {Promise<string>} Taskset id
   */
  calculate(id) {
    if (!id) {
      throw new Error('id is not specified');
    }

    return this.axios({
      url: `${this.api}${id}/calculate/`,
      method: 'get',
    })
      .then((response) => {
        const taskSetUrl = response.headers.location;
        const taskSetId = /\/queue\/(.*)\//g.exec(taskSetUrl)[1];
        return taskSetId;
      });
  }

  /**
   * Processing virtual tryon for specific person and product
   * result also would be available in person.get(id).virtual_tryons
   * [
   *  {
   *    "id": <tryon_id>,
   *    "product_sku": "<product_sku>"
   *    "created": 'datetime',
   *    "image: "https://url.to.tryon.image.com"
   *  }
   * ]
   *
   * @async
   * @param {number} id - Person's ID
   * @param {any} product - Product sku
   * @returns {Promise<string>} Taskset id
   */
  virtualTryOn(id, product) {
    if (!id) {
      throw new Error('id is not specified');
    }

    if (!product) {
      throw new Error('product is not specified');
    }

    return this.axios({
      url: `${this.api}${id}/virtual_tryon/`,
      method: 'post',
      data: {
        product_sku: product,
      },
    }).then(response => response.data);
  }
}

export default Person;
