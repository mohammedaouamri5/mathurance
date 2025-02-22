from flask import Flask, request, jsonify
import pandas as pd
import numpy as np

app = Flask(name)

df = pd.read_csv('data.csv')  

def haversine_m(lon1, lat1, lon2, lat2):
    # Convert degrees to radians
    lon1, lat1, lon2, lat2 = map(np.radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1 
    dlat = lat2 - lat1 
    a = np.sin(dlat/2.0)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon/2.0)**2
    c = 2 * np.arcsin(np.sqrt(a))
    r = 6371000  # Earth's radius in meters
    return c * r

@app.route('/points', methods=['GET'])
def points_within_radius():
    # Retrieve query parameters (e.g., /points?lon=-73.935242&lat=40.730610&radius=1000)
    try:
        ref_lon = float(request.args.get('lon'))
        ref_lat = float(request.args.get('lat'))
        radius = float(request.args.get('radius'))
    except (TypeError, ValueError):
        return jsonify({"error": "Please provide valid 'lon', 'lat', and 'radius' parameters."}), 400

    # Calculate the distance from the reference point to each point in the dataset
    # (Using DataFrame.apply can be slow for very large datasets, consider vectorized approaches if needed.)
    df['distance_m'] = df.apply(
        lambda row: haversine_m(ref_lon, ref_lat, row['LONG_WGS84'], row['LAT_WGS84']),
        axis=1
    )

    # Filter rows where the distance is within the given radius
    points = df[df['distance_m'] <= radius]
    count = points.shape[0]

    return jsonify({
        "reference_point": {"lon": ref_lon, "lat": ref_lat},
        "radius_meters": radius,
        "points_within_radius": count
    })

if name == 'main':
    app.run(debug=True)