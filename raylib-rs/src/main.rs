use raylib::prelude::*;

fn main() {
    let (mut rl, thread) = raylib::init().size(320, 240).title("Pakémon").build();

    let i = Image::load_image("assets/title.png").expect("could not load logo image");
    let logo = rl
        .load_texture_from_image(&thread, &i)
        .expect("could not load texture from logo image");

    let mut logo_y = -62.0;

    while !rl.window_should_close() {
        let mut d = rl.begin_drawing(&thread);

        if logo_y <= 40.0 {
            logo_y += 0.01;
        } else {
            d.draw_text("PRESS A BUTTON", 115, 120, 10, Color::WHITE);
        }

        d.clear_background(Color::BLACK);
        d.draw_texture(&logo, 80, logo_y as i32, Color::WHITE);
    }
}
