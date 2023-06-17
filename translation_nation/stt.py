# @source https://cloud.google.com/speech-to-text/v2/docs/sync-recognize

from google.cloud.speech_v2 import SpeechClient
from google.cloud.speech_v2.types import cloud_speech

def transcribe_file(proj_id: str, recognizer_id: str, audio_file: str, lang: list) -> cloud_speech.RecognizeResponse:
    client = SpeechClient()
    request = cloud_speech.CreateRecognizerRequest(
        parent=f"projects/{proj_id}/locations/global",
        recognizer_id=recognizer_id,
        recognizer=cloud_speech.Recognizer(
            language_codes=lang,
            model="latest_long"
        ),
    )
    operation = client.create_recognizer(request=request)
    recognizer = operation.result()

    with open(audio_file, "rb") as f:
        content = f.read()

    config = cloud_speech.RecognitionConfig(auto_decoding_config={})
    request = cloud_speech.RecognizeRequest(
        recognizer=recognizer.name,
        config=config,
        content=content,
    )

    response = client.recognize(request=request)

    out = [w for w in response.results]
    print(out)

    return response


