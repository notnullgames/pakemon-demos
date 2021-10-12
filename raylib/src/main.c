#define SUPPORT_FILEFORMAT_MOD
#define SCREEN_WIDTH (320)
#define SCREEN_HEIGHT (240)

#include "raylib.h"
#include "pakemon.h"

enum scene current_scene = INTRO;

int main(void) {
    InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Pakémon");
    SetTargetFPS(60);
    InitAudioDevice();
    
    switch(current_scene) {
        case INTRO:
            SceneIntroSetup();
            break;
    }

    
    while (!WindowShouldClose()) {
        switch(current_scene) {
            case INTRO:
                SceneIntroUpdate();
                break;
        }
    }

    switch(current_scene) {
        case INTRO:
            SceneIntroDestroy();
            break;
    }
    
    CloseWindow();
    CloseAudioDevice();
    return 0;
}

