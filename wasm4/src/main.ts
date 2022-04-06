import * as w4 from './wasm4'

import { cat0000Width, cat0000Height, cat0000Flags, cat0000, cat0001, cat0002, cat0003, cat0004, cat0005 } from './cat'

// build your sound here: https://wasm4.org/play/sound-demo
function play(freq1:u16, freq2:u16, attack:u16, decay:u16, sustain:u16, release:u16, peakVolume:u16, sustainVolume:u16, channel:u16, mode:u8):void {
  w4.tone(440 | (200 << 16), (attack << 24) | (decay << 16) | sustain | (release << 8), (peakVolume << 8) | sustainVolume, channel |(mode << 2))
}

const cat = [
  cat0000,
  cat0001,
  cat0002,
  cat0003,
  cat0004,
  cat0005
]

let frame = 0
let time = 0

export function update (): void {
  time += 1

  store<u16>(w4.DRAW_COLORS, 0x1320) // remap colors
  w4.blit(cat[frame % cat.length], 60, 60, cat0000Width, cat0000Height, cat0000Flags)

  const gamepad = load<u8>(w4.GAMEPAD1)
  if (gamepad & w4.BUTTON_1) {
    store<u16>(w4.DRAW_COLORS, 4)
    play(440, 200, 48, 68, 16, 74, 46, 69, 0, 1)
  } else {
    store<u16>(w4.DRAW_COLORS, 3)
    if (time % 10 === 0){
      frame += 1
    }
  }

  w4.text("Pakémon", 52, 50)
  w4.text("Press X to purr", 20, 100)
}
