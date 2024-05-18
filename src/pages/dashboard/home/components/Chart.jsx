import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Grid } from "@mui/material";
import { LineChart, PieChart, useDrawingArea } from "@mui/x-charts";
import { styled } from "@mui/material/styles";

export default function Chart() {
  const chartSetting = {
    xAxis: [
      {
        label: "Paiement (DH)",
      },
    ],
    width: 1100,
    height: 500,
  };
  const dataset = [
    {
      london: 59,
      paris: 57,
      newYork: 86,
      paiement: 21,
      mois: "Jan",
    },
    {
      london: 50,
      paris: 52,
      newYork: 78,
      paiement: 28,
      mois: "Fev",
    },
    {
      london: 47,
      paris: 53,
      newYork: 106,
      paiement: 41,
      mois: "Mar",
    },
    {
      london: 54,
      paris: 56,
      newYork: 92,
      paiement: 73,
      mois: "Apr",
    },
    {
      london: 57,
      paris: 69,
      newYork: 92,
      paiement: 99,
      mois: "May",
    },
    {
      london: 60,
      paris: 63,
      newYork: 103,
      paiement: 144,
      mois: "June",
    },
    {
      london: 59,
      paris: 60,
      newYork: 105,
      paiement: 319,
      mois: "July",
    },
    {
      london: 65,
      paris: 60,
      newYork: 106,
      paiement: 249,
      mois: "Aug",
    },
    {
      london: 51,
      paris: 51,
      newYork: 95,
      paiement: 131,
      mois: "Sept",
    },
    {
      london: 60,
      paris: 65,
      newYork: 97,
      paiement: 55,
      mois: "Oct",
    },
    {
      london: 67,
      paris: 64,
      newYork: 76,
      paiement: 48,
      mois: "Nov",
    },
    {
      london: 61,
      paris: 70,
      newYork: 103,
      paiement: 25,
      mois: "Dec",
    },
  ];

  const valueFormatter = (value) => `${value} dh`;
  return (
    <>
      {/* <BarChart
        dataset={dataset}
        yAxis={[{ scaleType: "band", dataKey: "mois" }]}
        series={[
          { dataKey: "paiement", label: "Paiement par mois", valueFormatter },
        ]}
        layout="horizontal"
        {...chartSetting}
      /> */}
      <LineChart
        xAxis={[
          {
            data: Array(12)
              .fill(1)
              .map((e, i) => i + 1),
          },
        ]}
        series={[
          {
            data: Object.values(dataset.map((e) => e.paiement * 100)),
          },
        ]}
        width={800}
        height={400}
      />
      <PieChart
        series={[
          {
            data: [
              { id: 0, value: 10, label: "series A" },
              { id: 1, value: 15, label: "series B" },
              { id: 2, value: 20, label: "series C" },
            ],
            innerRadius: 100,
          },
        ]}
        width={400}
        height={250}
      >
        <PieCenterLabel>RADEEF</PieCenterLabel>
      </PieChart>
      {/* <PieChart /> */}
    </>
  );
}
function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}
const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));
