import os
import sys

sys.path.append("../..")
import pakemon

class Plugin( pakemon.PluginBase ):
  def __init__(self):
    self.basedir = os.path.dirname(os.path.abspath(__file__))
    self.assets = {}

  # called when the module is loaded
  def load(self):
    pass

  # called in main game-loop
  def draw(self, world, time, dt):
    pass

  # called when input is pressed
  def pressed(self, button, event):
    pass

  # called when input is released
  def released(self, button, event):
    pass