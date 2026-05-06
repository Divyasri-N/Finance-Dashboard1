import { create } from "zustand";

const API_URL = "https://finance-dashboard-backend-q153.onrender.com/api/transactions";

export const useStore = create((set) => ({
  // State
  transactions: [],
  role: "viewer",

  // Fetch all transactions from MongoDB
  fetchTransactions: async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      set({ transactions: data });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  },

  // Add transaction
  addTransaction: async (newTransaction) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      const saved = await res.json();

      set((state) => ({
        transactions: [...state.transactions, saved],
      }));
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  },

  // Delete transaction
  deleteTransaction: async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      set((state) => ({
        transactions: state.transactions.filter((t) => t._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  },

  // Clear all transactions
  clearTransactions: () => {
    set({ transactions: [] });
  },

  // Role management
  setRole: (role) => set({ role }),
}));