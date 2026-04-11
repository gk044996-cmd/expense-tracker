function Balance({ income = 0, expense = 0 }) {
    const total = income - expense;

    return (
        <div className="bg-gray-100 p-4 rounded-lg mb-4 text-center">
            <h2 className="text-xl font-semibold">Balance</h2>
            <h1 className="text-2xl font-bold text-indigo-600">₹{total}</h1>

            <div className="flex justify-between mt-3">
                <p className="text-green-600">Income: ₹{income}</p>
                <p className="text-red-600">Expense: ₹{expense}</p>
            </div>
        </div>
    );
}

export default Balance;