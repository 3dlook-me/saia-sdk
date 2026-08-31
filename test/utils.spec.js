/* eslint-disable */
import utils from '../lib/utils';

describe('Utils', () => {

  describe('getFileName', () => {

    it('should detect image/png type and return filename with .png extention', () => {
      const fakeBlob = { type: 'image/png' };

      expect(utils.getFileName(fakeBlob)).toEqual('filename.png');
    });

    it('should detect image/jpeg type and return filename with .jpg extention', () => {
      const fakeBlob = { type: 'image/jpeg' };

      expect(utils.getFileName(fakeBlob)).toEqual('filename.jpg');
    });

    it('should detect image/gif type and return filename with .gif extention', () => {
      const fakeBlob = { type: 'image/gif' };

      expect(utils.getFileName(fakeBlob)).toEqual('filename.gif');
    });

    it('should throw an error if passed unsupported file type', () => {
      const fakeBlob = { type: 'image/pdf' };

      expect(() => utils.getFileName(fakeBlob)).toThrow(new Error('Unsupported file format'));
    });

  });

  describe('getBase64', () => {

    it('should encode string to base64', () => {
      const blob = new Blob(['3dlook is awesome'], { type: 'text/png;charset=utf-8' });
      utils.getBase64(blob)
        .then(r => expect(r).toEqual('data:text/png;charset=utf-8;base64,M2Rsb29rIGlzIGF3ZXNvbWU='))
        .catch(err => expect(err).toBeFalsy());
    });

    it('should throw an error if passed is not Blob', (done) => {
      utils.getBase64('is not a blob')
        .then(r => {
          expect(r).toBeFalsy();
          return done();
        })
        .catch(err => {
          expect(err).toBeTruthy();
          return done();
        });
    });

  });

  describe('isBlob', () => {

    it('should return true for a Blob instance', () => {
      const blob = new Blob(['test'], { type: 'image/png' });

      expect(utils.isBlob(blob)).toBe(true);
    });

    it('should return true for a File instance', () => {
      const file = new File(['test'], 'front.png', { type: 'image/png' });

      expect(utils.isBlob(file)).toBe(true);
    });

    it('should return false for a base64 string', () => {
      expect(utils.isBlob('data:image/png;base64,AAAA')).toBe(false);
    });

    it('should return false for null/undefined', () => {
      expect(utils.isBlob(null)).toBe(false);
      expect(utils.isBlob(undefined)).toBe(false);
    });

  });

  describe('toFormData', () => {

    it('should append a Blob using getFileName as a fallback filename', () => {
      const blob = new Blob(['test'], { type: 'image/png' });
      const form = utils.toFormData({ front_image: blob });
      const value = form.get('front_image');

      expect(value instanceof Blob).toBe(true);
      expect(value.name).toEqual('filename.png');
    });

    it('should append a File using its own name', () => {
      const file = new File(['test'], 'front.png', { type: 'image/png' });
      const form = utils.toFormData({ front_image: file });

      expect(form.get('front_image').name).toEqual('front.png');
    });

    it('should JSON.stringify plain object values', () => {
      const phonePosition = { frontPhoto: { betaX: 1 } };
      const form = utils.toFormData({ phone_position: phonePosition });

      expect(form.get('phone_position')).toEqual(JSON.stringify(phonePosition));
    });

    it('should stringify primitive values', () => {
      const form = utils.toFormData({ height: 180 });

      expect(form.get('height')).toEqual('180');
    });

    it('should skip null and undefined values', () => {
      const form = utils.toFormData({ weight: undefined, notes: null, height: 180 });

      expect(form.has('weight')).toBe(false);
      expect(form.has('notes')).toBe(false);
      expect(form.has('height')).toBe(true);
    });

  });

  describe('buildRequestData', () => {

    it('should return the fields object unchanged when there is no Blob/File', () => {
      const fields = { height: 180, gender: 'male', front_image: 'data:image/png;base64,AAAA' };

      expect(utils.buildRequestData(fields)).toBe(fields);
    });

    it('should return a FormData instance when a field is a Blob/File', () => {
      const fields = {
        height: 180,
        front_image: new Blob(['test'], { type: 'image/png' }),
        side_image: 'data:image/png;base64,AAAA',
      };

      const result = utils.buildRequestData(fields);

      expect(result instanceof FormData).toBe(true);
      expect(result.get('side_image')).toEqual('data:image/png;base64,AAAA');
    });

  });

});
