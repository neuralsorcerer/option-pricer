import axios from "axios";

interface OptionInputs {
  S: number;
  K: number;
  T: number;
  r: number;
  sigma: number;
  optionType: "call" | "put";
  simulations: number;
  dist: string;
}

export const fetchOptionPrice = async (inputs: OptionInputs) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/black-scholes",
    inputs
  );
  return response.data;
};

export const fetchMonteCarloPrice = async (inputs: OptionInputs) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/monte-carlo",
    inputs
  );
  return response.data;
};

export const fetchHeatmapData = async (inputs: {
  S_min: number;
  S_max: number;
  sigma_min: number;
  sigma_max: number;
  K: number;
  T: number;
  r: number;
  option_type: "call" | "put";
}) => {
  const response = await axios.post(
    "http://localhost:5000/api/v1/heatmap",
    inputs
  );
  return response.data;
};
