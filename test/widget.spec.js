/* eslint-disable */
import Widget from '../lib/widget';
import testImages from './testImages';

let widget;
const host = API_HOST;
const key = API_KEY;
const frontImage = testImages.frontImage;
const sideImage = testImages.sideImage;


describe('Widget', function () {

  beforeAll(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    widget = new Widget({
      host,
      key,
    });
  });

  describe('constructor', () => {

    it('should throw an error if api host is not spicified', (done) => {
      expect(() => new Widget()).toThrow(new Error('You need to specify API host URL'));

      return done();
    });

    it('should throw an error if api key is not spicified', (done) => {
      expect(() => new Widget({
        host,
      })).toThrow(new Error('You need to specify API key'));

      return done();
    });

  });

  describe('updatePersonsData', () => {

    it('should update person data', (done) => {
      const testData = {
        gender: 'male',
        height: 180,
      };
      widget.updatePersonsData(testData.gender, testData.height);

      expect(widget.data.gender).toBe(testData.gender);
      expect(widget.data.height).toBe(testData.height);

      return done();
    });

  });

  // describe('getResults', () => {

  //   it('should get results', (done) => {
  //     return widget.createPerson({
  //       height: 170,
  //       gender: 'male',
  //       frontImage,
  //       sideImage,
  //     })
  //     .then((id) => {
  //       expect(typeof id).toEqual('string');
  //       return widget.getResults(id);
  //     })
  //     .then((r) => {
  //       expect(typeof r).toEqual('object');
  //       return done();
  //     })
  //     .catch(err => {
  //       expect(err).toBe(null);
  //       return done();
  //     });
  //   });

  // });

  // describe('createPerson', () => {

  //   it('should return an error if height is not passed', (done) => {
  //     widget.data = {};

  //     expect(() => { widget.createPerson({
  //         gender: 'male',
  //         frontImage,
  //         sideImage,
  //       });
  //     }).toThrow(new Error('No height is specified'));

  //     return done();
  //   });

  //   it('should return an error if gender is not passed', (done) => {
  //     expect(() => { widget.createPerson({
  //         height: 170,
  //         frontImage,
  //         sideImage,
  //       });
  //     }).toThrow(new Error('No gender is specified'));

  //     return done();
  //   });

  //   it('should return an error if frontImage is not passed', (done) => {
  //     expect(() => { widget.createPerson({
  //         height: 170,
  //         gender: 'male',
  //         sideImage,
  //       });
  //     }).toThrow(new Error('No images found'));

  //     return done();
  //   });

  //   it('should return an error if sideImage is not passed', (done) => {
  //     expect(() => { widget.createPerson({
  //         height: 170,
  //         gender: 'male',
  //         frontImage,
  //       });
  //     }).toThrow(new Error('No images found'));

  //     return done();
  //   });

  //   it('should return task set url of created person', (done) => {
  //     return widget.createPerson({
  //       height: 170,
  //       gender: 'male',
  //       frontImage,
  //       sideImage,
  //     })
  //     .then((r) => {
  //       expect(typeof r).toBe('string');
  //       return done();
  //     })
  //     .catch(err => {
  //       expect(err).toBe(null);
  //       return done();
  //     });
  //   });

  // });

});
