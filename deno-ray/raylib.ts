// this is a minimal FFI wrapper
// eventually, if we went this path, I would generate the full wrapper

/*
void BeginDrawing(void);
void CloseWindow(void);
void ClearBackground(Color color);
int ColorToInt(Color color); 
void DrawTexture(Texture2D texture, int posX, int posY, Color tint);
void EndDrawing(void);
Color GetColor(unsigned int hexValue);
void InitWindow(int width, int height, const char *title)
Texture2D LoadTexture(const char *fileName);
void SetTargetFPS(int fps);
void UnloadTexture(Texture2D texture);
bool WindowShouldClose(void);
*/

let ext = 'so'
if (Deno.build.os === 'windows') {
  ext = 'dll'
} else if (Deno.build.os === 'darwin') {
  ext = 'dylib'
}

const dylib = Deno.dlopen(`./raylib_native/lib/libraylib.${ext}`, {
  'BeginDrawing': { parameters: [], result: 'void' },
  'CloseWindow': { parameters: [], result: 'void' },
  'ClearBackground': { parameters: ['pointer'], result: 'void' },
  'ColorToInt': { parameters: ['pointer'], result: 'u32' },
  'DrawTexture': { parameters: ['pointer', 'u8', 'u8', 'pointer'], result: 'void' },
  'EndDrawing': { parameters: [], result: 'void' },
  'GetColor': { parameters: ['u32'], result: 'pointer' },
  'InitWindow': { parameters: ['u8', 'u8', 'pointer'], result: 'void' },
  'LoadTexture': { parameters: ['pointer'], result: 'pointer' },
  'SetTargetFPS': { parameters: ['u8'], result: 'void' },
  'UnloadTexture': { parameters: ['pointer'], result: 'void' },
  'WindowShouldClose': { parameters: [], result: 'u8' },
})

export const BeginDrawing = () => dylib.symbols.BeginDrawing()
export const CloseWindow = () => dylib.symbols.CloseWindow()
export const ClearBackground = (color) => dylib.symbols.CloseWindow(dylib.symbols.GetColor(color))

export const Colors = {
  LIGHTGRAY: { r: 200, g: 200, b: 200, a: 255 },  // Light Gray
  GRAY: { r: 130, g: 130, b: 130, a: 255 },       // Gray
  DARKGRAY: { r: 80, g: 80, b: 80, a: 255 },      // Dark Gray
  YELLOW: { r: 253, g: 249, b: 0, a: 255 },       // Yellow
  GOLD: { r: 255, g: 203, b: 0, a: 255 },         // Gold
  ORANGE: { r: 255, g: 161, b: 0, a: 255 },       // Orange
  PINK: { r: 255, g: 109, b: 194, a: 255 },       // Pink
  RED: { r: 230, g: 41, b: 55, a: 255 },          // Red
  MAROON: { r: 190, g: 33, b: 55, a: 255 },       // Maroon
  GREEN: { r: 0, g: 228, b: 48, a: 255 },         // Green
  LIME: { r: 0, g: 158, b: 47, a: 255 },          // Lime
  DARKGREEN: { r: 0, g: 117, b: 44, a: 255 },     // Dark Green
  SKYBLUE: { r: 102, g: 191, b: 255, a: 255 },    // Sky Blue
  BLUE: { r: 0, g: 121, b: 241, a: 255 },         // Blue
  DARKBLUE: { r: 0, g: 82, b: 172, a: 255 },      // Dark Blue
  PURPLE: { r: 200, g: 122, b: 255, a: 255 },     // Purple
  VIOLET: { r: 135, g: 60, b: 190, a: 255 },      // Violet
  DARKPURPLE: { r: 112, g: 31, b: 126, a: 255 },  // Dark Purple
  BEIGE: { r: 211, g: 176, b: 131, a: 255 },      // Beige
  BROWN: { r: 127, g: 106, b: 79, a: 255 },       // Brown
  DARKBROWN: { r: 76, g: 63, b: 47, a: 255 },     // Dark Brown

  WHITE: 0xffffffff,      // White
  BLACK: 0x000000ff,            // Black
  BLANK: 0x00000000,              // Blank (Transparent)
  MAGENTA: { r: 255, g: 0, b: 255, a: 255 },      // Magenta
  RAYWHITE: { r: 245, g: 245, b: 245, a: 255 },   // My own White (raylib logo)
}

BeginDrawing()