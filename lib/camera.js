import * as Webcam from 'webcamjs';
import b64toBlob from 'b64-to-blob';

/**
 * Camera class
 */
class Camera {

  /**
   * Camera class constructor
   *
   * @param {Object} options - options
   * @param {number} options.width - width of the webcam video
   * @param {number} options.height - height of the webcam video
   * @param {string} options.target - selector of the parrent container for webcam preview
   * @param {boolean} options.mirror - flip horizontaly
   * @param {number} options.fps - number of frames per second
   */
  constructor(options = {}) {
    this.defaults = {
      width: 300,
      height: 200,
      target: null,
      mirror: false,
      fps: 30,
    };

    this.defaults = Object.assign(this.defaults, options);
    this.template = '<div id="saia-camera" class="saia-camera"></div>';

    Webcam.set({
      width: this.defaults.width,
      height: this.defaults.height,
      image_format: 'png',
      flip_horiz: this.defaults.mirror,
      fps: this.defaults.fps,
    });

    Webcam.set('constraints', {
      optional: [{ minWidth: 600 }]
    });

    if (this.defaults.target) {
      Webcam.attach(this.defaults.target);
    } else {
      this.initCameraTemplate();
      Webcam.attach('#saia-camera');
    }
  }

  /**
   * Init camera template
   */
  initCameraTemplate() {
    const div = document.createElement('div');
    div.innerHTML = this.template;
    document.querySelector('body').appendChild(div.firstChild);
  }

  /**
   * Get webcam image as File
   *
   * @returns {Promise<Blob>}
   */
  getImage() {
    return new Promise((resolve, reject) => {
      Webcam.snap((data) => {
        const mimeString = data.split(',')[0].split(':')[1].split(';')[0];
        const raw = data.split(',')[1];
        resolve(b64toBlob(raw, mimeString));
      });
    });
  }
}

export default Camera;
