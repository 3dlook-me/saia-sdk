/* eslint-disable */
import API from '../lib/api';
import Person from '../lib/api/person';
import Queue from '../lib/api/queue';
import testImages from './testImages';

let api;
const host = API_HOST;
const key = API_KEY;

describe('API', function () {

  beforeAll(() => {
    api = new API({
      host,
      key,
    });
  });

  describe('constructor', () => {

    it('should throw an error if api host is not specified', (done) => {
      expect(() => new API()).toThrow(new Error('You need to specify API host URL'));

      return done();
    });

    it('should throw an error if api key is not specified', (done) => {
      expect(() => new API({
        host,
      })).toThrow(new Error('You need to specify API key'));

      return done();
    });

    it('should has .person object - instance of Person class', (done) => {
      expect(api.person).toEqual(jasmine.any(Person));

      return done();
    });

    it('should has .queue object - instance of Queue class', (done) => {
      expect(api.queue).toEqual(jasmine.any(Queue));

      return done();
    });

  });

});
