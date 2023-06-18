from django.shortcuts import render


# Handle Traffic From Home Page of Chat Application
def home(request):
    return render(request, "chat_interface/chat_home.html")

def front(request):
    context = {}
    return render(request, "index.html", context)