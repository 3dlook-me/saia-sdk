/* eslint-disable */
import Sizechart from '../lib/api/sizechart';
import axios from 'axios';

let sizechart;
const host = API_HOST;
const key = API_KEY;

describe('Sizechart', function () {

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    const axiosInstance = axios.create();

    axiosInstance.defaults.headers = {
      Authorization: `APIKey ${key}`,
    };

    sizechart = new Sizechart(host, axiosInstance);
  });

  describe('constructor', () => {

    it('should throw an error if api host is not specified', (done) => {
      expect(() => new Sizechart()).toThrow(new Error('host is not specified'));

      return done();
    });

    it('should throw an error if axios instance is not specified', (done) => {
      expect(() => new Sizechart(host)).toThrow(new Error('axios is not specified'));

      return done();
    });

  });

  describe('getSize', () => {

    it('should throw an error if no parameters passed', (done) => {
      expect(() => sizechart.getSize()).toThrow(new Error('params is not specified'));

      return done();
    });

    it('should throw an error if gender is not passed', (done) => {
      expect(() => sizechart.getSize({
        hips: 89,
        chest: 87,
        waist: 73,
        body_part: 'top',
        brand: '123123123',
      })).toThrow(new Error('gender is not specified'));

      return done();
    });

    it('should throw an error if hips is not passed', (done) => {
      expect(() => sizechart.getSize({
        gender: 'male',
        chest: 87,
        waist: 73,
        body_part: 'top',
        brand: '123123123',
      })).toThrow(new Error('hips is not specified'));

      return done();
    });

    it('should throw an error if chest is not passed', (done) => {
      expect(() => sizechart.getSize({
        gender: 'male',
        hips: 89,
        waist: 73,
        body_part: 'top',
        brand: '123123123',
      })).toThrow(new Error('chest is not specified'));

      return done();
    });

    it('should throw an error if waist is not passed', (done) => {
      expect(() => sizechart.getSize({
        gender: 'male',
        hips: 89,
        chest: 87,
        body_part: 'top',
        brand: '123123123',
      })).toThrow(new Error('waist is not specified'));

      return done();
    });

    it('should throw an error if body_part is not passed', (done) => {
      expect(() => sizechart.getSize({
        gender: 'male',
        hips: 89,
        chest: 87,
        waist: 73,
        brand: '123123123',
      })).toThrow(new Error('body_part is not specified'));

      return done();
    });

    it('should throw an error if brand is not passed', (done) => {
      expect(() => sizechart.getSize({
        gender: 'male',
        hips: 89,
        chest: 87,
        waist: 73,
        body_part: 'top',
      })).toThrow(new Error('brand is not specified'));

      return done();
    });

    it('should return null if cannot find size for person', (done) => {
      return sizechart.getSize({
        gender: 'male',
        hips: 103.58209330663,
        chest: 111.323216351622,
        waist: 86.9746376850148,
        body_part: 'top',
        brand: '123123123',
      })
      .then((r) => {
        expect(r).toBeNull();
        return done();
      })
      .catch(err => {
        expect(err).toBe(null);
        return done();
      });
    });

    it('should throw an error if brand or body part doesn\'t exist', (done) => {
      return sizechart.getSize({
        gender: 'male',
        hips: 89,
        chest: 87,
        waist: 73,
        body_part: 'top',
        brand: 'brand123',
      })
      .catch(err => {
        expect(err).toBeTruthy();
        return done();
      });
    });

    it('should get size based on person\'s parameters', (done) => {
      return sizechart.getSize({
        gender: 'male',
        hips: 89,
        chest: 87,
        waist: 73,
        body_part: 'top',
        brand: '123123123',
      })
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
