import React, { useState ,useEffect} from 'react';
import StatisticsCards from '../layouts/statistics-cards-data';
import Client from '../layouts/Client';
// import Client_Profits from '../layouts/Client_Profits';

export function Home() {
  const [filter, setFilter] = useState('');
  const [documents, setDocuments] = useState([]);
  const workOrders = [
    {
      id: 'KNTYS00172A',
      vehicleName: 'op4',
      type: 'Bangalore',
      size: 'Completed',
      fromLocation: '20/06/2024',
      toLocation: 'Vizag',
      deliveryDate: '05/06/2024',
      mapLocation: 'PLACE_ID_1', // Replace with actual place IDs or URLs
    },
    {
      id: 'ABYES00111B',
      vehicleName: 'op3',
      type: 'Vizag',
      size: 'Processing',
      fromLocation: '3/02/2024',
      toLocation: 'Bangalore',
      deliveryDate: '20/06/2024',
      mapLocation: 'PLACE_ID_2', // Replace with actual place IDs or URLs
    },
    {
      id: 'JHSBX00172A',
      vehicleName: 'op1',
      type: 'Vizag',
      size: 'Processing',
      fromLocation: '10/05/2024',
      toLocation: 'Vizag',
      deliveryDate: '05/06/2024',
      mapLocation: 'PLACE_ID_3', // Replace with actual place IDs or URLs
    },
  ];

  const filteredWorkOrders = workOrders.filter((order) =>
    Object.values(order).some((value) =>
      value.toString().toLowerCase().includes(filter.toLowerCase())
    )
  );

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('https://dt-dev-backend.onrender.com/api/forms/antenna-layouts');
        setDocuments(response.data);
        console.log("data from backend:",response.data)
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);
  return (
    <div className='p-5'>
      <div className='mb-5'>
        <StatisticsCards />
      </div>
      <div>
        <h1 className='text-lg font-semibold mb-3'>Operators</h1>
        <div className='grid  gap-5 p-3 rounded-xl'>
          <Client />
        </div>
      </div>
      <div className='grid md:grid-cols-2'>
        <div className="mt-3 p-1 mb-5">
          <div className="flex justify-between items-center">
            <h1 className='text-lg font-semibold'>Recent Updates</h1>
          </div>
          <div className="mt-4 bg-white p-5 rounded-xl shadow-md">
            <table className="w-full text-sm">
              <thead className="border-y text-left">
                <tr className="py-5">
                  <th className="px-1 py-4">Tower ID</th>
                  <th className="px-2 py-4">Client</th>
                  <th className="px-2 py-4">Location</th>
                  <th className="px-1 py-4">Status</th>
                  <th className="px-1 py-4">Last Maintenance</th>
                  <th className="pe-4 py-4">Log</th>
                </tr>
              </thead>
            </table>
            <div className="max-h-[300px] overflow-y-auto">
              <table className="w-full text-sm">
                <tbody>
                  {filteredWorkOrders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="py-4">{order.id}</td>
                      <td className="py-4">{order.vehicleName}</td>
                      <td className="px-2 py-4">{order.type}</td>
                      <td className="px-4 py-4">{order.size}</td>
                      <td className="px-3 py-4">{order.fromLocation}</td>
                      <td className="py-4">{order.toLocation}</td>
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
