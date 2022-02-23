// this is an example scene that implements a basic text menu

import r from 'raylib'

import { buttonDown, buttonUp } from '../lib/input.js'

const {
  BeginDrawing,
  BLACK,
  BLUE,
  ClearBackground,
  DrawRectangle,
  DrawText,
  EndDrawing,
  LoadSound,
  PlaySound,
  UnloadSound,
  WHITE
} = r

export default class SceneIntro {
  setup () {
    this.sMove = LoadSound('assets/move.wav')
    this.sOk = LoadSound('assets/ok.wav')
    this.selection = 0
    this.options = [
      'Choice 0',
      'Choice 1',
      'Choice 2',
      'Choice 3',
      'Choice 4',
      'Choice 5',
      'Choice 6',
      'Choice 7',
      'Choice 8',
      'Choice 9',
      'Choice A',
      'Choice B',
      'Choice C',
      'Choice D',
      'Choice F',
      'Choice G',
      'Choice H',
      'Choice I',
      'Choice J',
      'Choice K',
      'Choice L',
      'Choice M',
      'Choice N',
      'Choice O',
      'Choice P',
      'Choice Q',
      'Choice R',
      'Choice S',
      'Choice T',
      'Choice U',
      'Choice V',
      'Choice W',
      'Choice X',
      'Choice Y',
      'Choice Z'
    ]
    this.last = 0
  }

  update () {
    // choice made
    if (buttonDown('A', 'START') && this.last !== 0) {
      this.last = 0
      PlaySound(this.sOk)
      console.log(`You chose "${this.options[this.selection]}"`)
    }

    // each down/up requires 1 keypress (and release)
    if (buttonUp('DOWN') && this.last === 1) {
      this.last = 2
    }

    if (buttonUp('UP') && this.last === -1) {
      this.last = 2
    }

    // menu wraps around both ways

    if (buttonDown('DOWN') && this.last !== 1) {
      this.last = 1
      this.selection += 1
      PlaySound(this.sMove)
      if (this.selection >= this.options.length) {
        this.selection = 0
      }
    }

    if (buttonDown('UP') && this.last !== -1) {
      this.last = -1
      this.selection -= 1
      PlaySound(this.sMove)
      if (this.selection < 0) {
        this.selection = this.options.length - 1
      }
    }

    // figure out page & starting option
    const screenlen = 12
    let start = 0

    if (this.selection >= screenlen) {
      const page = Math.floor(this.selection / screenlen)
      start = page * screenlen
    }

    BeginDrawing()
    ClearBackground(BLACK)

    for (let i = start; i < (start + screenlen); i++) {
      const y = (i - start)
      // indicator
      if (this.selection === i) {
        DrawRectangle(0, (y * 19) + 4, 320, 22, BLUE)
      }

      if (i < this.options.length) {
        // shadow
        DrawText(this.options[i], 22, 8 + (y * 19), 15, BLACK)

        // text
        DrawText(this.options[i], 24, 10 + (y * 19), 15, WHITE)
      }
    }

    EndDrawing()
  }

  destroy () {
    UnloadSound(this.sMove)
    UnloadSound(this.sOk)
  }
}
