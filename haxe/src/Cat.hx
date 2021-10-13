import flixel.FlxSprite;

class Cat extends FlxSprite {
  public function new(xPos:Int = 0, yPos:Int = 0, animationSpeed:Int = 4) {
    super(xPos, yPos);
    loadGraphic("assets/cat.png", true, 32, 32);

    // TODO: remove deuplicate animations (mirrored) form image
    animation.add("run", [ 36, 37, 38, 39, 40, 41], animationSpeed);
  }
}
