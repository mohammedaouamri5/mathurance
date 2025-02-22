import os
from flask import Blueprint, request, jsonify
import pandas as pd
import numpy as np

model1 = Blueprint('model1', __name__)

# Get the absolute path of the current script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, '..', 'data.csv')

try:
    df = pd.read_csv(CSV_PATH)
except FileNotFoundError:
    df = None  # Avoid crashing if the file is missing
    print(f"Error: data.csv not found at {CSV_PATH}")

def haversine_m(lon1, lat1, lon2, lat2):
    lon1, lat1, lon2, lat2 = map(np.radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = np.sin(dlat / 2.0) ** 2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon / 2.0) ** 2
    c = 2 * np.arcsin(np.sqrt(a))
    r = 6371000  # Earth's radius in meters
    return c * r

@model1.route('/', methods=['POST'])
def get_numbers():
    if df is None:
        return jsonify({"error": "data.csv not found"}), 500

    data = request.get_json()
    ref_lon = data.get("lon")
    ref_lat = data.get("lat")
    radius = data.get("radius")

    if None in (ref_lon, ref_lat, radius):
        return jsonify({"error": "Please provide lon, lat, and radius"}), 400

    df['distance_m'] = df.apply(
        lambda row: haversine_m(ref_lon, ref_lat, row['LONG_WGS84'], row['LAT_WGS84']),
        axis=1
    )
    points = df[df['distance_m'] <= radius]
    count = points.shape[0]

    return jsonify({
        "reference_point": {"lon": ref_lon, "lat": ref_lat},
        "radius_meters": radius,
        "points_within_radius": count
    })
