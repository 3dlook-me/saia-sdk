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

## API

## Classes

<dl>
<dt><a href="#API">API</a></dt>
<dd><p>API wrapper class</p>
</dd>
<dt><a href="#Person">Person</a></dt>
<dd><p>Person class</p>
</dd>
<dt><a href="#Queue">Queue</a></dt>
<dd><p>Queue class</p>
</dd>
<dt><a href="#Widget">Widget</a></dt>
<dd></dd>
<dt><a href="#Camera">Camera</a></dt>
<dd><p>Camera class</p>
</dd>
<dt><a href="#SAIA">SAIA</a></dt>
<dd></dd>
</dl>

<a name="API"></a>

## API
API wrapper class

**Kind**: global class  
<a name="new_API_new"></a>

### new API(options)
Class constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | options |
| options.host | <code>string</code> | API url |
| options.key | <code>string</code> | API key |

<a name="Person"></a>

## Person
Person class

**Kind**: global class  

* [Person](#Person)
    * [new Person(host, axios)](#new_Person_new)
    * [.create(params)](#Person+create) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.get(id)](#Person+get) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.update(id, params)](#Person+update) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.calculate(id)](#Person+calculate) ⇒ <code>Promise.&lt;string&gt;</code>

<a name="new_Person_new"></a>

### new Person(host, axios)
Person's class constructor


| Param | Type | Description |
| --- | --- | --- |
| host | <code>string</code> | host url |
| axios | <code>Axios</code> | axios instance |

<a name="Person+create"></a>

### person.create(params) ⇒ <code>Promise.&lt;string&gt;</code>
Create person only with metadata (gender and height)
or with photos (gender, height, frontImage, sideImage).

If you create Person only with metadata, then you will
get Person's ID. If you create Person with metadata and images,
you will get Taskset ID

**Kind**: instance method of [<code>Person</code>](#Person)  
**Returns**: <code>Promise.&lt;string&gt;</code> - person's id or taskset id  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | person's parameters |
| params.gender | <code>string</code> | person's gender |
| params.height | <code>number</code> | person's height |
| [params.frontImage] | <code>string</code> | person's Base64 encoded front photo |
| [params.sideImage] | <code>string</code> | person's Base64 encoded side photo |

**Example**  
```js
const saia = new SAIA({
  key: '<your key>',
});

// create person only with metadata
// and get its id
saia.api.person.create({
  gender: 'male',
  height: 180,
})
  .then(personId => console.log(personId))
  .catch(err => console.log(err));

// create person only with metadata and images
// and get taskset id. You can use it to track
// calculation process by using saia.api.queue.getResults(taskSetId)
saia.api.person.create({
  gender: 'male',
  height: 180,
  frontImage: <frontImage>,
  sideImage: <sideImage>,
})
  .then(taskSetId => console.log(taskSetId))
  .catch(err => console.log(err));
```
<a name="Person+get"></a>

### person.get(id) ⇒ <code>Promise.&lt;Object&gt;</code>
Get a specific Person by ID

**Kind**: instance method of [<code>Person</code>](#Person)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - Person  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Person's ID |

**Example**  
```js
const saia = new SAIA({
  key: '<your key>',
});

saia.api.person.get(40)
  .then(person => console.log(person))
  .catch(err => console.log(err));
```
<a name="Person+update"></a>

### person.update(id, params) ⇒ <code>Promise.&lt;Object&gt;</code>
Full or Partial update Person by ID

**Kind**: instance method of [<code>Person</code>](#Person)  
**Returns**: <code>Promise.&lt;Object&gt;</code> - updated parameters  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Person''s ID |
| params | <code>Object</code> | Person's parameters |
| [params.gender] | <code>string</code> | Person's parameters |
| [params.height] | <code>number</code> | Person's height |
| [params.frontImage] | <code>string</code> | Person's Base64 encoded frontImage |
| [params.sideImage] | <code>string</code> | Person's Base64 encoded sideImage |

**Example**  
```js
const saia = new SAIA({
  key: '<your key>',
});

saia.api.person.update({
  frontImage: <frontImage>,
  sideImage: <sideImage>,
})
  .then(updatedFields => console.log(updatedFields))
  .catch(err => console.log(err));
```
<a name="Person+calculate"></a>

### person.calculate(id) ⇒ <code>Promise.&lt;string&gt;</code>
Manual recalculate Person's parameters by ID

**Kind**: instance method of [<code>Person</code>](#Person)  
**Returns**: <code>Promise.&lt;string&gt;</code> - Taskset id  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Person's ID |

**Example**  
```js
// in this example we update person's images
// and then manually start recalculation
const saia = new SAIA({
  key: '<your key>',
});

saia.api.person.update({
  frontImage: <frontImage>,
  sideImage: <sideImage>,
})
  .then(updatedFields => saia.api.person.calculate(updatedFields.id))
  .then(taskSetId => console.log(taskSetId))
  .catch(err => console.log(err));
```
<a name="Queue"></a>

## Queue
Queue class

**Kind**: global class  

* [Queue](#Queue)
    * [new Queue(host, axios)](#new_Queue_new)
    * [.get(id)](#Queue+get) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getResults(id, [delay])](#Queue+getResults) ⇒ <code>Promise.&lt;object&gt;</code>

<a name="new_Queue_new"></a>

### new Queue(host, axios)
Queue's class constructor


| Param | Type | Description |
| --- | --- | --- |
| host | <code>string</code> | host url |
| axios | <code>Axios</code> | axios instance |

<a name="Queue+get"></a>

### queue.get(id) ⇒ <code>Promise.&lt;object&gt;</code>
Get information about tasks by taskset id

**Kind**: instance method of [<code>Queue</code>](#Queue)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | taskset id |

**Example**  
```js
const saia = new SAIA({
  key: '<your key>',
});

saia.api.queue.get('4d563d3f-38ae-4b51-8eab-2b78483b153e')
  .then(task => console.log(task))
  .catch(err => console.log(err));
```
<a name="Queue+getResults"></a>

### queue.getResults(id, [delay]) ⇒ <code>Promise.&lt;object&gt;</code>
Check task status and if it is success, return person object

**Kind**: instance method of [<code>Queue</code>](#Queue)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | taskset id |
| [delay] | <code>number</code> | delay before next check |

**Example**  
```js
const saia = new SAIA({
  key: '<your key>',
});

saia.api.queue.getResults('4d563d3f-38ae-4b51-8eab-2b78483b153e')
  .then(person => console.log(person))
  .catch(err => console.log(err));

// you also can specify the delay between checks
saia.api.queue.getResults('4d563d3f-38ae-4b51-8eab-2b78483b153e', 3400)
  .then(person => console.log(person))
  .catch(err => console.log(err));
```
<a name="Widget"></a>

## Widget
**Kind**: global class  

* [Widget](#Widget)
    * [new Widget(options)](#new_Widget_new)
    * [.updatePersonsData(gender, height)](#Widget+updatePersonsData)
    * [.createPerson([data])](#Widget+createPerson) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.saveFrontImage(file)](#Widget+saveFrontImage)
    * [.saveSideImage(file)](#Widget+saveSideImage)
    * [.getResults()](#Widget+getResults) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.recalculate([id])](#Widget+recalculate) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.getSnapshot()](#Widget+getSnapshot) ⇒ <code>Promise.&lt;Blob&gt;</code>

<a name="new_Widget_new"></a>

### new Widget(options)
Widget class constructor


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

**Example**  
```js
const widget = new Widget({
  key: '<your key>'
});
```
<a name="Widget+updatePersonsData"></a>

### widget.updatePersonsData(gender, height)
Update person's data

**Kind**: instance method of [<code>Widget</code>](#Widget)  

| Param | Type | Description |
| --- | --- | --- |
| gender | <code>string</code> | persons gender |
| height | <code>number</code> | persons height |

**Example**  
```js
widget.updatePersonsData('male', 184);
```
<a name="Widget+createPerson"></a>

### widget.createPerson([data]) ⇒ <code>Promise.&lt;string&gt;</code>
Create new instance of a person with
metadata and images

**Kind**: instance method of [<code>Widget</code>](#Widget)  

| Param | Type | Description |
| --- | --- | --- |
| [data] | <code>Object</code> | person's data |
| [data.height] | <code>number</code> | person's height |
| [data.gender] | <code>string</code> | person's gender |
| [data.frontImage] | <code>File</code> \| <code>Blob</code> | person's front image |
| [data.sideImage] | <code>File</code> \| <code>Blob</code> | person's side image |

**Example**  
```js
// you can pass user's info here
widget.createPerson({
    gender: 'female',
    height: 170,
    frontImage: frontImageFile,
    sideImage: sideImageFile,
  })
  .then(url => console.log(url))
  .catch(err => console.error(err));
```
<a name="Widget+saveFrontImage"></a>

### widget.saveFrontImage(file)
Save front image

**Kind**: instance method of [<code>Widget</code>](#Widget)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> \| <code>Blob</code> | front image file |

**Example**  
```js
const frontImage;

widget.saveFrontImage(frontImage);
```
<a name="Widget+saveSideImage"></a>

### widget.saveSideImage(file)
Save side image

**Kind**: instance method of [<code>Widget</code>](#Widget)  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> \| <code>Blob</code> | side image file |

**Example**  
```js
const sideImage;

widget.saveSideImage(sideImage);
```
<a name="Widget+getResults"></a>

### widget.getResults() ⇒ <code>Promise.&lt;Object&gt;</code>
Get results

**Kind**: instance method of [<code>Widget</code>](#Widget)  
**Example**  
```js
// use this method only after saving images,
// users info and posting metadate
widget.getResults()
  .then(result => console.log(result))
  .catch(err => console.error(err));
```
<a name="Widget+recalculate"></a>

### widget.recalculate([id]) ⇒ <code>Promise.&lt;string&gt;</code>
Recalculate person's parameters

**Kind**: instance method of [<code>Widget</code>](#Widget)  

| Param | Type | Description |
| --- | --- | --- |
| [id] | <code>number</code> | person instance url |

**Example**  
```js
// if you have updated user's front or side image
// with .sendFrontImage or .sendSideImage
// you could recalculate person's parameters

widget.recalculate()
  .then(taskSetUrl => console.log(taskSetUrl))
  .catch(err => console.error(err));
```
<a name="Widget+getSnapshot"></a>

### widget.getSnapshot() ⇒ <code>Promise.&lt;Blob&gt;</code>
Get webcam image

**Kind**: instance method of [<code>Widget</code>](#Widget)  
**Example**  
```js
// camera should be enabled
widget.getSnapshot()
  .then(image => widget.saveFrontImage(image))
  .catch(err => console.error(err));
```
<a name="Camera"></a>

## Camera
Camera class

**Kind**: global class  

* [Camera](#Camera)
    * [new Camera(options)](#new_Camera_new)
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

<a name="Camera+getImage"></a>

### camera.getImage() ⇒ <code>Promise.&lt;Blob&gt;</code>
Get webcam image

**Kind**: instance method of [<code>Camera</code>](#Camera)  
**Example**  
```js
const camera = new Camera({
  target: document.getElementById('camera'),
});

camera.getImage()
  .then(image => console.log(image))
  .catch(err => console.error(err));
```
<a name="SAIA"></a>

## SAIA
**Kind**: global class  
<a name="new_SAIA_new"></a>

### new SAIA(options)
SAIA class constructor


| Param | Type | Description |
| --- | --- | --- |
| options | <code>Object</code> | config parameters |
| options.key | <code>string</code> | api key |
| options.host | <code>string</code> | api host url |

**Example**  
```js
const saia = new SAIA({
  key: '<your key>'
});
```

## Testing

To run tests, you need to run this command on terminal/consol:

Linux/macOS

    $ export API_KEY='<your api key>' && export API_HOST='<host>' && npm test

Windows

    $ set API_KEY='<your api key>' && set API_HOST='<host>' && npm test
