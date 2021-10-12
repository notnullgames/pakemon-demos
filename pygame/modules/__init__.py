import os
import importlib
import sys

dirname = os.path.dirname(os.path.abspath(__file__))

modules = {}
moduleNames = [ m for m in os.listdir(dirname) if m[0] != "." and m[0] != "_"]

current = "intro"

# default handler for missing functions
def noop(*args):
  pass

def setup():
  sys.path.append(dirname)
  for module in moduleNames:
    modules[module] = importlib.import_module(module).Plugin()
  
  # call module's load function
  for module in moduleNames:
    if not hasattr(modules[module], "load"):
      modules[module].load = noop
    if not hasattr(modules[module], "draw"):
      modules[module].draw = noop
    if not hasattr(modules[module], "pressed"):
      modules[module].pressed = noop
    if not hasattr(modules[module], "released"):
      modules[module].released = noop
    modules[module].load()