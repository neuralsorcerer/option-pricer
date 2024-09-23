import numpy as np
from scipy.stats import norm
from utils.distributions import get_distribution

def black_scholes_price(S, K, T, r, sigma, option_type='call'):
    d1 = (np.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)
    
    if option_type == 'call':
        return S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
    elif option_type == 'put':
        return K * np.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
    else:
        raise ValueError("Invalid option type. Use 'call' or 'put'.")

def monte_carlo_pricing(S, K, T, r, sigma, simulations=10000, option_type='call', dist='normal'):
    dt = T / simulations
    option_prices = []
    
    for _ in range(simulations):
        S_t = S
        for _ in range(int(simulations * dt)):
            distribution = get_distribution(dist)
            S_t += S_t * r * dt + S_t * sigma * np.sqrt(dt) * distribution()
        
        if option_type == 'call':
            option_prices.append(max(0, S_t - K))
        else:
            option_prices.append(max(0, K - S_t))
    
    return np.exp(-r * T) * np.mean(option_prices)
