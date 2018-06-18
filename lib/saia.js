import API from './api';

class SAIA {
  /**
   * SAIA class constructor
   * @param {Object} options - config parameters
   * @param {Object} options.key - api key
   * @param {Object} options.host - api host url
   */
  constructor(options = {}) {
    this.defaults = {
      key: null,
      host: 'https://saia-test.3dlook.me/api/v2/persons/',
      // cameraOptions: {
      //   camera: {
      //     front: true,
      //   },
      //   video: {
      //     width: 640,
      //     height: 480,
      //     mirror: true,
      //     fps: 30,
      //     targetCanvas: document.getElementById('webcam'),
      //   },
      //   screenShot: {
      //     targetCanvas: document.getElementById('webcam_screen'),
      //   },
      // },
      // targetButton: document.getElementById('stepButton'),
      // targetOutput: document.getElementById('report'),
      // targetHeight: document.getElementById('height'),
      // targetGender: document.getElementById('gender'),
    };

    this.defaults = Object.assign(this.defaults, options);

    this.api = new API({
      apiHost: this.defaults.host,
      apiKey: this.defaults.key,
    });
  }

  /**
   * Update person's data
   * @param  {string} gender - persons gender
   * @param  {number} height - persons height
   */
  updatePersonsData(gender, height) {
    this.api.updatePersonsData(gender, height);
  }

  /**
   * Create new instance
   * @param  {string} gender - persons gender
   * @param  {number} height - persons height
   * @returns {Promise}
   */
  postMetadate(gender, height) {
    return this.api.postMetadate(gender, height);
  }

  /**
   * Send images for further processing
   * @param  {File} frontImage - front image
   * @param  {File} sideImage - side image
   * @returns {Promise}
   */
  sendImages(frontImage, sideImage) {
    return this.api.sendImages(frontImage, sideImage);
  }

  /**
   * Send front image for further processing
   * @param  {File} frontImage - front image
   * @returns {Promise}
   */
  sendFrontImage(frontImage) {
    return this.api.sendFrontImage(frontImage);
  }

  /**
   * Send side image for further processing
   * @param  {File} sideImage - side image
   * @returns {Promise}
   */
  sendSideImage(sideImage) {
    return this.api.sendSideImage(sideImage);
  }

  /**
   * Save front image
   * @param  {File} file - front image file
   */
  saveFrontImage(file) {
    this.api.saveFrontImage(file);
  }

  /**
   * Save side image
   * @param  {File} file - side image file
   */
  saveSideImage(file) {
    this.api.saveSideImage(file);
  }

  /**
   * Get results
   * @returns {Promise}
   */
  getResults() {
    return this.api.getResults();
  }
}

export default SAIA;
