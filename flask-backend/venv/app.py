from flask import Flask, jsonify, request
import random
from googleapiclient.discovery import build
import requests
from flask_cors import CORS
from google.cloud import translate
from dotenv import load_dotenv
import os
from pymongo import MongoClient
from bson import ObjectId  # Import ObjectId from the `bson` module
from firedb import *



load_dotenv("api_keys.env")  # access the env file where we store the private info
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:4200"}})
api_key = os.environ.get("GOOGLE_API_KEY")  # key for Google Translate API
service = build('translate', 'v2', developerKey=api_key)

# Connect to MongoDB
client = MongoClient('mongodb+srv://senacs411:EBIuHS9jfhcp2nzR@cluster0.mnf9keq.mongodb.net/', tls=False)
db = client['senacs411']  # name for MongoDB database
flashcards_collection = db['flashcards']  # Creating a flashcards_collection for flashcards in the database
users_collection = db['users']

# open the file and parse it, store all the words in the file in an array
file_path = '1-1000.txt'
with open(file_path, 'r') as file:
    words = file.readlines()
words = [word.strip() for word in words]


def translate_text(text, target_language, google_translate_api_key):
    """ helper function that does the translating given the text and the language
        to translate that text to
    """

    url = "https://translation.googleapis.com/language/translate/v2"  # url of the translate api
    data = {
        'q': text,
        'target': target_language,
        'key': google_translate_api_key
    }

    response = requests.post(url, data=data)  # call
    return response.json()  # format the results of the call into JSON


@app.route('/api/word-info', methods=['GET'])  # our api endpoint
def get_word_info():
    # select a random word from the list
    email = request.args.get("email")
    language = request.args.get("language")
    random_word = random.choice(words)

    # get the definition from the Dictionary API
    dict_api_url = f"https://api.dictionaryapi.dev/api/v2/entries/en/{random_word}"
    definition_response = requests.get(dict_api_url)
    
    # check if we can fetch the definition from the dictionary api
    if definition_response.status_code != 200:
        return jsonify({'error': 'Failed to fetch definition'}), definition_response.status_code

    # parse the definition data
    definition_data = definition_response.json()
    first_definition = definition_data[0]['meanings'][0]['definitions'][0]['definition']

    # get the target language for translation from the query string
    target_language = request.args.get('target', language)  # es is espanol, just a placeholder for now, down the line will be according to user preference

    # translate the word and its definition using the Google Translate API
    google_translate_api_key = api_key
    translated_word_response = translate_text(random_word, target_language, google_translate_api_key)  # word translation
    translated_definition_response = translate_text(first_definition, target_language, google_translate_api_key)  # definition translation

    # check for errors in the translation response
    if 'error' in translated_word_response or 'error' in translated_definition_response:
        return jsonify({'error': 'Translation failed'}), 500

    # parse the results from Google Translate API
    translated_word = translated_word_response['data']['translations'][0]['translatedText']
    translated_definition = translated_definition_response['data']['translations'][0]['translatedText']

    # Insert the flashcard data into MongoDB
    flashcard_data = {
        'original_word': random_word,
        'original_definition': first_definition,
        'translated_word': translated_word,
        'translated_definition': translated_definition
    }
    currData = retrieveData(email)
    print(currData)
    if(currData[0]==""):
        currData = [flashcard_data]
    else:
        currData.append(flashcard_data)
    replaceData(email,currData)


    #insert_result = flashcards_collection.insert_one(flashcard_data)

    # Convert ObjectId to string before returning JSON
    #flashcard_data['_id'] = str(insert_result.inserted_id)


    # Check if the insertion was successful. If t is successful returns flashcard_data in JSON format
    #if insert_result.inserted_id:
    return jsonify(flashcard_data), 200
    #else:
        #return jsonify({'error': 'Failed to insert flashcard into MongoDB'}), 500
@app.route('/api/flashcard-list', methods=['GET'])  # our api endpoint
def get_word_info():
    # select a random word from the list
    email = request.args.get("email")
    
    currData = retrieveData(email)
    return jsonify(result = currData), 200

@app.route('/api/add-to-list', methods=['GET'])  # our api endpoint
def get_word_info():
    # select a random word from the list
    email = request.args.get("email")
    data = request.args.get("data")

    currData = retrieveData(email)
    if(currData[0]==""):
        currData = data
    else:
        currData.append(data)
    replaceData(email,currData)
    return jsonify(data), 200

@app.route("/api/register", methods=["POST"])
def register_user():
    data = request.json

    # Extract user data from the request
    uid = data.get("uid")
    email = data.get("email")
   
    # Perform user registration logic (e.g., create user in MongoDB)
    addUser(uid,email)


    
    # Insert user data into MongoDB

    # Return a response based on the registration result
    return jsonify({"message": "User registered successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)