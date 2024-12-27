// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ApexCharts from 'apexcharts';
// import chroma from 'chroma-js'; // Import chroma.js for color generation

// function Client_Profits() {
//   // State to hold the chart data
//   const [chartData, setChartData] = useState({
//     series: [],
//     labels: [],
//     colors: [], // Start with an empty array for colors
//   });

//   // Fetch operator data and prepare chart data
//   useEffect(() => {
//     const fetchOperators = async () => {
//       try {
//         const response = await axios.get('https://dt-dev-backend.onrender.com/api/form/ins-get');
        
//         // console.log("API Response:", response.data); // Log the full response for debugging

//         // Create an object to store operator counts
//         const operatorCounts = {};

//         // Loop through the data to extract and count operators
//         response.data.forEach(item => {
//           if (item.operators && Array.isArray(item.operators)) {
//             item.operators.forEach(operator => {
//               // Check if the operator field exists and is not empty
//               if (operator.operator && operator.operator.trim() !== '') {
//                 const operatorName = operator.operator.trim();
//                 // Increment the count of the operator
//                 operatorCounts[operatorName] = (operatorCounts[operatorName] || 0) + 1;
//               }
//             });
//           }
//         });

//         // Prepare the labels and series arrays
//         const labels = Object.keys(operatorCounts);
//         const series = Object.values(operatorCounts);

//         // Generate colors dynamically based on the number of operators
//         const colors = chroma.scale('Set2') // Using a color scale from the Set2 palette
//           .mode('lab')
//           .colors(labels.length); // Generate colors matching the number of labels

//         // Update the state with the new chart data
//         setChartData({
//           series: series,
//           labels: labels,
//           colors: colors, // Set dynamically generated colors
//         });

//         // console.log("Formatted Chart Data:", { series, labels, colors });

//       } catch (error) {
//         console.error("Error fetching operators:", error);
//       }
//     };

//     fetchOperators();
//   }, []);  // This effect runs only once when the component mounts

//   // Calculate percentages for each operator
//   const total = chartData.series.reduce((acc, val) => acc + val, 0);
//   const percentages = chartData.series.map(value => ((value / total) * 100).toFixed(2));

//   // Render chart using ApexCharts
//   useEffect(() => {
//     if (chartData.series.length > 0 && chartData.labels.length > 0) {
//       const chartConfig = {
//         series: chartData.series,
//         chart: {
//           type: 'pie',
//           width: 300,
//           height: 300,
//           toolbar: {
//             show: false,
//           },
//         },
//         dataLabels: {
//           enabled: false,
//         },
//         colors: chartData.colors,
//         legend: {
//           show: false,
//         },
//         labels: chartData.labels,
//         tooltip: {
//           y: {
//             formatter: (val) => `${val} units`,  // Customize the unit
//           },
//         },
//       };

//       const chart = new ApexCharts(document.querySelector('#pie-chart'), chartConfig);
//       chart.render();

//       return () => {
//         chart.destroy();  // Clean up chart on unmount or update
//       };
//     }
//   }, [chartData]);  // Re-run effect when chartData changes

//   return (
//     <div>
//       <div className="relative mx-4 flex flex-col gap-4 bg-white p-4 rounded-xl shadow-md">
//         <h6 className='font-semibold'>Performance</h6>
//         <div className="flex-shrink-0 flex items-center space-x-10 px-5">
//           <div id="pie-chart"></div>
//           <div className="flex flex-col justify-center px-16 h-[260px] overflow-y-scroll scrollbar-hide">
//             {chartData.labels.map((label, index) => (
//               <div key={index} className="flex items-center">
//                 <div
//                   className="w-3 h-3 mr-2"
//                   style={{ backgroundColor: chartData.colors[index], borderRadius: '50%' }}
//                 ></div>
//                 <span>{label}: {percentages[index]}%</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Client_Profits;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import ApexCharts from 'apexcharts';
// import chroma from 'chroma-js'; // Import chroma.js for color generation

// function Client_Profits() {
//   // State to hold the chart data
//   const [chartData, setChartData] = useState({
//     series: [],
//     labels: [],
//     colors: [], // Start with an empty array for colors
//   });

//   // Fetch operator data and prepare chart data
//   useEffect(() => {
//     const fetchOperators = async () => {
//       try {
//         const response = await axios.get('https://dt-dev-backend.onrender.com/api/form/ins-get');
        
//         // Create a Set to store unique operator names
//         const operators = new Set();

//         response.data.forEach(item => {
//           if (item.operators && Array.isArray(item.operators)) {
//             item.operators.forEach(operatorItem => {
//               // Loop through __parentArray to get operator names
//               if (operatorItem.__parentArray && Array.isArray(operatorItem.__parentArray)) {
//                 operatorItem.__parentArray.forEach(operator => {
//                   if (operator.operator && operator.operator.trim() !== '') {
//                     operators.add(operator.operator);  // Add operator to the Set
//                   }
//                 });
//               }
//             });
//           }
//         });

//         // Prepare the labels and series arrays
//         const labels = Array.from(operators);  // Convert the Set to an array for labels
//         const series = labels.map(() => 1);    // Assuming 1 unit per operator for now

//         // Generate colors dynamically based on the number of operators
//         const colors = chroma.scale('Set2') // Using a color scale from the Set2 palette
//           .mode('lab')
//           .colors(labels.length); // Generate colors matching the number of labels

//         // Update the state with the new chart data
//         setChartData({
//           series: series,
//           labels: labels,
//           colors: colors, // Set dynamically generated colors
//         });

//       } catch (error) {
//         console.error("Error fetching operators:", error);
//       }
//     };

//     fetchOperators();
//   }, []);  // This effect runs only once when the component mounts

//   // Calculate percentages for each operator
//   const total = chartData.series.reduce((acc, val) => acc + val, 0);
//   const percentages = chartData.series.map(value => ((value / total) * 100).toFixed(2));

//   // Render chart using ApexCharts
//   useEffect(() => {
//     if (chartData.series.length > 0 && chartData.labels.length > 0) {
//       const chartConfig = {
//         series: chartData.series,
//         chart: {
//           type: 'pie',
//           width: 300,
//           height: 300,
//           toolbar: {
//             show: false,
//           },
//         },
//         dataLabels: {
//           enabled: false,
//         },
//         colors: chartData.colors,
//         legend: {
//           show: false,
//         },
//         labels: chartData.labels,
//         tooltip: {
//           y: {
//             formatter: (val) => `${val} units`,  // Customize the unit
//           },
//         },
//       };

//       const chart = new ApexCharts(document.querySelector('#pie-chart'), chartConfig);
//       chart.render();

//       return () => {
//         chart.destroy();  // Clean up chart on unmount or update
//       };
//     }
//   }, [chartData]);  // Re-run effect when chartData changes

//   return (
//     <div>
//       <div className="relative mx-4 flex flex-col gap-4 bg-white p-4 rounded-xl shadow-md">
//         <h6 className='font-semibold'>Performance</h6>
//         <div className="flex-shrink-0 flex items-center space-x-10 px-5">
//           <div id="pie-chart"></div>
//           <div className="flex flex-col justify-center px-16 h-[260px] overflow-y-scroll scrollbar-hide">
//             {chartData.labels.map((label, index) => (
//               <div key={index} className="flex items-center">
//                 <div
//                   className="w-3 h-3 mr-2"
//                   style={{ backgroundColor: chartData.colors[index], borderRadius: '50%' }}
//                 ></div>
//                 <span>{label}: {percentages[index]}%</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Client_Profits;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApexCharts from 'apexcharts';
import chroma from 'chroma-js';

function Client_Profits() {
  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
    colors: [],
  });

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const response = await axios.get('https://dt-dev-backend.onrender.com/api/form/ins-get');
        
        // Process the data to create a series and labels
        const data = response.data;

        const operatorCounts = {}; // To store count of each operator

        data.forEach(item => {
          if (item.operators && Array.isArray(item.operators)) {
            item.operators.forEach(operatorItem => {
              if (operatorItem.__parentArray && Array.isArray(operatorItem.__parentArray)) {
                // Loop through __parentArray to get operator names
                operatorItem.__parentArray.forEach(operator => {
                  if (operator.operator && operator.operator.trim() !== '') {
                    const operatorName = operator.operator.trim();
                    operatorCounts[operatorName] = (operatorCounts[operatorName] || 0) + 1; // Increment count for each occurrence
                  }
                });
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
        console.error("Error fetching operators:", error);
      }
    };

    fetchOperators();
  }, []); // This effect runs once when the component mounts

  useEffect(() => {
    if (chartData.series.length > 0 && chartData.labels.length > 0) {
      const chartConfig = {
        series: chartData.series,
        chart: {
          type: 'pie',
          width: 300,
          height: 300,
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: chartData.colors, // Use dynamically generated colors
        legend: {
          show: false,
        },
        labels: chartData.labels,
        tooltip: {
          y: {
            formatter: (val) => `${val} units`, // Customize the unit
          },
        },
      };

      const chart = new ApexCharts(document.querySelector('#pie-chart'), chartConfig);
      chart.render();

      return () => {
        chart.destroy(); // Clean up chart on unmount or when chartData changes
      };
    }
  }, [chartData]); // Re-run effect when chartData changes

  return (
    <div>
      <div className="relative mx-4 flex flex-col gap-4 bg-white p-4 rounded-xl shadow-md">
        <h6 className='font-semibold'>Performance</h6>
        <div className="flex-shrink-0 flex items-center space-x-10 px-5">
          <div id="pie-chart"></div>
          <div className="flex flex-col justify-center px-16 h-[260px] overflow-y-scroll scrollbar-hide">
            {chartData.labels.map((label, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 mr-2"
                  style={{ backgroundColor: chartData.colors[index], borderRadius: '50%' }}
                ></div>
                <span>{label}: {((chartData.series[index] / chartData.series.reduce((acc, val) => acc + val, 0)) * 100).toFixed(2)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Client_Profits;
