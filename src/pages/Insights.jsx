import { useStore } from "../store/useStore";
import { motion } from "framer-motion";

function Insights() {
  const transactions = useStore((state) => state.transactions);

  // 🥇 Highest spending category
  const categoryTotals = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  const highestCategory =
    Object.keys(categoryTotals).length > 0
      ? Object.keys(categoryTotals).reduce((a, b) =>
          categoryTotals[a] > categoryTotals[b] ? a : b
        )
      : null;

  // 📉 Total Expense
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6">

      {/* 🔥 Title */}
      <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
        📊 Insights
      </h1>

      {/* 📊 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* 🥇 Top Spending */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-5 rounded-xl shadow-lg transition duration-300"
        >
          <h2 className="text-sm md:text-base font-semibold">
            🥇 Top Spending
          </h2>
          <p className="text-xl md:text-2xl font-bold mt-2">
            {highestCategory || "No Data"}
          </p>
        </motion.div>

        {/* 📉 Total Expenses */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-5 rounded-xl shadow-lg transition duration-300"
        >
          <h2 className="text-sm md:text-base font-semibold">
            📉 Total Expenses
          </h2>
          <p className="text-xl md:text-2xl font-bold mt-2">
            ₹ {totalExpense}
          </p>
        </motion.div>

        {/* 💡 Insight */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-5 rounded-xl shadow-lg transition duration-300"
        >
          <h2 className="text-sm md:text-base font-semibold">
            💡 Insight
          </h2>
          <p className="text-sm md:text-base mt-2 leading-relaxed">
            {highestCategory ? (
              <>
                You are spending more on{" "}
                <span className="font-bold underline">
                  {highestCategory}
                </span>. Try reducing it to save more 💰
              </>
            ) : (
              "No spending data available."
            )}
          </p>
        </motion.div>

      </div>

      {/* 📌 Summary */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md transition duration-300"
      >
        <h2 className="text-lg font-semibold mb-2">
          📌 Summary
        </h2>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Track your spending habits and identify where your money goes.
          Focus on reducing high-expense categories to improve your savings
          and maintain better financial control.
        </p>
      </motion.div>

    </div>
  );
}

export default Insights;