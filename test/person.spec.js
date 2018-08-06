/* eslint-disable */
import Person from '../lib/api/person';
import Queue from '../lib/api/queue';
import axios from 'axios';
import testImages from './testImages';

let person;
const host = API_HOST;
const key = API_KEY;
const frontImage = testImages.frontImage;
const sideImage = testImages.sideImage;

describe('Person', function () {

  beforeAll(() => {
    const axiosInstance = axios.create();

    axiosInstance.defaults.headers = {
      Authorization: `APIKey ${key}`,
    };

    person = new Person(host, axiosInstance);
  });

  describe('constructor', () => {

    it('should throw an error if api host is not specified', (done) => {
      expect(() => new Person()).toThrow(new Error('host is not specified'));

      return done();
    });

    it('should throw an error if axios instance is not specified', (done) => {
      expect(() => new Person(host)).toThrow(new Error('axios is not specified'));

      return done();
    });

  });

  describe('create', () => {

    it('should throw an error if no parameters passed', (done) => {
      expect(() => person.create()).toThrow(new Error('No person\'s parameters passed'));

      return done();
    });

    it('should throw an error if gender is not passed', (done) => {
      expect(() => person.create({ height: 170 })).toThrow(new Error('gender is not specified'));

      return done();
    });

    it('should throw an error if height is not passed', (done) => {
      expect(() => person.create({ gender: 'male' })).toThrow(new Error('height is not specified'));

      return done();
    });

    it('should post metadata successful and return Person\'s id', (done) => {
      return person.create({
        gender: 'female',
        height: 170,
      })
      .then((r) => {
        expect(typeof r).toEqual('number');
        return done();
      })
      .catch(err => {
        expect(err).toBe(null);
        return done();
      });
    });

    it('should post metadata with photos successful and return Taskset id', (done) => {
      return person.create({
        gender: 'female',
        height: 170,
        frontImage,
        sideImage,
      })
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

  describe('get', () => {

    it('should throw an error if id is not passed', (done) => {
      expect(() => person.get()).toThrow(new Error('id is not specified'));

      return done();
    });

    it('should return person data by id', (done) => {
      return person.create({
        gender: 'female',
        height: 170,
      })
      .then((id) => {
        expect(typeof id).toEqual('number');

        return person.get(id);
      })
      .then((data) => {
        expect(typeof data).toEqual('object');

        return done();
      })
      .catch(err => {
        expect(err).toBe(null);
        return done();
      });
    });

  });

  describe('update', () => {

    it('should throw an error if id is not passed', (done) => {
      expect(() => person.update()).toThrow(new Error('id is not specified'));

      return done();
    });

    it('should throw an error if params is not passed', (done) => {
      expect(() => person.update(12)).toThrow(new Error('params is not specified'));

      return done();
    });

    it('should throw an error if params is empty', (done) => {
      expect(() => person.update(12, {})).toThrow(new Error('params is empty'));

      return done();
    });

    it('should update person\'s data by id', (done) => {

      return person.create({
        height: 170,
        gender: 'female',
      })
      .then((id) => {
        return person.update(id, {
          gender: 'male',
          height: 190,
        });
      })
      .then((p) => {
        expect(typeof p).toEqual('object');

        return person.get(p.id);
      })
      .then((data) => {
        expect(typeof data).toEqual('object');
        expect(data.height).toEqual(190);
        expect(data.gender).toEqual('male');

        return done();
      })
      .catch(err => {
        expect(err).toBe(null);
        return done();
      });
    });

  });

  describe('calculate', () => {

    it('should throw an error if id is not passed', (done) => {
      expect(() => person.update()).toThrow(new Error('id is not specified'));

      return done();
    });

    it('should start calculation of a person by id and return taskset id', (done) => {

      return person.create({
        height: 170,
        gender: 'female',
      })
      .then((id) => {
        return person.update(id, {
          frontImage,
          sideImage,
        });
      })
      .then((p) => {
        expect(typeof p).toEqual('object');
        return person.calculate(p.id);
      })
      .then((id) => {
        expect(typeof id).toEqual('string');

        return done();
      })
      .catch(err => {
        expect(err).toBe(null);
        return done();
      });
    });

  });

});
