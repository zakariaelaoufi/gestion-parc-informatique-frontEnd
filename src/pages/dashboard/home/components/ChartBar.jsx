import { useGetChartInfo } from "../../../../hooks/api/useHomeApi";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { BorderColor } from "@mui/icons-material";
import { fontGrid } from "@mui/material/styles/cssUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const palette = [
  "#AF69E5", // Purple
  "#C71585", // Pink
  "#6B5B95", // Purple
  "#581c87", // Coral
  "#B565A7", // Purple
  "#6b21a8", // Light Blue
  "#D65076", // Raspberry
];

const getColor = (index) => palette[index % palette.length];

export default function ChartBar() {
  const data = useGetChartInfo()?.data;
  const labels = Object?.keys(data || []);
  const values = Object?.values(data || []);

  const backgroundColors = labels.map((_, index) => getColor(index));
  const borderColors = backgroundColors.map((color) => `${color}FF`);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        display: false,
      },
      title: {
        display: false,
        text: "Nombre des machine par categorie",
      },
    },
  };

  const barData = {
    labels: labels,
    datasets: [
      {
        label: "Le nombre des machine par catégorie",
        data: values,
        backgroundColor: backgroundColors,
        BorderColor: borderColors,
        borderWidth: 2,
      },
    ],
  };

  return <Bar options={options} data={barData} />;
}
