struct ParallaxLayer far;
struct ParallaxLayer back;
struct ParallaxLayer front;
Music music;

Sprite cat;
int logoPositionY;
Texture2D textureLogo;
bool showStart;

void SceneIntroSetup() {
    cat.texture = LoadTexture(ASSETS_PATH"cat-run-right.png");
    cat.frameSize = (Vector2){ 32, 32 };
    cat.maxFrame = 6;
    cat.framesWide = 6;
    cat.origin = (Vector2){ 0, 0 };
    
    logoPositionY = -40;
    showStart = false;

    far.texture = LoadTexture(ASSETS_PATH"far-buildings.png");
    back.texture = LoadTexture(ASSETS_PATH"back-buildings.png");
    front.texture = LoadTexture(ASSETS_PATH"foreground.png");

    textureLogo = LoadTexture(ASSETS_PATH"title.png");
    
    music = LoadMusicStream(ASSETS_PATH"the_golden_ages.mod");
    PlayMusicStream(music);
}

void SceneIntroUpdate() {
    UpdateMusicStream(music);

    ParallaxLayerScroll(&far, -0.1f);
    ParallaxLayerScroll(&back, -0.5f);
    ParallaxLayerScroll(&front, -1.0f);

    if (global_time % 15 == 0){
        cat.frame++;
    }

    if (global_time % 2 == 0){
        if (logoPositionY < 40) {
            logoPositionY++;
        }
    }

    if (logoPositionY == 40) {
        if (global_time % 30 == 0){
            showStart = !showStart;
        }
    }

    BeginDrawing();
    ClearBackground(BLACK);
    DrawTexture(far.texture, far.scroll, 0, WHITE);
    DrawTexture(far.texture, far.scroll + far.texture.width, 0, WHITE);
    DrawTexture(back.texture, back.scroll, 0, WHITE);
    DrawTexture(back.texture, back.scroll + back.texture.width, 0, WHITE);
    DrawTexture(front.texture, front.scroll, 50, WHITE);
    DrawTexture(front.texture, front.scroll + front.texture.width, 50, WHITE);
    DrawSprite(&cat, 150, 200, 0, 1, WHITE);
    if (showStart) {
        DrawText("PRESS ANY KEY", 105, 120, 14, WHITE);
    }
    DrawTexture(textureLogo, 80, logoPositionY, WHITE);
    EndDrawing();
}

void SceneIntroDestroy() {
    UnloadTexture(textureLogo);
    UnloadTexture(cat.texture);
    UnloadTexture(far.texture);
    UnloadTexture(back.texture);
    UnloadTexture(front.texture);
    UnloadMusicStream(music);
}