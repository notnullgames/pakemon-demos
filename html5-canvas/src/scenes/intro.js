import Animation from '../animation.js'
import { loadImages } from '../utils.js'

let images

const inames = [
  'far-buildings',
  'back-buildings',
  'foreground',
  'cat',
  'title',
  'logo-white'
]

let catRunning
let startTime = 0

export default {
  async setup (canvas) {
    images = await loadImages(inames.map(n => `assets/${n}.png`))
    catRunning = new Animation(images.cat, [36, 37, 38, 39, 40, 41], 400)
    startTime = 0
  },

  draw (time, ctx) {
    if (startTime === 0) {
      startTime = time
    }
    const currentTime = time - startTime

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    const cx = ctx.canvas.width - ((time / 2000) % images['far-buildings'].width)
    const bx = ctx.canvas.width - ((time / 1000) % images['back-buildings'].width)
    const ax = ctx.canvas.width - ((time / 100) % images.foreground.width)

    ctx.drawImage(images['far-buildings'], cx, 0)
    ctx.drawImage(images['far-buildings'], cx - images['far-buildings'].width, 0)
    ctx.drawImage(images['back-buildings'], bx, -40)
    ctx.drawImage(images['back-buildings'], bx - images['back-buildings'].width, 0)
    ctx.drawImage(images.foreground, ax, 50)
    ctx.drawImage(images.foreground, ax - images.foreground.width, 50)

    catRunning.draw(ctx, time, 150, 200)

    if (currentTime > 5000) {
      ctx.drawImage(images.title, 80, 60)
      if (Math.floor(time / 500) % 2 === 0) {
        ctx.textAlign = 'center'
        ctx.fillText('PRESS START', 160, 130)
      }
    } else {
      const logoY = (currentTime / 1000) % (images.title.height / 5)
      ctx.drawImage(images.title, 80, logoY * 12)
    }
  }
}
