import * as w4 from './wasm4'

import { cat0000Width, cat0000Height, cat0000Flags, cat0000, cat0001, cat0002, cat0003, cat0004, cat0005 } from './cat'

function beat1(speed:u8):void {
  if (time % (60/speed) === 0){
    beat += 1
  }

  // chh
  if (beat % 4 === 2) {
    w4.tone(1000 | (1000 << 16), (0 << 24) | (0 << 16) | 0 | (2 << 8), (50 << 8) | 50, 3 |(3 << 2))
  }

  // kick
  if (beat % 8 === 4) {
    w4.tone(50 | (30 << 16), (0 << 24) | (4 << 16) | 2 | (0 << 8), (100 << 8) | 100, 2 |(2 << 2))
  }

  // snare
  if (beat % 8 === 0) {
    w4.tone(260 | (250 << 16), (0 << 24) | (2 << 16) | 0 | (4 << 8), (50 << 8) | 100, 3 |(3 << 2))
  }
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
let beat = 0

export function update (): void {
  time += 1

  // remap colors: 4=0, 3=4, 2=3, 1=0
  store<u16>(w4.DRAW_COLORS, 0x0430) // remap colors
  w4.blit(cat[frame % cat.length], 60, 60, cat0000Width, cat0000Height, cat0000Flags)

  const gamepad = load<u8>(w4.GAMEPAD1)
  if (gamepad & w4.BUTTON_1) {
    store<u16>(w4.DRAW_COLORS, 2)
    // purr
    w4.tone(240 | (170 << 16), (14 << 24) | (26 << 16) | 18 | (34 << 8), (100 << 8) | 100, 2 |(0 << 2))
  } else {
    store<u16>(w4.DRAW_COLORS, 3)
    if (time % 10 === 0){
      frame += 1
    }
  }

  const notes = [150, 200, 160, 250, 100]

  if (beat % 32 === 0){
    w4.tone(notes[frame % notes.length] | (notes[frame % notes.length] << 16), (14 << 24) | (10 << 16) | 22 | (14 << 8), (40 << 8) | 49, 1 |(3 << 2))
  }

  beat1(8)

  w4.text("Pakémon", 52, 50)
  w4.text("Press X to purr", 20, 100)
}
