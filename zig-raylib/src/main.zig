// TODO: look into f32 type-conversion for both draw() functions

// stupid workaround to share raylib import
const pakemon = @import("pakemon.zig");
const ray = pakemon.ray;

pub fn main() void {
    ray.InitWindow(320, 240, "Pakémon");
    defer ray.CloseWindow();
    ray.SetTargetFPS(60);
    ray.InitAudioDevice();

    // var cat = pakemon.SpriteAnimation{ .texture = ray.LoadTexture("assets/cat-run-right.png"), .framesWide = 6 };
    var far = pakemon.ParallaxLayer{ .texture = ray.LoadTexture("assets/far-buildings.png"), .speed = -1 };
    var back = pakemon.ParallaxLayer{ .texture = ray.LoadTexture("assets/back-buildings.png"), .speed = -2, .y = -20 };
    var front = pakemon.ParallaxLayer{ .texture = ray.LoadTexture("assets/foreground.png"), .speed = -4, .y = 50 };

    const music = ray.LoadMusicStream("assets/the_golden_ages.mod");
    ray.PlayMusicStream(music);

    while (!ray.WindowShouldClose()) {
        ray.UpdateMusicStream(music);
        ray.BeginDrawing();
        defer ray.EndDrawing();
        ray.ClearBackground(ray.BLACK);
        far.draw();
        back.draw();
        front.draw();
        // cat.draw(140, 200);
    }
}
