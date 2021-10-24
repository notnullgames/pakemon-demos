// map input to SNES-like controls
// TODO: only handles keys, for now

import r from 'raylib'

const keyMap = {
  A: r.KEY_Z,
  B: r.KEY_X,
  X: r.KEY_A,
  Y: r.KEY_S,
  R: r.KEY_Q,
  L: r.KEY_W,
  START: r.KEY_ENTER,
  SELECT: r.KEY_TAB,
  UP: r.KEY_UP,
  DOWN: r.KEY_DOWN,
  LEFT: r.KEY_LEFT,
  RIGHT: r.KEY_RIGHT
}

// check if any of the mapped buttons are down
export function buttonDown (...buttons) {
  return buttons.find(b => r.IsKeyDown(keyMap[b.toUpperCase()]))
}

// check if any of the mapped buttons are up
export function buttonUp (...buttons) {
  return buttons.find(b => r.IsKeyUp(keyMap[b.toUpperCase()]))
}
