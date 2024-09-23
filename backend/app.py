from flask import Flask, jsonify, request
from flask_cors import CORS
from services.pricing import black_scholes_price, monte_carlo_pricing
from services.heatmap import generate_heatmap_data
from services.greeks import calculate_greeks

app = Flask(__name__)
CORS(app)

@app.route('/api/v1/black-scholes', methods=['POST'])
def price_option():
    try:
        data = request.json
        S = data.get('S')
        K = data.get('K')
        T = data.get('T')
        r = data.get('r')
        sigma = data.get('sigma')
        option_type = data.get('option_type', 'call')

        price = black_scholes_price(S, K, T, r, sigma, option_type)
        greeks = calculate_greeks(S, K, T, r, sigma, option_type)
        return jsonify({"option_price": price, "greeks": greeks})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('api/v1//monte-carlo', methods=['POST'])
def monte_carlo_price():
    try:
        data = request.json
        S = data.get('S')
        K = data.get('K')
        T = data.get('T')
        r = data.get('r')
        sigma = data.get('sigma')
        option_type = data.get('option_type', 'call')
        simulations = data.get('simulations', 10000)
        dist = data.get('dist', 'normal')

        price = monte_carlo_pricing(S, K, T, r, sigma, simulations, option_type, dist)
        return jsonify({"option_price": price})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('api/v1/heatmap', methods=['POST'])
def heatmap_data():
    try:
        data = request.json
        S_min = data.get('S_min')
        S_max = data.get('S_max')
        sigma_min = data.get('sigma_min')
        sigma_max = data.get('sigma_max')
        K = data.get('K')
        T = data.get('T')
        r = data.get('r')
        option_type = data.get('option_type', 'call')

        stock_prices, volatilities, prices = generate_heatmap_data(S_min, S_max, sigma_min, sigma_max, K, T, r, option_type)
        return jsonify({"stock_prices": stock_prices, "volatilities": volatilities, "prices": prices})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
