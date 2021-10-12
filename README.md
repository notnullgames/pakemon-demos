# pakemon-demos

This is a collection of ideas/demos where I basically implement the intro screen or some small part of pakemon to evaluate different languages and game frameworks.

I feel like I am endlessly evaluating stuff, and writing demos, so I am hoping to lock-in to something that works well (enough), soon. I may add more features to a demo I end up wanting to pursue, but often as soon as I find an issue I move on to another evaluation. So far, [raylib](raylib/) performs the best on pi, with the most features, but is a bit more complicated to get working (need C tools, deps, etc.) [love](love/) is much simpler to get started with, has all the frontend features I need, and seemed to perform ok (as long as I was very careful about how I wrote things.)

With many of these, networking (an essential feature for talking to the backend) is going to be an issue, either on native, or on the web. Generally, the C or Rust libraries can use a 3rd party cross-environment lib (using websockets via wasm or directly), but for example love2d compiled to wasm is not at all easy to set this up for (I will need to compile my own runtime.) With this in mind, I may even drop the web as a potential target, and just focus first on getting it to run well, natively, on the pi0.

- [bevy](bevy/) - [☢️](https://www.rust-lang.org/)
- [deno](deno/) - [☕](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) 🎬 🕸️
- [dome](dome/) - [🐤](https://wren.io/) 🌄 🥧 
- [haxe](haxe/) - [☕](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) 🔈 🐈 🌄 🎬 🕸️ 🥧 
- [html5-canvas](html5-canvas/) - [☕](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) 
- [love](love/) - [🌙](https://www.lua.org/) 🔊 🐈 🌄 🎬 🕸️ 🥧
- [macroquad](macroquad/) - [☢️](https://www.rust-lang.org/) 🐈 🌄 🕸️ 🥧
- [pyckitup](pyckitup/) - [☢️](https://www.rust-lang.org/)/[🐍](https://www.python.org/) 🐈 🕸️
- [pygame](pygame/) - [🐍](https://www.python.org/) 🔊 🐈 🎬 🌄
- [raylib](raylib/) - [🇨](https://en.cppreference.com/w/c/language) 🔊 🌄 🎬 🕸️ 🥧
- [sdl](sdl/) - [🇨](https://en.cppreference.com/w/c/language) 🕸️ 🥧

### implemented features

This is just what I actually implemented in the demo, not if the language/framework supports it.

🔈 - has sound (converted from mod to some other format)
🔊 - has sound (directly using mod file)
🌄 - parallax background implemented
🐈 - cat sprite animation implemented
🎬 - has nicely seperated scenes
🕸️ - built for web (or at least can be, with some work, that I may not have done in my demo setup)
🥧 - tested on pi0 and seems to run ok


### programming language

[☢️](https://www.rust-lang.org/) - rust
[🌙](https://www.lua.org/) - lua
[🇨](https://en.cppreference.com/w/c/language) - C/C++
[☕](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) - javascript/typescript/actionscript
[🐤](https://wren.io/) - wren
[🐍](https://www.python.org/) - python


## other (sort of) related demos

Not all of these are public, so you may get a 404.

- [pakemon](https://github.com/notnullgames/pakemon) - prototyped ideas (in love) have been put here. This is the eventual target program for frontend.
- [nullos](https://github.com/notnullgames/nullos) - build SLD2/love optimized for pi0, and inject into raspbian
- [nullos-alpine](https://github.com/notnullgames/nullos-alpine) - ideas around similar, using alpine linux. I think raspbian/kali is probably a better base, but this is truly minimal.
- [pakemon-rust](https://github.com/notnullgames/pakemon-rust) - this is the start of some ideas about making a couple rust crates for frontend/backend, only backend is setup, and it's very incomplete
- [lol](https://github.com/notnullgames/lol) - the beggining of a simple RPG in Godot. Currently Godot does not perform well on pi0, but I have hope it will in the future
- [lol-love](https://github.com/notnullgames/lol-love) - the start of implementing a simple RPG in love, driven by tiled maps & other assets
- [denorat](https://github.com/notnullgames/denorat) - this is the basic server part of managing deployed RAT payloads, speaks over SSL-wrapped websockets
- [rattata](https://github.com/notnullgames/rattata) - start of rust-based manager of deployed RAT payloads. Uses tor + socket-server to obfuscate hacker's location 
- [amethyst-example](https://github.com/notnullgames/amethyst-example) - basic rust/amethyst boilerplate game
- [personality-builder](https://github.com/notnullgames/pakemon-personalitybuilder) - silly tool to allow you to edit a personality animation-set for pakemon