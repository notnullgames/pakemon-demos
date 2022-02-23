// this is a single layer of a parallax background effect for node-raylib

import r from 'raylib'

const {
  DrawTexture,
  LoadTexture,
  UnloadTexture,
  WHITE
} = r

export default class ParallaxLayer {
  constructor (image, speed = 1.0, offsety = 0, offset = 0) {
    this.iloadedimages = typeof image === 'string'
    if (this.iloadedimages) {
      this.image = LoadTexture(image)
    } else {
      this.image = image
    }
    this.speed = speed
    this.scroll = offset
    this.offsety = offsety
  }

  draw () {
    this.scroll += this.speed
    if (this.scroll <= (-1 * this.image.width)) {
      this.scroll = 0
    }

    DrawTexture(this.image, this.scroll, this.offsety, WHITE)
    DrawTexture(this.image, this.scroll + this.image.width, this.offsety, WHITE)
  }

  destroy () {
    if (this.iloadedimages) {
      UnloadTexture(this.image)
    }
  }
}
