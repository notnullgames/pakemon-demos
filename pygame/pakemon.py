# base for plugins

import os
import pygame

class PluginBase (object):
  def load_assets(self, assets):
    for v in assets:
      fullname, ext = os.path.splitext(os.path.abspath(os.path.join(self.basedir, v)))
      name = os.path.basename(fullname)
      if ext == ".jpg" or ext == ".png" or ext == ".gif" or ext == ".bmp":
        self.assets[name] = pygame.image.load("%s%s" % (fullname, ext))
      elif ext == ".ogg" or ext == ".wav":
        self.assets[name] = pygame.mixer.Sound("%s%s" % (fullname, ext))
      else:
        self.assets[name] = "%s%s" % (fullname, ext)

class SpriteSheet (object):
  def __init__(self, image, size, animations = None, speed = 1/600):
    self.image = image
    self.size = size
    self.animations = animations
    self.surface = pygame.Surface([size, size]).convert_alpha()
    self.speed = speed
    self.time = 0
  
  def get(self, x, y):
    """ get sprite at x/y """
    self.surface.fill((255,255,255,0))
    self.surface.blit(self.image, (0, 0), (x * self.size, y * self.size, self.size, self.size))
    return self.surface
  
  def animation(self, name, dt):
    """ Get 1 frame of an animation, by name """
    self.time = (dt * self.speed)
    frame = int(self.time % len(self.animations[name]))
    return self.get(self.animations[name][frame][0], self.animations[name][frame][1])
  
