import os
import openai

openai.api_key = os.getenv("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")

def generate_prompt(artist):
    return f"Create a new"


chat_completion = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=[{"role": "user", "content": "Hello world"}])

