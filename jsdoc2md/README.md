# SAIA Javascript SDK

## Install

To use this sdk on your website, you need to include a saia-sdk.js file in footer section of a page.

```html
<script src="saia-sdk.js"></script>
```

## Usage

SAIA Javascript SDK can work in two modes: as a widget and as a API wrapper. For the first mode you should prepare a basic markup like this:

```html
<div id="camera"></div>

<input type="file" name="front_image" id="front_image">
<button id="front_image_web" type="button">Get front photo from webcam</button>

<input type="file" name="side_image" id="side_image">
<button id="side_image_web" type="button">Get side photo from webcam</button>

<select name="gender" id="gender">
  <option value="male">male</option>
  <option value="female">female</option>
</select>

<input type="number" name="height" id="height">

<span id="status"></span>
<button id="start" type="button">START</button>
<div id="results"></div>
```

Then you need to initialize widget like this:

```js
var saia = new SAIA({
  key: '<your api key>',
});

var widget = saia.widget.create({
  camera: {
    enabled: true,
    width: 600,
    height: 320,
    target: document.getElementById('camera'),
  },
  frontImageEl: document.getElementById('front_image'),
  sideImageEl: document.getElementById('side_image'),
  genderEl: document.getElementById('gender'),
  heightEl: document.getElementById('height'),
  startButtonEl: document.getElementById('start'),
  frontImageCamEl: document.getElementById('front_image_web'),
  sideImageCamEl: document.getElementById('side_image_web'),
  statusEl: document.getElementById('status'),
  resultsEl: document.getElementById('results'),
  showStatus: true,
});
```

and... that's it. After this you will get a fully functional application, that can send photos to our API, can work with device camera and receive a result.

To use SDK as API wrapper, you only need to create a new instance of the SAIA class and then call methods that you need.

Example:

```js
const frontImage, sideImage;

const saia = new SAIA({
  key: '<your api key>',
});

saia.api.person.create({
  gender: 'female',
  height: 180,
  frontImage: frontImage,
  sideImage: sideImage,
})
  .then((taskSetId) => saia.api.queue.getResults(taskSetId))
  .then(results => console.log(results))
  .catch(err => console.error(err));
```

## Testing

To run tests, you need to run this command on terminal/consol:

Linux/macOS

    $ export API_KEY='<your api key>' && export API_HOST='<host>' && npm test

Windows

    $ set API_KEY='<your api key>' && set API_HOST='<host>' && npm test
