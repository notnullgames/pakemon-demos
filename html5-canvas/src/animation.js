/* global Image */

export default class Animation {
  constructor (image, frames = [0], speed = 1000, width = 32, height = 32) {
    if (typeof image === 'string') {
      this.image = new Image()
      this.image.src = image
    } else {
      this.image = image
    }
    this.playing = true
    this.speed = speed
    this.width = width
    this.height = height
    this.frame = 0

    // pre-compute image-quad top-left
    const x = image.width / width
    this.frames = frames.map(f => [(f % x) * height, Math.floor(f / x) * width])
  }

  draw (context, time, x, y) {
    if (this.playing) {
      this.frame = Math.floor(time / this.speed) % this.frames.length
    }
    const f = this.frames[this.frame]
    context.drawImage(this.image, f[0], f[1], this.width, this.height, x, y, this.width, this.height)
  }
}
