use raylib::prelude::*;

fn main() {
    let (mut rl, thread) = raylib::init().size(320, 240).title("Pakémon").build();

    let i = Image::load_image("assets/title.png").expect("could not load logo image");
    let logo = rl
        .load_texture_from_image(&thread, &i)
        .expect("could not load texture from logo image");
    let mut logo_y = -logo.height as f32;

    let i2 =
        Image::load_image("assets/far-buildings.png").expect("could not load far-buildings image");
    let far = rl
        .load_texture_from_image(&thread, &i2)
        .expect("could not load texture from far-buildings image");
    let mut far_x = 0.0;

    let i3 = Image::load_image("assets/back-buildings.png")
        .expect("could not load back-buildings image");
    let back = rl
        .load_texture_from_image(&thread, &i3)
        .expect("could not load texture from back-buildings image");
    let mut back_x = 0.0;

    let i4 = Image::load_image("assets/foreground.png").expect("could not load foreground image");
    let foreground = rl
        .load_texture_from_image(&thread, &i4)
        .expect("could not load texture from foreground image");
    let mut foreground_x = 0.0;

    while !rl.window_should_close() {
        far_x += -0.001;
        back_x += -0.005;
        foreground_x += -0.01;

        if far_x <= -far.width as f32 {
            far_x = 0.0;
        }
        if back_x <= -back.width as f32 {
            back_x = 0.0;
        }
        if foreground_x <= -back.width as f32 {
            foreground_x = 0.0;
        }

        if logo_y <= 40.0 {
            logo_y += 0.01;
        }

        let mut d = rl.begin_drawing(&thread);
        d.clear_background(Color::BLACK);

        d.draw_texture(&far, far_x as i32, 0, Color::WHITE);
        d.draw_texture(&far, far_x as i32 + far.width, 0, Color::WHITE);

        d.draw_texture(&back, back_x as i32, 0, Color::WHITE);
        d.draw_texture(&back, back_x as i32 + back.width, 0, Color::WHITE);

        d.draw_texture(&foreground, foreground_x as i32, 50, Color::WHITE);
        d.draw_texture(
            &foreground,
            foreground_x as i32 + foreground.width,
            50,
            Color::WHITE,
        );

        if logo_y >= 40.0 {
            d.draw_text("PRESS A BUTTON", 115, 120, 10, Color::WHITE);
        }

        d.draw_texture(&logo, 80, logo_y as i32, Color::WHITE);
    }
}
