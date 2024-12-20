// import React, { useEffect, useState } from 'react';
// import ApexCharts from 'apexcharts';

// function Client_Profits() {
//   const seriesData = [44, 55, 13, 43, 22];
//   const labels = [
//     "op1",
//     "op2",
//     "op3",
//     "op4",
//     "op5",

//   ];
  
//   const colors = ['#020617', '#ff8f00', '#00897b', '#1e88e5', '#d81b60'];

//   // Calculate percentages
//   const total = seriesData.reduce((acc, val) => acc + val, 0);
//   const percentages = seriesData.map(value => ((value / total) * 100).toFixed(2));

//   useEffect(() => {
//     const chartConfig = {
//       series: seriesData,
//       chart: {
//         type: 'pie',
//         width: 350,
//         height: 350,
//         toolbar: {
//           show: false,
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       colors: colors,
//       legend: {
//         show: false,
//       },
//       labels: labels,
//       tooltip: {
//         y: {
//           formatter: (val) => {
//             return `${val} units`; // Customize tooltip value if needed
//           },
//         },
//       },
//     };

//     const chart = new ApexCharts(document.querySelector('#pie-chart'), chartConfig);
//     chart.render();

//     // Cleanup function to destroy the chart on component unmount
//     return () => {
//       chart.destroy();
//     };
//   }, []);

//   return (
//     <div >
//          <div class="relative mx-4 mt-4 flex flex-col gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none md:flex-row md:items-center">
//         <div>
//         <h6 class="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
//             Line Chart
//         </h6>
//         <p class="block max-w-sm font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
//             Visualize your data in a simple way using the
//             @material-tailwind/html chart plugin.
//         </p>
//         </div>
//         </div>
//       <div className="flex-shrink-0 flex items-center space-x-10 mt-10">
//         <div id="pie-chart"></div>
//         <div className="flex flex-col justify-center">
//         {labels.map((label, index) => (
//           <div key={index} className="flex items-center">
//             <div
//               className="w-3 h-3 mr-2"
//               style={{ backgroundColor: colors[index], borderRadius: '50%' }}
//             ></div>
//             <span>{label}: {percentages[index]}%</span>
//           </div>
//         ))}
//       </div>
//       </div>
 
//     </div>
//   );
// }

// export default Client_Profits;

import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { chartData } from './data'; // Adjust the path as necessary

function Client_Profits() {
  const { series, labels, colors } = chartData;

  // Calculate percentages
  const total = series.reduce((acc, val) => acc + val, 0);
  const percentages = series.map(value => ((value / total) * 100).toFixed(2));

  useEffect(() => {
    const chartConfig = {
      series: series,
      chart: {
        type: 'pie',
        width: 350,
        height: 350,
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: colors,
      legend: {
        show: false,
      },
      labels: labels,
      tooltip: {
        y: {
          formatter: (val) => `${val} units`,
        },
      },
    };

    const chart = new ApexCharts(document.querySelector('#pie-chart'), chartConfig);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [series, colors, labels]);

  return (
    <div>
      <div className="relative mx-4 mt-4 flex flex-col gap-4">
        <h6>Performace</h6>
        <div className="flex-shrink-0 flex items-center space-x-10 mt-10">
          <div id="pie-chart"></div>
          <div className="flex flex-col justify-center">
            {labels.map((label, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 mr-2"
                  style={{ backgroundColor: colors[index], borderRadius: '50%' }}
                ></div>
                <span>{label}: {percentages[index]}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Client_Profits;
