import qs
from common import *

def init():
    qs.init_anims([
        ["cat-right", "cat-run-right.png", 6, 1.5]
    ])
    return None

def onload(_):
    pass

def update(state):
    pass

def draw(state):
    qs.clear(BLACK)
    qs.anim("cat-right", rect=[[150, 160], [32.0, 32.0]])
