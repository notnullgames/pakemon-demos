#!/usr/bin/env python

import kivy
kivy.require('2.0.0')

from kivy.app import App
from kivy.uix.label import Label
from kivy.core.window import Window

from scenes.intro import Scene as SceneIntro



Window.size = (320, 240)

class PakemonApp(App):
    title = 'Pakémon'
    def build(self):
        return SceneIntro()


if __name__ == '__main__':
    PakemonApp().run()