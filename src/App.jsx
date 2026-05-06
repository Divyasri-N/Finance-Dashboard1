import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Insights from "./pages/Insights";
import Transactions from "./pages/Transactions";
import { useStore } from "./store/useStore.js";

function App() {
  const [page, setPage] = useState("dashboard");

  const [dark, setDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const role = useStore((state) => state.role);
  const setRole = useStore((state) => state.setRole);

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

      {/* NAVBAR */}
      <div className="p-4 flex flex-wrap justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">

        <div className="flex gap-10 text-lg font-bold tracking-wide">

          <button
            onClick={() => setPage("dashboard")}
            className={page === "dashboard" ? "border-b-2 border-white" : ""}
          >
            Dashboard
          </button>

          {/* ✅ Transactions Button (already correct) */}
          <button
  onClick={() => setPage("transactions")}
  className={page === "transactions" ? "border-b-2 border-white" : ""}
>
  Transactions
</button>
          <button
            onClick={() => setPage("insights")}
            className={page === "insights" ? "border-b-2 border-white" : ""}
          >
            Insights
          </button>

        </div>

        <div className="flex items-center gap-4">

          <button
            onClick={() => setRole(role === "admin" ? "viewer" : "admin")}
            className="px-4 py-2 rounded-lg bg-black/30"
          >
            {role === "admin" ? "👑 Admin" : "👤 Viewer"}
          </button>

          <button
            onClick={() => setDark(!dark)}
            className="px-4 py-2 rounded-lg bg-black/30"
          >
            {dark ? "☀️ Light" : "🌙 Dark"}
          </button>

        </div>

      </div>

      {/* PAGE CONTENT */}
      <div className="p-4 md:p-6">

        {page === "dashboard" && <Dashboard />}
        {page === "transactions" && <Transactions />}
        {page === "insights" && <Insights />}

      </div>

    </div>
  );
}

export default App;