# pakemon-macroquad

This is yet another version of the pakemon intro demo. It uses rust & [macroquad](https://github.com/not-fl3/macroquad).

You can see the current state [here](https://notnullgames.github.io/pakemon-macroquad/)

```
# run native version
cargo run

# setup cross-compilation
rustup target add wasm32-unknown-unknown
rustup target add x86_64-pc-windows-gnu

# compile native for windows
cargo run --target x86_64-pc-windows-gnu

# compile for web
cargo build --target wasm32-unknown-unknown

```