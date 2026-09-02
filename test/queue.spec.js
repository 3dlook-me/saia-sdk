/* eslint-disable */
import Queue from '../lib/api/queue';
import axios from 'axios';

let queue;
const host = API_HOST;
const key = API_KEY;

describe('Queue', function () {

  beforeAll(() => {
    const axiosInstance = axios.create();

    axiosInstance.defaults.headers = {
      Authorization: `APIKey ${key}`,
    };

    queue = new Queue(host, axiosInstance);
  });

  describe('constructor', () => {

    it('should throw an error if api host is not specified', () => {
      expect(() => new Queue()).toThrow(new Error('host is not specified'));
    });

    it('should throw an error if axios instance is not specified', () => {
      expect(() => new Queue(host)).toThrow(new Error('axios is not specified'));
    });

  });

  describe('get', () => {

    it('should throw an error if id is not specified', () => {
      expect(() => queue.get()).toThrow(new Error('id is not specified'));
    });

  });

  describe('getResults', () => {

    it('should throw an error if id is not specified', () => {
      expect(() => queue.getResults()).toThrow(new Error('id is not specified'));
    });

  });

});
