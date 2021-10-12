// this is the frame around teh canvas/context
// this is web-specific

import sceneIntro from './scenes/intro.js'

const developing = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'

const canvas = document.getElementById('canvas')

function getMousePos (canvas, evt) {
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height

  return {
    x: (evt.clientX - rect.left) * scaleX,
    y: (evt.clientY - rect.top) * scaleY
  }
}

const currentScene = sceneIntro
const ctx = canvas.getContext('2d')
ctx.font = '10px joystix'

let pos = { x: 0, y: 0 }

const frame = () => {
  currentScene.draw(Date.now(), ctx)
  ctx.fillStyle = '#fff'
  if (developing) {
    ctx.textAlign = 'left'
    ctx.fillText(`${pos.x.toFixed(2)},${pos.y.toFixed(2)}`, 0, 10)
  }
  window.requestAnimationFrame(frame)
}

// show where mouse is, for easier pixel-herding
if (developing) {
  canvas.addEventListener('mousemove', e => {
    pos = getMousePos(canvas, e)
  })
}

currentScene.setup(canvas)
  .then(() => {
    window.requestAnimationFrame(frame)
  })
