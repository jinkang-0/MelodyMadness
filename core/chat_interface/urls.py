from django.urls import path
from . import views

urlpatterns = [
    path("api/melody", views.melody, name="melody"),
    path("api/lyrics", views.lyrics, name="lyrics"),
    path("", views.front, name="main")
]
