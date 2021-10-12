#!/usr/bin/env python3

from os import environ
environ['PYGAME_HIDE_SUPPORT_PROMPT'] = '1'

import pygame
import importlib
import os

import modules

# map inputs to "pressed" strings
def mapKeyInput(key):
  if key == pygame.K_UP:
    return 'up'
  if key == pygame.K_DOWN:
    return 'down'
  if key == pygame.K_LEFT:
    return 'left'
  if key == pygame.K_RIGHT:
    return 'right'
  if key == pygame.K_z:
    return 'a'
  if key == pygame.K_x:
    return 'b'
  if key == pygame.K_a:
    return 'x'
  if key == pygame.K_s:
    return 'y'
  if key == pygame.K_RETURN:
    return 'start'
  if key == pygame.K_ESCAPE:
    return 'back'
  if key == pygame.K_PAGEUP:
    return 'l'
  if key == pygame.K_PAGEDOWN:
    return 'r'

pygame.init()
screen = pygame.display.set_mode((320, 240), pygame.HWSURFACE | pygame.DOUBLEBUF, 32)
world = pygame.Surface((320, 240), pygame.SRCALPHA, 32)
pygame.event.set_allowed([pygame.QUIT, pygame.KEYDOWN, pygame.KEYUP])
pygame.display.set_caption("Pakémon")
pygame.mixer.init()
clock = pygame.time.Clock()
modules.setup()

oldTime = 0

font = pygame.font.SysFont(None, 24)

done = False
while not done:
  for event in pygame.event.get():
    if event.type == pygame.QUIT:
      done = True
    if event.type == pygame.KEYDOWN:
      try:
        button = mapKeyInput(event.key)
        if button:
          modules.modules[modules.current].pressed(button, event)
      except AttributeError:
        pass
    if event.type == pygame.KEYUP:
      try:
        button = mapKeyInput(event.key)
        if button:
          modules.modules[modules.current].released(button, event)
      except AttributeError:
        pass
  try:
    time = pygame.time.get_ticks()
    dt = time - oldTime
    oldTime = time
    modules.modules[modules.current].draw(world, time, dt)
  except AttributeError:
    pass

  # display fps
  # world.blit(font.render(str(int(clock.get_fps())), True, (255, 255, 255)), (0, 0))
  screen.fill((0, 0, 0))
  screen.blit(world, pygame.rect.Rect(0, 0, 320, 240))

  pygame.display.flip()
  clock.tick(60)

pygame.quit()