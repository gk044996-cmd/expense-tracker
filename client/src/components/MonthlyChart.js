import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function MonthlyChart({ transactions }) {

    const monthlyData = {};

    transactions.forEach(t => {
        const month = new Date(t.date).toLocaleString("default", { month: "short" });

        if (!monthlyData[month]) {
            monthlyData[month] = { income: 0, expense: 0 };
        }

        if (t.type === "income") {
            monthlyData[month].income += t.amount;
        } else {
            monthlyData[month].expense += t.amount;
        }
    });

    const labels = Object.keys(monthlyData);

    const data = {
        labels,
        datasets: [
            {
                label: "Income",
                data: labels.map(m => monthlyData[m].income),
                backgroundColor: "#22c55e",
            },
            {
                label: "Expense",
                data: labels.map(m => monthlyData[m].expense),
                backgroundColor: "#ef4444",
            },
        ],
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold text-center mb-2">
                Monthly Report
            </h3>
            <Bar data={data} />
        </div>
    );
}

export default MonthlyChart;