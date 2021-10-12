# pakemon-bevy

These are some basic ideas around bevy, after being inspired by TIC-80.

## what is this for?

The goal is to create a much simpler API for just putting a sprite on the screen, and things like that.

- Initially, make the API in rust and get it working with some basic demo (cat-running-in-city-intro is a good test) Try to keep all the code in a separate file for the API and also for the scene, so it's easier to manage them
- work out how to script it: either just lua/python directly, or a wasm loader with some exmaples. Need to try out ideas.
- do performance/memory tests on real pi-zero, to see if the path we land on is even viable
- Take all the ideas from [here](https://github.com/johnthagen/min-sized-rust/blob/master/README.md) to optimize build
- make sure it's working on web (this could be very tricky, as there is no current support for this)

## usage

```
cargo run   # run the demo
```