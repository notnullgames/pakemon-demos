#define SUPPORT_FILEFORMAT_MOD
#define SCREEN_WIDTH (320)
#define SCREEN_HEIGHT (240)

#include "raylib.h"
#include "pakemon.h"

int main(void) {
    InitWindow(SCREEN_WIDTH, SCREEN_HEIGHT, "Pakémon");
    SetTargetFPS(60);
    InitAudioDevice();
    
    switch(current_scene) {
        case SCENE_INTRO:SceneIntroSetup(); break;
    }

    
    while (!WindowShouldClose()) {
        global_time++;
        switch(current_scene) {
            case SCENE_INTRO: SceneIntroUpdate(); break;
        }
    }

    switch(current_scene) {
        case SCENE_INTRO: SceneIntroDestroy(); break;
    }
    
    CloseWindow();
    CloseAudioDevice();
    return 0;
}

