"""
This module creates the initial intro screen
"""

import os
import sys
import pygame

sys.path.append("../..")
import pakemon
import modules

class Plugin( pakemon.PluginBase ):
  def __init__(self):
    self.step = 0
    self.speed = 0.0044
    self.down = -60
    self.basedir = os.path.dirname(os.path.abspath(__file__))
    self.assets = {}
    
    # text that says "start"
    font = pygame.font.SysFont(None, 24)
    self.start = font.render('start', True, (255, 255, 255))

    # preload some assets
    self.load_assets([
      "assets/notnullgames.ogg",
      "assets/logo-white.png",
      "assets/title.png",
      "assets/far-buildings.png",
      "assets/back-buildings.png",
      "assets/foreground.png",
      "assets/personality.png",
      "assets/the_golden_ages.mod"
    ])
    self.cat = pakemon.SpriteSheet(self.assets['personality'], 32, {
      'run': [ [0,6], [1,6], [2,6], [3,6], [4,6], [5,6] ]
    })
    
    # get the dimensions of images
    self.sizes = {}
    for i in self.assets:
      if type(self.assets[i]) == pygame.Surface:
        self.sizes[i] = self.assets[i].get_size()
  
  # called when input is pressed
  def pressed(self, button, event):
    # get the main demo rolling
    if button == "b" or button == "a" or button == "start":
      if self.step == 1:
        pygame.mixer.music.load(self.assets["the_golden_ages"])
        pygame.mixer.music.play()
        self.step = 2
      elif self.step == 2:
        modules.current = "menu"
  
  def draw(self, world, time, dt):
    world.fill((0, 0, 0))
    
    # play sound, trigger logo
    if self.step == 0:
      self.assets['notnullgames'].play()
      self.step = 1

    # show logo
    elif self.step == 1:
      world.blit(self.assets['logo-white'], (50, 10))
    
    # move logo down & scroll parallax layers
    elif self.step == 2:
      o1 = (time * self.speed * 0.25 * -1.0) % self.sizes['far-buildings'][0]
      world.blit(self.assets['far-buildings'], (o1, 0))
      world.blit(self.assets['far-buildings'], (o1 - self.sizes['far-buildings'][0], 0))

      o2 = (time * self.speed * 0.5 * -1.0) % self.sizes['back-buildings'][0]
      world.blit(self.assets['back-buildings'], (o2, -10))
      world.blit(self.assets['back-buildings'], (o2 - self.sizes['back-buildings'][0], -10))
      
      o3 = (time * self.speed * 4.0 * -1.0) % self.sizes['foreground'][0]
      world.blit(self.assets['foreground'], (o3, 50))
      world.blit(self.assets['foreground'], (o3 - self.sizes['foreground'][0], 50))
      
      if self.down < 40:
        self.down = self.down + (dt * self.speed * 1.6)
      else:
        world.blit(self.start, (140, 100))
      
      world.blit(self.assets['title'], (80, self.down))

      world.blit(self.cat.animation("run", time), (140, 195))

