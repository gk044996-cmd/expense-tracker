import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportData({ transactions }) {

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(transactions);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });

        const data = new Blob([excelBuffer], {
            type: "application/octet-stream"
        });

        saveAs(data, "expenses.xlsx");
    };

    return (
        <div className="mt-4 text-center">
            <button
                onClick={exportToExcel}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                📤 Export to Excel
            </button>
        </div>
    );
}

export default ExportData;