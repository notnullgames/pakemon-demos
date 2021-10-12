use bevy::prelude::*;
use bevy::render::pass::ClearColor;

#[derive(Default)]
struct State {
    printed: bool,
}

fn main() {
    App::build()
        .insert_resource(WindowDescriptor {
            title: "Pakémon".into(),
            height: 240.0,
            width: 320.0,
            ..Default::default()
        })
        .init_resource::<State>()
        .add_plugins(DefaultPlugins)
        .add_startup_system(setup.system())
        .add_system(draw.system())
        .run();
}

fn draw(mut state: ResMut<State>) {
    if !state.printed {
        state.printed = true;
        println!("Hi!");
    }
}

fn setup(
    mut state: ResMut<State>,
    mut commands: Commands,
    asset_server: Res<AssetServer>,
    mut materials: ResMut<Assets<ColorMaterial>>,
) {
    // not really needed, as this is default, but shows sharing state with draw()
    state.printed = false;

    commands.spawn_bundle(OrthographicCameraBundle::new_2d());
    commands.insert_resource(ClearColor(Color::rgb(0.0, 0.0, 0.0)));
    commands.spawn_bundle(SpriteBundle {
        material: materials.add(asset_server.load("title.png").into()),
        ..Default::default()
    });
}
