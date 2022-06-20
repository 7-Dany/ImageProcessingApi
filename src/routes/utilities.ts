import fs from 'fs'
import sharp from 'sharp'

export async function checkThumbnailsFolder() {
  // To create thumbnails folder if not exist yet
  const checkFolder: boolean = await fs.promises
    .access('assets/thumbnails', fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
  if (!checkFolder) {
    await fs.promises.mkdir('assets/thumbnails')
  }
}

export async function resizeImage(filename: string, width: number, height: number) {
  // To resize image with new width and height
  await sharp(`assets/full/${filename}.jpg`)
    .resize(width, height)
    .toFile(`assets/thumbnails/${filename}_${width}_${height}.jpg`)
}

export function checkImage(filename: string, width: number, height: number) {
  // check if image got resized before or not
  let checking = false
  const files = fs.readdirSync('assets/thumbnails')
  files.find((file) => {
    if (file === `${filename}_${width}_${height}.jpg`) {
      checking = true
    }
  })
  return checking
}
