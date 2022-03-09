struct ParallaxLayer far;
struct ParallaxLayer back;
struct ParallaxLayer front;
Music music;

Sprite cat;

int timer = 0;

void SceneIntroSetup() {
    cat.texture = LoadTexture(ASSETS_PATH"cat-run-right.png");
    cat.frameSize = (Vector2){ 32, 32 };
    cat.maxFrame = 6;
    cat.framesWide = 6;
    cat.origin = (Vector2){ 0, 0 };

    far.texture = LoadTexture(ASSETS_PATH"far-buildings.png");
    back.texture = LoadTexture(ASSETS_PATH"back-buildings.png");
    front.texture = LoadTexture(ASSETS_PATH"foreground.png");
    music = LoadMusicStream(ASSETS_PATH"the_golden_ages.mod");
    PlayMusicStream(music);
}

void SceneIntroUpdate() {
    UpdateMusicStream(music);

    ParallaxLayerScroll(&far, -0.1f);
    ParallaxLayerScroll(&back, -0.5f);
    ParallaxLayerScroll(&front, -1.0f);

    timer++;

    if (timer % 15 == 0){
        cat.frame++;
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
    EndDrawing();
}

void SceneIntroDestroy() {
    UnloadTexture(cat.texture);
    UnloadTexture(far.texture);
    UnloadTexture(back.texture);
    UnloadTexture(front.texture);
    UnloadMusicStream(music);
}