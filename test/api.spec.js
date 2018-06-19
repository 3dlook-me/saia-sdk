/* eslint-disable */
import API from '../lib/api';
import getImages from './testImages';

let api;
const host = 'https://saia-test.3dlook.me/api/v2/persons/';
const key = '<YOUR_API_KEY>';
const testImages = getImages();
const frontImage = testImages.frontImage;
const sideImage = testImages.sideImage;


describe('API', function () {

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    api = new API({
      apiHost: host,
      apiKey: key,
    });
  });

  describe('constructor', () => {

    it('should throw an error if api host is not spicified', (done) => {
      expect(() => new API()).toThrow(new Error('You need to specify API host URL'));
  
      return done();
    });
  
    it('should throw an error if api key is not spicified', (done) => {
      expect(() => new API({
        apiHost: host,
      })).toThrow(new Error('You need to specify API key'));
  
      return done();
    });

  });

  describe('updatePersonsData', () => {

    it('should update person data', (done) => {
      const testData = {
        gender: 'female',
        height: 180,
      };
      api.updatePersonsData(testData.gender, testData.height);
  
      expect(api.data.gender).toBe(testData.gender);
      expect(api.data.height).toBe(testData.height);
  
      return done();
    });

  });

  describe('postMetadate', () => {

    it('should post metadate successful', (done) => {
      return api.postMetadate('male', 170)
      .then((r) => {
        expect(typeof r).toEqual('string');
        return done();
      })
      .catch(err => {
        expect(err).toBe(null);
        return done();
      });
    });

  });

  describe('saveFrontImage', () => {

    it('should save front image to data object', (done) => {
      const api = new API({
        apiHost: 'test',
        apiKey: 'test',
      });

      api.saveFrontImage(frontImage);

      expect(api.data.frontImage).toEqual(frontImage);

      return done();
    });

  });

  describe('sendImages', () => {

    it('should throw an error if images are not spicified', (done) => {
      expect(() => api.sendImages()).toThrow(new Error('No images found'));
  
      return done();
    });

    it('should upload images successful', (done) => {
      return api.sendImages(frontImage, sideImage)
      .then((r) => {
        expect(typeof r).toEqual('string');
        return done();
      })
      .catch(err => {
        expect(err).toBe(null);
        return done();
      });
    });

  });

  describe('sendFrontImage', () => {

    it('should throw an error if image is not spicified', (done) => {
      expect(() => api.sendFrontImage()).toThrow(new Error('No image found'));
  
      return done();
    });

    it('should upload image successful', (done) => {
      return api.sendFrontImage(frontImage)
      .then((r) => {
        expect(typeof r).toEqual('string');
        return done();
      })
      .catch(err => {
        expect(err).toBe(null);
        return done();
      });
    });

  });

  describe('sendSideImage', () => {

    it('should throw an error if image is not spicified', (done) => {
      expect(() => api.sendSideImage()).toThrow(new Error('No image found'));
  
      return done();
    });

    it('should upload image successful', (done) => {
      return api.sendSideImage(frontImage)
      .then((r) => {
        expect(typeof r).toEqual('string');
        return done();
      })
      .catch(err => {
        expect(err).toBe(null);
        return done();
      });
    });

  });

  describe('getResults', () => {

    it('should get results', (done) => {
      return api.getResults()
      .then((r) => {
        expect(typeof r).toEqual('object');
        return done();
      })
      .catch(err => {
        expect(err).toBe(null);
        return done();
      });
    });

  });

});
