import supertest from 'supertest'
import app from '../../index'

// create a request object
const request = supertest(app)

describe('Test endpoint response', async () => {
  it('test images endpoint its status should be 500 because no filename, width and height got provided', async () => {
    const response = await request.get('/images')
    expect(response.status).toBe(500)
  })
  it('should return response status 500 after providing non existing file in full folder', async () => {
    const response = await request
      .get('/images')
      .query({ filename: 'hello', width: 200, height: 200 })
    expect(response.status).toBe(500)
  })
  it('should return response status 500 after providing width and height but not a number values', async () => {
    const response = await request
      .get('/images')
      .query({ filename: 'fjord', width: 'hello', height: 'there' })
    expect(response.status).toBe(500)
  })
  it('should return response status 200 after providing existing filename, width and height are numbers', async () => {
    const response = await request
      .get('/images')
      .query({ filename: 'fjord', width: 200, height: 200 })
    expect(response.status).toBe(200)
  })
})
