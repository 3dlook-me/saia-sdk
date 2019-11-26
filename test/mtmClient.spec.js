/* eslint-disable */
import MTMClient from '../lib/api/mtmclient';
import Queue from '../lib/api/queue';
import axios from 'axios';
import testImages from './testImages';

let mtmclient;
const host = API_HOST;
const key = API_KEY;
const frontImage = testImages.frontImage;
const sideImage = testImages.sideImage;

describe('MTMClient', function () {

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    const axiosInstance = axios.create();

    axiosInstance.defaults.headers = {
      Authorization: `APIKey ${key}`,
    };

    mtmclient = new MTMClient(host, axiosInstance);
  });

  describe('constructor', () => {

    it('should throw an error if api host is not specified', (done) => {
      expect(() => new MTMClient()).toThrow(new Error('host is not specified'));

      return done();
    });

    it('should throw an error if axios instance is not specified', (done) => {
      expect(() => new MTMClient(host)).toThrow(new Error('axios is not specified'));

      return done();
    });

  });

  describe('create', () => {

    it('should throw an error if no parameters passed', (done) => {
      expect(() => mtmclient.create()).toThrow(new Error('No mtm client\'s parameters passed'));

      return done();
    });

    it('should throw an error if unit is not passed', (done) => {
      expect(() => mtmclient.create({ firstName: 'firstName' })).toThrow(new Error('unit is not specified'));

      return done();
    });

    it('should create mtm client', (done) => {
      return mtmclient.create({
        firstName: 'user',
        lastName: 'name',
        phone: '+381234567890',
        email: 'test@test.com',
        notes: 'Additional information about mtm client.',
        unit: 'cm',
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

  });

  describe('createPerson', () => {

    it('should throw an error if no mtm client id passed', (done) => {
      expect(() => mtmclient.createPerson()).toThrow(new Error('No mtm client id passed'));

      return done();
    });

    it('should throw an error if no parameters passed', (done) => {
      expect(() => mtmclient.createPerson(1)).toThrow(new Error('No mtm client\'s parameters passed'));

      return done();
    });

    it('should throw an error if gender is not passed', (done) => {
      expect(() => mtmclient.createPerson(1, {})).toThrow(new Error('gender is not specified'));

      return done();
    });

    it('should throw an error if height is not passed', (done) => {
      expect(() => mtmclient.createPerson(1, { gender: 'female' })).toThrow(new Error('height is not specified'));

      return done();
    });

    it('should create a person for mtm client with metadate', (done) => {
      return mtmclient.create({
        firstName: 'user',
        lastName: 'name',
        phone: '+381234567890',
        email: 'test@test.com',
        notes: 'Additional information about mtm client.',
        unit: 'cm',
      })
      .then((r) => {
        expect(typeof r).toEqual('number');

        return mtmclient.createPerson(r, {
          gender: 'male',
          height: 180,
        })
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

    it('should create a person for mtm client with metadate and images', (done) => {
      return mtmclient.create({
        firstName: 'user',
        lastName: 'name',
        phone: '+381234567890',
        email: 'test@test.com',
        notes: 'Additional information about mtm client.',
        unit: 'cm',
      })
      .then((r) => {
        expect(typeof r).toEqual('number');

        return mtmclient.createPerson(r, {
          gender: 'male',
          height: 180,
          frontImage,
          sideImage,
        })
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

});
