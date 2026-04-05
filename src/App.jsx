import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import { useStore } from "./store/useStore.js";
import { transactions } from "./data/mockData";

function App() {
  const [page, setPage] = useState("dashboard");

  // ✅ Load saved theme
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // ✅ Zustand
  const setTransactions = useStore((state) => state.setTransactions);
  const role = useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);

  // ✅ Load transactions
  useEffect(() => {
    setTransactions(transactions);
  }, []);

  // ✅ Apply Dark Mode globally
  useEffect(() => {
    const root = document.documentElement;

    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-white transition duration-300">

      {/* 🔝 Navbar */}
      <div className="p-4 flex flex-wrap justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">

        {/* 🔗 Navigation */}
        <div className="flex gap-10 text-lg font-bold tracking-wide">

          <button
            onClick={() => setPage("dashboard")}
            className={`pb-1 transition duration-300 ${
              page === "dashboard"
                ? "border-b-2 border-white"
                : "hover:opacity-80"
            }`}
          >
            Dashboard
          </button>

          <button
            onClick={() => setPage("insights")}
            className={`pb-1 transition duration-300 ${
              page === "insights"
                ? "border-b-2 border-white"
                : "hover:opacity-80"
            }`}
          >
            Insights
          </button>

        </div>

        {/* 🔥 Right Controls */}
        <div className="flex items-center gap-4 mt-2 md:mt-0">

          {/* 👤 Role Toggle */}
          <button
            onClick={() => setRole(role === "admin" ? "viewer" : "admin")}
            className="px-4 py-2 rounded-lg bg-black/30 hover:bg-black/50 transition duration-300"
          >
            {role === "admin" ? "👑 Admin" : "👤 Viewer"}
          </button>

          {/* 🌙 Dark Mode Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="px-4 py-2 rounded-lg bg-black/30 hover:bg-black/50 transition duration-300"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>

        </div>

      </div>

      {/* 📄 Pages */}
      <div className="p-4 md:p-6">
        {page === "dashboard" && <Dashboard />}
        {page === "insights" && <Insights />}
      </div>

    </div>
  );
}

export default App;