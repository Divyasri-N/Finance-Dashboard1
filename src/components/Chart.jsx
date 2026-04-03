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
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function Chart({ data }) {
  const isDark = document.documentElement.classList.contains("dark");

  return (
    <LineChart width={400} height={300} data={data}>
      <CartesianGrid stroke={isDark ? "#444" : "#ccc"} />
      <XAxis dataKey="date" stroke={isDark ? "#ddd" : "#333"} />
      <YAxis stroke={isDark ? "#ddd" : "#333"} />
      <Tooltip />
      <Line type="monotone" dataKey="amount" stroke="#8884d8" />
    </LineChart>
  );
}

export function PieChartComponent({ data }) {
  return (
    <PieChart width={400} height={300}>
      <Pie data={data} dataKey="value" nameKey="category" outerRadius={100}>
        {data.map((entry, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}

export default Chart;