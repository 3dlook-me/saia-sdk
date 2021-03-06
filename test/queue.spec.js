/* eslint-disable */
import Person from '../lib/api/person';
import Queue from '../lib/api/queue';
import axios from 'axios';
import testImages from './testImages';

let person;
let queue;
const host = API_HOST;
const key = API_KEY;
const frontImage = testImages.frontImage;
const sideImage = testImages.sideImage;

describe('Queue', function () {

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 160000;

    const axiosInstance = axios.create();

    axiosInstance.defaults.headers = {
      Authorization: `APIKey ${key}`,
    };

    person = new Person(host, axiosInstance);
    queue = new Queue(host, axiosInstance);
  });

  describe('constructor', () => {

    it('should throw an error if api host is not specified', (done) => {
      expect(() => new Queue()).toThrow(new Error('host is not specified'));

      return done();
    });

    it('should throw an error if axios instance is not specified', (done) => {
      expect(() => new Queue(host)).toThrow(new Error('axios is not specified'));

      return done();
    });

  });

  describe('get', () => {

    it('should throw an error if id is not specified', (done) => {
      expect(() => queue.get()).toThrow(new Error('id is not specified'));

      return done();
    });

    it('should get tasks by id', (done) => {
      return person.create({
        gender: 'male',
        height: 170,
        frontImage,
        sideImage,
      })
      .then((r) => {
        expect(typeof r).toEqual('string');
        return r;
      })
      .then((id) => {
        return queue.get(id);
      })
      .then((tasksData) => {
        expect(typeof tasksData).toEqual('object');
        expect(typeof tasksData.sub_tasks).toEqual('object');
        return done();
      })
      .catch(err => {
        expect(err).toBe(null);
        return done();
      });
    });

  });

  describe('checkStatus', () => {
    it('should throw an error if task set id is incorrect', (done) => {
      return queue.checkStatus('faketasksetid', 500)
      .catch((err) => {
        expect(err).toBeTruthy();
        return done();
      });
    });
  });

  describe('getResults', () => {

    it('should throw an error if id is not specified', (done) => {
      expect(() => queue.getResults()).toThrow(new Error('id is not specified'));

      return done();
    });

    it('should throw an error if side image was sent as front image or front image as side image', (done) => {
      return person.create({
        gender: 'male',
        height: 170,
        frontImage: sideImage,
        sideImage: frontImage,
      })
      .then((taskSetId) => {
        expect(typeof taskSetId).toEqual('string');
        return queue.getResults(taskSetId);
      })
      .catch(err => {
        expect(err).toBeTruthy();
        return done();
      });
    });

    it('should get person object when tasks finish', (done) => {
      return person.create({
        gender: 'male',
        height: 170,
        frontImage,
        sideImage,
      })
      .then((taskSetId) => {
        expect(typeof taskSetId).toEqual('string');
        return queue.getResults(taskSetId);
      })
      .then((person) => {
        expect(typeof person).toEqual('object');
        expect(typeof person.front_params).toEqual('object');
        return done();
      })
      .catch(err => {
        expect(err).toBe(null);
        return done();
      });
    });

  });

});
