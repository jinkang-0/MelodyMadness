from django.urls import path, re_path
from . import views

urlpatterns = [
    path("api/melody", views.melody, name="melody"),
    path("api/lyrics", views.lyrics, name="lyrics"),
    path("api/artists", views.artists, name="artists"),
    path("", views.front, name="home"),
    re_path(r"^.*/$", views.front, name="main")
]
