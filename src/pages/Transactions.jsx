import { useEffect, useState } from "react";
import axios from "axios";

const Transactions = () => {

  // 👇 ADD THIS DEBUG LINE HERE
  console.log("Transactions component loaded");

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://finance-dashboard-backend-q153.onrender.com/api";

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/transactions`);

      console.log("API DATA:", res.data); // DEBUG

      setTransactions(res.data);
      setError(null);

    } catch (err) {
      console.log(err);
      setError("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const deleteTransaction = async (id) => {
    try {
      await axios.delete(`${API_URL}/transactions/${id}`);
      fetchTransactions();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-4">

      <h2 className="text-xl font-bold mb-4">Transactions</h2>

      {loading && <p>Loading transactions...</p>}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && transactions.length === 0 && (
        <p>No transactions found</p>
      )}

      <div className="space-y-3">

        {transactions.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center p-3 bg-gray-100 dark:bg-slate-800 rounded shadow"
          >

            <div>
              <p className="font-semibold">{item.category}</p>
              <p className="text-sm text-gray-500">
                ₹ {item.amount} • {item.type}
              </p>
            </div>

            <button
              onClick={() => deleteTransaction(item._id)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Transactions;