import { useStore } from "../store/useStore";

function TransactionTable() {
  const transactions = useStore((state) => state.transactions);

  return (
    <div className="overflow-x-auto rounded-xl shadow-md">

      <table className="w-full text-left border-collapse">

        {/* 🔥 Table Header */}
        <thead className="bg-indigo-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200">
          <tr>
            <th className="p-3 text-sm md:text-base">Date</th>
            <th className="p-3 text-sm md:text-base">Category</th>
            <th className="p-3 text-sm md:text-base">Amount</th>
            <th className="p-3 text-sm md:text-base">Type</th>
          </tr>
        </thead>

        {/* 🔥 Table Body */}
        <tbody className="bg-white dark:bg-slate-800">

          {transactions.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center p-6 text-slate-500 dark:text-slate-300"
              >
                🚫 No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((t, i) => (
              <tr
                key={i}
                className="border-b dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-700 transition"
              >
                {/* 📅 Date */}
                <td className="p-3 text-sm md:text-base">
                  {t.date}
                </td>

                {/* 📂 Category */}
                <td className="p-3 text-sm md:text-base font-medium">
                  {t.category}
                </td>

                {/* 💰 Amount */}
                <td
                  className={`p-3 text-sm md:text-base font-semibold ${
                    t.type === "income"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  ₹ {t.amount}
                </td>

                {/* 🏷 Type (NO BG — clean text only) */}
                <td
                  className={`p-3 text-sm md:text-base font-semibold ${
                    t.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-500 dark:text-red-400"
                  }`}
                >
                  {t.type}
                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default TransactionTable;