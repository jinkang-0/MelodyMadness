from django.urls import path
from . import views

urlpatterns = [
    path("api/melody", views.melody, name="melody"),
    path("", views.front, name="main")
]
