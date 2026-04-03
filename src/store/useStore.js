import { create } from "zustand";

// ✅ Safe localStorage load
const loadTransactions = () => {
  try {
    const data = localStorage.getItem("transactions");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading transactions:", error);
    return [];
  }
};

export const useStore = create((set) => ({
  // ✅ State
  transactions: loadTransactions(),
  role: "viewer",

  // ✅ Set all transactions
  setTransactions: (data) => {
    localStorage.setItem("transactions", JSON.stringify(data));
    set({ transactions: data });
  },

  // ✅ Add transaction
  addTransaction: (newTransaction) =>
    set((state) => {
      const updated = [...state.transactions, newTransaction];
      localStorage.setItem("transactions", JSON.stringify(updated));
      return { transactions: updated };
    }),

  // 🔥 Delete transaction (NEW)
  deleteTransaction: (index) =>
    set((state) => {
      const updated = state.transactions.filter((_, i) => i !== index);
      localStorage.setItem("transactions", JSON.stringify(updated));
      return { transactions: updated };
    }),

  // 🔥 Clear all transactions (optional)
  clearTransactions: () => {
    localStorage.removeItem("transactions");
    set({ transactions: [] });
  },

  // ✅ Role management
  setRole: (role) => set({ role }),
}));