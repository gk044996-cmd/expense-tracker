import { useState } from "react";

const AddTransaction = ({ addTransaction }) => {
    const [text, setText] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("expense");

    const handleAdd = (e) => {
        e.preventDefault(); // 🔥 prevents page reload

        // ✅ validation
        if (!text.trim() || !amount) {
            alert("Please enter all fields");
            return;
        }

        const transactionData = {
            text: text.trim(),
            amount: Number(amount), // 🔥 convert to number
            type
        };

        // 🔥 call function from App.js
        addTransaction(transactionData);

        // ✅ clear inputs after adding
        setText("");
        setAmount("");
        setType("expense");
    };

    return (
        <form onSubmit={handleAdd} className="mb-4">
            {/* 🔹 Description */}
            <input
                type="text"
                placeholder="Enter description..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-2 border rounded mb-2 text-black"
            />

            {/* 🔹 Amount */}
            <input
                type="number"
                placeholder="Enter amount..."
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2 border rounded mb-2 text-black"
            />

            {/* 🔹 Type */}
            <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 border rounded mb-2 text-black"
            >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>

            {/* 🔹 Button */}
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