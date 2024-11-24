from flask import Flask
from transformers import pipeline

app = Flask(__name__)
generator = pipeline('text-generation', model='openai-community/gpt2')

@app.route("/")
def hello_world():
    output = generator("Hello, world! I")
    return output[0]['generated_text']
