# Pakémon

Short for "packet monitor/monster". Gamified fun device/platform for hacking technology around you.

This version is made with [pyckitup](https://github.com/RustPython/pyckitup).

## installation

You will need `pyckitup` in your path. I installed it in mac, like this:

```
git clone https://github.com/RustPython/pyckitup.git
cd pyckitup
cargo build --release
cp target/release/pyckitup /usr/local/bin/
```

## running

```
pyckitup run --size 320x240 # run local version
pyckitup build              # build a web version
```

Currently, `pyckitup build` doesn't work. It's kind of a low priority for now, as there will be other things added on & restructured in the runtime.
