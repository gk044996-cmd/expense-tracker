import { useState } from "react";
import API from "../api";

const AddTransaction = ({ onAdd }) => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");
    const [date, setDate] = useState("");

    const handleAdd = async (e) => {
        e.preventDefault();

        // ✅ validation
        if (!description.trim() || !amount || !date) {
            alert("Please fill all fields");
            return;
        }

        try {
            await API.post("/transactions", {
                description: description.trim(),
                amount: Number(amount),
                type,
                date
            });

            alert("Transaction added ✅");

            // refresh data
            if (onAdd) onAdd();

            // clear fields
            setDescription("");
            setAmount("");
            setType("expense");
            setDate("");

        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Error adding transaction");
        }
    };

    return (
        <form onSubmit={handleAdd} className="mb-4">

            {/* Description */}
            <input
                type="text"
                placeholder="Enter description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded mb-2 text-black"
            />

            {/* Amount */}
            <input
                type="number"
                placeholder="Enter amount..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded mb-2 text-black"
            />

            {/* Type */}
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 border rounded mb-2 text-black"
            >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>

            {/* Date */}
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded mb-3 text-black"
            />

            {/* Button */}
            <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white w-full p-2 rounded font-semibold"
            >
                Add Transaction
            </button>
        </form>
    );
};

export default AddTransaction;