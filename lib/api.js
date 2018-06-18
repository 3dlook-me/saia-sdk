import axios from 'axios';

/**
 * API wrapper class
 */
class API {
  /**
   * Class constructor
   *
   * @param  {Object} options - options
   * @param  {Object} options.apiHost - API url
   * @param  {Object} options.apiKey - API key
   * @param  {Object} options.delay - delay that determines how often API will check
   * status of SAIA tasks
   * @param  {Object} options.gender - person's gender
   * @param  {Object} options.height - person's height
   */
  constructor(options = {}) {
    const defaults = {
      delay: 2000,
      gender: 'female',
      height: 150,
    };

    if (!options.apiHost) {
      throw new Error('You need to specify API host URL');
    }

    if (!options.apiKey) {
      throw new Error('You need to specify API key');
    }

    this.host = options.apiHost;
    this.key = options.apiKey;
    this.delay = options.delay || defaults.delay;

    // object that contains API related data
    this.data = {
      instanceURL: null,
      resultURL: null,
      frontImage: null,
      sideImage: null,
      gender: options.gender || defaults.gender,
      height: options.height || defaults.height,
    };

    this.headers = {
      Authorization: `APIKey ${this.key}`,
    };
  }

  /**
   * Update person's data
   *
   * @param  {string} gender - persons gender
   * @param  {number} height - persons height
   */
  updatePersonsData(gender, height) {
    this.data.gender = gender;
    this.data.height = height;
  }

  /**
   * Create new instance
   *
   * @async
   * @param  {string} gender - persons gender
   * @param  {number} height - persons height
   * @returns {Promise<string>}
   */
  postMetadate(gender, height) {
    return axios({
      url: this.host,
      headers: this.headers,
      method: 'post',
      data: {
        gender: gender || this.data.gender,
        height: height || this.data.height,
      },
    })
      .then((response) => {
        this.data.instanceURL = response.headers.location;
        return this.data.instanceURL;
      });
  }

  /**
   * Send images for further processing
   *
   * @async
   * @param  {File} frontImage - front image
   * @param  {File} sideImage - side image
   * @returns {Promise<string>}
   */
  sendImages(frontImage, sideImage) {
    const finalFrontImage = frontImage || this.data.frontImage;
    const finalSideImage = sideImage || this.data.sideImage;

    if (!finalFrontImage || !finalSideImage) {
      throw new Error('No images found');
    }

    const imagesFormData = new FormData();
    imagesFormData.append('front_image', finalFrontImage);
    imagesFormData.append('side_image', finalSideImage);

    return axios({
      url: this.data.instanceURL,
      headers: this.headers,
      method: 'patch',
      data: imagesFormData,
    })
      .then((response) => {
        this.data.resultURL = response.headers.location;
        return this.data.resultURL;
      });
  }

  /**
   * Send front image for further processing
   *
   * @async
   * @param  {File} frontImage - front image
   * @returns {Promise<string>}
   */
  sendFrontImage(frontImage) {
    const finalFrontImage = frontImage || this.data.frontImage;

    if (!finalFrontImage) {
      throw new Error('No image found');
    }

    const imagesFormData = new FormData();
    imagesFormData.append('front_image', finalFrontImage);

    return axios({
      url: this.data.instanceURL,
      headers: this.headers,
      method: 'patch',
      data: imagesFormData,
    })
      .then((response) => {
        this.data.resultURL = response.headers.location;
        return this.data.resultURL;
      });
  }

  /**
   * Send side image for further processing
   *
   * @async
   * @param  {File} sideImage - side image
   * @returns {Promise<string>}
   */
  sendSideImage(sideImage) {
    const finalSideImage = sideImage || this.data.sideImage;

    if (!finalSideImage) {
      throw new Error('No image found');
    }

    const imagesFormData = new FormData();
    imagesFormData.append('side_image', finalSideImage);

    return axios({
      url: this.data.instanceURL,
      headers: this.headers,
      method: 'patch',
      data: imagesFormData,
    })
      .then((response) => {
        this.data.resultURL = response.headers.location;
        return this.data.resultURL;
      });
  }

  /**
   * Save front image
   *
   * @param  {File} file - front image file
   */
  saveFrontImage(file) {
    this.data.frontImage = file;
  }

  /**
   * Save side image
   *
   * @param  {File} file - side image file
   */
  saveSideImage(file) {
    this.data.sideImage = file;
  }

  static getTaskError(tasks) {
    let errorText = '';
    tasks.forEach((task) => {
      if (!task.is_successful) {
        errorText += `Error on task: ${task.task_id}\n`;
      }
    });

    return errorText;
  }

  /**
   * Get results
   *
   * @async
   * @returns {Promise<Object>}
   */
  getResults() {
    return new Promise((resolve, reject) => {
      const timer = setInterval(() => {
        axios({
          url: this.data.resultURL,
          headers: this.headers,
          method: 'get',
        })
          .then((response) => {
            const { data } = response;

            if (data.is_ready === true && data.is_successful === false) {
              clearInterval(timer);
              reject(new Error(API.getTaskError(data.sub_tasks)));
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
      }, this.delay);
    });
  }
}

export default API;
