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
    api = new API({
      apiHost: host,
      apiKey: key,
    });
  });

  it('should post metadate successful', function () {
    api.postMetadate()
    .then((r) => {
      expect(typeof r).toEqual('string');
    })
    .catch(err => expect(err).toBe(null));
  });

  it('should upload images successful', function () {
    api.sendImages(frontImage, sideImage)
    .then((r) => {
      expect(typeof r).toEqual('string');
    })
    .catch(err => expect(err).toBe(null));
  });
});
