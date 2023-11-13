from flask import Flask, jsonify, request
import random
from googleapiclient.discovery import build
import requests
from flask_cors import CORS
from google.cloud import translate
from dotenv import load_dotenv
import os

load_dotenv("api_keys.env")  # access the env file where we store the private info
app = Flask(__name__)
api_key = os.environ.get("GOOGLE_API_KEY")  # key for Google Translate API
service = build('translate', 'v2', developerKey=api_key)

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
    target_language = request.args.get('target', 'es')  # es is espanol, just a placeholder for now, down the line will be according to user preference

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

    # return the original and translated word and definition in JSON format
    return jsonify({
        'original_word': random_word,
        'original_definition': first_definition,
        'translated_word': translated_word,
        'translated_definition': translated_definition
    })


if __name__ == '__main__':
    app.run(debug=True)
