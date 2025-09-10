import React from 'react';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartCard from '../components/ChartCard';
import AdminSidebar from '../components/AdminSidebar';
import { initialZones } from '../data/zonesData';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const ZoneAnalysis = () => {
  const zoneLabels = initialZones.map(zone => zone.zoneName);

  const barData = {
    labels: zoneLabels,
    datasets: [
      {
        label: 'Budget Allocated',
        data: initialZones.map(zone => zone.budgetAllocated),
        backgroundColor: '#5a7bd5', // light navy blue
      },
      {
        label: 'Budget Used',
        data: initialZones.map(zone => zone.budgetUsed),
        backgroundColor: '#1e3a8a', // deep navy blue
      },
    ],
  };

  const pieData = {
    labels: zoneLabels,
    datasets: [
      {
        label: 'Dispatch Count',
        data: initialZones.map(zone => zone.dispatchCount),
        backgroundColor: ['#3b5ba9', '#5a7bd5', '#1e3a8a', '#2c4ea3'], // navy blue variants
      },
    ],
  };

  const doughnutData = {
    labels: zoneLabels,
    datasets: [
      {
        label: 'Budget Utilization (%)',
        data: initialZones.map(zone =>
          Math.round((zone.budgetUsed / zone.budgetAllocated) * 100)
        ),
        backgroundColor: ['#e6ecf8', '#a3b8e0', '#5a7bd5', '#1e3a8a'], // light to dark navy tones
      },
    ],
  };

  return (
    <>
      <AdminSidebar />
      <div className="p-6 ml-12 bg-white min-h-screen relative z-10">
        <h1 className="text-2xl font-bold mb-4 text-[#1e3a8a] text-center">Zone Analysis</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ChartCard title="Budget Allocated vs Used">
            <Bar
              data={barData}
              options={{
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: '#1e3a8a',
                      font: {
                        weight: 'bold',
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    ticks: {
                      color: '#1e3a8a',
                    },
                  },
                  y: {
                    ticks: {
                      color: '#1e3a8a',
                    },
                  },
                },
              }}
            />
          </ChartCard>

          <ChartCard title="Dispatch Count per Zone">
            <Pie
              data={pieData}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: '#1e3a8a',
                    },
                  },
                },
              }}
            />
          </ChartCard>

          <ChartCard title="Budget Utilization (%)">
            <Doughnut
              data={doughnutData}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: '#1e3a8a',
                    },
                  },
                },
              }}
            />
          </ChartCard>
        </div>
      </div>
    </>
  );
};

export default ZoneAnalysis;
