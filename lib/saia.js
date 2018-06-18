import API from './api';
import Camera from './camera';

class SAIA {
  /**
   * SAIA class constructor
   *
   * @param {Object} options - config parameters
   * @param {string} options.key - api key
   * @param {string} options.host - api host url
   * @param {Object} options.camera - webcam settings object
   * @param {boolean} options.camera.enabled - webcam settings object
   * @param {number} options.camera.width - webcam settings object
   * @param {number} options.camera.height - webcam settings object
   * @param {string} options.camera.target - webcam settings object
   * @param {number} options.camera.fps - webcam settings object
   * @param {boolean} options.camera.mirror - webcam settings object
   */
  constructor(options = {}) {
    this.defaults = {
      key: null,
      host: 'https://saia-test.3dlook.me/api/v2/persons/',
      camera: {
        enabled: false,
        width: 640,
        height: 480,
        target: null,
        fps: 30,
        mirror: true,
      },
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

    if (this.defaults.camera && this.defaults.camera.enabled) {
      this.camera = new Camera(this.defaults.camera);
    }
  }

  /**
   * Update person's data
   *
   * @param  {string} gender - persons gender
   * @param  {number} height - persons height
   */
  updatePersonsData(gender, height) {
    this.api.updatePersonsData(gender, height);
  }

  /**
   * Create new instance
   *
   * @param  {string} gender - persons gender
   * @param  {number} height - persons height
   * @returns {Promise}
   */
  postMetadate(gender, height) {
    return this.api.postMetadate(gender, height);
  }

  /**
   * Send images for further processing
   *
   * @param  {File} frontImage - front image
   * @param  {File} sideImage - side image
   * @returns {Promise}
   */
  sendImages(frontImage, sideImage) {
    return this.api.sendImages(frontImage, sideImage);
  }

  /**
   * Send front image for further processing
   *
   * @param  {File} frontImage - front image
   * @returns {Promise}
   */
  sendFrontImage(frontImage) {
    return this.api.sendFrontImage(frontImage);
  }

  /**
   * Send side image for further processing
   *
   * @param  {File} sideImage - side image
   * @returns {Promise}
   */
  sendSideImage(sideImage) {
    return this.api.sendSideImage(sideImage);
  }

  /**
   * Save front image
   *
   * @param  {File} file - front image file
   */
  saveFrontImage(file) {
    this.api.saveFrontImage(file);
  }

  /**
   * Save side image
   *
   * @param  {File} file - side image file
   */
  saveSideImage(file) {
    this.api.saveSideImage(file);
  }

  /**
   * Get results
   *
   * @returns {Promise}
   */
  getResults() {
    return this.api.getResults();
  }

  /**
   * Get webcam image
   *
   * @returns {Promise}
   */
  getSnapshot() {
    return this.camera.getImage();
  }
}

export default SAIA;
