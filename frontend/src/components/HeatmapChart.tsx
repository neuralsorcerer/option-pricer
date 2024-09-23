import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

interface HeatmapData {
  stock_prices: number[];
  volatilities: number[];
  prices: number[][];
}

interface Props {
  heatmapData: HeatmapData | null;
}

const getColor = (value: number, min: number, max: number) => {
  const ratio = (value - min) / (max - min);
  const red = Math.floor(255 * (1 - ratio));
  const green = Math.floor(255 * ratio);
  return `rgba(${red},${green},0,0.6)`;
};

const HeatmapChart: React.FC<Props> = ({ heatmapData }) => {
  if (!heatmapData) {
    return null;
  }

  const allPrices = heatmapData.prices.flat();
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);

  const formattedData = heatmapData.prices
    .map((row, i) =>
      row.map((price, j) => ({
        x: heatmapData.stock_prices[i],
        y: heatmapData.volatilities[j],
        r: Math.max(
          3,
          Math.min(((price - minPrice) / (maxPrice - minPrice)) * 6, 6)
        ),
        backgroundColor: getColor(price, minPrice, maxPrice),
      }))
    )
    .flat();

  return (
    <div className="mt-8 w-full max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        Option Price Sensitivity (Heatmap)
      </h2>

      <div className="mb-4">
        <div className="flex justify-center items-center">
          <div className="w-6 h-6 bg-red-500 mr-2"></div>
          <span>Low Price</span>
          <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-green-500 mx-4"></div>
          <div className="w-6 h-6 bg-green-500 mr-2"></div>
          <span>High Price</span>
        </div>
      </div>

      <div className="w-full h-[500px]">
        <Scatter
          data={{
            datasets: [
              {
                label: "Option Prices",
                data: formattedData,
                pointBackgroundColor: formattedData.map(
                  (d) => d.backgroundColor
                ),
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            scales: {
              x: { title: { display: true, text: "Stock Price" } },
              y: { title: { display: true, text: "Volatility" } },
            },
            elements: {
              point: {
                radius: (context) => {
                  const raw = context.raw as {
                    x: number;
                    y: number;
                    r: number;
                  };
                  return raw.r;
                },
                backgroundColor: (context) => {
                  const raw = context.raw as { backgroundColor: string };
                  return raw.backgroundColor;
                },
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const { x, y, r } = context.raw as {
                      x: number;
                      y: number;
                      r: number;
                    };
                    const actualPrice =
                      ((r - 3) / 3) * (maxPrice - minPrice) + minPrice;
                    return `Stock: ${x}, Volatility: ${y}, Price: ${actualPrice.toFixed(
                      2
                    )}`;
                  },
                },
              },
              legend: { display: false },
            },
          }}
        />
      </div>
    </div>
  );
};

export default HeatmapChart;
