import raylib

type
  Spritesheet* = ref object
    image*:Texture2D
    height*:int
    width*:int
    frames*:seq[int]
    frame*:int
    speed*:float
    playing*:bool

proc draw*(this:Spritesheet, x:int, y:int) =
  if this.playing:
    this.frame = int(GetTime() / this.speed) mod len(this.frames)
  let f = this.frames[this.frame]
  DrawTextureRec(this.image, Rectangle(x:float((f mod x) * this.height), y:float(int(f / x) * this.width), width:float(this.width), height:float(this.height)), Vector2(x:float(x), y:float(y)), WHITE)

proc unload*(this:Spritesheet) =
  UnloadTexture(this.image)