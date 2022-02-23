import r from 'raylib'
import ParallaxLayer from '../lib/ParallaxLayer.js'
import SpriteAnimation from '../lib/SpriteAnimation.js'
import { buttonDown } from '../lib/input.js'

const {
  BeginDrawing,
  BLACK,
  ClearBackground,
  DrawText,
  DrawTexture,
  EndDrawing,
  LoadMusicStream,
  LoadTexture,
  PlayMusicStream,
  UnloadMusicStream,
  UpdateMusicStream,
  WHITE
} = r

export default class SceneIntro {
  setup () {
    this.music = LoadMusicStream('assets/the_golden_ages.mod')
    this.title = LoadTexture('assets/title.png')
    this.titleY = -this.title.height
    PlayMusicStream(this.music)

    this.bg = [
      new ParallaxLayer('assets/far-buildings.png', -0.1),
      new ParallaxLayer('assets/back-buildings.png', -0.5),
      new ParallaxLayer('assets/foreground.png', -1.0, 50)
    ]

    this.cat = new SpriteAnimation('assets/cat.png', [36, 37, 38, 39, 40, 41], 240)
    this.catX = 160 - this.cat.width
  }

  update () {
    UpdateMusicStream(this.music)

    if (buttonDown('A', 'B', 'X', 'Y', 'START', 'SELECT')) {
      global.setScene('menu')
    }

    BeginDrawing()
    ClearBackground(BLACK)

    for (const layer of this.bg) {
      layer.draw()
    }

    if (this.titleY < 60) {
      this.titleY += 0.135
    } else {
      DrawText('PRESS A BUTTON', 115, 120, 10, WHITE)
    }

    DrawTexture(this.title, this.title.width / 2, this.titleY, WHITE)

    this.cat.draw(150, 200)

    EndDrawing()
  }

  destroy () {
    UnloadMusicStream(this.music)
    for (const layer of this.bg) {
      layer.destroy()
    }
  }
}
