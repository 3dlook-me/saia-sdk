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
   * @param {object} params - person's parameters
   * @param {string} params.gender - person's gender
   * @param {number} params.height - person's height
   * @param {string} params.frontImage - person's Base64 encoded front photo
   * @param {string} params.sideImage - person's Base64 encoded side photo
   * @returns {string} person's id or taskset id
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

    return this.axios({
      url: this.api,
      method: 'post',
      data: {
        height: params.height,
        gender: params.gender,
        front_image: params.frontImage,
        side_image: params.sideImage,
      },
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
   * @param {number} id - Person's ID
   * @returns {Object} Person
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

  /**
   * Full or Partial update Person by ID
   *
   * @param {number} id - Person''s ID
   * @param {Object} params - Person's parameters
   * @param {string} params.gender - Person's parameters
   * @param {number} params.height - Person's height
   * @param {string} params.frontImage - Person's Base64 encoded frontImage
   * @param {string} params.sideImage - Person's Base64 encoded sideImage
   * @returns {Object} updated parameters
   */
  update(id, params) {
    if (!id) {
      throw new Error('id is not specified');
    }

    return this.axios({
      url: `${this.api}${id}/`,
      method: 'patch',
      data: {
        height: params.height,
        gender: params.gender,
        front_image: params.frontImage,
        side_image: params.sideImage,
      },
    })
      .then(response => response.data);
  }

  /**
   * Manual recalculate Person's parameters by ID
   *
   * @param {number} id - Person's ID
   * @returns {string} Taskset id
   */
  calculate(id) {
    if (!id) {
      throw new Error('id is not specified');
    }

    return this.axios({
      url: `${this.api}${id}/calculate/`,
      headers: this.headers,
      method: 'get',
    })
      .then((response) => {
        const taskSetUrl = response.headers.location;
        const taskSetId = /\/queue\/(.*)\//g.exec(taskSetUrl)[1];
        return taskSetId;
      });
  }
}

export default Person;
