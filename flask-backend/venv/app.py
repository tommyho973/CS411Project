from flask import Flask, jsonify, request
from flask_cors import CORS
from google.cloud import translate
import requests
import os

app = Flask(__name__)
CORS(app)
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'trip-scheduler-404017-e671d9f2fd51.json'
translate_client = translate.Client()

@app.route('/api/translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    text = data.get('text', '')
    target_language = data.get('target_language', 'en')

    result = translate_client.translate(text, target_language=target_language)

    translated_text = result['input']
    detected_language = result['detectedSourceLanguage']

    response_data = {
        'translated_text': translated_text,
        'detected_language': detected_language
    }

    return jsonify(response_data)

@app.route('/api/data')
def get_data():
    data = {'message': 'This is data from the Flask backend!'}
    return jsonify(data)




if __name__ == '__main__':
    app.run()