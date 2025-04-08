// components/PieChartCard.jsx
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

const COLORS = [
  "#22c55e", "#ef4444", "#facc15", "#8b5cf6", "#e11d48", "#0ea5e9", "#3b82f6", "#10b981", "#f97316", "#6366f1"
];

function PieChartCard({ title, data }) {
  return (
    <Card className="border-3 border-black p-2">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart className="">
          <Pie
  data={data}
  dataKey="value"
  nameKey="name"
  innerRadius={70}
  outerRadius={100}
  paddingAngle={5}
>
  {data.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={COLORS[index % COLORS.length]}
      stroke="black"  // Adds a black border around each slice
      strokeWidth={2}  // Adjust the thickness of the border as needed
    />
  ))}
</Pie>

            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default PieChartCard;
