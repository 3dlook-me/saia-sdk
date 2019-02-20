/* eslint-disable */
import Product from '../lib/api/product';
import axios from 'axios';

let product;
const host = API_HOST;
const key = API_KEY;

describe('Product', function () {

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    const axiosInstance = axios.create();

    axiosInstance.defaults.headers = {
      Authorization: `APIKey ${key}`,
    };

    product = new Product(host, axiosInstance);
  });

  describe('constructor', () => {

    it('should throw an error if api host is not specified', (done) => {
      expect(() => new Product()).toThrow(new Error('host is not specified'));

      return done();
    });

    it('should throw an error if axios instance is not specified', (done) => {
      expect(() => new Product(host)).toThrow(new Error('axios is not specified'));

      return done();
    });

  });

  describe('getSize', () => {

    it('should throw an error if no parameters passed', (done) => {
      expect(() => product.getSize()).toThrow(new Error('params is not specified'));

      return done();
    });

    it('should throw an error if height is not passed', (done) => {
      expect(() => product.getSize({
        gender: 'female',
        hips: 89,
        chest: 87,
        waist: 73,
        url: 'https://saia.3dlook.me/test-product',
      })).toThrow(new Error('height is not specified'));

      return done();
    });

    it('should throw an error if gender is not passed', (done) => {
      expect(() => product.getSize({
        height: 173,
        hips: 89,
        chest: 87,
        waist: 73,
        url: 'https://saia.3dlook.me/test-product',
      })).toThrow(new Error('gender is not specified'));

      return done();
    });

    it('should throw an error if hips is not passed', (done) => {
      expect(() => product.getSize({
        height: 173,
        gender: 'female',
        chest: 87,
        waist: 73,
        url: 'https://saia.3dlook.me/test-product',
      })).toThrow(new Error('hips is not specified'));

      return done();
    });

    it('should throw an error if chest is not passed', (done) => {
      expect(() => product.getSize({
        height: 173,
        gender: 'female',
        hips: 89,
        waist: 73,
        url: 'https://saia.3dlook.me/test-product',
      })).toThrow(new Error('chest is not specified'));

      return done();
    });

    it('should throw an error if waist is not passed', (done) => {
      expect(() => product.getSize({
        height: 173,
        gender: 'female',
        hips: 89,
        chest: 87,
        url: 'https://saia.3dlook.me/test-product',
      })).toThrow(new Error('waist is not specified'));

      return done();
    });

    it('should throw an error if url is not passed', (done) => {
      expect(() => product.getSize({
        height: 173,
        gender: 'female',
        hips: 89,
        chest: 87,
        waist: 73,
      })).toThrow(new Error('url is not specified'));

      return done();
    });

    it('should get size based on person\'s parameters', (done) => {
      return product.getSize({
        height: 173,
        gender: 'female',
        hips: 89,
        chest: 87,
        waist: 73,
        url: 'https://saia.3dlook.me/test-product',
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

  describe('getRecommendations', () => {

    it('should throw an error if no parameters passed', (done) => {
      expect(() => product.getRecommendations()).toThrow(new Error('params is not specified'));

      return done();
    });

    it('should throw an error if gender is not passed', (done) => {
      expect(() => product.getRecommendations({
        hips: 89,
        chest: 87,
        waist: 73,
        url: 'https://saia.3dlook.me/test-product',
      })).toThrow(new Error('gender is not specified'));

      return done();
    });

    it('should throw an error if hips is not passed', (done) => {
      expect(() => product.getRecommendations({
        gender: 'female',
        chest: 87,
        waist: 73,
        url: 'https://saia.3dlook.me/test-product',
      })).toThrow(new Error('hips is not specified'));

      return done();
    });

    it('should throw an error if chest is not passed', (done) => {
      expect(() => product.getRecommendations({
        gender: 'female',
        hips: 89,
        waist: 73,
        url: 'https://saia.3dlook.me/test-product',
      })).toThrow(new Error('chest is not specified'));

      return done();
    });

    it('should throw an error if waist is not passed', (done) => {
      expect(() => product.getRecommendations({
        gender: 'female',
        hips: 89,
        chest: 87,
        url: 'https://saia.3dlook.me/test-product',
      })).toThrow(new Error('waist is not specified'));

      return done();
    });

    it('should throw an error if url is not passed', (done) => {
      expect(() => product.getRecommendations({
        gender: 'female',
        hips: 89,
        chest: 87,
        waist: 73,
      })).toThrow(new Error('url is not specified'));

      return done();
    });

    it('should get size based on person\'s parameters', (done) => {
      return product.getRecommendations({
        gender: 'female',
        hips: 89,
        chest: 87,
        waist: 73,
        url: 'https://saia.3dlook.me/test-product',
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

  describe('get', () => {

    it('should throw an error if url is not passed', (done) => {
      expect(() => product.get(null)).toThrow(new Error('url is not specified'));

      return done();
    });

    it('should get product by its url', (done) => {
      return product.get('https://saia.3dlook.me/test-product')
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
