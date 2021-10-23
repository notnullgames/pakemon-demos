import r from 'raylib'
import ParallaxLayer from '../ParallaxLayer.js'
import SpriteAnimation from '../SpriteAnimation.js'

export default class SceneIntro {
  setup () {
    this.music = r.LoadMusicStream('assets/the_golden_ages.mod')
    this.title = r.LoadTexture('assets/title.png')
    this.titleY = -this.title.height
    r.PlayMusicStream(this.music)

    this.bg = [
      new ParallaxLayer('assets/far-buildings.png', -0.1),
      new ParallaxLayer('assets/back-buildings.png', -0.5),
      new ParallaxLayer('assets/foreground.png', -1.0, 50)
    ]

    this.cat = new SpriteAnimation('assets/cat.png', [36, 37, 38, 39, 40, 41], 240)
    this.catX = 160 - this.cat.width
  }

  update () {
    r.UpdateMusicStream(this.music)

    r.BeginDrawing()
    r.ClearBackground(r.BLACK)

    for (const layer of this.bg) {
      layer.draw()
    }

    if (this.titleY < 60) {
      this.titleY += 0.135
    } else {
      r.DrawText('PRESS A BUTTON', 115, 120, 10, r.WHITE)
    }

    r.DrawTexture(this.title, this.title.width / 2, this.titleY, r.WHITE)

    this.cat.draw(150, 200)

    r.EndDrawing()
  }

  destroy () {
    r.UnloadMusicStream(this.music)
    for (const layer of this.bg) {
      layer.destroy()
    }
  }
}
