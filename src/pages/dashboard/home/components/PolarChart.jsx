import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetMachineCountDepartement } from "../../../../hooks/api/useHomeApi";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function PolarChart() {
  const data = useGetMachineCountDepartement()?.data;
  const labels = Object?.keys(data || []);
  const values = Object?.values(data || []);
  values.map((value) => "Departement : " + value);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
        text: "Nombre des machine par departement",
      },
    },
  };

  const polarData = {
    labels: labels,
    datasets: [
      {
        label: "Le nombre des machine par departement",
        data: values,
        backgroundColor: [
          // "rgb(255, 99, 132)",
          // "rgb(75, 192, 192)",
          // "rgb(255, 205, 86)",
          // "rgb(201, 203, 207)",
          // "rgb(54, 162, 235)",
          "#AF69E5", // Purple
          "#C71585", // Pink
          "#6B5B95", // Purple
          "#581c87", // Coral
          "#B565A7", // Purple
          "#6b21a8", // Light Blue
        ],
        hoverOffset: 4,
      },
    ],
  };

  return <PolarArea data={polarData} options={options} />;
}
