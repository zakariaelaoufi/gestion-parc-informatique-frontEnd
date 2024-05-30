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
          "#581c87",
          "#B565A7",
          "#6B5B95",
          // "#FF6F61",
          // "#F7CAC9",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return <Pie options={options} data={barData} />;
}
