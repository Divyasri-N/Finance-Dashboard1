import { useStore } from "../store/useStore";

function TransactionTable() {
  const transactions = useStore((state) => state.transactions);

  return (
    <div className="overflow-x-auto rounded-xl shadow-md">

      <table className="w-full text-left border-collapse">

        {/* 🔥 Table Header */}
        <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <tr>
            <th className="p-3 text-sm md:text-base">Date</th>
            <th className="p-3 text-sm md:text-base">Category</th>
            <th className="p-3 text-sm md:text-base">Amount</th>
            <th className="p-3 text-sm md:text-base">Type</th>
          </tr>
        </thead>

        {/* 🔥 Table Body */}
        <tbody className="bg-white dark:bg-slate-800 transition duration-300">

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
                className="border-b dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition duration-300"
              >
                <td className="p-3 text-sm md:text-base">{t.date}</td>

                <td className="p-3 text-sm md:text-base font-medium">
                  {t.category}
                </td>

                <td className="p-3 text-sm md:text-base font-semibold">
                  ₹ {t.amount}
                </td>

                <td
                  className={`p-3 text-sm md:text-base font-semibold ${
                    t.type === "income"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-rose-600 dark:text-rose-400"
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