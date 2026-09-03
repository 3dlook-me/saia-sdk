/* eslint-disable */
import Sizechart from '../lib/api/sizechart';
import axios from 'axios';

let sizechart;
const host = API_HOST;
const key = API_KEY;

describe('Sizechart', function () {

  beforeAll(() => {
    const axiosInstance = axios.create();

    axiosInstance.defaults.headers = {
      Authorization: `APIKey ${key}`,
    };

    sizechart = new Sizechart(host, axiosInstance);
  });

  describe('constructor', () => {

    it('should throw an error if api host is not specified', () => {
      expect(() => new Sizechart()).toThrow(new Error('host is not specified'));
    });

    it('should throw an error if axios instance is not specified', () => {
      expect(() => new Sizechart(host)).toThrow(new Error('axios is not specified'));
    });

  });

  describe('getSize', () => {

    it('should throw an error if no parameters passed', () => {
      expect(() => sizechart.getSize()).toThrow(new Error('params is not specified'));
    });

    it('should throw an error if gender is not passed', () => {
      expect(() => sizechart.getSize({
        hips: 89,
        chest: 87,
        waist: 73,
        body_part: 'top',
        brand: '123123123',
      })).toThrow(new Error('gender is not specified'));
    });

    it('should throw an error if hips is not passed', () => {
      expect(() => sizechart.getSize({
        gender: 'male',
        chest: 87,
        waist: 73,
        body_part: 'top',
        brand: '123123123',
      })).toThrow(new Error('hips is not specified'));
    });

    it('should throw an error if chest is not passed', () => {
      expect(() => sizechart.getSize({
        gender: 'male',
        hips: 89,
        waist: 73,
        body_part: 'top',
        brand: '123123123',
      })).toThrow(new Error('chest is not specified'));
    });

    it('should throw an error if waist is not passed', () => {
      expect(() => sizechart.getSize({
        gender: 'male',
        hips: 89,
        chest: 87,
        body_part: 'top',
        brand: '123123123',
      })).toThrow(new Error('waist is not specified'));
    });

    it('should throw an error if body_part is not passed', () => {
      expect(() => sizechart.getSize({
        gender: 'male',
        hips: 89,
        chest: 87,
        waist: 73,
        brand: '123123123',
      })).toThrow(new Error('body_part is not specified'));
    });

    it('should throw an error if brand is not passed', () => {
      expect(() => sizechart.getSize({
        gender: 'male',
        hips: 89,
        chest: 87,
        waist: 73,
        body_part: 'top',
      })).toThrow(new Error('brand is not specified'));
    });

  });

});
