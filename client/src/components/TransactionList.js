import { useEffect, useState } from "react";
import API from "../api";

function TransactionList() {
    const [data, setData] = useState([]);

    // ✅ fetch transactions
    const fetchTransactions = async () => {
        try {
            const res = await API.get("/transactions");
            setData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    // ✅ delete without reload
    const handleDelete = async (id) => {
        try {
            await API.delete(`/transactions/${id}`);
            fetchTransactions(); // refresh list
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Transactions</h3>

            {data.map((item) => (
                <div
                    key={item._id}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
                >
                    <div>
                        ₹{item.amount} | {item.description}
                        <span className="ml-2">
                            ({item.type})
                        </span>
                    </div>

                    <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => handleDelete(item._id)}
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default TransactionList;