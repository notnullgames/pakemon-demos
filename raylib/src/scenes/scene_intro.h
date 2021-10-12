struct ParallaxLayer far;
struct ParallaxLayer back;
struct ParallaxLayer front;
Music music;

void SceneIntroSetup() {
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

    BeginDrawing();
    ClearBackground(BLACK);
    DrawTextureV(far.texture, (Vector2){ far.scroll, 0 }, WHITE);
    DrawTextureV(far.texture, (Vector2){ far.scroll + far.texture.width, 0 }, WHITE);
    DrawTextureV(back.texture, (Vector2){ back.scroll, 0 }, WHITE);
    DrawTextureV(back.texture, (Vector2){ back.scroll + back.texture.width, 0 }, WHITE);
    DrawTextureV(front.texture, (Vector2){ front.scroll, 50 }, WHITE);
    DrawTextureV(front.texture, (Vector2){ front.scroll + front.texture.width, 50 }, WHITE);
    EndDrawing();
}

void SceneIntroDestroy() {
    UnloadTexture(far.texture);
    UnloadTexture(back.texture);
    UnloadTexture(front.texture);
    UnloadMusicStream(music);
}