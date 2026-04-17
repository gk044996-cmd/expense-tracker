import { useEffect, useState } from "react";
import API from "./api";

import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import Balance from "./components/Balance";
import Chart from "./components/Chart";
import MonthlyChart from "./components/MonthlyChart";
import ExportData from "./components/ExportData";

function App() {
    const [transactions, setTransactions] = useState([]);

    // 🔔 Budget states
    const [budget, setBudget] = useState(500);
    const [tempBudget, setTempBudget] = useState(500);
    const [isEditing, setIsEditing] = useState(true);

    // 🌙 Dark Mode
    const [darkMode, setDarkMode] = useState(false);

    // 🔹 Fetch data (✅ FIXED)
    useEffect(() => {
        API.get("/transactions")
            .then(res => setTransactions(res.data))
            .catch(err => console.error("Fetch Error:", err));
    }, []);

    // 🔥 ADD TRANSACTION (✅ FIXED)
    const addTransaction = async (data) => {
        try {
            const res = await API.post("/transactions", data);
            setTransactions(prev => [res.data, ...prev]); // better update
        } catch (err) {
            console.error("Add Error:", err);
        }
    };

    // 🔹 Income
    const income = transactions
        .filter(t => t.type === "income")
        .reduce((acc, t) => acc + t.amount, 0);

    // 🔹 Expense
    const expense = transactions
        .filter(t => t.type === "expense")
        .reduce((acc, t) => acc + t.amount, 0);

    const isOverBudget = expense > budget;

    return (
        <div
            className={`min-h-screen flex justify-center items-center px-2 ${darkMode
                    ? "bg-gray-900"
                    : "bg-gradient-to-r from-indigo-500 to-purple-600"
                }`}
        >
            <div
                className={`p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-md mx-2 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                    }`}
            >
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                    💰 Expense Tracker
                </h1>

                {/* 🌙 Toggle */}
                <div className="text-center mb-3">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="bg-gray-700 text-white px-3 py-1 rounded"
                    >
                        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                    </button>
                </div>

                {/* ✅ Balance */}
                <Balance income={income} expense={expense} />

                {/* 🔔 Budget Alert */}
                {isOverBudget && (
                    <div className="bg-red-100 text-red-600 p-2 rounded text-center mb-3 font-semibold">
                        ⚠️ Budget exceeded!
                    </div>
                )}

                {/* 🔹 Budget */}
                <div className="mb-4">
                    {isEditing ? (
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={tempBudget}
                                onChange={(e) =>
                                    setTempBudget(Number(e.target.value))
                                }
                                className="w-full p-2 border rounded text-black"
                                placeholder="Set Monthly Budget"
                            />
                            <button
                                onClick={() => {
                                    setBudget(tempBudget);
                                    setIsEditing(false);
                                }}
                                className="bg-green-500 text-white px-3 rounded"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-2 rounded">
                            <p className="font-semibold">Budget: ₹{budget}</p>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="bg-yellow-400 px-3 py-1 rounded"
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>

                {/* ✅ Charts */}
                <Chart transactions={transactions} />

                {/* ✅ Add */}
                <AddTransaction addTransaction={addTransaction} />

                {/* ✅ List */}
                <TransactionList transactions={transactions} />

                <MonthlyChart transactions={transactions} />

                <ExportData transactions={transactions} />
            </div>
        </div>
    );
}

export default App;