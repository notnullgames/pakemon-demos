const ray = @cImport({
    @cInclude("raylib.h");
});

const ParallaxLayer = struct {
    texture: ray.Texture,
    x: i32 = 0,
    y: i32 = 0,
    speed: i32 = 10,

    pub fn draw(self: *ParallaxLayer) void {
        // TODO: some kind of f32 math to allow smaller speed
        self.x = @mod(self.x + self.speed, self.texture.width);
        ray.DrawTexture(self.texture, self.x, self.y, ray.WHITE);
        ray.DrawTexture(self.texture, self.x - self.texture.width, self.y, ray.WHITE);
    }
};

const SpriteAnimation = struct {
    texture: ray.Texture,
    framesWide: i32,
    frameSize: ray.Vector2 = ray.Vector2{ .x = 32, .y = 32 },
    origin: ray.Vector2 = ray.Vector2{ .x = 0, .y = 0 },
    frame: i32 = 0,
    scale: f32 = 1,
    angle: f32 = 0,

    pub fn draw(self: *SpriteAnimation, x: i32, y: i32) void {
        const ox = @mod(self.frame, self.framesWide) * self.frameSize.x;
        const oy = (self.frame / self.framesWide) * self.frameSize.y;
        ray.DrawTexturePro(self.texture, ray.Rectangle{ .x = ox, .y = oy, .width = self.frameSize.x, .height = self.frameSize.y }, ray.Rectangle{ .x = x, .y = y, .width = self.frameSize.x * self.scale, .y = self.frameSize.y * self.scale }, ray.Vector2{ .x = self.origin.x * self.scale, .y = self.origin.y * self.scale }, self.angle, ray.WHITE);
    }
};

pub fn main() void {
    ray.InitWindow(320, 240, "Pakémon");
    defer ray.CloseWindow();
    ray.SetTargetFPS(60);
    ray.InitAudioDevice();

    // var cat = SpriteAnimation{ .texture = ray.LoadTexture("assets/cat-run-right.png"), .framesWide = 6 };
    var far = ParallaxLayer{ .texture = ray.LoadTexture("assets/far-buildings.png"), .speed = -1 };
    var back = ParallaxLayer{ .texture = ray.LoadTexture("assets/back-buildings.png"), .speed = -2, .y = -20 };
    var front = ParallaxLayer{ .texture = ray.LoadTexture("assets/foreground.png"), .speed = -4, .y = 50 };

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
