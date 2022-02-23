import {
  BeginDrawing,
  CloseWindow,
  ClearBackground,
  Color,
  DrawTexture,
  EndDrawing,
  InitWindow,
  LoadTexture,
  SetTargetFPS,
  UnloadTexture,
  WindowShouldClose,
} from './raylib.ts'

const title = LoadTexture("assets/title.png")

InitWindow(320, 240, "Pakémon")
SetTargetFPS(60)

while (!WindowShouldClose()) {
  BeginDrawing()
  ClearBackground(Color.BLACK)
  DrawTexture(title, 0, 0, Color.WHITE)
  EndDrawing()
}

UnloadTexture(title)

CloseWindow()
