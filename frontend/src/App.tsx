import React, { useState } from "react";
import OptionForm from "./components/OptionForm";
import OptionResults from "./components/OptionResults";
import HeatmapChart from "./components/HeatmapChart";
import {
  fetchOptionPrice,
  fetchMonteCarloPrice,
  fetchHeatmapData,
} from "./services/optionService";
import Header from "./components/Header";
import Footer from "./components/Footer";

interface OptionInputs {
  S: number;
  K: number;
  T: number;
  r: number;
  sigma: number;
  optionType: "call" | "put";
  simulations: number;
  dist: "normal" | "lognormal";
}

interface Greeks {
  delta: number;
  gamma: number;
  vega: number;
  theta: number;
  rho: number;
}

const App: React.FC = () => {
  const initialInputs: OptionInputs = {
    S: 100,
    K: 100,
    T: 1,
    r: 0.05,
    sigma: 0.2,
    optionType: "call",
    simulations: 10000,
    dist: "normal",
  };

  const [inputs, setInputs] = useState<OptionInputs>(initialInputs);
  const [price, setPrice] = useState<number | null>(null);
  const [monteCarloPrice, setMonteCarloPrice] = useState<number | null>(null);
  const [greeks, setGreeks] = useState<Greeks | null>(null);
  const [heatmapData, setHeatmapData] = useState<any>(null);

  const handleFetchOptionPrice = async () => {
    try {
      const data = await fetchOptionPrice(inputs);
      console.log("API Response for Option Price:", data);
      setPrice(data.option_price);
      setGreeks(data.greeks);
    } catch (error) {
      console.error("Error fetching option price:", error);
    }
  };

  const handleFetchMonteCarloPrice = async () => {
    try {
      const data = await fetchMonteCarloPrice(inputs);
      console.log("API Response for Monte Carlo Price:", data);
      setMonteCarloPrice(data.option_price);
    } catch (error) {
      console.error("Error fetching Monte Carlo price:", error);
    }
  };

  const handleReset = () => {
    setInputs(initialInputs);
    setPrice(null);
    setMonteCarloPrice(null);
    setGreeks(null);
    setHeatmapData(null);
  };

  const handleFetchHeatmapData = async () => {
    const heatmapParams = {
      S_min: inputs.S - 50,
      S_max: inputs.S + 50,
      sigma_min: 0.1,
      sigma_max: 0.5,
      K: inputs.K,
      T: inputs.T,
      r: inputs.r,
      option_type: inputs.optionType,
    };
    try {
      const data = await fetchHeatmapData(heatmapParams);
      console.log("API Response for Heatmap Data:", data);
      setHeatmapData(data);
    } catch (error) {
      console.error("Error fetching heatmap data:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <OptionForm
          inputs={inputs}
          setInputs={setInputs}
          fetchOptionPrice={handleFetchOptionPrice}
          fetchMonteCarloPrice={handleFetchMonteCarloPrice}
          fetchHeatmapData={handleFetchHeatmapData}
        />
        <div className="flex flex-col items-center w-full max-w-lg mx-auto p-4 mb-10">
          <button
            onClick={handleReset}
            className="bg-red-500 text-white p-2 rounded-lg w-full max-w-lg mt-4"
          >
            Reset All
          </button>
        </div>

        <OptionResults
          price={price}
          monteCarloPrice={monteCarloPrice}
          greeks={greeks}
        />

        <HeatmapChart heatmapData={heatmapData} />
      </main>

      <Footer />
    </div>
  );
};

export default App;
