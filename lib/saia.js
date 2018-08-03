import API from './api';
import Camera from './camera';

class SAIA {
  /**
   * SAIA class constructor
   *
   * @example
   * const saia = new SAIA({
   *   key: '<your key>'
   * });
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
        mirror: false,
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
      showStatus: false,
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
   * @example
   * saia.updatePersonsData('male', 184);
   * @param  {string} gender - persons gender
   * @param  {number} height - persons height
   */
  updatePersonsData(gender, height) {
    this.api.updatePersonsData(gender, height);
  }

  /**
   * Create new instance of a porson with
   * metadate and images
   * 
   * @async
   * @param {Object} [data] - person's data
   * @param {number} [data.height] - person's height
   * @param {string} [data.gender] - person's gender
   * @param {File|Blob} [data.frontImage] - person's front image
   * @param {File|Blob} [data.sideImage] - person's side image
   * @example
   * // you can pass user's info here
   * saia.createPerson({
   *     gender: 'female',
   *     height: 170,
   *     frontImage: frontImageFile,
   *     sideImage: sideImageFile,
   *   })
   *   .then(url => console.log(url))
   *   .catch(err => console.error(err));
   * @returns {Promise<string>}
   */
  createPerson(data) {
    this.updateStatus('Starting');
    return this.api.createPerson(data);
  }

  /**
   * Create new instance
   *
   * @async
   * @example
   * // you can pass user's info here
   * saia.postMetadate('female', 170)
   *   .then(url => console.log(url))
   *   .catch(err => console.error(err));
   *
   * // or, if you have already save user's info
   * // with method .updatePersonsData, don't pass any arguments
   * saia.postMetadate()
   *   .then(url => console.log(url))
   *   .catch(err => console.error(err));
   * @param  {string} [gender] - persons gender ('male', 'female')
   * @param  {number} [height] - persons height
   * @returns {Promise<string>}
   */
  postMetadate(gender, height) {
    this.updateStatus('Starting');
    return this.api.postMetadate(gender, height);
  }

  /**
   * Send images for further processing
   *
   * @async
   * @example
   * const frontImage, sideImage;
   *
   * // you can pass images here
   * saia.sendImages(frontImage, sideImage);
   *   .then(url => console.log(url))
   *   .catch(err => console.error(err));
   *
   * // or, if you saved images with methods
   * // .saveFrontImage and .saveSideImage,
   * // don't pass any parameters
   * saia.sendImages(frontImage, sideImage)
   *   .then(url => console.log(url))
   *   .catch(err => console.error(err));
   * @param  {File|Blob} [frontImage] - front image
   * @param  {File|Blob} [sideImage] - side image
   * @returns {Promise<string>}
   */
  sendImages(frontImage, sideImage) {
    this.updateStatus('Sending images');
    return this.api.sendImages(frontImage, sideImage);
  }

  /**
   * Send front image for further processing
   *
   * @async
   * @example
   * const frontImage;
   *
   * saia.sendFrontImage(frontImage)
   *   .then(url => console.log(url))
   *   .catch(err => console.error(err));
   * @param  {File|Blob} frontImage - front image
   * @returns {Promise<string>}
   */
  sendFrontImage(frontImage) {
    this.updateStatus('Sending front image');
    return this.api.sendFrontImage(frontImage);
  }

  /**
   * Send side image for further processing
   *
   * @async
   * @example
   * const sideImage;
   *
   * saia.sendSideImage(sideImage)
   *   .then(url => console.log(url))
   *   .catch(err => console.error(err));
   * @param  {File|Blob} sideImage - side image
   * @returns {Promise}
   */
  sendSideImage(sideImage) {
    this.updateStatus('Sending side image');
    return this.api.sendSideImage(sideImage);
  }

  /**
   * Save front image
   *
   * @example
   * const frontImage;
   *
   * saia.saveFrontImage(frontImage);
   * @param  {File|Blob} file - front image file
   */
  saveFrontImage(file) {
    this.api.saveFrontImage(file);
  }

  /**
   * Save side image
   *
   * @example
   * const sideImage;
   *
   * saia.saveSideImage(sideImage);
   * @param  {File|Blob} file - side image file
   */
  saveSideImage(file) {
    this.api.saveSideImage(file);
  }

  /**
   * Get results
   *
   * @async
   * @example
   * // use this method only after saving images,
   * // users info and posting metadate
   * saia.getResults()
   *   .then(result => console.log(result))
   *   .catch(err => console.error(err));
   * @returns {Promise<Object>}
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
   * @async
   * @example
   * // camera should be enabled
   * saia.getSnapshot()
   *   .then(image => saia.saveFrontImage(image))
   *   .catch(err => console.error(err));
   * @returns {Promise<Blob>}
   */
  getSnapshot() {
    return this.camera.getImage();
  }

  /**
   * Init elements event listeners
   *
   * @private
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
          .catch(err => console.error(err));
      });
    }

    if (this.defaults.sideImageCamEl && this.defaults.camera && this.defaults.camera.enabled) {
      this.defaults.sideImageCamEl.addEventListener('click', () => {
        this.getSnapshot()
          .then(photo => this.saveSideImage(photo))
          .catch(err => console.error(err));
      });
    }
  }

  /**
   * Start flow execution
   *
   * @private
   */
  startFlow() {
    this.postMetadate()
      .then(() => this.sendImages())
      .then(() => this.getResults())
      .then(results => this.showResults(results))
      .catch(err => console.error(err));
  }

  /**
   * Show results
   *
   * @async
   * @private
   * @param {Object} data - response from API
   */
  showResults(data) {
    if (!this.defaults.resultsEl) {
      throw new Error('resultsEl is not set');
    }

    const template = `Front:<br/>
    Chest: ${Math.round(data.front_params.chest)} cm<br/>
    Waist: ${Math.round(data.front_params.waist)} cm<br/>
    Hips: ${Math.round(data.front_params.hips)} cm<br/>
    <br/>
    Side:<br/>
    Chest: ${Math.round(data.side_params.chest)} cm<br/>
    Waist: ${Math.round(data.side_params.waist)} cm<br/>
    Hips: ${Math.round(data.side_params.hips)} cm<br/>
    <br/>
    Volume:<br/>
    Chest: ${Math.round(data.volume_params.chest)} cm<br/>
    Waist: ${Math.round(data.volume_params.waist)} cm<br/>
    Hips: ${Math.round(data.volume_params.hips)} cm<br/>`;

    this.defaults.resultsEl.innerHTML = template;
  }

  /**
   * Update status
   * @private
   * @param {string} status - execution status
   */
  updateStatus(status) {
    if ((!this.defaults.showStatus && this.defaults.statusEl) ||
        (this.defaults.showStatus && !this.defaults.statusEl)) {
      throw new Error('we cannot display status. Please set status and statusEl params');
    }

    if (!this.defaults.showStatus && !this.defaults.statusEl) {
      return;
    }

    this.defaults.statusEl.innerHTML = status;
  }
}

export default SAIA;
