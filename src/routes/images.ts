import express, { Request, Response } from 'express'
import fs from 'fs'
import sharp from 'sharp'

const images = express.Router()

export function checkImage(filename: string, width: number, height: number) {
  let checking = false
  const files = fs.readdirSync('assets/thumbnails')
  files.find((file) => {
    if (file === `${filename}_${width}_${height}.jpg`) {
      checking = true
    }
  })
  return checking
}

images.get('/images', async (req: Request, res: Response) => {
  const fullFiles = fs.readdirSync('assets/full')
  const filename = <string>req.query.filename
  if (!fullFiles.includes(`${filename}.jpg`)) {
    res.send('This image is not exist')
    return
  }
  const width = parseInt(<string>req.query.width)
  const height = parseInt(<string>req.query.height)
  const checkFolder: boolean = fs.existsSync('assets/thumbnails')
  if (!checkFolder) {
    fs.mkdirSync('assets/thumbnails')
  }
  const fileExist = checkImage(filename, width, height)
  if (!fileExist) {
    await sharp(`assets/full/${filename}.jpg`)
      .resize(width, height)
      .toFile(`assets/thumbnails/${filename}_${width}_${height}.jpg`)
  }
  fs.readFile(`assets/thumbnails/${filename}_${width}_${height}.jpg`, (err, data) => {
    if (err) throw err
    res.writeHead(200, { 'Content-Type': 'image/jpg' })
    res.end(data, 'base64')
  })
})

export default images
