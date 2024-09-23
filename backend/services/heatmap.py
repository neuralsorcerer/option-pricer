import numpy as np
from services.pricing import black_scholes_price

def generate_heatmap_data(S_min, S_max, sigma_min, sigma_max, K, T, r, option_type="call", steps=50):
    stock_prices = np.linspace(S_min, S_max, steps)
    volatilities = np.linspace(sigma_min, sigma_max, steps)
    
    heatmap_data = []
    
    for S in stock_prices:
        row = []
        for sigma in volatilities:
            price = black_scholes_price(S, K, T, r, sigma, option_type)
            row.append(price)
        heatmap_data.append(row)
    
    return stock_prices.tolist(), volatilities.tolist(), heatmap_data
