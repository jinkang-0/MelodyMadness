from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpRequest
from django.shortcuts import render
import base64
from scipy.io import wavfile
from scripts import midi
from scripts.lyric_maker import generate_melody, generate_lyrics, get_artists
import io
import json

def front(request):
    context = {}
    return render(request, "index.html", context)

@csrf_exempt
def melody(request):
    context = {}

    # handle post request
    if request.method == "POST":
        user_prompt = json.loads(request.body.decode())['prompt']
        melody = generate_melody(user_prompt)

        mid = midi.generate_midi(480, melody, 0)
        midi.export_midi(mid, 100, 'output.wav')
        
        # send file
        # @source https://gist.github.com/hadware/8882b980907901426266cb07bfbfcd20
        with open('output.wav', 'rb') as f:
            input_wav = f.read()

        rate, data = wavfile.read(io.BytesIO(input_wav))
        reversed_data = data[::-1]
        bytes_io = io.BytesIO(bytes())
        wavfile.write(bytes_io, rate, reversed_data)

        output_wav = bytes_io.read()
        encoded_string = base64.b64encode(output_wav).decode("ascii")

        return JsonResponse({ "audioFile": encoded_string })

    return render(request, "index.html", context)


@csrf_exempt
def lyrics(request):
    if request.method == 'POST':
        selected_artist = request.POST.get("artist")
        return JsonResponse({ "lyrics": generate_lyrics(selected_artist) })
    else:
        return JsonResponse({ "artists": get_artists() })

