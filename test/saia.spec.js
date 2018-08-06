/* eslint-disable */
import SAIA from '../lib/saia';
import API from '../lib/api';

let saia;
const host = 'https://saia-test.3dlook.me/api/v2/';
const key = '<YOUR_API_KEY>';


describe('SAIA', function () {

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    saia = new SAIA({
      host,
      key,
    });
  });


  describe('constructor', () => {

    it('should throw an error if api key is not specified', (done) => {
      expect(() => new SAIA({
        host,
      })).toThrow(new Error('You need to specify API key'));

      return done();
    });

    it('should has .api object - instance of API class', (done) => {
      expect(saia.api).toEqual(jasmine.any(API));

      return done();
    });

  });

});
