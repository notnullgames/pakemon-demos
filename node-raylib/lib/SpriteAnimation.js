// This manages a sprite-animation for node-raylib

import r from 'raylib'

const {
  DrawTextureRec,
  GetTime,
  LoadTexture,
  Rectangle,
  UnloadTexture,
  Vector2,
  WHITE
} = r

export default class SpriteAnimation {
  constructor (image, frames = [0], speed = 60, width = 32, height = 32) {
    this.iloadedimages = typeof image === 'string'
    if (this.iloadedimages) {
      this.image = LoadTexture(image)
    } else {
      this.image = image
    }
    this.playing = true
    this.speed = 60 / speed
    this.width = width
    this.height = height
    this.frame = 0

    // pre-compute image-quad top-left
    const x = Math.floor(this.image.width / width)
    this.frames = frames.map(f => [(f % x) * height, Math.floor(f / x) * width])
  }

  draw (x, y) {
    if (this.playing) {
      this.frame = Math.floor(GetTime() / this.speed) % this.frames.length
    }
    const f = this.frames[this.frame]
    DrawTextureRec(this.image, Rectangle(...f, this.width, this.height), Vector2(x, y), WHITE)
  }

  destroy () {
    if (this.iloadedimages) {
      UnloadTexture(this.image)
    }
  }
}
