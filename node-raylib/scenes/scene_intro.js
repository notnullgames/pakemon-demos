import r from 'raylib'
import ParallaxLayer from '../ParallaxLayer.js'

// I do this to more or less match C  API, but it's optional if you just use r.WHATEVER
const {
  ClearBackground,
  DrawText,
  BLACK,
  LIGHTGRAY,
  LoadTexture,
  LoadMusicStream,
  PlayMusicStream,
  UpdateMusicStream,
  UnloadMusicStream,
  BeginDrawing,
  EndDrawing
} = r

export default class SceneIntro {
  setup () {
    this.music = LoadMusicStream('assets/the_golden_ages.mod')
    PlayMusicStream(this.music)

    this.bg = [
      new ParallaxLayer('assets/far-buildings.png', -0.1),
      new ParallaxLayer('assets/back-buildings.png', -0.5),
      new ParallaxLayer('assets/foreground.png', -1.0, 50)
    ]
  }

  update () {
    UpdateMusicStream(this.music)

    BeginDrawing()
    ClearBackground(BLACK)
    DrawText('HELLO!', 10, 10, 20, LIGHTGRAY)
    for (const layer of this.bg) {
      layer.draw()
    }
    EndDrawing()
  }

  destroy () {
    UnloadMusicStream(this.music)
    for (const layer of this.bg) {
      layer.destroy()
    }
  }
}
