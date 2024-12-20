// import React, { useEffect } from 'react';
// import ApexCharts from 'apexcharts';

// function Client() {
//   useEffect(() => {
//     const chartConfig = {
//       series: [
//         {
//           name: "Sales",
//           data: [50, 40, 300, 320, 500, 350],
//         },
//       ],
//       chart: {
//         type: "bar",
//         height: 400,
//         toolbar: {
//           show: false,
//         },
//       },
//       title: {
//         show: "",
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       colors: ["#020617"],
//       plotOptions: {
//         bar: {
//           columnWidth: "25%",
//           borderRadius: 2,
//         },
//       },
//       xaxis: {
//         axisTicks: {
//           show: false,
//         },
//         axisBorder: {
//           show: false,
//         },
//         labels: {
//           style: {
//             colors: "#616161",
//             fontSize: "12px",
//             fontFamily: "inherit",
//             fontWeight: 400,
//           },
//         },
//         categories: [
//           "op1",
//           "op2",
//           "op3 ",
//           "op4",
//           "op4",
//           "op5",
//         ],
//       },
//       yaxis: {
//         labels: {
//           style: {
//             colors: "#616161",
//             fontSize: "12px",
//             fontFamily: "inherit",
//             fontWeight: 400,
//           },
//         },
//       },
//       grid: {
//         show: true,
//         borderColor: "#dddddd",
//         strokeDashArray: 5,
//         xaxis: {
//           lines: {
//             show: true,
//           },
//         },
//         padding: {
//           top: 5,
//           right: 20,
//         },
//       },
//       fill: {
//         opacity: 0.8,
//       },
//       tooltip: {
//         theme: "dark",
//       },
//     };

//     const chart = new ApexCharts(document.querySelector("#bar-chart"), chartConfig);
//     chart.render();

//     // Cleanup function to destroy the chart instance on component unmount
//     return () => {
//       chart.destroy();
//     };
//   }, []);

//   return (
//     <div>
//       <div class="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
//         <div class="relative mx-4 mt-4 flex flex-col gap-4 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none md:flex-row md:items-center">

//             <div>
//             <h6 class="block font-sans text-base font-semibold leading-relaxed tracking-normal text-blue-gray-900 antialiased">
//                 Line Chart
//             </h6>
//             <p class="block max-w-sm font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
//                 Visualize your data in a simple way using the
//                 @material-tailwind/html chart plugin.
//             </p>
//             </div>
//         </div>
//         <div class="pt-6 px-2 pb-0">
//             <div id="bar-chart"></div>
//         </div>
//         </div>
//     </div>
//   );
// }

// export default Client;


// import React, { useEffect } from 'react';
// import ApexCharts from 'apexcharts';
// import { chartData } from './data'; // Adjust the path as necessary

// function Client() {
//   const { series, labels, colors } = chartData;

//   useEffect(() => {
//     const chartConfig = {
//       series: [
//         {
//           name: "Sales",
//           data: series, // Using the same series data
//         },
//       ],
//       chart: {
//         type: "bar",
//         height: 400,
//         toolbar: {
//           show: false,
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       colors: [colors[0]], // Using the first color for the bar
//       plotOptions: {
//         bar: {
//           columnWidth: "25%",
//           borderRadius: 2,
//         },
//       },
//       xaxis: {
//         categories: labels,
//       },
//       yaxis: {
//         labels: {
//           style: {
//             colors: "#616161",
//           },
//         },
//       },
//       tooltip: {
//         theme: "dark",
//       },
//     };

//     const chart = new ApexCharts(document.querySelector("#bar-chart"), chartConfig);
//     chart.render();

//     return () => {
//       chart.destroy();
//     };
//   }, [series, labels, colors]);

//   return (
//     <div>
//       <div className="relative flex flex-col rounded-xl bg-white shadow-md">
//         <div className="relative mx-4 mt-4 flex flex-col gap-4">
//           <h6>Bar Chart</h6>
//         </div>
//         <div className="pt-6 px-2 pb-0">
//           <div id="bar-chart"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Client;


// import React, { useEffect } from 'react';
// import ApexCharts from 'apexcharts';
// import { chartData } from './data'; // Adjust the path as necessary

// function Client() {
//   const { series, labels, colors } = chartData;

//   useEffect(() => {
//     const chartConfig = {
//       series: [
//         {
//           name: "Sales",
//           data: series, // Using the same series data
//         },
//       ],
//       chart: {
//         type: "bar",
//         height: 400,
//         toolbar: {
//           show: false,
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       colors: colors, // Use the colors from chartData for each bar
//       plotOptions: {
//         bar: {
//           columnWidth: "25%",
//           borderRadius: 2,
//           distributed: true,
//         },
//       },
//       xaxis: {
//         categories: labels,
//       },
//       yaxis: {
//         labels: {
//           style: {
//             colors: "#616161",
//           },
//         },
//       },
//       tooltip: {
//         theme: "dark",
//       },
//     };

//     const chart = new ApexCharts(document.querySelector("#bar-chart"), chartConfig);
//     chart.render();

//     return () => {
//       chart.destroy();
//     };
//   }, [series, labels, colors]);

//   return (
//     <div>
//       <div className="relative flex flex-col rounded-xl bg-white shadow-md">
//         <div className="relative mx-4 mt-4 flex flex-col gap-4">
//           <h6>Bar Chart</h6>
//         </div>
//         <div className="pt-6 px-2 pb-0">
//           <div id="bar-chart"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Client;


import React, { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import { chartData } from './data'; // Adjust the path as necessary

function Client() {
  const { interference, radiance } = chartData;

  const createAreaChart = (selector, seriesData, chartName, color) => {
    const options = {
      chart: {
        height: "300px", // Increase the height
        maxWidth: "100%",
        type: "area",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: color, // Use the specific color for the chart
          gradientToColors: [color],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
        colors: [color], // Set stroke color to the specific color
      },
      grid: {
        show: true, // Enable grid lines
        borderColor: '#e0e0e0', // Color of the grid lines
        strokeDashArray: 4, // Dotted lines
        xaxis: {
          lines: {
            show: true, // Show x-axis line
          },
        },
        yaxis: {
          lines: {
            show: true, // Show y-axis line
          },
        },
      },
      series: [
        {
          name: chartName,
          data: seriesData,
        },
      ],
      xaxis: {
        categories: interference.labels, // Use labels from chart data
        labels: {
          show: true, // Show labels on x-axis
        },
        axisBorder: {
          show: true, // Show x-axis border
          color: '#b0b0b0', // Color of the x-axis border
        },
        axisTicks: {
          show: true, // Show ticks on x-axis
        },
      },
      yaxis: {
        show: true, // Show y-axis
        labels: {
          show: true, // Show labels on y-axis
        },
        axisBorder: {
          show: true, // Show y-axis border
          color: '#b0b0b0', // Color of the y-axis border
        },
      },
    };

    const chart = new ApexCharts(document.getElementById(selector), options);
    chart.render();

    return chart; // Return the chart instance for cleanup
  };

  useEffect(() => {
    const interferenceChart = createAreaChart("interference-chart", interference.series, "Interference", interference.colors[0]);
    const radianceChart = createAreaChart("radiance-chart", radiance.series, "Radiance", radiance.colors[0]);

    return () => {
      interferenceChart.destroy();
      radianceChart.destroy();
    };
  }, [interference, radiance]);

  return (
    <div className="flex justify-between gap-5"> {/* Flexbox for side-by-side layout */}
      <div className="relative flex flex-col rounded-xl bg-white shadow-md w-1/2"> {/* Adjust width if needed */}
        <div className="relative mx-4 mt-4 flex flex-col gap-4">
          <h6 className='font-semibold'>Interference Chart</h6>
        </div>
        <div className="pt-6 px-2 pb-0">
          <div id="interference-chart"></div>
        </div>
      </div>
      <div className="relative flex flex-col rounded-xl bg-white shadow-md w-1/2"> {/* Adjust width if needed */}
        <div className="relative mx-4 mt-4 flex flex-col gap-4">
          <h6 className='font-semibold'>Radiation Chart</h6>
        </div>
        <div className="pt-6 px-2 pb-0">
          <div id="radiance-chart"></div>
        </div>
      </div>
    </div>
  );
}

export default Client;
