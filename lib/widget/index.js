import API from '../api/index';
import Camera from '../camera';
import utils from '../utils';

class Widget {
  /**
   * Widget class constructor
   *
   * @example
   * const widget = new Widget({
   *   key: '<your key>'
   * });
   * @param {Object} options - config parameters
   * @param {string} options.key - api key
   * @param {string} options.host - api host url
   * @param {number} [options.delay=2000] - delay between check results requests
   * @param {Object} options.camera - webcam settings object
   * @param {boolean} [options.camera.enabled=false] - enable webcam
   * @param {number} [options.camera.width=640] - webcam preview width
   * @param {number} [options.camera.height=480] - webcam preview height
   * @param {string} options.camera.target - webcam preview parrent element
   * @param {number} [options.camera.fps=30] - webcam preview frames per second
   * @param {boolean} [options.camera.mirror=false] - flip webcam image horizontaly
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
   * @param {string} [options.outputMode=params] - output mode, which specifies
   * what type of information user want to see after finish the requests.
   *
   * Aviable modes: 'params' and 'sizes'.
   *
   * 'params' displays in resultsEl person's body parameters: front/side/volume
   * chest, waist and hips.
   *
   * 'sizes' displays in resultsEl product size which is recomended for user
   * for specific product based on user's body parameters
   * @param {Function} [options.outputFunc] - custom output function.
   * Received parameters: el, person, sizes. It will receive 'sizes' only,
   * if you set productUrl by using widget.setProductUrl method
   */
  constructor(options = {}) {
    this.defaults = {
      delay: 2000,
      key: null,
      host: null,
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
      outputMode: 'params',
      outputFunc: null,
    };

    this.defaults = Object.assign(this.defaults, options);

    this.api = new API({
      host: this.defaults.host,
      key: this.defaults.key,
    });

    if (this.defaults.camera && this.defaults.camera.enabled) {
      this.camera = new Camera(this.defaults.camera);
    }

    // object that contains API related data
    this.data = {
      instanceURL: null,
      resultURL: null,
      frontImage: null,
      sideImage: null,
      gender: null,
      height: null,
      productUrl: null,
    };

    this.delay = this.defaults.delay;

    this.initElements();
  }

  /**
   * Update person's data
   *
   * @example
   * widget.updatePersonsData('male', 184);
   * @param  {string} gender - persons gender
   * @param  {number} height - persons height
   */
  updatePersonsData(gender, height) {
    this.data.gender = gender;
    this.data.height = height;
  }

  /**
   * Create new instance of a person with
   * metadata and images
   *
   * @async
   * @param {Object} [data] - person's data
   * @param {number} [data.height] - person's height
   * @param {string} [data.gender] - person's gender
   * @param {File|Blob} [data.frontImage] - person's front image
   * @param {File|Blob} [data.sideImage] - person's side image
   * @example
   * // you can pass user's info here
   * widget.createPerson({
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
    const finalFrontImage = (data) ? data.frontImage || this.data.frontImage : this.data.frontImage;
    const finalSideImage = (data) ? data.sideImage || this.data.sideImage : this.data.sideImage;
    const finalGender = (data) ? data.gender || this.data.gender : this.data.gender;
    const finalHeight = (data) ? data.height || this.data.height : this.data.height;

    let frontImageBase64;
    let sideImageBase64;

    if (!finalFrontImage || !finalSideImage) {
      throw new Error('No images found');
    }

    if (!finalGender) {
      throw new Error('No gender is specified');
    }

    if (!finalHeight) {
      throw new Error('No height is specified');
    }

    return utils.getBase64(finalFrontImage)
      .then((frontImage) => {
        frontImageBase64 = frontImage;

        return utils.getBase64(finalSideImage);
      })
      .then((sideImage) => {
        sideImageBase64 = sideImage;

        this.updateStatus('Starting');

        return this.api.person.create({
          gender: finalGender,
          height: finalHeight,
          frontImage: frontImageBase64,
          sideImage: sideImageBase64,
        });
      })
      .then((taskSetId) => {
        this.data.taskSetId = taskSetId;

        return taskSetId;
      });
  }

  /**
   * Save front image
   *
   * @example
   * const frontImage;
   *
   * widget.saveFrontImage(frontImage);
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
   * widget.saveSideImage(sideImage);
   * @param  {File|Blob} file - side image file
   */
  saveSideImage(file) {
    this.data.sideImage = file;
  }

  /**
   * Set product url. Uses with outputMode='sizes'
   *
   * @param {string} productUrl - product url
   */
  setProductUrl(productUrl) {
    this.data.productUrl = productUrl;
  }

  /**
   * Get results
   *
   * @async
   * @example
   * // use this method only after saving images,
   * // users info and posting metadate
   * widget.getResults()
   *   .then(result => console.log(result))
   *   .catch(err => console.error(err));
   * @returns {Promise<Object>}
   */
  getResults() {
    this.updateStatus('Getting results');
    return this.api.queue.getResults(this.data.taskSetId, this.delay);
  }

  /**
   * Recalculate person's parameters
   *
   * @async
   * @example
   * // if you have updated user's front or side image
   * // with .sendFrontImage or .sendSideImage
   * // you could recalculate person's parameters
   *
   * widget.recalculate()
   *   .then(taskSetUrl => console.log(taskSetUrl))
   *   .catch(err => console.error(err));
   * @param {number} [id] - person instance url
   * @returns {Promise<string>}
   */
  recalculate(id) {
    return this.api.person.calculate(id);
  }

  /**
   * Get webcam image
   *
   * @async
   * @example
   * // camera should be enabled
   * widget.getSnapshot()
   *   .then(image => widget.saveFrontImage(image))
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
        this.updatePersonsData(this.defaults.genderEl.value, this.data.height);
      });
    }

    if (this.defaults.heightEl) {
      this.defaults.heightEl.addEventListener('change', () => {
        this.updatePersonsData(this.data.gender, parseInt(this.defaults.heightEl.value, 10));
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
    let person;
    let sizes;

    this.createPerson()
      .then(() => this.getResults())
      .then((createdPerson) => {
        person = createdPerson;

        if ((this.defaults.outputMode === 'sizes' && !this.defaults.outputFunc) ||
            (this.defaults.outputFunc && this.data.productUrl)) {

          return this.api.product.getSize({
            height: person.height,
            gender: person.gender,
            hips: Math.round(person.volume_params.hips),
            chest: Math.round(person.volume_params.chest),
            waist: Math.round(person.volume_params.waist),
            url: this.data.productUrl,
          });
        }
        return null;
      })
      .then((responseSizes) => {
        sizes = responseSizes;

        if (this.defaults.outputFunc) {
          return this.defaults.outputFunc(this.defaults.resultsEl, person, sizes);
        }

        if (this.defaults.outputMode === 'params') {
          this.outputParams(this.defaults.resultsEl, person);
        } else if (this.defaults.outputMode === 'sizes') {
          this.outputSizes(this.defaults.resultsEl, person, sizes);
        }
      })
      .catch(err => console.error(err));
  }

  /**
   * Show params in resultsEl
   *
   * @async
   * @private
   * @param {Object} el - response from API
   * @param {Object} person - response from API
   */
  outputParams(el, person) {
    if (!el) {
      throw new Error('el is not set');
    }

    if (!person) {
      throw new Error('person is not set');
    }

    const template = `Front:<br/>
    Chest: ${Math.round(person.front_params.chest)} cm<br/>
    Waist: ${Math.round(person.front_params.waist)} cm<br/>
    Hips: ${Math.round(person.front_params.hips)} cm<br/>
    <br/>
    Side:<br/>
    Chest: ${Math.round(person.side_params.chest)} cm<br/>
    Waist: ${Math.round(person.side_params.waist)} cm<br/>
    Hips: ${Math.round(person.side_params.hips)} cm<br/>
    <br/>
    Volume:<br/>
    Chest: ${Math.round(person.volume_params.chest)} cm<br/>
    Waist: ${Math.round(person.volume_params.waist)} cm<br/>
    Hips: ${Math.round(person.volume_params.hips)} cm<br/>
    Low hips: ${Math.round(person.volume_params.low_hips)} cm<br/>`;

    el.innerHTML = template;
  }

  /**
   * Show sizes in resultsEl
   *
   * @async
   * @private
   * @param {Object} el - response from API
   * @param {Object} person - response from API
   * @param {Object} sizes - product sizes
   */
  outputSizes(el, person, sizes) {
    if (!el) {
      throw new Error('el is not set');
    }

    if (!person) {
      throw new Error('person is not set');
    }

    if (!sizes) {
      throw new Error('sizes is not set');
    }

    const template = `Your size is: ${sizes.size}`;

    el.innerHTML = template;
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

export default Widget;
