from kivy.uix.widget import Widget
from kivy.graphics import Rectangle


class Scene(Widget):
  def __init__(self, **kwargs):
    super().__init__(**kwargs)
    with self.canvas:
      Rectangle(source="assets/title.png", pos=(89, 120), size=(158, 62))