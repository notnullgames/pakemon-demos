import { Canvas } from 'https://deno.land/x/sdl2/src/canvas.ts'
import StateIntro from './states/intro.ts'

const canvas = new Canvas({
  title: 'Pakémon',
  height: 320,
  width: 240,
  centered: true,
  fullscreen: false,
  hidden: false,
  resizable: false,
  minimized: false,
  maximized: false
})

let currentState = new StateIntro(canvas)

for await (const event of canvas) {
  switch (event.type) {
    case "draw":
      await currentState.draw()
      break
    case "quit":
      canvas.quit()
      break
  }
}
