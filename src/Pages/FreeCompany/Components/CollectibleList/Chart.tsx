import { capitalizeText } from "@/Helpers";
import { CollectibleTypes } from "@/Types";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

function getCount(data: CollectibleTypes[]) {
  return data.map((Collectible) => Collectible.Count);
}

function getNames(data: CollectibleTypes[]) {
  return data.map((Collectible) => capitalizeText(Collectible.Data.Name));
}

function getChartData(data: CollectibleTypes[]) {
  return {
    labels: getNames(data),
    indexAxis: "y",
    datasets: [
      {
        label: "Total",
        backgroundColor: "#2A303C",
        borderColor: "#222731",
        borderWidth: 3,
        data: getCount(data),
      },
    ],
  };
}

const options = {
  indexAxis: "y" as const,
  scales: {
    y: {
      stacked: true,
      grid: {
        display: true,
        color: "#222731",
      },
      ticks: {
        stepSize: 1,
      },
    },
    x: {
      stacked: true,
      grid: {
        display: false,
      },
    },
  },
  layout: {
    padding: {
      bottom: 60,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

interface CollectibleList {
  data: CollectibleTypes[];
}

export const CollectibleChart = ({ data }: CollectibleList) => {
  const chartData = getChartData(data);

  const minHeight = 48;
  const height = 12 * data.length > 48 ? 12 * data.length : minHeight;

  return (
    <div className="w-full">
      <Chart type="bar" data={chartData} options={options} height={height} />
    </div>
  );
};
