#!/bin/bash

# this will convert the cat image into 4 seperate sprites
# You need imagemagick installed to use this.

magick assets/cat-run-right.png -colors 4 -depth 8 +repage -crop 32x32 /tmp/cat%04d.png

npx -y w4 png2src --assemblyscript /tmp/cat0000.png | sed 's/const/export const/g' > src/cat.ts
npx -y w4 png2src --assemblyscript /tmp/cat0001.png | sed 's/const/export const/g' >> src/cat.ts
npx -y w4 png2src --assemblyscript /tmp/cat0002.png | sed 's/const/export const/g' >> src/cat.ts
npx -y w4 png2src --assemblyscript /tmp/cat0003.png | sed 's/const/export const/g' >> src/cat.ts
npx -y w4 png2src --assemblyscript /tmp/cat0004.png | sed 's/const/export const/g' >> src/cat.ts
npx -y w4 png2src --assemblyscript /tmp/cat0005.png | sed 's/const/export const/g' >> src/cat.ts
