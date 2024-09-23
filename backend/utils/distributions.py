import numpy as np

def get_distribution(dist_type):
    if dist_type == 'lognormal':
        return lambda: np.random.lognormal()
    else:
        return lambda: np.random.randn()
