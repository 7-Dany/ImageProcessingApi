import { checkImage, checkThumbnailsFolder, resizeImage } from '../../routes/utilities'

describe('Testing utilities functions', () => {
  describe('Testing checkThumbnailsFolder Function', () => {
    it('should make thumbnails folder if not exist with promise resolved', async () => {
      await expectAsync(checkThumbnailsFolder()).toBeResolved()
    })
  })
  describe('Testing resizeImage Function', () => {
    it('should resize the image if exist with promise resolved', async () => {
      await expectAsync(resizeImage('fjord', 200, 200)).toBeResolved()
    })
    it('should throw error if the image not exist with promise rejected', async () => {
      await expectAsync(resizeImage('hello', 200, 200)).toBeRejected()
    })
  })
  describe('Testing checkImage Function', () => {
    it('should return false for hello_200_200.jpg after checking its existing in thumbnails', () => {
      expect(checkImage('hello', 200, 200)).toBeFalse()
    })
    it('should return true for fjord_200_200.jpg after checking its existing in thumbnails', () => {
      expect(checkImage('fjord', 200, 200)).toBeTrue()
    })
  })
})
