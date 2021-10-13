// this is a single layer of a parallax background effect

import r from 'raylib'

export default class ParallaxLayer {
  constructor (image, speed = 1.0, offsety = 0, offset = 0) {
    this.iloadedimages = typeof image === 'string'
    if (this.iloadedimages) {
      this.image1 = r.LoadTexture(image)
      this.image2 = r.LoadTexture(image)
    } else {
      this.image1 = image
      this.image2 = image
    }
    this.speed = speed
    this.scroll = offset
    this.offsety = offsety
  }

  draw () {
    this.scroll += this.speed
    if (this.scroll <= (-1 * this.image1.width)) {
      this.scroll = 0
    }
    r.DrawTextureV(this.image1, r.Vector2(this.scroll, this.offsety), r.WHITE)
    r.DrawTextureV(this.image2, r.Vector2(this.scroll + this.image1.width, this.offsety), r.WHITE)
  }

  destroy () {
    if (this.iloadedimages) {
      r.UnloadTexture(this.image1)
      r.UnloadTexture(this.image2)
    }
  }
}
