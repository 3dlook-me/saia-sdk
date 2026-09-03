/* eslint-disable */
import Person from '../lib/api/person';
import axios from 'axios';

let person;
const host = API_HOST;
const key = API_KEY;

describe('Person', function () {

  beforeAll(() => {
    const axiosInstance = axios.create();

    axiosInstance.defaults.headers = {
      Authorization: `APIKey ${key}`,
    };

    person = new Person(host, axiosInstance);
  });

  describe('constructor', () => {

    it('should throw an error if api host is not specified', () => {
      expect(() => new Person()).toThrow(new Error('host is not specified'));
    });

    it('should throw an error if axios instance is not specified', () => {
      expect(() => new Person(host)).toThrow(new Error('axios is not specified'));
    });

  });

  describe('create', () => {

    it('should throw an error if no parameters passed', () => {
      expect(() => person.create()).toThrow(new Error('No person\'s parameters passed'));
    });

    it('should throw an error if gender is not passed', () => {
      expect(() => person.create({ height: 170 })).toThrow(new Error('gender is not specified'));
    });

    it('should throw an error if height is not passed', () => {
      expect(() => person.create({ gender: 'male' })).toThrow(new Error('height is not specified'));
    });

  });

  describe('get', () => {

    it('should throw an error if id is not passed', () => {
      expect(() => person.get()).toThrow(new Error('id is not specified'));
    });

  });

  describe('update', () => {

    it('should throw an error if id is not passed', () => {
      expect(() => person.update()).toThrow(new Error('id is not specified'));
    });

    it('should throw an error if params is not passed', () => {
      expect(() => person.update(12)).toThrow(new Error('params is not specified'));
    });

    it('should throw an error if params is empty', () => {
      expect(() => person.update(12, {})).toThrow(new Error('params is empty'));
    });

  });

  describe('updateAndCalculate', () => {

    it('should throw an error if id is not passed', () => {
      expect(() => person.updateAndCalculate()).toThrow(new Error('id is not specified'));
    });

    it('should throw an error if params is not passed', () => {
      expect(() => person.updateAndCalculate(12)).toThrow(new Error('params is not specified'));
    });

    it('should throw an error if params is empty', () => {
      expect(() => person.updateAndCalculate(12, {})).toThrow(new Error('params is empty'));
    });

  });

  describe('calculate', () => {

    it('should throw an error if id is not passed', () => {
      expect(() => person.calculate()).toThrow(new Error('id is not specified'));
    });

  });

});
