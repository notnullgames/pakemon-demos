#include <SDL.h>
#include <SDL_image.h>
#include <SDL_timer.h>
#include <SDL_ttf.h>

// TODO: gamepad interface is nicer, I'm just unfamiliar

int main(int argc, char *argv[]) {
  // for FPS counter
  Uint32 startclock = 0;
  Uint32 deltaclock = 0;
  Uint32 currentFPS = 0;

  const int JOYSTICK_DEAD_ZONE = 8000;

  if (SDL_Init(SDL_INIT_EVERYTHING) != 0) {
    printf("error initializing SDL: %s\n", SDL_GetError());
  }

  if ( TTF_Init() < 0 ) {
    printf("error initializing SDL_ttf: %s\n", TTF_GetError());
  }

  TTF_Font* font;
  font = TTF_OpenFont("assets/OpenSans-Regular.ttf", 14);
  if ( !font ) {
    printf("error initializing SDL_ttf: %s\n", TTF_GetError());
  }
  
  SDL_Window* win = SDL_CreateWindow("SDL2Test", // creates a window
    SDL_WINDOWPOS_CENTERED,
    SDL_WINDOWPOS_CENTERED,
    320, 240, 0
  );

  SDL_Joystick* gGameController = NULL;

  //Check for joysticks
  if( SDL_NumJoysticks() < 1 ) {
    printf( "Warning: No joysticks connected!\n" );
  } else {
    //Load joystick
    gGameController = SDL_JoystickOpen(0);
    if( gGameController == NULL ) {
      printf( "Warning: Unable to open game controller! SDL Error: %s\n", SDL_GetError() );
    }
  }

  // creates a renderer to render our images
  SDL_Renderer* rend = SDL_CreateRenderer(win, -1, SDL_RENDERER_ACCELERATED);

  // creates a surface to load an image into the main memory
  SDL_Surface* surface;

  // load image
  surface = IMG_Load("assets/logo.png");

  // loads image to our graphics hardware memory.
  SDL_Texture* tex = SDL_CreateTextureFromSurface(rend, surface);

  // clears main-memory
  SDL_FreeSurface(surface);

  // let us control our image position
  // so that we can move it with our keyboard.
  SDL_Rect dest;

  // connects our texture with dest to control position
  SDL_QueryTexture(tex, NULL, NULL, &dest.w, &dest.h);

  // adjust height and width of our image box.
  dest.w /= 2;
  dest.h /= 2;

  // // sets initial x-position of object
  dest.x = (320 - dest.w) / 2;

  // // sets initial y-position of object
  dest.y = (240 - dest.h) / 2;

  // controls annimation loop
  int close = 0;

  // speed of box
  int speed = 300;

  startclock = SDL_GetTicks();

  SDL_Surface* text;
  SDL_Color black = { 0, 0, 0 }; // black
  SDL_Texture* text_texture;
  text = TTF_RenderText_Solid( font, "Hello World!", black );
  text_texture = SDL_CreateTextureFromSurface( rend, text );
  SDL_Rect dest_fps = { 320 - text->w, 0, text->w, text->h };
  char str_fps[128];

  // annimation loop
  while (!close) {
    deltaclock = SDL_GetTicks() - startclock;
    startclock = SDL_GetTicks();
    if ( deltaclock != 0 )
      currentFPS = 1000 / deltaclock;
    sprintf(str_fps, "%8d", currentFPS);

    SDL_Event event;

    // Events mangement
    while (SDL_PollEvent(&event)) {
      switch (event.type) {
        case SDL_QUIT:
          // handling of close button
          close = 1;
          break;

        case SDL_JOYAXISMOTION:
          switch (event.jaxis.axis) {
            case 0: // X
              if( event.jaxis.value < -JOYSTICK_DEAD_ZONE ) { // left
                dest.x -= speed / 30;
              } else if( event.jaxis.value > JOYSTICK_DEAD_ZONE ) { // right
                dest.x += speed / 30;
              }
              break;
            
            case 1: // Y
              if( event.jaxis.value < -JOYSTICK_DEAD_ZONE ) { // up
                dest.y -= speed / 30;
              } else if( event.jaxis.value > JOYSTICK_DEAD_ZONE ) { // down
                dest.y += speed / 30;
              }
              break;
            
            default:
              break;
          }

        case SDL_KEYDOWN:
          // keyboard API for key pressed
          switch (event.key.keysym.scancode) {
            case SDL_SCANCODE_W:
            case SDL_SCANCODE_UP:
              dest.y -= speed / 30;
              break;
            case SDL_SCANCODE_A:
            case SDL_SCANCODE_LEFT:
              dest.x -= speed / 30;
              break;
            case SDL_SCANCODE_S:
            case SDL_SCANCODE_DOWN:
              dest.y += speed / 30;
              break;
            case SDL_SCANCODE_D:
            case SDL_SCANCODE_RIGHT:
              dest.x += speed / 30;
              break;
            default:
              break;
          }
      }
    }

    // right boundary
    if (dest.x + dest.w > 320)
      dest.x = 320 - dest.w;

    // left boundary
    if (dest.x < 0)
      dest.x = 0;

    // bottom boundary
    if (dest.y + dest.h > 240)
      dest.y = 240 - dest.h;

    // upper boundary
    if (dest.y < 0)
      dest.y = 0;

    SDL_SetRenderDrawColor(rend, 100, 100, 100, 255); // grey
    SDL_RenderClear(rend);
    SDL_RenderCopy(rend, tex, NULL, &dest);

    text = TTF_RenderText_Solid( font, str_fps, black );
    text_texture = SDL_CreateTextureFromSurface( rend, text );
    SDL_RenderCopy(rend, text_texture, NULL, &dest_fps);

    // triggers the double buffers
    // for multiple rendering
    SDL_RenderPresent(rend);
  }

  // destroy FPS stuff
  SDL_DestroyTexture( text_texture );
  SDL_FreeSurface( text );

  // destroy texture
  SDL_DestroyTexture(tex);

  // destroy renderer
  SDL_DestroyRenderer(rend);

  SDL_JoystickClose(gGameController);
  gGameController = NULL;

  // destroy window
  SDL_DestroyWindow(win);
  
  // close SDL
  SDL_Quit();

  return 0;
}
