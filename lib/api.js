import axios from 'axios';

/**
 * API wrapper class
 */
class API {
  /**
   * Class constructor
   *
   * @example
   * const api = new API({
   *   apiKey: '<your key>',
   *   apiHost: '<api host url>',
   * });
   * @param  {Object} options - options
   * @param  {string} options.apiHost - API url
   * @param  {string} options.apiKey - API key
   * @param  {number} options.delay - delay that determines how often API will check
   * status of SAIA tasks
   * @param  {string} options.gender - person's gender
   * @param  {number} options.height - person's height
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
   * @example
   * api.updatePersonsData('male', 184);
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
   * @example
   * // you can pass user's info here
   * api.postMetadate('female', 170)
   *   .then(url => console.log(url))
   *   .catch(err => console.error(err));
   *
   * // or, if you have already save user's info
   * // with method .updatePersonsData, don't pass any arguments
   * api.postMetadate()
   *   .then(url => console.log(url))
   *   .catch(err => console.error(err));
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
   * Get file name with extension for Blob
   * @private
   * @param {Blob} blob - file
   */
  getFileName(blob) {
    const fileName = 'filename';
    let extension;
    switch(blob.type) {
      case 'image/png':
        extension = 'png';
        break;
      case 'image/jpeg':
        extension = 'jpg';
        break;
      case 'image/gif':
        extension = 'gif';
        break;
    }
    return `${fileName}.${extension}`;
  }

  /**
   * Send images for further processing
   *
   * @async
   * @example
   * const frontImage, sideImage;
   *
   * // you can pass images here
   * api.sendImages(frontImage, sideImage);
   *   .then(url => console.log(url))
   *   .catch(err => console.error(err));
   *
   * // or, if you saved images with methods
   * // .saveFrontImage and .saveSideImage,
   * // don't pass any parameters
   * api.sendImages(frontImage, sideImage)
   *   .then(url => console.log(url))
   *   .catch(err => console.error(err));
   * @param  {File|Blob} [frontImage] - front image
   * @param  {File|Blob} [sideImage] - side image
   * @returns {Promise<string>}
   */
  sendImages(frontImage, sideImage) {
    const finalFrontImage = frontImage || this.data.frontImage;
    const finalSideImage = sideImage || this.data.sideImage;

    if (!finalFrontImage || !finalSideImage) {
      throw new Error('No images found');
    }

    const imagesFormData = new FormData();
    imagesFormData.append('front_image', finalFrontImage, (finalFrontImage instanceof Blob) ? this.getFileName(finalFrontImage) : null);
    imagesFormData.append('side_image', finalSideImage, (finalSideImage instanceof Blob) ? this.getFileName(finalSideImage) : null);

    return axios({
      url: this.data.instanceURL,
      headers: this.headers,
      method: 'put',
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
   * @example
   * const frontImage;
   *
   * api.sendFrontImage(frontImage)
   *   .then(url => console.log(url))
   *   .catch(err => console.error(err));
   * @param  {File|Blob} [frontImage] - front image
   * @returns {Promise<boolean>}
   */
  sendFrontImage(frontImage) {
    const finalFrontImage = frontImage || this.data.frontImage;

    if (!finalFrontImage) {
      throw new Error('No image found');
    }

    const imagesFormData = new FormData();
    imagesFormData.append('front_image', finalFrontImage, (finalFrontImage instanceof Blob) ? this.getFileName(finalFrontImage) : null);

    return axios({
      url: this.data.instanceURL,
      headers: this.headers,
      method: 'patch',
      data: imagesFormData,
    })
      .then(() => {
        return true;
      });
  }

  /**
   * Send side image for further processing
   *
   * @async
   * @example
   * const sideImage;
   *
   * api.sendSideImage(sideImage)
   *   .then(url => console.log(url))
   *   .catch(err => console.error(err));
   * @param  {File|Blob} [sideImage] - side image
   * @returns {Promise<boolean>}
   */
  sendSideImage(sideImage) {
    const finalSideImage = sideImage || this.data.sideImage;

    if (!finalSideImage) {
      throw new Error('No image found');
    }

    const imagesFormData = new FormData();
    imagesFormData.append('side_image', finalSideImage, (finalSideImage instanceof Blob) ? this.getFileName(finalSideImage) : null);

    return axios({
      url: this.data.instanceURL,
      headers: this.headers,
      method: 'patch',
      data: imagesFormData,
    })
      .then(() => {
        return true;
      });
  }

  /**
   * Save front image
   *
   * @example
   * const frontImage;
   *
   * api.saveFrontImage(frontImage);
   * @param  {File|Blob} file - front image file
   */
  saveFrontImage(file) {
    this.data.frontImage = file;
  }

  /**
   * Save side image
   *
   * @example
   * const sideImage;
   *
   * api.saveSideImage(sideImage);
   * @param  {File|Blob} file - side image file
   */
  saveSideImage(file) {
    this.data.sideImage = file;
  }

  /**
   * Get error description
   *
   * @private
   * @param {Array} tasks - array of tasks
   * @returns {string}
   */
  static getTaskError(tasks) {
    let errorText = '';
    tasks.forEach((task) => {
      if (!task.is_successful) {
        errorText += `Subtask failed: ${task.task_id}\n`;
      }
    });

    return errorText;
  }

  /**
   * Get results
   *
   * @async
   * @example
   * // use this method only after saving images,
   * // users info and posting metadate
   * api.getResults()
   *   .then(result => console.log(result))
   *   .catch(err => console.error(err));
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
