package;

import flixel.FlxState;
import flixel.FlxG;
import flixel.system.FlxSound;
import haxe.net.WebSocket;
import flixel.text.FlxText.FlxTextAlign;

class StateNetTest extends FlxState {
  var ws:WebSocket;

  override public function create() {
    super.create();
    FlxG.mouse.visible = false;
    FlxG.autoPause = false;

    FlxG.sound.music.stop();

    var text = new flixel.text.FlxText(0, 0, 300, "Check the console. I am trying to connect to websocket service on port 8000.", 10);
    text.screenCenter();
    text.alignment = FlxTextAlign.CENTER;
    add(text);

    this.ws = WebSocket.create("ws://127.0.0.1:8000/");
    var ws = this.ws;
    
    ws.onopen = function() {
      trace('open!');
      ws.sendString('hello friend!');
      ws.sendString('hello my dearest friend! this is a longer message! which is longer than 126 bytes, so it sends a short instead of just a single byte. And yeah, it should be longer thant that by now!');
      var s = 'message longer than 64k';
      while(s.length < 100000) s = '$s, $s';
      ws.sendString(s);
      ws.sendString('message length was ${s.length}');
    };
    
    ws.onmessageString = function(message) {
      trace('message from server!' + (message.length > 200 ? message.substr(0, 200) + '...' : message));
      trace('message.length=' + message.length);
    };
  }

  override public function update(elapsed:Float) {
    super.update(elapsed);
    #if sys
      this.ws.process();
    #end
  }
}