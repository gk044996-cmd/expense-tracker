import { useState } from "react";
import API from "../api";

function AddTransaction() {
    const [form, setForm] = useState({
        amount: "",
        type: "expense",
        category: "",
        date: ""
    });

    const handleSubmit = async () => {
        await API.post("/transactions", form);
        window.location.reload();
    };

    return (
        <div className="mb-4">
            <div className="grid grid-cols-2 gap-2">
                <input
                    className="border p-2 rounded"
                    placeholder="Amount"
                    onChange={e => setForm({ ...form, amount: Number(e.target.value) })}
                />

                <input
                    className="border p-2 rounded"
                    placeholder="Category"
                    onChange={e => setForm({ ...form, category: e.target.value })}
                />

                <input
                    className="border p-2 rounded col-span-2"
                    type="date"
                    onChange={e => setForm({ ...form, date: e.target.value })}
                />

                <select
                    className="border p-2 rounded"
                    onChange={e => setForm({ ...form, type: e.target.value })}
                >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>

                <button
                    className="bg-indigo-500 text-white rounded p-2"
                    onClick={handleSubmit}
                >
                    Add
                </button>
            </div>
        </div>
    );
}

export default AddTransaction;