/* global Image */

// very simple, get just filename without extension or dir
export const basename = f => f.split('/').pop().split('.')[0]

// load an array of images into an object keyed by basename, return promise
export const loadImages = (images) => Promise.all(images.map(src => new Promise((resolve, reject) => {
  const i = new Image()
  i.onerr = reject
  i.onload = () => resolve(i)
  i.src = src
}))).then(images => {
  return images.reduce((a, c) => {
    const n = basename(c.src)
    return { ...a, [n]: c }
  }, {})
})
