import React from "react";

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

interface Props {
  inputs: OptionInputs;
  setInputs: React.Dispatch<React.SetStateAction<OptionInputs>>;
  fetchOptionPrice: () => void;
  fetchMonteCarloPrice: () => void;
  fetchHeatmapData: () => void;
}

const OptionForm: React.FC<Props> = ({
  inputs,
  setInputs,
  fetchOptionPrice,
  fetchMonteCarloPrice,
  fetchHeatmapData,
}) => {
  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-4">
      <div className="mb-4 w-full">
        <label className="block text-gray-700">Spot Price (S)</label>
        <input
          type="number"
          value={inputs.S}
          onChange={(e) =>
            setInputs({ ...inputs, S: parseFloat(e.target.value) })
          }
          className="p-2 border rounded-lg w-full"
        />
      </div>

      <div className="mb-4 w-full">
        <label className="block text-gray-700">Strike Price (K)</label>
        <input
          type="number"
          value={inputs.K}
          onChange={(e) =>
            setInputs({ ...inputs, K: parseFloat(e.target.value) })
          }
          className="p-2 border rounded-lg w-full"
        />
      </div>

      <div className="mb-4 w-full">
        <label className="block text-gray-700">
          Time to Maturity (T in years)
        </label>
        <input
          type="number"
          step="0.01"
          value={inputs.T}
          onChange={(e) =>
            setInputs({ ...inputs, T: parseFloat(e.target.value) })
          }
          className="p-2 border rounded-lg w-full"
        />
      </div>

      <div className="mb-4 w-full">
        <label className="block text-gray-700">Risk-Free Rate (r)</label>
        <input
          type="number"
          step="0.01"
          value={inputs.r}
          onChange={(e) =>
            setInputs({ ...inputs, r: parseFloat(e.target.value) })
          }
          className="p-2 border rounded-lg w-full"
        />
      </div>

      <div className="mb-4 w-full">
        <label className="block text-gray-700">Volatility (σ)</label>
        <input
          type="number"
          step="0.01"
          value={inputs.sigma}
          onChange={(e) =>
            setInputs({ ...inputs, sigma: parseFloat(e.target.value) })
          }
          className="p-2 border rounded-lg w-full"
        />
      </div>

      <div className="mb-4 w-full">
        <label className="block text-gray-700">Option Type</label>
        <select
          value={inputs.optionType}
          onChange={(e) =>
            setInputs({
              ...inputs,
              optionType: e.target.value as "call" | "put",
            })
          }
          className="p-2 border rounded-lg w-full"
        >
          <option value="call">Call</option>
          <option value="put">Put</option>
        </select>
      </div>

      <div className="mb-4 w-full">
        <label className="block text-gray-700">Monte Carlo Simulations</label>
        <input
          type="number"
          value={inputs.simulations}
          onChange={(e) =>
            setInputs({ ...inputs, simulations: parseInt(e.target.value, 10) })
          }
          className="p-2 border rounded-lg w-full"
        />
      </div>

      <div className="mb-4 w-full">
        <label className="block text-gray-700">Distribution</label>
        <select
          value={inputs.dist}
          onChange={(e) =>
            setInputs({
              ...inputs,
              dist: e.target.value as "normal" | "lognormal",
            })
          }
          className="p-2 border rounded-lg w-full"
        >
          <option value="normal">Normal</option>
          <option value="lognormal">Log-Normal</option>
        </select>
      </div>

      <button
        onClick={fetchOptionPrice}
        className="bg-blue-500 text-white p-2 rounded-lg w-full mb-2"
      >
        Calculate Black-Scholes Price
      </button>

      <button
        onClick={fetchMonteCarloPrice}
        className="bg-green-500 text-white p-2 rounded-lg w-full mb-2"
      >
        Calculate Monte Carlo Price
      </button>

      <button
        onClick={fetchHeatmapData}
        className="bg-yellow-500 text-white p-2 rounded-lg w-full"
      >
        Generate Heatmap
      </button>
    </div>
  );
};

export default OptionForm;
