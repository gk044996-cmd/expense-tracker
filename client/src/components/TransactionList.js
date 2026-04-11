import { useEffect, useState } from "react";
import API from "../api";

function TransactionList() {
    const [data, setData] = useState([]);

    useEffect(() => {
        API.get("/transactions").then(res => setData(res.data));
    }, []);

    const handleDelete = async (id) => {
        await API.delete(`/transactions/${id}`);
        window.location.reload();
    };

    return (
        <div>
            <h3 className="text-lg font-semibold mb-2">Transactions</h3>

            {data.map(item => (
                <div
                    key={item._id}
                    className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
                >
                    <div>
                        ₹{item.amount} | {item.category}
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