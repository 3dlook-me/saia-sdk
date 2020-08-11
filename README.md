# SAIA Javascript SDK

[![Build Status](https://travis-ci.org/3dlook-me/saia-sdk.svg?branch=master)](https://travis-ci.org/3dlook-me/saia-sdk)
[![Version](https://img.shields.io/npm/v/@3dlook/saia-sdk.svg?color=f&logo=%403dlook%2Fsaia-sdk)](https://npmjs.com/package/@3dlook/saia-sdk)
[![Dependencies](https://img.shields.io/david/3dlook-me/saia-sdk.svg)](https://www.npmjs.com/package/@3dlook/saia-sdk?activeTab=dependencies)

## Installing

To install SAIA SDK as npm package into your project, use the following command using npm:

```sh
npm install --save @3dlook/saia-sdk
```

# Building

To build SAIA SDK, clone repository to your local machine

with https:

```sh
git clone https://github.com/3dlook-me/saia-sdk.git
```

or with ssh:

```sh
git clone git@github.com:3dlook-me/saia-sdk.git
```

and then enter into the cloned project directory in the terminal:

```sh
cd saia-sdk
```

and build it:

```sh
npm run build:prod
```

## Usage

SAIA Javascript SDK works as an API wrapper. To use it, you only need to create a new instance of the SAIA class and then call methods that you need.

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
<dt><a href="#MTMClient">MTMClient</a></dt>
<dd><p>MTMClient class</p>
</dd>
<dt><a href="#Person">Person</a></dt>
<dd><p>Person class</p>
</dd>
<dt><a href="#Product">Product</a></dt>
<dd><p>Product class</p>
</dd>
<dt><a href="#Queue">Queue</a></dt>
<dd><p>Queue class</p>
</dd>
<dt><a href="#Sizechart">Sizechart</a></dt>
<dd><p>Product class</p>
</dd>
<dt><a href="#SAIA">SAIA</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getBase64">getBase64(file)</a> ⇒ <code>Promise.&lt;string&gt;</code></dt>
<dd><p>Convert File or Blob object to base64 string</p>
</dd>
<dt><a href="#getFileName">getFileName(blob)</a></dt>
<dd><p>Get file name with extension for Blob</p>
</dd>
<dt><a href="#getTaskError">getTaskError(tasks)</a> ⇒ <code>string</code></dt>
<dd><p>Get error description</p>
</dd>
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

**Example**  
```js
const api = new API({
  key: '<your key>',
  host: '<api host url>',
});
```
<a name="MTMClient"></a>

## MTMClient
MTMClient class

**Kind**: global class  

* [MTMClient](#MTMClient)
    * [new MTMClient(host, axios)](#new_MTMClient_new)
    * [.create(params)](#MTMClient+create) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.update(params)](#MTMClient+update) ⇒ <code>Promise.&lt;number&gt;</code>
    * [.createPerson(mtmClientId, params)](#MTMClient+createPerson) ⇒ <code>Promise.&lt;(string\|number)&gt;</code>

<a name="new_MTMClient_new"></a>

### new MTMClient(host, axios)
MTMClient's class constructor


| Param | Type | Description |
| --- | --- | --- |
| host | <code>string</code> | host url |
| axios | <code>Axios</code> | axios instance |

<a name="MTMClient+create"></a>

### mtmClient.create(params) ⇒ <code>Promise.&lt;number&gt;</code>
Create mtm client

**Kind**: instance method of [<code>MTMClient</code>](#MTMClient)  
**Returns**: <code>Promise.&lt;number&gt;</code> - mtm client's id  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | mtm client's parameters |
| params.firstName | <code>string</code> | mtm client's first name |
| [params.lastName] | <code>string</code> | mtm client's last name |
| params.unit | <code>string</code> | mtm client's unit - cm or in |
| [params.phone] | <code>string</code> | mtm client's phone number - cm or in |
| [params.email] | <code>string</code> | mtm client's email - cm or in |
| [params.source] | <code>string</code> | the source of the request - dashboard, widget |
| [params.notes] | <code>string</code> | additional information about mtm client |
| [params.widgetId] | <code>string</code> | widget object id |

**Example**  
```js
const saia = new SAIA({
  key: '<your key>',
});

// create person only with metadata
// and get its id
saia.api.mtmClient.create({
  firstName: 'Stephen',
  lastName: 'King',
  unit: 'in',
})
  .then(mtmClientId => console.log(mtmClientId))
  .catch(err => console.log(err));
```
<a name="MTMClient+update"></a>

### mtmClient.update(params) ⇒ <code>Promise.&lt;number&gt;</code>
Update mtm client

**Kind**: instance method of [<code>MTMClient</code>](#MTMClient)  
**Returns**: <code>Promise.&lt;number&gt;</code> - mtm client's id  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | mtm client's parameters |
| params.firstName | <code>string</code> | mtm client's first name |
| [params.lastName] | <code>string</code> | mtm client's last name |
| params.unit | <code>string</code> | mtm client's unit - cm or in |
| [params.phone] | <code>string</code> | mtm client's phone number - cm or in |
| [params.email] | <code>string</code> | mtm client's email - cm or in |
| [params.source] | <code>string</code> | the source of the request - dashboard, widget |
| [params.notes] | <code>string</code> | additional information about mtm client |
| [params.widgetId] | <code>string</code> | widget object id |

**Example**  
```js
const saia = new SAIA({
  key: '<your key>',
});

// update person only with metadata
// and get its id
const existingMtmClientId = 1;

saia.api.mtmClient.update(existingMtmClientId, {
  firstName: 'Stephen',
  lastName: 'King',
  unit: 'in',
})
  .then(mtmClientId => console.log(mtmClientId))
  .catch(err => console.log(err));
```
<a name="MTMClient+createPerson"></a>

### mtmClient.createPerson(mtmClientId, params) ⇒ <code>Promise.&lt;(string\|number)&gt;</code>
Create person for mtm client only with metadata (gender and height)
or with photos (gender, height, frontImage, sideImage).

If you create Person only with metadata, then you will
get Person's ID. If you create Person with metadata and images,
you will get Taskset ID

**Kind**: instance method of [<code>MTMClient</code>](#MTMClient)  
**Returns**: <code>Promise.&lt;(string\|number)&gt;</code> - person's id or taskset id  

| Param | Type | Description |
| --- | --- | --- |
| mtmClientId | <code>number</code> | mtm client id |
| params | <code>object</code> | person's parameters |
| params.gender | <code>string</code> | person's gender |
| params.height | <code>number</code> | person's height |
| [params.measurementsType] | <code>string</code> | type of measurements - all |
| [params.frontImage] | <code>string</code> | person's Base64 encoded front photo |
| [params.sideImage] | <code>string</code> | person's Base64 encoded side photo |
| [params.weight] | <code>string</code> | person's weight in kg |
| [params.weightTopBorder] | <code>string</code> | person's top weight border in kg |
| [params.weightBottomBorder] | <code>string</code> | person's bottom weight border in kg |

**Example**  
```js
const saia = new SAIA({
  key: '<your key>',
});

// create person only with metadata
// and get its id
saia.api.mtmClient.createPerson(mtmClientId, {
  gender: 'male',
  height: 180,
})
  .then(personId => console.log(personId))
  .catch(err => console.log(err));

// create person only with metadata and images
// and get taskset id. You can use it to track
// calculation process by using saia.api.queue.getResults(taskSetId)
saia.api.mtmClient.createPerson(mtmClientId, {
  gender: 'male',
  height: 180,
  frontImage: <frontImage>,
  sideImage: <sideImage>,
})
  .then(taskSetId => console.log(taskSetId))
  .catch(err => console.log(err));
```
<a name="Person"></a>

## Person
Person class

**Kind**: global class  

* [Person](#Person)
    * [new Person(host, axios)](#new_Person_new)
    * [.create(params)](#Person+create) ⇒ <code>Promise.&lt;(string\|number)&gt;</code>
    * [.get(id)](#Person+get) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.update(id, params)](#Person+update) ⇒ <code>Promise.&lt;Object&gt;</code>
    * [.updateAndCalculate(id, params)](#Person+updateAndCalculate) ⇒ <code>Promise.&lt;string&gt;</code>
    * [.calculate(id)](#Person+calculate) ⇒ <code>Promise.&lt;string&gt;</code>

<a name="new_Person_new"></a>

### new Person(host, axios)
Person's class constructor


| Param | Type | Description |
| --- | --- | --- |
| host | <code>string</code> | host url |
| axios | <code>Axios</code> | axios instance |

<a name="Person+create"></a>

### person.create(params) ⇒ <code>Promise.&lt;(string\|number)&gt;</code>
Create person only with metadata (gender and height)
or with photos (gender, height, frontImage, sideImage).

If you create Person only with metadata, then you will
get Person's ID. If you create Person with metadata and images,
you will get Taskset ID

**Kind**: instance method of [<code>Person</code>](#Person)  
**Returns**: <code>Promise.&lt;(string\|number)&gt;</code> - person's id or taskset id  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>object</code> | person's parameters |
| params.gender | <code>string</code> | person's gender |
| params.height | <code>number</code> | person's height |
| [params.measurementsType] | <code>string</code> | type of measurements - all |
| [params.frontImage] | <code>string</code> | person's Base64 encoded front photo |
| [params.sideImage] | <code>string</code> | person's Base64 encoded side photo |
| [params.weight] | <code>string</code> | person's weight in kg |
| [params.weightTopBorder] | <code>string</code> | person's top weight border in kg |
| [params.weightBottomBorder] | <code>string</code> | person's bottom weight border in kg |
| [params.deviceCoordinates] | <code>Object</code> | user device x, y, z coordinates during photos |
| params.deviceCoordinates.frontPhoto | <code>Object</code> | user device x, y, z coordinates during Front photo |
| params.deviceCoordinates.frontPhoto.betaX | <code>number</code> | value represents the motion of the device around the x axis, represented in degrees with values ranging from -180 to 180. This represents a front to back motion of the device. |
| params.deviceCoordinates.frontPhoto.gammaY | <code>number</code> | value represents the motion of the device around the y axis, represented in degrees with values ranging from -90 to 90. This represents a left to right motion of the device. |
| params.deviceCoordinates.frontPhoto.alphaZ | <code>number</code> | value represents the motion of the device around the z axis, represented in degrees with values ranging from 0 to 360. |
| params.deviceCoordinates.sidePhoto | <code>Object</code> | user device x, y, z coordinates during Side photo |
| params.deviceCoordinates.sidePhoto.betaX | <code>number</code> | value represents the motion of the device around the x axis, represented in degrees with values ranging from -180 to 180. This represents a front to back motion of the device. |
| params.deviceCoordinates.sidePhoto.gammaY | <code>number</code> | value represents the motion of the device around the y axis, represented in degrees with values ranging from -90 to 90. This represents a left to right motion of the device. |
| params.deviceCoordinates.sidePhoto.alphaZ | <code>number</code> | value represents the motion of the device around the z axis, represented in degrees with values ranging from 0 to 360. |

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
Full or Partial update Person by ID. Returns person's object
with metadate.

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
| [params.weight] | <code>string</code> | person's weight in kg |
| [params.weightTopBorder] | <code>string</code> | person's top weight border in kg |
| [params.weightBottomBorder] | <code>string</code> | person's bottom weight border in kg |
| [params.deviceCoordinates] | <code>Object</code> | user device x, y, z coordinates during photo |
| params.deviceCoordinates.frontPhoto | <code>Object</code> | user device x, y, z coordinates during Front photo |
| params.deviceCoordinates.frontPhoto.betaX | <code>number</code> | value represents the motion of the device around the x axis, represented in degrees with values ranging from -180 to 180. This represents a front to back motion of the device. |
| params.deviceCoordinates.frontPhoto.gammaY | <code>number</code> | value represents the motion of the device around the y axis, represented in degrees with values ranging from -90 to 90. This represents a left to right motion of the device. |
| params.deviceCoordinates.frontPhoto.alphaZ | <code>number</code> | value represents the motion of the device around the z axis, represented in degrees with values ranging from 0 to 360. |
| params.deviceCoordinates.sidePhoto | <code>Object</code> | user device x, y, z coordinates during Side photo |
| params.deviceCoordinates.sidePhoto.betaX | <code>number</code> | value represents the motion of the device around the x axis, represented in degrees with values ranging from -180 to 180. This represents a front to back motion of the device. |
| params.deviceCoordinates.sidePhoto.gammaY | <code>number</code> | value represents the motion of the device around the y axis, represented in degrees with values ranging from -90 to 90. This represents a left to right motion of the device. |
| params.deviceCoordinates.sidePhoto.alphaZ | <code>number</code> | value represents the motion of the device around the z axis, represented in degrees with values ranging from 0 to 360. |

**Example**  
```js
const saia = new SAIA({
  key: '<your key>',
});

saia.api.person.update(personId, {
  frontImage: <frontImage>,
  sideImage: <sideImage>,
})
  .then(updatedFields => console.log(updatedFields))
  .catch(err => console.log(err));
```
<a name="Person+updateAndCalculate"></a>

### person.updateAndCalculate(id, params) ⇒ <code>Promise.&lt;string&gt;</code>
Update a new Person by ID with calculation start.
Returns person's task set id.

**Kind**: instance method of [<code>Person</code>](#Person)  
**Returns**: <code>Promise.&lt;string&gt;</code> - task set url  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>number</code> | Person''s ID |
| params | <code>Object</code> | Person's parameters |
| [params.measurementsType] | <code>string</code> | type of measurements - all |
| [params.gender] | <code>string</code> | Person's parameters |
| [params.height] | <code>number</code> | Person's height |
| [params.frontImage] | <code>string</code> | Person's Base64 encoded frontImage |
| [params.sideImage] | <code>string</code> | Person's Base64 encoded sideImage |
| [params.weight] | <code>string</code> | person's weight in kg |
| [params.weightTopBorder] | <code>string</code> | person's top weight border in kg |
| [params.weightBottomBorder] | <code>string</code> | person's bottom weight border in kg |
| [params.deviceCoordinates] | <code>Object</code> | user device x, y, z coordinates during photo |
| params.deviceCoordinates.frontPhoto | <code>Object</code> | user device x, y, z coordinates during Front photo |
| params.deviceCoordinates.frontPhoto.betaX | <code>number</code> | value represents the motion of the device around the x axis, represented in degrees with values ranging from -180 to 180. This represents a front to back motion of the device. |
| params.deviceCoordinates.frontPhoto.gammaY | <code>number</code> | value represents the motion of the device around the y axis, represented in degrees with values ranging from -90 to 90. This represents a left to right motion of the device. |
| params.deviceCoordinates.frontPhoto.alphaZ | <code>number</code> | value represents the motion of the device around the z axis, represented in degrees with values ranging from 0 to 360. |
| params.deviceCoordinates.sidePhoto | <code>Object</code> | user device x, y, z coordinates during Side photo |
| params.deviceCoordinates.sidePhoto.betaX | <code>number</code> | value represents the motion of the device around the x axis, represented in degrees with values ranging from -180 to 180. This represents a front to back motion of the device. |
| params.deviceCoordinates.sidePhoto.gammaY | <code>number</code> | value represents the motion of the device around the y axis, represented in degrees with values ranging from -90 to 90. This represents a left to right motion of the device. |
| params.deviceCoordinates.sidePhoto.alphaZ | <code>number</code> | value represents the motion of the device around the z axis, represented in degrees with values ranging from 0 to 360. |

**Example**  
```js
const saia = new SAIA({
  key: '<your key>',
});

saia.api.person.updateAndCalculate(personId, {
  frontImage: <frontImage>,
  sideImage: <sideImage>,
})
  .then(taskSetUrl => saia.api.queue.getResults(taskSetUrl))
  .then(person => console.log(person))
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
<a name="Product"></a>

## Product
Product class

**Kind**: global class  

* [Product](#Product)
    * [new Product(host, axios)](#new_Product_new)
    * [.get(url)](#Product+get) ⇒ <code>Promise.&lt;(Object\|Array)&gt;</code>
    * [.getSize(params)](#Product+getSize) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getRecommendations(params)](#Product+getRecommendations) ⇒ <code>Promise.&lt;object&gt;</code>

<a name="new_Product_new"></a>

### new Product(host, axios)
Product's class constructor


| Param | Type | Description |
| --- | --- | --- |
| host | <code>string</code> | host url |
| axios | <code>Axios</code> | axios instance |

<a name="Product+get"></a>

### product.get(url) ⇒ <code>Promise.&lt;(Object\|Array)&gt;</code>
Get product object/objects by its page url.
It can return an array if two or more products have the same url

**Kind**: instance method of [<code>Product</code>](#Product)  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | product page url |

**Example**  
```js
const saia = new SAIA({
  key: '<your key>',
});

saia.api.product.get('https://saia.3dlook.me/test-product')
  .then(product => console.log(product))
  .catch(err => console.log(err));
```
<a name="Product+getSize"></a>

### product.getSize(params) ⇒ <code>Promise.&lt;object&gt;</code>
Get sizes for product based on person parameters.
This method uses old implemendation of a size recommendation method

**Kind**: instance method of [<code>Product</code>](#Product)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | parameters |
| params.height | <code>number</code> | person's height |
| params.gender | <code>string</code> | person's gender |
| params.hips | <code>number</code> | person's volume_params.hips |
| params.chest | <code>number</code> | person's volume_params.chest |
| params.waist | <code>number</code> | person's volume_params.waist |
| params.url | <code>string</code> | product url |

**Example**  
```js
const saia = new SAIA({
  key: '<your key>',
});

saia.api.product.getSize({
  height: 173,
  gender: 'female',
  hips: 89,
  chest: 87,
  waist: 73,
  url: 'https://saia.3dlook.me/test-product',
})
  .then(size => console.log(size))
  .catch(err => console.log(err));
```
<a name="Product+getRecommendations"></a>

### product.getRecommendations(params) ⇒ <code>Promise.&lt;object&gt;</code>
Get size recommendations for a selected product based on user measurements.
This method uses new implementation of a size recommendation method.

**Kind**: instance method of [<code>Product</code>](#Product)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | parameters |
| params.gender | <code>string</code> | person's gender |
| params.hips | <code>number</code> | person's volume_params.hips |
| params.chest | <code>number</code> | person's volume_params.chest |
| params.waist | <code>number</code> | person's volume_params.waist |
| params.url | <code>string</code> | product url |

**Example**  
```js
const saia = new SAIA({
  key: '<your key>',
});

saia.api.product.getRecommendations({
  gender: 'female',
  hips: 89,
  chest: 87,
  waist: 73,
  url: 'https://saia.3dlook.me/test-product',
})
  .then(size => console.log(size))
  .catch(err => console.log(err));
```
<a name="Queue"></a>

## Queue
Queue class

**Kind**: global class  

* [Queue](#Queue)
    * [new Queue(host, axios)](#new_Queue_new)
    * [.get(id)](#Queue+get) ⇒ <code>Promise.&lt;object&gt;</code>
    * [.getResults(id, [delay], [personId])](#Queue+getResults) ⇒ <code>Promise.&lt;object&gt;</code>

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

### queue.getResults(id, [delay], [personId]) ⇒ <code>Promise.&lt;object&gt;</code>
Get result of person processing

**Kind**: instance method of [<code>Queue</code>](#Queue)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | taskset id |
| [delay] | <code>number</code> | delay before next check |
| [personId] | <code>number</code> | person id |

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
<a name="Sizechart"></a>

## Sizechart
Product class

**Kind**: global class  

* [Sizechart](#Sizechart)
    * [new Sizechart(host, axios)](#new_Sizechart_new)
    * [.getSize(params)](#Sizechart+getSize) ⇒ <code>Promise.&lt;object&gt;</code>

<a name="new_Sizechart_new"></a>

### new Sizechart(host, axios)
Product's class constructor


| Param | Type | Description |
| --- | --- | --- |
| host | <code>string</code> | host url |
| axios | <code>Axios</code> | axios instance |

<a name="Sizechart+getSize"></a>

### sizechart.getSize(params) ⇒ <code>Promise.&lt;object&gt;</code>
Get sizes for brand and body part based on person parameters

**Kind**: instance method of [<code>Sizechart</code>](#Sizechart)  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | parameters |
| params.gender | <code>string</code> | person's gender |
| params.hips | <code>number</code> | person's volume_params.hips |
| params.chest | <code>number</code> | person's volume_params.chest |
| params.waist | <code>number</code> | person's volume_params.waist |
| params.body_part | <code>number</code> | body part |
| params.brand | <code>number</code> | brand name |
| [params.customRecommendation] | <code>string</code> | custom recommendation url part for our clients. For internal usage only or if you have custom url and you know what you're doing |

**Example**  
```js
const saia = new SAIA({
  key: '<your key>',
});

saia.api.sizechart.getSize({
  gender: 'female',
  hips: 89,
  chest: 87,
  waist: 73,
  body_part: 'top',
  brand: 'Nike',
})
  .then(size => console.log(size))
  .catch(err => console.log(err));
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
<a name="getBase64"></a>

## getBase64(file) ⇒ <code>Promise.&lt;string&gt;</code>
Convert File or Blob object to base64 string

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> \| <code>Blob</code> | image file |

<a name="getFileName"></a>

## getFileName(blob)
Get file name with extension for Blob

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| blob | <code>Blob</code> | file |

<a name="getTaskError"></a>

## getTaskError(tasks) ⇒ <code>string</code>
Get error description

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| tasks | <code>Array</code> | array of tasks |


## Testing

To run tests, you need to run this command on terminal/consol:

Linux/macOS

    $ export API_KEY='<your api key>' && export API_HOST='<host>' && npm test

Windows

    $ set API_KEY='<your api key>' && set API_HOST='<host>' && npm test
