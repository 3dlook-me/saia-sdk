/* eslint-disable */
import MTMClient from '../lib/api/mtmclient';
import axios from 'axios';

let mtmclient;
const host = API_HOST;
const key = API_KEY;

describe('MTMClient', function () {

  beforeAll(() => {
    const axiosInstance = axios.create();

    axiosInstance.defaults.headers = {
      Authorization: `APIKey ${key}`,
    };

    mtmclient = new MTMClient(host, axiosInstance);
  });

  describe('constructor', () => {

    it('should throw an error if api host is not specified', () => {
      expect(() => new MTMClient()).toThrow(new Error('host is not specified'));
    });

    it('should throw an error if axios instance is not specified', () => {
      expect(() => new MTMClient(host)).toThrow(new Error('axios is not specified'));
    });

  });

  describe('create', () => {

    it('should throw an error if no parameters passed', () => {
      expect(() => mtmclient.create()).toThrow(new Error('No mtm client\'s parameters passed'));
    });

    it('should throw an error if unit is not passed', () => {
      expect(() => mtmclient.create({ firstName: 'firstName' })).toThrow(new Error('unit is not specified'));
    });

  });

  describe('createPerson', () => {

    it('should throw an error if no mtm client id passed', () => {
      expect(() => mtmclient.createPerson()).toThrow(new Error('No mtm client id passed'));
    });

    it('should throw an error if no parameters passed', () => {
      expect(() => mtmclient.createPerson(1)).toThrow(new Error('No mtm client\'s parameters passed'));
    });

    it('should throw an error if gender is not passed', () => {
      expect(() => mtmclient.createPerson(1, {})).toThrow(new Error('gender is not specified'));
    });

    it('should throw an error if height is not passed', () => {
      expect(() => mtmclient.createPerson(1, { gender: 'female' })).toThrow(new Error('height is not specified'));
    });

  });

});
