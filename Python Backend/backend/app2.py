from cgitb import text
from crypt import methods
from flask import Flask, jsonify, request
from transformers import pipeline

emotion = pipeline('sentiment-analysis', model='arpanghoshal/EmoRoBERTa')
app = Flask(__name__)


@app.route('/add', methods=['POST'])
def add_data():
    textString = request.json["msgString"]
    print(textString)
    emotion_labels = emotion(textString)
    labelemotion = emotion_labels[0]
    return jsonify(labelemotion)


if __name__ == "__main__":
    app.run(host='192.168.18.29', port=4000, debug=True)
