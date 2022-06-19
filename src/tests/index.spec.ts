import supertest from 'supertest'
import app from '../index'
import { checkImage } from '../routes/images'

// create a request object
const request = supertest(app)

describe('Test endpoint response', async () => {
  it('test images endpoint its status should be 200', async () => {
    const response = await request
      .get('/images')
      .query({ filename: 'fjord', width: 200, height: 200 })
    expect(response.status).toBe(200)
  })
})

describe('Testing imageChecking function to check if image exist in thumbnails', () => {
  it('should return false for hello_200_200.jpg', () => {
    expect(checkImage('hello', 200, 200)).toBeFalse()
  })
  it('should return true for fjord_200_200.jpg', () => {
    expect(checkImage('fjord', 200, 200)).toBeTrue()
  })
})
