.PHONY: help pakemon payload clean build

#: Show this help
help:
	@cat $(MAKEFILE_LIST) | deno run -q https://deno.land/x/makehelp@0.0.1/help.ts

#: Run pakemon
run:
	deno run --allow-all --unstable --quiet pakemon.ts

#: Build binaries for mac, windows & linux
build: dist/linux/x86_64/pakemon dist/windows/x86_64/pakemon.exe dist/osx/x86_64/pakemon dist/osx/aarch64/pakemon

#: Clean built files
clean:
	rm -rf dist

dist/linux/x86_64/pakemon: pakemon.ts
	mkdir -p dist/linux/x86_64/
	deno compile --allow-all --unstable --target x86_64-unknown-linux-gnu --output dist/linux/x86_64/pakemon pakemon.ts

dist/windows/x86_64/pakemon.exe: pakemon.ts
	mkdir -p dist/windows/x86_64
	deno compile --allow-all --unstable --target x86_64-pc-windows-msvc --output dist/windows/x86_64/pakemon pakemon.ts

dist/osx/x86_64/pakemon: pakemon.ts
	mkdir -p dist/osx/x86_64
	deno compile --allow-all --unstable --target x86_64-apple-darwin --output dist/osx/x86_64/pakemon pakemon.ts

dist/osx/aarch64/pakemon: pakemon.ts
	mkdir -p dist/osx/aarch64
	deno compile --allow-all --unstable --target aarch64-apple-darwin --output dist/osx/aarch64/pakemon pakemon.ts