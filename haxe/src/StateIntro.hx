package;

import flixel.FlxState;
import flixel.FlxG;
import flixel.FlxSprite;
import flixel.text.FlxText;
import flixel.tweens.FlxTween;
import flixel.util.FlxColor.*;
import flixel.addons.display.FlxBackdrop;
import flixel.system.FlxSound;

class StateIntro extends FlxState {
  override public function create() {
    super.create();
    FlxG.mouse.visible = false;
    FlxG.autoPause = false;
    
    // it's a shame I had to convert this from a mod file
    // should look into loading mods directly
    FlxG.sound.playMusic("assets/the_golden_ages.ogg", 1, true);

    // parallax images: each layer manages it's own scroll/tile
    var cityBg = new FlxBackdrop("assets/far-buildings.png", 0, 0, true, false);
    cityBg.velocity.set(-1, 0);
    add(cityBg);

    var cityFg = new FlxBackdrop("assets/back-buildings.png", 0, 0, true, false);
    cityFg.velocity.set(-15, 0);
    cityFg.y = -20;
    add(cityFg);

    var fg = new FlxBackdrop("assets/foreground.png", 0, 0, true, false);
    fg.velocity.set(-60, 0);
    fg.y = 50;
    add(fg);

    // running cat sprite animation
    var cat = new Cat(150, 200);
    cat.animation.play("run");
    add(cat);

    // add hidden txtStart
    var txtStart = new FlxText(0, 0, 0, "PRESS START", 12);
    txtStart.screenCenter();
    txtStart.alpha = 0;
    add(txtStart);

    // recursive tween to flash txtStart (after imgTitle triggers it)
    function flashText() {
      FlxTween.color(txtStart, 1, TRANSPARENT, WHITE, {
        onComplete: function(_){
          FlxTween.color(txtStart, 1, TRANSPARENT, WHITE, {
            onComplete: function(_){
              flashText();
            }
          });
        }
      });
    }

    // add offscreen logo
    var imgTitle = new FlxSprite();
    imgTitle.loadGraphic("assets/title.png");
    imgTitle.screenCenter();
    imgTitle.y = -1 * imgTitle.height;
    add(imgTitle);

    // move imgTitle towards center of screen, then trigger flashing txtStart
    FlxTween.tween(imgTitle, { y: 45 },15, {
      onComplete: function(_){
        flashText();
      }
    });
  }

  override public function update(elapsed:Float) {
    super.update(elapsed);
    if (FlxG.keys.pressed.ENTER || FlxG.keys.pressed.Z || FlxG.keys.pressed.X) {
      FlxG.switchState(new StateNetTest());
    }
  }
}