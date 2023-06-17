from django.shortcuts import render
from django.http import HttpResponse

# Handle Traffic From Home Page of Chat Application
def home(request):
    return HttpResponse("<h1> Blog Home </h1>")
