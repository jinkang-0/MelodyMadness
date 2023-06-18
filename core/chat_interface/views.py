from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.shortcuts import render


def front(request):
    context = {}
    return render(request, "index.html", context)

@csrf_exempt
def melody(request):
    context = { 'test': 'hello world' }

    # handle post request
    if request.method == "POST":
        return HttpResponse("test:helloworld")
        # return render(request, 'index.html', { "data": data })
            # # Chat GPT magic
            # melody = [
            #     (60, 1), # C4 (middle C), quarter note
            #     (62, 1), # D4, quarter note
            #     (64, 1), # E4, quarter note
            #     (65, 1), # F4, quarter note
            #     (67, 1), # G4, quarter note
            #     (69, 1), # A4, quarter note
            #     (71, 1), # B4, quarter note
            #     (72, 2), # C5 (1 octave above middle C), half note
            #     (71, 1), # B4, quarter note
            #     (69, 1), # A4, quarter note
            #     (67, 1), # G4, quarter note
            #     (65, 1), # F4, quarter note
            #     (64, 1), # E4, quarter note
            #     (62, 1), # D4, quarter note
            #     (60, 2), # C4, half note
            #     (72, 1), # C5, quarter note
            #     (74, 1), # D5, quarter note
            #     (76, 1), # E5, quarter note
            #     (77, 1), # F5, quarter note
            #     (79, 1)  # G5, quarter note
            # ]

            # midi.export_midi(midi.generate_midi(480, melody, 0), 100, 'output.wav')
            # return render(request, "index.html", { "audioFile": path.realpath('output.wav') })

    return render(request, "index.html", context)

