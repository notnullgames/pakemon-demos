pub const ray = @cImport({
    @cInclude("raylib.h");
});

// a single layer of a parallax animation
pub const ParallaxLayer = struct {
    // the image used
    texture: ray.Texture,

    // the x-offset
    x: i32 = 0,

    // the y-offset
    y: i32 = 0,

    // the speed that this scrolls
    speed: i32 = 10,

    pub fn draw(self: *ParallaxLayer) void {
        self.x = @mod(self.x + self.speed, self.texture.width);
        ray.DrawTexture(self.texture, self.x, self.y, ray.WHITE);
        ray.DrawTexture(self.texture, self.x - self.texture.width, self.y, ray.WHITE);
    }
};

// a spritesheet used for animations
pub const SpriteAnimation = struct {
    // the image used
    texture: ray.Texture,

    // how many frames across?
    framesWide: i32,

    // pixel-size of a sprite
    frameSize: ray.Vector2 = ray.Vector2{ .x = 32, .y = 32 },

    // the origin of the sprite
    origin: ray.Vector2 = ray.Vector2{ .x = 0, .y = 0 },

    // current frame
    frame: i32 = 0,

    // scale sprite
    scale: f32 = 1,

    // rotate sprite
    angle: f32 = 0,

    pub fn draw(self: *SpriteAnimation, x: i32, y: i32) void {
        const ox = @mod(self.frame, self.framesWide) * self.frameSize.x;
        const oy = (self.frame / self.framesWide) * self.frameSize.y;
        ray.DrawTexturePro(self.texture, ray.Rectangle{ .x = ox, .y = oy, .width = self.frameSize.x, .height = self.frameSize.y }, ray.Rectangle{ .x = x, .y = y, .width = self.frameSize.x * self.scale, .y = self.frameSize.y * self.scale }, ray.Vector2{ .x = self.origin.x * self.scale, .y = self.origin.y * self.scale }, self.angle, ray.WHITE);
    }
};
