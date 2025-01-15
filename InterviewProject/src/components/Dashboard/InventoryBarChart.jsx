import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Button } from '../ui/button';

// Register required Chart.js modules
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const InventoryBarChart = ({ inventoryCount }) => {
  // State to track selected dataset ("new", "used", "cpo")
  const [selectedCondition, setSelectedCondition] = useState('new');

  // Ensure inventoryCount and the selectedCondition are defined before accessing them
  const conditionData = inventoryCount?.[selectedCondition] || {}; // Fallback to empty object if undefined
  const labels = Object.keys(conditionData); // Dates for x-axis
  const counts = Object.values(conditionData); // Inventory counts

  // Data for Chart.js
  const data = {
    labels,
    datasets: [
      {
        label: `${selectedCondition.charAt(0).toUpperCase() + selectedCondition.slice(1)} Inventory`,
        data: counts,
        backgroundColor: '#FF9926',  // Bar color
        borderColor: '#FF9926',      // Border color
        borderWidth: 1,
        barThickness: 35,            // Explicitly set the bar thickness
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Inventory Count (${selectedCondition.toUpperCase()})`
      },
      tooltip: {
        mode: 'index',
        intersect: false
      },
      legend: {
        display: true,
        position: 'top'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Dates'
        },
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 45
        },
        grid: {
          display: false
        },
        offset: true,
        categoryPercentage: 0.9,  // Increase gap between categories
        barPercentage: 0.1,       // Increase gap between bars
      },
      y: {
        title: {
          display: true,
          text: 'Count'
        },
        beginAtZero: true
      }
    },
    layout: {
        padding: {
          right: 10 // Adds space on the right side of the chart
        }
    }
  };

  return (
    <div className='overflow-x-auto text-start bg-white my-8' style={{ width: '100%', height: '80%', margin: '0 auto', textAlign: 'center', overflowX: 'auto' }}>
      {/* Buttons to toggle datasets */}
      <div className='flex justify-between'>
      <div className="flex justify-center gap-4 mb-4 items-center py-8 px-6 text-start">
        <span className='text-xl font-semibold'>Inventory Count</span>
        <Button
          className={`px-4 py-2 rounded ${selectedCondition === 'new' ? 'bg-[#FF9926] text-white' : 'bg-gray-200 border-[#FF9926] text-black'}`}
          onClick={() => setSelectedCondition('new')}
        >
          New 
        </Button>
        <Button
          className={`px-4 py-2 rounded ${selectedCondition === 'used' ? 'bg-[#FF9926] text-white' : 'bg-gray-200 border-[#FF9926] text-black'}`}
          onClick={() => setSelectedCondition('used')}
        >
          Used 
        </Button>
        <Button
          className={`px-4 py-2 rounded ${selectedCondition === 'cpo' ? 'bg-[#FF9926] text-white' : 'bg-gray-200 border-[#FF9926] text-black'}`}
          onClick={() => setSelectedCondition('cpo')}
        >
          CPO 
        </Button>
      </div>
      <div></div>
      </div>

      {/* Bar chart */}
      {labels.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>No data available for {selectedCondition} inventory.</p>
      )}
    </div>
  );
};

export default InventoryBarChart;
