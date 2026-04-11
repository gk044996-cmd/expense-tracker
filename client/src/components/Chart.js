import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ transactions }) {

    // 🔹 Category calculation
    const categoryData = {};

    transactions.forEach(t => {
        if (t.type === "expense") {
            categoryData[t.category] =
                (categoryData[t.category] || 0) + t.amount;
        }
    });

    const labels = Object.keys(categoryData);
    const values = Object.values(categoryData);

    // 🔹 Dynamic colors
    const colors = labels.map(
        () => `hsl(${Math.random() * 360}, 70%, 60%)`
    );

    const data = {
        labels: labels,
        datasets: [
            {
                data: values,
                backgroundColor: colors,
                borderWidth: 1,
            },
        ],
    };

    // 🔹 Chart options (clean look)
    const options = {
        plugins: {
            legend: {
                position: "top",
            },
        },
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold text-center mb-2">
                Category Breakdown
            </h3>

            {/* 🔹 If no data */}
            {labels.length === 0 ? (
                <p className="text-center text-gray-500">
                    No expense data yet
                </p>
            ) : (
                <Pie data={data} options={options} />
            )}
        </div>
    );
}

export default Chart;