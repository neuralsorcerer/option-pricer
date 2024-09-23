import React from "react";
import { FaChartLine, FaCogs } from "react-icons/fa";

interface Greeks {
  delta: number;
  gamma: number;
  vega: number;
  theta: number;
  rho: number;
}

interface Props {
  price: number | null;
  monteCarloPrice: number | null;
  greeks: Greeks | null;
}

const OptionResults: React.FC<Props> = ({ price, monteCarloPrice, greeks }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto p-6">
      {price !== null && (
        <div className="mt-4 w-full bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center">
              <FaChartLine className="mr-2 text-blue-500" /> Black-Scholes Price
            </h3>
            <span className="text-2xl font-semibold text-gray-800">
              ${price.toFixed(2)}
            </span>
          </div>
          {greeks && (
            <div className="grid grid-cols-2 gap-4">
              <p className="text-gray-600">
                <span className="font-bold text-blue-500">Delta:</span>{" "}
                {greeks.delta.toFixed(4)}
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-blue-500">Gamma:</span>{" "}
                {greeks.gamma.toFixed(4)}
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-blue-500">Vega:</span>{" "}
                {greeks.vega.toFixed(4)}
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-blue-500">Theta:</span>{" "}
                {greeks.theta.toFixed(4)}
              </p>
              <p className="text-gray-600">
                <span className="font-bold text-blue-500">Rho:</span>{" "}
                {greeks.rho.toFixed(4)}
              </p>
            </div>
          )}
        </div>
      )}

      {monteCarloPrice !== null && (
        <div className="mt-6 w-full bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold flex items-center">
              <FaCogs className="mr-2 text-green-500" /> Monte Carlo Price
            </h3>
            <span className="text-2xl font-semibold text-gray-800">
              ${monteCarloPrice.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionResults;
