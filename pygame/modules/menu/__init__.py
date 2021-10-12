import os
import sys
import pygame

sys.path.append("../..")
import pakemon

font = pygame.font.SysFont(None, 30)
white = (255, 255, 255)


def menuAction1():
  print("menu item 1 chosen")

def menuAction2():
  print("menu item 2 chosen")

def menuAction3():
  print("menu item 3 chosen")

def menuAction4():
  print("menu item 4 chosen")

menu_items = [
  ("menu1", menuAction1),
  ("menu2", menuAction2),
  ("menu3", menuAction3),
  ("menu4", menuAction4)
]

class Plugin( pakemon.PluginBase ):
  def __init__(self):
    self.menu = [font.render(i[0], True, white) for i in menu_items]

  # called when the module is loaded
  def load(self):
    self.selection = 0

  # called in main game-loop
  def draw(self, world, time, dt):
    world.fill((0, 0, 0))
    y = 10
    for item in self.menu:
      world.blit(item, (30, y))
      y += 22
    pygame.draw.circle(world, white, (20, (self.selection * 22) + 20), 5)

  # called when input is pressed
  def pressed(self, button, event):
    if button == "down":
      self.selection = (self.selection + 1) % len(self.menu)
    if button == "up":
      self.selection = (self.selection - 1) % len(self.menu)
    if button == "a":
      menu_items[self.selection][1]()
