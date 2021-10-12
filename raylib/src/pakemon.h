enum scene {
    INTRO
};

// simple parallax layer system
typedef struct ParallaxLayer {
    Texture2D texture;
    float scroll;
} ParallaxLayer;

void ParallaxLayerScroll(struct ParallaxLayer *layer, float offset) {
    layer->scroll += offset;
    if (layer->scroll <= -layer->texture.width) layer->scroll = 0;
}


#include "scenes/scene_intro.h"