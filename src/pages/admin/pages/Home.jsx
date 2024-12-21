import React, { useState, useEffect } from 'react';
import StatisticsCards from '../layouts/statistics-cards-data';
import Client from '../layouts/Client';
import Client_Profits from '../layouts/Client_Profits';
import axios from 'axios';

export function Home() {
  const [filter, setFilter] = useState('');
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('http://13.235.82.152:3000/api/form/antenna-layouts');
        // Assuming response.data is an array of documents with a timestamp field
        const sortedDocuments = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        const latestDocuments = sortedDocuments.slice(0, 10);
        setDocuments(latestDocuments);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
  
    fetchDocuments();
  }, []);
  


  const filteredWorkOrders = documents.filter((order) =>
    Object.values(order).some((value) =>
      value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  // console.log("filterDocumets:",filteredWorkOrders)

  return (
    <div className='p-5'>
      <div className='mb-5'>
        <StatisticsCards />
      </div>
      <div>
        <h1 className='text-lg font-semibold mb-3'>Operators</h1>
        <div className='grid md:grid-cols-2 gap-5 p-3 rounded-xl'>
          <Client_Profits />
          <Client />
        </div>
      </div>
      <div className='grid md:grid-cols-2'>
        <div className="mt-3 p-1 mb-5">
          <div className="flex justify-between items-center">
            <h1 className='text-lg font-semibold'>Recent Updates</h1>
          </div>
          <div className="mt-4 bg-white p-3 rounded-xl shadow-md">
            <table className="w-full text-sm">
            <thead className="border-b text-left">
              <tr className="py-5 hover:bg-gray-100 hover:shadow-md">
                <th className="px-4 py-4">Tower ID</th>
                <th className="px-4 py-4">Client</th>
                <th className="px-4 py-4">Location</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4">Last Maintenance</th>
                <th className="px-4 py-4">Log</th>
              </tr>
            </thead>
          </table>

          <div className="max-h-[200px] overflow-y-auto">
            <table className="w-full text-sm">
              <tbody>
                {filteredWorkOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-100 hover:shadow-md">
                    <td className="ps-2 py-4 ">{order.siteId}</td>
                    <td className="px-4 py-4">{order.noOperators}</td>
                    <td className="px-4 ps-10 py-4 ">{order.location}</td>
                    <td className="px-4 py-4 ">Processing</td>
                    <td className="px-6 py-4">{order.scanDate}</td>
                    <td className="px-4 py-4">Nill</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          </div>
        </div>
        <div className=" p-3 mt-14">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d9540.195161595973!2d83.31283792915833!3d17.733152090034732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDQzJzUzLjciTiA4M8KwMTknMDYuOSJF!5e1!3m2!1sen!2sin!4v1726925463570!5m2!1sen!2sin"
                width="100%"
                height="240"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </div>
      </div>
    </div>
  );
}

export default Home;