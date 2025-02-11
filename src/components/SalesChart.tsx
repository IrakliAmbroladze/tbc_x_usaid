import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { getChartData } from "@/lib/supabase";

export default function SalesChart() {
  const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
    [],
  );

  useEffect(() => {
    async function fetchData() {
      const data = await getChartData();
      setChartData([
        { name: "Sales", value: data.sales },
        { name: "Cash In", value: data.cashIn },
      ]);
    }
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
