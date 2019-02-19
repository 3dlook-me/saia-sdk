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

});
