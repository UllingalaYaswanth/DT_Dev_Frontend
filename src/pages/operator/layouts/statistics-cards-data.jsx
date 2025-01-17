// import React from 'react';
// import {
//   BanknotesIcon,
//   UserPlusIcon,
//   UsersIcon,
//   ChartBarIcon,
// } from "@heroicons/react/24/solid";

// const statisticsCardsData = [
//   {
//     color: "gray",
//     icon: BanknotesIcon,
//     title: "Total Antenna",
//     value: "1000",
//   },
//   {
//     color: "gray",
//     icon: UsersIcon,
//     title: "Operational Antennas",
//     value: "900",
//   },
//   {
//     color: "gray",
//     icon: UserPlusIcon,
//     title: "Under Maintenance",
//     value: "100",
//   },
//   {
//     color: "gray",
//     icon: ChartBarIcon,
//     title: "Prcoessed Antennas",
//     value: "700",
//   },
// ];

// const StatisticsCard = ({ color, icon: Icon, title, value }) => {
//   return (
//     <div className={` bg-white text-black flex justify-between items-center p-4 rounded-lg shadow-md border border-gray-300 text-gray-700`}>
//       <Icon className="h-6 w-6 mb-2" aria-hidden="true" />
//       <div className='text-end'>
//       <h2 className="text-lg font-semibold">{title}</h2>
//       <p className="text-xl">{value}</p>
//       </div>
//     </div>
//   );
// };

// const StatisticsCards = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//       {statisticsCardsData.map((data, index) => (
//         <StatisticsCard key={index} {...data} />
//       ))}
//     </div>
//   );
// };


// export default StatisticsCards;



import React, { useEffect, useState } from 'react';
import {
  BanknotesIcon,
  UserPlusIcon,
  UsersIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";
import axios from 'axios';

const StatisticsCard = ({ color, icon: Icon, title, value }) => {
  return (
    <div className={`bg-[#B1B1B1] text-gray-800 flex justify-between items-center p-4 rounded-lg shadow-md border border-gray-100`}>
      <Icon className="h-6 w-6 mb-2" aria-hidden="true" />
      <div className='text-end'>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-xl">{value}</p>
      </div>
    </div>
  );
};

const StatisticsCards = () => {
  const [documents, setDocuments] = useState([]);
  const [uniqueOperators, setUniqueOperators] = useState(new Set()); 

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('https://dt-dev-backend.onrender.com/api/forms/antenna-layouts');
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const response = await axios.get('https://dt-dev-backend.onrender.com/api/form/ins-get');
        
        console.log("API Response:", response.data);  // Log the full response for debugging
        
        // Create a Set to store unique operator names
        const operators = new Set();
        console.log("operartor:",operators)

        // Loop through the data to extract operators
        response.data.forEach(item => {
          if (item.operators && Array.isArray(item.operators)) {
            item.operators.forEach(operator => {
              // Check if the operator field exists and is not empty
              if (operator.operator && operator.operator.trim() !== '') {
                operators.add(operator.operator);  // Add operator to the Set
              }
            });
          }
        });

        // Set the unique operators in state
        setUniqueOperators(operators);
        console.log("Unique Operators:", Array.from(operators));  // Log the unique operators for debugging

      } catch (error) {
        console.error("Error fetching operators:", error);
      }
    };

    fetchOperators();
  }, []);  // This effect runs only once when the component mounts

  const statisticsCardsData = [
    {
      color: "gray",
      icon: BanknotesIcon,
      title: "Total Towers",
      value: documents.length,  
    },
    {
      color: "gray",
      icon: UsersIcon,
      title: "Operational Towers",
      value: documents.length, 
    },
    {
      color: "gray",
      icon: UserPlusIcon,
      title: "Under Maintenance",
      value: "0",
    },
    {
      color: "gray",
      icon: ChartBarIcon,
      title: "Prcoessed Antennas",
      value: "0", 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statisticsCardsData.map((data, index) => (
        <StatisticsCard key={index} {...data} />
      ))}
    </div>
  );
};

export default StatisticsCards;
