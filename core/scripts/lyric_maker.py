import os
import openai
from dotenv import load_dotenv, dotenv_values
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


# Initialize Environment Variables
load_dotenv()
keys = dotenv_values(".env.local")

# Initialize Mongo Database Connection
uri = keys["MONGO_URI"]
client = MongoClient("mongodb+srv://builthigher:IEdj8iMmYdpf6h37@cluster0.spcjo5b.mongodb.net/?retryWrites=true&w=majority", server_api=ServerApi("1"))
database = client["ai_musician"]
collection = database["musicians"]

# Initialize AI Variables
openai.api_key = keys["OPEN_AI_KEY"]

def scrape_songs(artist):
    lyrics = ""
    attributes = collection.find({"name":f"{artist}"})
    for attribute in attributes:
        for song, lyric in zip(attribute["songs"], attribute["lyrics"]):
            lyrics += f"EXAMPLE SONG: {song}\nEXAMPLE LYRICS: {lyric}"
            lyrics += "\n"

    return lyrics


def generate_prompt(artist):
    return f'''Pretend that you are an up and coming artist and create a totally unique hit song inspired by {artist}.\nHere are some of their greatest works for inspiration!
    {scrape_songs(artist)}
        '''

response = openai.Completion.create(
  model="text-davinci-003",
  prompt=generate_prompt("Tupac"),
  temperature=1,
  max_tokens=800,
  top_p=1,
  frequency_penalty=0.0,
  presence_penalty=0.0
)

print(response.choices[0].text)