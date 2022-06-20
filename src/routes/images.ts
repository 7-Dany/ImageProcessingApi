import express, { Request, Response } from 'express'
import fs from 'fs'
import { checkImage, checkThumbnailsFolder, resizeImage } from './utilities'

const images = express.Router()

images.get('/images', async (req: Request, res: Response) => {
  // Getting all the file names from full folder
  const fullFiles = fs.readdirSync('assets/full')
  const filename = <string>req.query.filename
  // Checking if Full folder has this filename or not
  if (!fullFiles.includes(`${filename}.jpg`)) {
    // If the file is not in Full folder it will throw error with status of 500
    res.status(500).send('This image is not exist')
    return
  }
  const width = parseInt(<string>req.query.width)
  const height = parseInt(<string>req.query.height)
  if (isNaN(width) || isNaN(height)) {
    // If width and height are not number it will send 500 status respond with error message
    res.status(500).send('Please Provide Valid Width and Height')
    return
  }
  // Checking if thumbnails folder exist or not if not it will create one
  await checkThumbnailsFolder()
  // Checking if the image has been resized with same width and height or not if not it will resize it
  const fileExist = checkImage(filename, width, height)
  if (!fileExist) {
    await resizeImage(filename, width, height)
  }
  // Reading and the image and view it on the browser after resizing it
  fs.readFile(`assets/thumbnails/${filename}_${width}_${height}.jpg`, (err, data) => {
    if (err) throw err
    res.writeHead(200, { 'Content-Type': 'image/jpg' })
    res.end(data, 'base64')
  })
})

export default images
