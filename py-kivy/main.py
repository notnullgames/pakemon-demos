#!/usr/bin/env python

import kivy
kivy.require('2.0.0')

from kivy.app import App
from kivy.uix.label import Label
from kivy.core.window import Window

Window.size = (320, 240)


class Pakemon(App):
    title = 'Pakémon'
    def build(self):
        return Label(text='Hello world')


if __name__ == '__main__':
    Pakemon().run()