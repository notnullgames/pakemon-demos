import { Canvas, Rect } from 'https://deno.land/x/sdl2/src/canvas.ts'

export type { Canvas, Rect }
export type Font = number

export interface Image {
  sfc: number
  tex: number
  dim: Rect
}

export class State {
  canvas: Canvas

  constructor(canvas: Canvas){
    this.canvas = canvas
  }

  async draw() {}
}