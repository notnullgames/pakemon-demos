import r from 'raylib'

import SceneIntro from './scenes/scene_intro.js'
import SceneMenu from './scenes/scene_menu.js'

const {
  CloseWindow,
  InitAudioDevice,
  InitWindow,
  SetTargetFPS,
  WindowShouldClose
} = r

InitWindow(320, 240, 'Pakémon')
SetTargetFPS(60)
InitAudioDevice()

const scenes = {
  intro: new SceneIntro(),
  menu: new SceneMenu()
}

// track & set current active scene
global.currentScene = undefined
global.setScene = name => {
  if (global.currentScene && global.currentScene.destroy) {
    global.currentScene.destroy()
  }

  global.currentScene = scenes[name]

  if (global.currentScene.setup) {
    global.currentScene.setup()
  }
}

// intial scene is intro
global.setScene('intro')

while (!WindowShouldClose()) {
  global.currentScene.update()
}

if (global.currentScene && global.currentScene.destroy) {
  global.currentScene.destroy()
}
CloseWindow()
