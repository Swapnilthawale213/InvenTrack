import Sidebar from '../components/Sidebar';
import { Bar, Pie } from 'react-chartjs-2';
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
import { initialItems } from '../data/itemsData.js';
import { useSession } from '../context/SessionContext'; 
import { initialZones } from '../data/zonesData'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// Categorization logic
const categorizeItem = (item) => {
  if (item.current_quantity < item.min_quantity - item.min_quantity * 0.10) return "Needs Restocking";
  if (
    item.current_quantity > item.min_quantity - item.min_quantity * 0.10 &&
    item.current_quantity < item.min_quantity + item.min_quantity * 0.10
  )
    return "Limited";
  return "Plenty";
};

// Get restocking status counts
const getRestockingStatus = (items) => {
  const statusCounts = { "Needs Restocking": 0, "Limited": 0, "Plenty": 0 };

  items.forEach((item) => {
    const category = categorizeItem(item);
    statusCounts[category]++;
  });

  return Object.entries(statusCounts).map(([status, count]) => ({ status, count }));
};

const ItemAnalysis = () => {
  const { sessionData } = useSession(); // ✅ updated
  const role = sessionData?.role;
  
const zoneId = sessionData?.zoneId;
const zone = initialZones.find(z => z.zoneId === zoneId);

  // Filter items by zone
  const zoneItems = role === "admin"
    ? initialItems
    : initialItems.filter((item) => item.zone_id === zoneId);

  // Bar chart for stock quantity
  const barData = {
    labels: zoneItems.map((item) => item.name),
    datasets: [
      {
        label: 'Stock Quantity',
        data: zoneItems.map((item) => item.current_quantity),
        backgroundColor: '#1a237e', // Navy Blue
      },
    ],
  };

  const barOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#1a237e',
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          color: '#1a237e',
        },
      },
      y: {
        ticks: {
          color: '#1a237e',
        },
      },
    },
  };

  // Pie chart for restocking status
  const restockingStatusData = getRestockingStatus(zoneItems);
  const pieData = {
    labels: restockingStatusData.map((item) => item.status),
    datasets: [
      {
        data: restockingStatusData.map((item) => item.count),
        backgroundColor: ['#0d1b2a', '#1b2a49', '#274060'], // Navy Blue Variants
      },
    ],
  };

  // Bar chart for price distribution
  const priceData = {
    labels: zoneItems.map((item) => item.name),
    datasets: [
      {
        label: 'Price per Unit',
        data: zoneItems.map((item) => item.unit_cost),
        backgroundColor: '#283593', // Navy Blue
      },
    ],
  };

  const priceOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#1a237e',
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Price (₹)',
          color: '#1a237e',
        },
        ticks: {
          color: '#1a237e',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Items',
          color: '#1a237e',
        },
        ticks: {
          color: '#1a237e',
        },
      },
    },
  };

  return (
    <>
      <Sidebar />
      <div className="p-6 ml-12 bg-white min-h-screen relative z-10">
        <h1 className="text-2xl font-bold mb-4 text-[#1a237e] text-center">
          Item Analysis - {zone?.zoneName}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ChartCard title="Stock Levels of Each Product">
            <Bar data={barData} options={barOptions} />
          </ChartCard>

          <ChartCard title="Restocking Status of Items">
            <Pie data={pieData} />
          </ChartCard>

          <ChartCard title="Price Distribution of Items">
            <Bar data={priceData} options={priceOptions} />
          </ChartCard>
        </div>
      </div>
    </>
  );
};

export default ItemAnalysis;
