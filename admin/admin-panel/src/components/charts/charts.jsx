import React, { Component, useEffect, useState } from "react";
import {
  AreaChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  ResponsiveContainer,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  Legend,
} from "recharts";
import { ProductConsumer } from "../../context";
import axios from "axios";
export default function Charts() {
  const [users, setUsers] = useState([]);
  const [rating, setRating] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/admin/count").then((res) => setUsers(res.data));
    axios.get("/admin/rating").then((res) => setRating(res.data));
    axios.get("/admin/order").then((res) => setOrders(res.data));
  }, []);
  return (
    <div style={{ width: "70%", float: "right" }}>
      <h1>Active Users</h1>
      <ResponsiveContainer width="80%" height={400}>
        <LineChart data={users} margin={{ top: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#FFA500"
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
      <h1>Last Ratings</h1>
      <ResponsiveContainer width="80%" height={400}>
        <BarChart data={rating}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="createdAt" stroke="#8884d8" strokeWidt={"12px"} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="rating" fill="#800080" barSize={30} isAnimationActive />
        </BarChart>
      </ResponsiveContainer>
      <h1>Pie</h1>
      <ResponsiveContainer width="80%" height={400}>
        <PieChart width={730} height={250}>
          <Pie
            data={users}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            fill="#006400"
            label
            isAnimationActive
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <h1>Last Orders</h1>

      <ResponsiveContainer width="80%" height={400}>
        <RadialBarChart
          width={730}
          height={250}
          innerRadius="10%"
          outerRadius="80%"
          data={orders}
          startAngle={0}
          endAngle={270}
          fill="#0804f9"
        >
          <RadialBar
            minAngle={15}
            label={{ fill: "#fff", position: "insideStart" }}
            background
            clockWise={true}
            dataKey="total"
          />
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
