from google.cloud import texttospeech as tts

def text_to_speech(text, lang, output_file_name):
    client = tts.TextToSpeechClient()
    synthesis_input = tts.SynthesisInput(text=text)
    voice = tts.VoiceSelectionParams(
        language_code=lang, 
        ssml_gender=tts.SsmlVoiceGender.NEUTRAL
    )
    audio_config = tts.AudioConfig(
        audio_encoding=tts.AudioEncoding.MP3
    )
    response = client.synthesize_speech(
        input=synthesis_input,
        voice=voice,
        audio_config=audio_config
    )

    with open(output_file_name, "wb") as out:
        out.write(response.audio_content)
        print(f"Audio written to {output_file_name}")

text_to_speech("Hello, world", "en-US", "output.mp3")
