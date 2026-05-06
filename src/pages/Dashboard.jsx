import { useState, useEffect } from "react";
import { useStore } from "../store/useStore";
import TransactionTable from "../components/TransactionTable";
import Chart from "../components/Chart";
import { motion } from "framer-motion";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";

function Dashboard() {
  const transactions = useStore((state) => state.transactions);
  const addTransaction = useStore((state) => state.addTransaction);
  const fetchTransactions = useStore((state) => state.fetchTransactions);
  const role = useStore((state) => state.role);

  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    date: "",
    category: "",
    amount: "",
    type: "expense",
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expenses;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.date || !form.category || !form.amount) return;

    addTransaction({
      ...form,
      amount: Number(form.amount),
    });

    setOpen(false);
    setForm({ date: "", category: "", amount: "", type: "expense" });
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">📊 Dashboard</h1>

        {role === "admin" && (
          <button
            onClick={() => setOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition shadow-md"
          >
            ➕ Add Transaction
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <motion.div whileHover={{ scale: 1.05 }}
          className="p-5 rounded-2xl shadow-lg bg-gradient-to-br from-emerald-400 to-green-600 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold opacity-80">Total Income</h2>
            <ArrowUpCircle size={28} />
          </div>
          <p className="text-3xl font-bold mt-3">₹ {income}</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}
          className="p-5 rounded-2xl shadow-lg bg-gradient-to-br from-rose-400 to-pink-600 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold opacity-80">Total Expenses</h2>
            <ArrowDownCircle size={28} />
          </div>
          <p className="text-3xl font-bold mt-3">₹ {expenses}</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }}
          className="p-5 rounded-2xl shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold opacity-80">Net Balance</h2>
            <Wallet size={28} />
          </div>
          <p className="text-3xl font-bold mt-3">₹ {balance}</p>
        </motion.div>

      </div>

      <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-6 rounded-2xl shadow-lg">
        <Chart data={transactions} />
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-teal-100 p-6 rounded-2xl shadow-lg">
        <TransactionTable />
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 space-y-4 shadow-xl">

            <h2 className="text-lg font-bold">Add Transaction</h2>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full p-2 rounded border"
              />

              <input
                type="text"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full p-2 rounded border"
              />

              <input
                type="number"
                placeholder="Amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full p-2 rounded border"
              />

              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full p-2 rounded border"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-3 py-1 bg-gray-400 text-white rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-3 py-1 bg-indigo-600 text-white rounded"
                >
                  Add
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;