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
   * @param {boolean} options.camera.enabled - enable webcam
   * @param {number} options.camera.width - webcam preview width
   * @param {number} options.camera.height - webcam preview height
   * @param {string} options.camera.target - webcam preview parrent element
   * @param {number} options.camera.fps - webcam preview frames per second
   * @param {boolean} options.camera.mirror - flip webcam image horizontaly
   * @param {Element} options.frontImageEl - front image input element
   * @param {Element} options.sideImageEl - side image input element
   * @param {Element} options.genderEl - gender input element
   * @param {Element} options.heightEl - height input element
   * @param {Element} options.frontImageCamEl - front image snap button
   * @param {Element} options.sideImageCamEl - side image snap button
   * @param {Element} options.startButtonEl - start flow button
   * @param {Element} options.resultsEl - results container element
   * @param {Element} options.statusEl - status element
   * @param {boolean} options.showStatus - show status
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
      frontImageEl: null,
      sideImageEl: null,
      genderEl: null,
      heightEl: null,
      startButtonEl: null,
      statusEl: null,
      resultsEl: null,
      frontImageCamEl: null,
      sideImageCamEl: null,
      showStatus: true,
    };

    this.defaults = Object.assign(this.defaults, options);

    this.api = new API({
      apiHost: this.defaults.host,
      apiKey: this.defaults.key,
    });

    if (this.defaults.camera && this.defaults.camera.enabled) {
      this.camera = new Camera(this.defaults.camera);
    }

    this.initElements();
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
    this.updateStatus('Starting');
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
    this.updateStatus('Sending images');
    return this.api.sendImages(frontImage, sideImage);
  }

  /**
   * Send front image for further processing
   *
   * @param  {File} frontImage - front image
   * @returns {Promise}
   */
  sendFrontImage(frontImage) {
    this.updateStatus('Sending front image');
    return this.api.sendFrontImage(frontImage);
  }

  /**
   * Send side image for further processing
   *
   * @param  {File} sideImage - side image
   * @returns {Promise}
   */
  sendSideImage(sideImage) {
    this.updateStatus('Sending side image');
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
    this.updateStatus('Getting results');
    return this.api.getResults()
      .then((results) => {
        this.updateStatus('Done');
        return results;
      });
  }

  /**
   * Get webcam image
   *
   * @returns {Promise}
   */
  getSnapshot() {
    return this.camera.getImage();
  }

  /**
   * Init elements event listeners
   */
  initElements() {
    if (this.defaults.frontImageEl) {
      this.defaults.frontImageEl.addEventListener('change', () => {
        this.saveFrontImage(this.defaults.frontImageEl.files[0]);
      });
    }

    if (this.defaults.sideImageEl) {
      this.defaults.sideImageEl.addEventListener('change', () => {
        this.saveSideImage(this.defaults.sideImageEl.files[0]);
      });
    }

    if (this.defaults.genderEl) {
      this.defaults.genderEl.addEventListener('change', () => {
        this.updatePersonsData(this.defaults.genderEl.value, this.api.data.height);
      });
    }

    if (this.defaults.heightEl) {
      this.defaults.heightEl.addEventListener('change', () => {
        this.updatePersonsData(this.api.data.gender, parseInt(this.defaults.heightEl.value, 10));
      });
    }

    if (this.defaults.startButtonEl) {
      this.defaults.startButtonEl.addEventListener('click', () => {
        this.startFlow();
      });
    }

    if (this.defaults.frontImageCamEl && this.defaults.camera && this.defaults.camera.enabled) {
      this.defaults.frontImageCamEl.addEventListener('click', () => {
        this.getSnapshot()
          .then(photo => this.saveFrontImage(photo))
          .catch(err => console.log(err));
      });
    }

    if (this.defaults.sideImageCamEl && this.defaults.camera && this.defaults.camera.enabled) {
      this.defaults.sideImageCamEl.addEventListener('click', () => {
        this.getSnapshot()
          .then(photo => this.saveSideImage(photo))
          .catch(err => console.log(err));
      });
    }
  }

  /**
   * Start flow execution
   */
  startFlow() {
    this.postMetadate()
      .then(() => this.sendImages())
      .then(() => this.getResults())
      .then(results => this.showResults(results))
      .catch(err => console.log(err));
  }

  /**
   * Show results
   */
  showResults(data) {
    if (!this.defaults.resultsEl) {
      throw new Error('resultsEl is not set');
    }

    let template = `${data}`;

    this.defaults.resultsEl.innerHTML = template;
  }

  /**
   * Update status
   * @param {string} status - execution status
   */
  updateStatus(status) {
    if (!this.defaults.showStatus || !this.defaults.statusEl) {
      throw new Error('we cannot display status. Please set status and statusEl params');
    }

    this.defaults.statusEl.innerHTML = status;
  }
}

export default SAIA;
