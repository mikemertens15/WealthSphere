import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import Title from "./Title";

// Generate fake data until backend is figured out
function createData(time: string, amount?: number) {
  return { time, amount };
}

const data = [
  createData("1", 0),
  createData("5", 300),
  createData("10", 600),
  createData("15", 800),
  createData("20", 1500),
  createData("25", 2000),
  createData("30", 2400),
];

interface BudgetProps {
  income: number;
}

// Display a chart of the user's spending over the month, with a reference line for their budgeted income
const Budget: React.FC<BudgetProps> = ({ income }) => {
  const theme = useTheme();

  const spendingCap = income;

  return (
    <React.Fragment>
      <Title>{new Date().toLocaleString("default", { month: "long" })}</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Total Spent ($)
            </Label>
          </YAxis>
          <ReferenceLine y={spendingCap} stroke="red" strokeDasharray="3 3" />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default Budget;
