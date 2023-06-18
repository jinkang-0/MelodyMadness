from django.shortcuts import render

# Handle Traffic From Home Page of Chat Application
def home(request):
    return render(request, "chat_interface/chat_home.html")
