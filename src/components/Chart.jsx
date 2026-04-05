import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Chart({ data }) {
  const isDark = document.documentElement.classList.contains("dark");

  // 📈 Line Chart Data
  const lineData = data.map((t) => ({
    date: t.date,
    amount: t.amount,
  }));

  // 🥧 Pie Chart Data (only expenses grouped by category)
  const categoryMap = {};
  data.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    category: key,
    value: categoryMap[key],
  }));

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-6">
      
      {/* 📈 Line Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h3 className="mb-3 font-semibold text-gray-800 dark:text-white">
          Balance Trend
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid stroke={isDark ? "#444" : "#ccc"} />
            <XAxis dataKey="date" stroke={isDark ? "#ddd" : "#333"} />
            <YAxis stroke={isDark ? "#ddd" : "#333"} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🥧 Pie Chart */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h3 className="mb-3 font-semibold text-gray-800 dark:text-white">
          Spending Breakdown
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="category"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Chart;