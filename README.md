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
new SAIA({
  key: '<your api key>',
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

saia.updatePersonsData('female', 180);
saia.saveFrontImage(frontImage);
saia.saveSideImage(sideImage);

saia.postMetadate()
  .then(() => saia.sendImages())
  .then(() => saia.getResults())
  .then(results => console.log(results))
  .catch(err => console.error(err));
```

# API

## Classes

<dl>
<dt><a href="#SAIA">SAIA</a></dt>
<dd></dd>
<dt><a href="#Camera">Camera</a></dt>
<dd><p>Camera class</p>
</dd>
<dt><a href="#API">API</a></dt>
<dd><p>API wrapper class</p>
</dd>
</dl>

<a name="SAIA"></a>

## SAIA
**Kind**: global class  

* [SAIA](#SAIA)
    * [new SAIA(options)](#new_SAIA_new)
    * [.updatePersonsData(gender, height)](#SAIA+updatePersonsData)
    * [.postMetadate(gender, height)](#SAIA+postMetadate) ⇒ <code>Promise</code>
    * [.sendImages(frontImage, sideImage)](#SAIA+sendImages) ⇒ <code>Promise</code>
    * [.sendFrontImage(frontImage)](#SAIA+sendFrontImage) ⇒ <code>Promise</code>
    * [.sendSideImage(sideImage)](#SAIA+sendSideImage) ⇒ <code>Promise</code>
    * [.saveFrontImage(file)](#SAIA+saveFrontImage)
    * [.saveSideImage(file)](#SAIA+saveSideImage)
    * [.getResults()](#SAIA+getResults) ⇒ <code>Promise</code>
    * [.getSnapshot()](#SAIA+getSnapshot) ⇒ <code>Promise</code>
    * [.initElements()](#SAIA+initElements)
    * [.startFlow()](#SAIA+startFlow)
    * [.showResults(data)](#SAIA+showResults)
    * [.updateStatus(status)](#SAIA+updateStatus)

<a name="new_SAIA_new"></a>

### new SAIA(options)
SAIA class constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | config parameters |
| options.key | <code>string</code> | api key |
| options.host | <code>string</code> | api host url |
| options.camera | <code>Object</code> | webcam settings object |
| options.camera.enabled | <code>boolean</code> | enable webcam |
| options.camera.width | <code>number</code> | webcam preview width |
| options.camera.height | <code>number</code> | webcam preview height |
| options.camera.target | <code>string</code> | webcam preview parrent element |
| options.camera.fps | <code>number</code> | webcam preview frames per second |
| options.camera.mirror | <code>boolean</code> | flip webcam image horizontaly |
| options.frontImageEl | <code>Element</code> | front image input element |
| options.sideImageEl | <code>Element</code> | side image input element |
| options.genderEl | <code>Element</code> | gender input element |
| options.heightEl | <code>Element</code> | height input element |
| options.frontImageCamEl | <code>Element</code> | front image snap button |
| options.sideImageCamEl | <code>Element</code> | side image snap button |
| options.startButtonEl | <code>Element</code> | start flow button |
| options.resultsEl | <code>Element</code> | results container element |
| options.statusEl | <code>Element</code> | status element |
| options.showStatus | <code>boolean</code> | show status |

<a name="SAIA+updatePersonsData"></a>

### saiA.updatePersonsData(gender, height)
Update person's data

**Kind**: instance method of [<code>SAIA</code>](#SAIA)  

| Param | Type | Description |
| --- | --- | --- |
| gender | <code>string</code> | persons gender |
| height | <code>number</code> | persons height |

<a name="SAIA+postMetadate"></a>

### saiA.postMetadate(gender, height) ⇒ <code>Promise</code>
Create new instance

**Kind**: instance method of [<code>SAIA</code>](#SAIA)  

| Param | Type | Description |
| --- | --- | --- |
| gender | <code>string</code> | persons gender |
| height | <code>number</code> | persons height |

<a name="SAIA+sendImages"></a>

### saiA.sendImages(frontImage, sideImage) ⇒ <code>Promise</code>
Send images for further processing

**Kind**: instance method of [<code>SAIA</code>](#SAIA)  

| Param | Type | Description |
| --- | --- | --- |
| frontImage | <code>File</code> | front image |
| sideImage | <code>File</code> | side image |

<a name="SAIA+sendFrontImage"></a>

### saiA.sendFrontImage(frontImage) ⇒ <code>Promise</code>
Send front image for further processing

**Kind**: instance method of [<code>SAIA</code>](#SAIA)  

| Param | Type | Description |
| --- | --- | --- |
| frontImage | <code>File</code> | front image |

<a name="SAIA+sendSideImage"></a>

### saiA.sendSideImage(sideImage) ⇒ <code>Promise</code>
Send side image for further processing

**Kind**: instance method of [<code>SAIA</code>](#SAIA)  

| Param | Type | Description |
| --- | --- | --- |
| sideImage | <code>File</code> | side image |

<a name="SAIA+saveFrontImage"></a>

### saiA.saveFrontImage(file)
Save front image

**Kind**: instance method of [<code>SAIA</code>](#SAIA)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> | front image file |

<a name="SAIA+saveSideImage"></a>

### saiA.saveSideImage(file)
Save side image

**Kind**: instance method of [<code>SAIA</code>](#SAIA)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> | side image file |

<a name="SAIA+getResults"></a>

### saiA.getResults() ⇒ <code>Promise</code>
Get results

**Kind**: instance method of [<code>SAIA</code>](#SAIA)  
<a name="SAIA+getSnapshot"></a>

### saiA.getSnapshot() ⇒ <code>Promise</code>
Get webcam image

**Kind**: instance method of [<code>SAIA</code>](#SAIA)  
<a name="SAIA+initElements"></a>

### saiA.initElements()
Init elements event listeners

**Kind**: instance method of [<code>SAIA</code>](#SAIA)  
<a name="SAIA+startFlow"></a>

### saiA.startFlow()
Start flow execution

**Kind**: instance method of [<code>SAIA</code>](#SAIA)  
<a name="SAIA+showResults"></a>

### saiA.showResults(data)
Show results

**Kind**: instance method of [<code>SAIA</code>](#SAIA)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | response from API |

<a name="SAIA+updateStatus"></a>

### saiA.updateStatus(status)
Update status

**Kind**: instance method of [<code>SAIA</code>](#SAIA)  

| Param | Type | Description |
| --- | --- | --- |
| status | <code>string</code> | execution status |

<a name="Camera"></a>

## Camera
Camera class

**Kind**: global class  

* [Camera](#Camera)
    * [new Camera(options)](#new_Camera_new)
    * [.initCameraTemplate()](#Camera+initCameraTemplate)
    * [.getImage()](#Camera+getImage) ⇒ <code>Promise.&lt;Blob&gt;</code>

<a name="new_Camera_new"></a>

### new Camera(options)
Camera class constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | options |
| options.width | <code>number</code> | width of the webcam video |
| options.height | <code>number</code> | height of the webcam video |
| options.target | <code>string</code> | selector of the parrent container for webcam preview |
| options.mirror | <code>boolean</code> | flip horizontaly |
| options.fps | <code>number</code> | number of frames per second |

<a name="Camera+initCameraTemplate"></a>

### camera.initCameraTemplate()
Init camera template

**Kind**: instance method of [<code>Camera</code>](#Camera)  
<a name="Camera+getImage"></a>

### camera.getImage() ⇒ <code>Promise.&lt;Blob&gt;</code>
Get webcam image as File

**Kind**: instance method of [<code>Camera</code>](#Camera)  
<a name="API"></a>

## API
API wrapper class

**Kind**: global class  

* [API](#API)
    * [new API(options)](#new_API_new)
    * [.updatePersonsData(gender, height)](#API+updatePersonsData)
    * [.postMetadate(gender, height)](#API+postMetadate) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.sendImages(frontImage, sideImage)](#API+sendImages) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.sendFrontImage(frontImage)](#API+sendFrontImage) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.sendSideImage(sideImage)](#API+sendSideImage) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.saveFrontImage(file)](#API+saveFrontImage)
    * [.saveSideImage(file)](#API+saveSideImage)
    * [.getResults()](#API+getResults) ⇒ <code>Promise.&lt;Object&gt;</code>

<a name="new_API_new"></a>

### new API(options)
Class constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | options |
| options.apiHost | <code>string</code> | API url |
| options.apiKey | <code>string</code> | API key |
| options.delay | <code>number</code> | delay that determines how often API will check status of SAIA tasks |
| options.gender | <code>string</code> | person's gender |
| options.height | <code>number</code> | person's height |

<a name="API+updatePersonsData"></a>

### apI.updatePersonsData(gender, height)
Update person's data

**Kind**: instance method of [<code>API</code>](#API)  

| Param | Type | Description |
| --- | --- | --- |
| gender | <code>string</code> | persons gender |
| height | <code>number</code> | persons height |

<a name="API+postMetadate"></a>

### apI.postMetadate(gender, height) ⇒ <code>Promise.&lt;string&gt;</code>
Create new instance

**Kind**: instance method of [<code>API</code>](#API)  

| Param | Type | Description |
| --- | --- | --- |
| gender | <code>string</code> | persons gender |
| height | <code>number</code> | persons height |

<a name="API+sendImages"></a>

### apI.sendImages(frontImage, sideImage) ⇒ <code>Promise.&lt;string&gt;</code>
Send images for further processing

**Kind**: instance method of [<code>API</code>](#API)  

| Param | Type | Description |
| --- | --- | --- |
| frontImage | <code>File</code> \| <code>Blob</code> | front image |
| sideImage | <code>File</code> \| <code>Blob</code> | side image |

<a name="API+sendFrontImage"></a>

### apI.sendFrontImage(frontImage) ⇒ <code>Promise.&lt;string&gt;</code>
Send front image for further processing

**Kind**: instance method of [<code>API</code>](#API)  

| Param | Type | Description |
| --- | --- | --- |
| frontImage | <code>File</code> \| <code>Blob</code> | front image |

<a name="API+sendSideImage"></a>

### apI.sendSideImage(sideImage) ⇒ <code>Promise.&lt;string&gt;</code>
Send side image for further processing

**Kind**: instance method of [<code>API</code>](#API)  

| Param | Type | Description |
| --- | --- | --- |
| sideImage | <code>File</code> \| <code>Blob</code> | side image |

<a name="API+saveFrontImage"></a>

### apI.saveFrontImage(file)
Save front image

**Kind**: instance method of [<code>API</code>](#API)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> \| <code>Blob</code> | front image file |

<a name="API+saveSideImage"></a>

### apI.saveSideImage(file)
Save side image

**Kind**: instance method of [<code>API</code>](#API)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> \| <code>Blob</code> | side image file |

<a name="API+getResults"></a>

### apI.getResults() ⇒ <code>Promise.&lt;Object&gt;</code>
Get results

**Kind**: instance method of [<code>API</code>](#API)  
