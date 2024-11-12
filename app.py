from flask import Flask, jsonify
from transformers import pipeline

app = Flask(__name__)
generator = pipeline('text-generation', model='openai-community/gpt2')

@app.route("/")
def hello_world():
    output = generator("Hello, world!")
    return jsonify(output)
