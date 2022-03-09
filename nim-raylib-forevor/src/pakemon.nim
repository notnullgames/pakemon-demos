import raylib
import parallax
import std/os

InitWindow(320, 240, "Pakémon")
InitAudioDevice()
SetTargetFPS(60)

let
  music = LoadMusicStream("assets/the_golden_ages.mod")
  title = LoadTexture("assets/title.png")

var
  titleY = -float(title.height)
  layer1 = ParalaxLayer(offsetY:0, scroll:0, speed: -0.1, image:LoadTexture("assets/far-buildings.png"))
  layer2 = ParalaxLayer(offsetY:0, scroll:0, speed: -0.5, image:LoadTexture("assets/back-buildings.png"))
  layer3 = ParalaxLayer(offsetY:50, scroll:0, speed: -1.0, image:LoadTexture("assets/foreground.png"))

PlayMusicStream(music)

var spawn = ""

while not WindowShouldClose():
  UpdateMusicStream(music)

  # example to show spawning another program
  if IsKeyDown(KEY_SPACE):
    spawn = "nim compile --path=src/lib --run --outdir:. src/pakemon.nim"
    break

  if IsKeyDown(KEY_ESCAPE):
    break
  
  BeginDrawing()
  ClearBackground(BLACK)
  layer1.draw()
  layer2.draw()
  layer3.draw()

  if titleY < 60.0:
    titleY += 0.14
  else:
    if int(GetTime()) mod 2 == 0:
      DrawText("PRESS A BUTTON", 115, 120, 10, WHITE)
  
  DrawTexture(title, int(title.width / 2), int(titleY), WHITE)
  EndDrawing()

UnLoadTexture(title)
UnloadMusicStream(music)
layer1.unload()
layer2.unload()
layer3.unload()
CloseWindow()

if spawn != "":
  discard execShellCmd(spawn)