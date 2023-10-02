import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const monthNamesBR = {
  "01": "jan",
  "02": "fev",
  "03": "mar",
  "04": "abr",
  "05": "mai",
  "06": "jun",
  "07": "jul",
  "08": "ago",
  "09": "set",
  10: "out",
  11: "nov",
  12: "dez",
};

function Chart({ data }) {
  data.sort((a, b) => a.month - b.month);

  const months = data?.map((item) => monthNamesBR[item.month]);
  const availableAmounts = data.map((item) =>
    parseFloat(item.available_amount.replace(",", ".").replace(".", ""))
  );
  const expenseAmounts = data.map((item) =>
    parseFloat(item.expense_amount.replace(",", ".").replace(".", ""))
  );
  const differenceAmounts = availableAmounts.map(
    (amount, index) => amount - expenseAmounts[index]
  );

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Total disponível por mês",
        data: availableAmounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Total gasto",
        data: expenseAmounts,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Economizou",
        data: differenceAmounts,
        backgroundColor: "rgba(88, 177, 64, 0.6)",
        borderColor: "rgba(88, 177, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return <Bar data={chartData} options={options} />;
}

export default Chart;
