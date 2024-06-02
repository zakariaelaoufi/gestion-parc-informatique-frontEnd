import { useGetPieInfo } from "../../../../hooks/api/useHomeApi";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
export default function EtatPie() {
  const data = useGetPieInfo()?.data;
  const labels = Object?.keys(data || []);
  const values = Object?.values(data || []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        // display: false,
        labels: {
          font: {
            size: 10, // Set the desired font size here
          },
        },
      },
      title: {
        display: false,
        text: "Nombre des machine par etat",
      },
    },
  };

  const barData = {
    labels: labels,
    datasets: [
      {
        label: "Le nombre des machine par etat",
        data: values,
        backgroundColor: [
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

  return <Pie options={options} data={barData} />;
}
