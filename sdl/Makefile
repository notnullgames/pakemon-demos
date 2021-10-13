CXXFLAGS:=$(shell pkg-config --cflags sdl2 SDL2_ttf SDL2_image) $(CXXFLAGS)
LDLIBS:=$(shell pkg-config --libs sdl2 SDL2_ttf SDL2_image) $(LDLIBS)

all: SDL2Test

.PHONY: clean
clean:
	rm -f SDL2Test
