from flask import Flask
# from flask_cors import CORS
from routes.model1 import model1  # Import the model1 route
from routes.upload import upload_bp  # type: ignore # Ensure this is correctly named

app = Flask(__name__)
# CORS(app)  # Enable CORS for frontend communication

# Register Blueprints
app.register_blueprint(model1, url_prefix='/model1')
app.register_blueprint(upload_bp, url_prefix='/upload')  # Register upload route

@app.route('/')
def home():
    return {"message": "Welcome to Flask API!"}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=6000)  # Run on port 6000
