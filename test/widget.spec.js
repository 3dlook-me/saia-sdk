/* eslint-disable */
import Widget from '../lib/widget';
import testImages from './testImages';

let widget;
const host = API_HOST;
const key = API_KEY;
const frontImage = testImages.frontImage;
const sideImage = testImages.sideImage;


describe('Widget', function () {

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    widget = new Widget({
      host,
      key,
    });
  });

  describe('constructor', () => {

    it('should throw an error if api host is not spicified', (done) => {
      expect(() => new Widget()).toThrow(new Error('You need to specify API host URL'));

      return done();
    });

    it('should throw an error if api key is not spicified', (done) => {
      expect(() => new Widget({
        host,
      })).toThrow(new Error('You need to specify API key'));

      return done();
    });

    it('should create Camera class instance', (done) => {
      const w = new Widget({
        host,
        key,
        camera: {
          enabled: true,
        },
      });

      expect(w.camera).toBeTruthy()

      return done();
    });

  });

  describe('updatePersonsData', () => {

    it('should update person data', (done) => {
      const testData = {
        gender: 'male',
        height: 180,
      };
      widget.updatePersonsData(testData.gender, testData.height);

      expect(widget.data.gender).toBe(testData.gender);
      expect(widget.data.height).toBe(testData.height);

      return done();
    });

  });

  describe('createPerson', () => {

    it('should return an error if height is not passed', (done) => {
      widget.data = {};

      expect(() => { widget.createPerson({
          gender: 'male',
          frontImage,
          sideImage,
        });
      }).toThrow(new Error('No height is specified'));

      return done();
    });

    it('should return an error if gender is not passed', (done) => {
      expect(() => { widget.createPerson({
          height: 170,
          frontImage,
          sideImage,
        });
      }).toThrow(new Error('No gender is specified'));

      return done();
    });

    it('should return an error if frontImage is not passed', (done) => {
      expect(() => { widget.createPerson({
          height: 170,
          gender: 'male',
          sideImage,
        });
      }).toThrow(new Error('No images found'));

      return done();
    });

    it('should return an error if sideImage is not passed', (done) => {
      expect(() => { widget.createPerson({
          height: 170,
          gender: 'male',
          frontImage,
        });
      }).toThrow(new Error('No images found'));

      return done();
    });

  });

  describe('saveFrontImage', () => {

    it('should save passed variable to Widget class instance in data.frontImage field', (done) => {
      const w = new Widget({
        host,
        key,
      });

      w.saveFrontImage('test');

      expect(w.data.frontImage).toEqual('test');

      return done();
    });

  });

  describe('saveSideImage', () => {

    it('should save passed variable to Widget class instance in data.sideImage field', (done) => {
      const w = new Widget({
        host,
        key,
      });

      w.saveSideImage('test');

      expect(w.data.sideImage).toEqual('test');

      return done();
    });

  });

  describe('setProductUrl', () => {

    it('should save passed variable to Widget class instance in data.productUrl field', (done) => {
      const w = new Widget({
        host,
        key,
      });

      w.setProductUrl('test');

      expect(w.data.productUrl).toEqual('test');

      return done();
    });

  });

  describe('updateStatus', () => {

    it('should throw an error if showStatus isn\'t set and statusEl is set', (done) => {
      const w = new Widget({
        host,
        key,
        statusEl: true,
      });

      expect(() => w.updateStatus('Test status')).toThrow(new Error('we cannot display status. Please set status and statusEl params'));

      return done();
    });

    it('should throw an error if showStatus is set and statusEl isn\'t set', (done) => {
      const w = new Widget({
        host,
        key,
        showStatus: true,
      });

      expect(() => w.updateStatus('Test status')).toThrow(new Error('we cannot display status. Please set status and statusEl params'));

      return done();
    });

    it('should do nothing if both showStatus and statusEl aren\'t set', (done) => {
      const w = new Widget({
        host,
        key,
      });

      expect(w.updateStatus('Test status')).toBeUndefined();

      return done();
    });

    it('should update statusEl innerHTML prop', (done) => {
      const fakeEl = {
        innerHTML: null,
      };

      const w = new Widget({
        host,
        key,
        showStatus: true,
        statusEl: fakeEl,
      });

      w.updateStatus('Test status');

      expect(fakeEl.innerHTML).toEqual('Test status');

      return done();
    });

  });

  describe('outputSizes', () => {

    it('should throw an error if el parameter is undefined', (done) => {
      expect(() => Widget.outputSizes()).toThrow(new Error('el is not set'));

      return done();
    });

    it('should throw an error if person parameter is undefined', (done) => {
      expect(() => Widget.outputSizes(true)).toThrow(new Error('person is not set'));

      return done();
    });

    it('should throw an error if sizes parameter is undefined', (done) => {
      expect(() => Widget.outputSizes(true, true)).toThrow(new Error('sizes is not set'));

      return done();
    });

    it('should change elements innerHTML prop and display in it size', (done) => {
      const fakeSize = { size: 'M' };
      const fakeEl = { innerHTML: null };

      Widget.outputSizes(fakeEl, true, fakeSize);

      expect(fakeEl.innerHTML).toEqual(`Your size is: ${fakeSize.size}`);

      return done();
    });

  });

  describe('outputParams', () => {

    it('should throw an error if el parameter is undefined', (done) => {
      expect(() => Widget.outputParams()).toThrow(new Error('el is not set'));

      return done();
    });

    it('should throw an error if person parameter is undefined', (done) => {
      expect(() => Widget.outputParams(true)).toThrow(new Error('person is not set'));

      return done();
    });

    it('should change elements innerHTML prop and display in it size', (done) => {
      const fakePerson = {
        front_params: {
          chest: 1,
          waist: 2,
          hips: 3,
        },
        side_params: {
          chest: 4,
          waist: 5,
          hips: 6,
        },
        volume_params: {
          chest: 7,
          waist: 8,
          hips: 9,
        },
      };
      const fakeEl = { innerHTML: null };

      Widget.outputParams(fakeEl, fakePerson);

      expect(fakeEl.innerHTML).toContain('Chest: 1 cm');
      expect(fakeEl.innerHTML).toContain('Waist: 2 cm');
      expect(fakeEl.innerHTML).toContain('Hips: 3 cm');

      expect(fakeEl.innerHTML).toContain('Chest: 4 cm');
      expect(fakeEl.innerHTML).toContain('Waist: 5 cm');
      expect(fakeEl.innerHTML).toContain('Hips: 6 cm');

      expect(fakeEl.innerHTML).toContain('Chest: 7 cm');
      expect(fakeEl.innerHTML).toContain('Waist: 8 cm');
      expect(fakeEl.innerHTML).toContain('Hips: 9 cm');

      return done();
    });

  });

  describe('getResults', () => {

    it('should call api.queue.getResults', (done) => {
      const w = new Widget({
        host,
        key,
      });

      spyOn(w.api.queue, 'getResults');

      w.getResults();

      expect(w.api.queue.getResults).toHaveBeenCalled();

      return done();
    });

  });

  describe('recalculate', () => {

    it('should call api.person.calculate', (done) => {
      const w = new Widget({
        host,
        key,
      });

      spyOn(w.api.person, 'calculate');

      w.recalculate();

      expect(w.api.person.calculate).toHaveBeenCalled();

      return done();
    });

  });

  describe('getSnapshot', () => {

    it('should call camera.getImage', (done) => {
      const w = new Widget({
        host,
        key,
        camera: {
          enabled: true,
        },
      });

      w.camera.getImage = () => {};

      spyOn(w.camera, 'getImage');

      w.getSnapshot();

      expect(w.camera.getImage).toHaveBeenCalled();

      return done();
    });

  });

});
