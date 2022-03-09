enum scene {
    INTRO
};

// simple parallax layer system
typedef struct ParallaxLayer {
    Texture2D texture;
    float scroll;
} ParallaxLayer;

void ParallaxLayerScroll(struct ParallaxLayer* layer, float offset) {
    layer->scroll += offset;
    if (layer->scroll <= -layer->texture.width) layer->scroll = 0;
}

typedef struct Sprite {
     Texture2D texture;
     Vector2 frameSize;
     int maxFrame;
     int framesWide;
     Vector2 origin;
     int frame;
 } Sprite;

 void DrawSprite(Sprite* sprite, float x, float y, float ang, float scale, Color c) 
{
    float ox, oy;
    ox = (sprite->frame % sprite->framesWide) * sprite->frameSize.x;
    oy = (int)(sprite->frame / sprite->framesWide) * sprite->frameSize.y;
    DrawTexturePro(sprite->texture, (Rectangle){ox, oy, sprite->frameSize.x,sprite->frameSize.y}, 
                                    (Rectangle){x, y, sprite->frameSize.x * scale, sprite->frameSize.y * scale}, 
                                    (Vector2){sprite->origin.x * scale, sprite->origin.y * scale}, ang, c);

}


#include "scenes/scene_intro.h"