import { State, Image, Canvas, Font } from '../types.ts'

export default class StateIntro extends State {
  font: Font
  imgTitle: Image

  constructor(canvas: Canvas){
    super(canvas)
    this.font = canvas.loadFont("assets/PixelOperator.ttf", 14)
    this.imgTitle = {
      sfc: canvas.loadSurface('assets/title.png'),
      tex: canvas.createTextureFromSurface(canvas.loadSurface('assets/title.png')),
      dim: { x: 0, y: 0, width: 158, height: 62  }
    }
  }

  async draw() {
    const { canvas, font, imgTitle } = this
    canvas.setDrawColor(0, 0, 0, 255)
    canvas.clear()

    canvas.setDrawColor(255, 255, 255, 255)
    const pos = { ...imgTitle.dim, x: 80, y: 60}
    canvas.copy(imgTitle.tex, imgTitle.dim, pos)

    canvas.renderFont(font, "Press any key.", {
      blended: { color: { r: 255, g: 255, b: 255, a: 255 } },
    }, {
      x: 120,
      y: 130,
      width: 80,
      height: 14,
    })

    canvas.present()
    Deno.sleepSync(10)
  }
}
