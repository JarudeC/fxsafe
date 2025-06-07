"use client";

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for different time periods
const weeklyData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Amount Sent (₱)',
      data: [50000, 30000, 75000, 20000, 45000, 60000, 35000],
      backgroundColor: 'rgba(0, 201, 167, 0.5)',
      borderColor: 'rgba(0, 201, 167, 1)',
      borderWidth: 1,
    },
  ],
};

const monthlyData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Amount Sent (₱)',
      data: [250000, 320000, 180000, 290000],
      backgroundColor: 'rgba(0, 201, 167, 0.5)',
      borderColor: 'rgba(0, 201, 167, 1)',
      borderWidth: 1,
    },
  ],
};

// Mock transaction data with exchange rates
const transactions = [
  {
    id: 1,
    date: '2024-03-15',
    recipient: 'Maria Santos',
    country: 'Philippines',
    amount: 500,
    exchangeRate: '1 USD = 56.25 PHP',
    convertedAmount: '28,125 PHP',
    status: 'Completed',
  },
  {
    id: 2,
    date: '2024-03-10',
    recipient: 'Ahmad Hassan',
    country: 'Indonesia',
    amount: 300,
    exchangeRate: '1 USD = 15,750 IDR',
    convertedAmount: '4,725,000 IDR',
    status: 'Completed',
  },
  {
    id: 3,
    date: '2024-03-05',
    recipient: 'Priya Patel',
    country: 'India',
    amount: 750,
    exchangeRate: '1 USD = 83.15 INR',
    convertedAmount: '62,362.50 INR',
    status: 'Failed',
  },
  {
    id: 4,
    date: '2024-03-01',
    recipient: 'Lee Wei',
    country: 'Malaysia',
    amount: 450,
    exchangeRate: '1 USD = 4.75 MYR',
    convertedAmount: '2,137.50 MYR',
    status: 'Completed',
  },
];

export default function DashboardStats() {
  const [timeFrame, setTimeFrame] = useState<'weekly' | 'monthly'>('weekly');

  const chartData = timeFrame === 'weekly' ? weeklyData : monthlyData;

  return (
    <div className="space-y-8">
      {/* Time Frame Selector */}
      <div className="flex justify-end">
        <div className="bg-white/10 rounded-lg p-1 backdrop-blur-sm">
          <button
            onClick={() => setTimeFrame('weekly')}
            className={`px-4 py-2 rounded-md transition ${
              timeFrame === 'weekly'
                ? 'bg-white/20 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeFrame('monthly')}
            className={`px-4 py-2 rounded-md transition ${
              timeFrame === 'monthly'
                ? 'bg-white/20 text-white'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Bar Graph Section */}
      <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4">
          {timeFrame === 'weekly' ? 'Weekly' : 'Monthly'} Transaction History
        </h2>
        <div className="h-[400px]">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: {
                    color: 'white',
                  },
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      return `₱${context.raw}`;
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                  ticks: {
                    color: 'white',
                    callback: function(value) {
                      return '₱' + value;
                    }
                  },
                },
                x: {
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                  },
                  ticks: {
                    color: 'white',
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-white/20">
                <th className="pb-4">Date</th>
                <th className="pb-4">Recipient</th>
                <th className="pb-4">Country</th>
                <th className="pb-4">Amount (USD)</th>
                <th className="pb-4">Exchange Rate</th>
                <th className="pb-4">Converted Amount</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-white/10">
                  <td className="py-4">{transaction.date}</td>
                  <td className="py-4">{transaction.recipient}</td>
                  <td className="py-4">{transaction.country}</td>
                  <td className="py-4">${transaction.amount}</td>
                  <td className="py-4 text-sm">{transaction.exchangeRate}</td>
                  <td className="py-4 text-sm">{transaction.convertedAmount}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        transaction.status === 'Completed'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 