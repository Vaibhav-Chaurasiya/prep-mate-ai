import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function XPProgressChart({ data }) {
  return (
    <div className="w-full h-64 bg-white rounded shadow p-4">
      <h3 className="text-xl font-semibold mb-2">Your Progress</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="session" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="xp" stroke="#007bff" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default XPProgressChart;
