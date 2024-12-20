import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApexCharts from 'apexcharts';
import chroma from 'chroma-js'; // Import chroma.js for dynamic color generation

function Client() {
  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
    colors: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/form/ins-get'); // Adjust to your API endpoint

        // Process the data to create a series and labels
        const data = response.data;

        const operatorCounts = {}; // To store count of each operator

        data.forEach(item => {
          if (item.operators && Array.isArray(item.operators)) {
            item.operators.forEach(operator => {
              if (operator.operator && operator.operator.trim() !== '') {
                const operatorName = operator.operator.trim();
                operatorCounts[operatorName] = (operatorCounts[operatorName] || 0) + 1;
              }
            });
          }
        });

        // Prepare the chart labels (operators) and series (counts)
        const labels = Object.keys(operatorCounts);
        const series = Object.values(operatorCounts);

        // Generate dynamic colors based on the number of labels
        const colors = chroma.scale('Set2').mode('lab').colors(labels.length);

        // Update the chart data state
        setChartData({
          series: series,
          labels: labels,
          colors: colors,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // This effect runs once when the component mounts

  useEffect(() => {
    if (chartData.series.length > 0 && chartData.labels.length > 0) {
      const chartConfig = {
        series: [
          {
            name: 'Towers', // You can customize this label
            data: chartData.series,
          },
        ],
        chart: {
          type: 'bar',
          height: 250,
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: chartData.colors, // Use dynamically generated colors
        plotOptions: {
          bar: {
            columnWidth: '20%',
            borderRadius: 2,
            distributed: true,
          },
        },
        xaxis: {
          categories: chartData.labels,
        },
        yaxis: {
          labels: {
            style: {
              colors: '#616161',
            },
          },
        },
        tooltip: {
          theme: 'dark',
        },
      };

      const chart = new ApexCharts(document.querySelector('#bar-chart'), chartConfig);
      chart.render();

      return () => {
        chart.destroy(); // Clean up chart on unmount or when chartData changes
      };
    }
  }, [chartData]); // Re-render the chart when chartData changes

  return (
    <div>
      <div className="relative flex flex-col max-w-3xl rounded-xl bg-white shadow-md">
        <div className="relative mx-4 mt-4 flex flex-col gap-4">
          <h6 className="font-semibold">Antenna Density</h6>
        </div>
        <div className="pt-6 px-2 pb-0">
          <div id="bar-chart"></div>
        </div>
      </div>
    </div>
  );
}

export default Client;