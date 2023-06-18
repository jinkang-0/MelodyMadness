from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import render
import base64
from scipy.io import wavfile
import io

def front(request):
    context = {}
    return render(request, "index.html", context)

@csrf_exempt
def melody(request):
    context = { 'test': 'hello world' }

    # handle post request
    if request.method == "POST":
        #  Replace with chat GPT output
        melody = [
            (60, 1), (62, 1), (64, 1), (65, 1), (67, 1), (69, 1), (71, 1), (72, 2),(71, 1), (69, 1), (67, 1), (65, 1), (64, 1), (62, 1), (60, 2), (72, 1), (74, 1), (76, 1), (77, 1), (79, 1)  
        ]

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

