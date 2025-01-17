import React, { useState, useEffect } from 'react';
import image3 from '../../../img/RealityCapture_UYRdFrq7Xq.png';

const SubSection4 = ({ towerDetails }) => {
  const [data, setData] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSites, setActiveSites] = useState([]);
  const [activeSite, setActiveSite] = useState(null); // Add activeSite state
  const [activeOperator, setActiveOperator] = useState(0); // Default to operator 1 (index 0)

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dt-dev-backend.onrender.com/api/forms/ins-get'); // Your API endpoint here
        const result = await response.json();
        console.log(result);

        if (response.ok) {
          setData(result); // Set the entire data response

          // Automatically set all sites and operators as active by default
          if (result.length > 0) {
            // Loop through all the fetched data to set all sites and operators as active
            const allSites = result.map((site, index) => ({
              siteID: site.siteID,
              operatorID: index, // Assuming operators are indexed, or you can fetch their details similarly
            }));

            setActiveSites(allSites); // Set all sites and operators as active

            // Initialize active site based on towerDetails or first available site
            setActiveSite(towerDetails?.siteId || result[0].siteID);
          }
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        setError('Error occurred while fetching data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [towerDetails]); // Re-run the effect if towerDetails changes

  // Render loading state or error message
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Filter the data to show only the tower details that match the siteId
  const filteredData = towerDetails && towerDetails.siteId
    ? data.filter(site => site.siteID === towerDetails.siteId)
    : data;

  // If no active site is set, fallback to the first site from filtered data
  const activeSiteData = filteredData.find((site) => site.siteID === activeSite) || filteredData[0];

  // Return a message if active site is not found
  if (!activeSiteData) {
    return <div>No site found for the selected ID.</div>;
  }

  // Handle operator selection
  const handleOperatorClick = (operatorIndex) => {
    setActiveOperator(operatorIndex); // Update active operator
  };

  return (
    <div className="mx-auto h-[89vh]">
      <div className="flex gap-10 px-6 py-6">
        <div className="w-[1570px]">
          {/* Display the active site details */}
          {activeSiteData && (
            <div className="mb-6 flex relative bg-white p-5 rounded-md">
              <div>
                <h3 className="text-xl font-semibold mb-5 text-center">Site ID: {activeSiteData.siteID}</h3>
                <img src={image3} alt="Site Visualization" />
                {activeSiteData.operators && activeSiteData.operators.length > 0 ? (
                  <div className="mb-4 absolute top-20 left-0 right-0 z-10">
                    {activeSiteData.operators.map((operator, operatorIndex) => (
                      <button
                        key={operatorIndex}
                        onClick={() => handleOperatorClick(operatorIndex)}
                        style={{
                          opacity: 0.5,
                          borderStyle: 'dotted',
                          borderWidth: '2px',
                          left: '',
                          right: '0',
                          marginLeft: '2%',
                        }}
                        className={`text-white text-sm h-[60px] w-[300px] px-4 py-2 rounded-md m-2 flex 
                          ${activeOperator === operatorIndex ? 'text-black bg-gray-100/50' : 'hover:bg-gray-100/50 hover:text-black'}`}
                      >
                        Operator {operatorIndex + 1}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p>No operators found for this site.</p>
                )}
              </div>
              <div className="max-h-[800px] w-[60%] mx-auto overflow-y-scroll scrollbar-hide">
                {activeOperator !== null && activeSiteData.operators[activeOperator] && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Operator {activeOperator + 1} Details</h4>
                    <div className="grid md:grid-cols-4 gap-5 mt-3">
                      <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg">
                        <strong>Operator:</strong> {activeSiteData.operators[activeOperator].operator || 'N/A'}
                      </p>
                      <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg">
                        <strong>Rad Center:</strong> {activeSiteData.operators[activeOperator].radCenter || 'N/A'}
                      </p>
                      <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg">
                        <strong>Empty Mounts:</strong> {activeSiteData.operators[activeOperator].emptyMounts || 'N/A'}
                      </p>
                      <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg">
                        <strong>Last Maintenance:</strong> {activeSiteData.operators[activeOperator].lastMaintenance || 'N/A'}
                      </p>
                    </div>

                    <div>
                      <h5 className="font-medium mt-5">Azimuth Angles</h5>
                      <div className="grid md:grid-cols-3 gap-5 mt-3">
                        {activeSiteData.operators[activeOperator]?.azimuthAngles?.length > 0 ? (
                          activeSiteData.operators[activeOperator].azimuthAngles.map((angle, angleIndex) => (
                            <div key={angleIndex}>
                              <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg">
                                <strong>{angle.angle}:</strong> {angle.details || 'N/A'}
                              </p>
                              {angle.imagePath && (
                                <img
                                  src={angle.imagePath} // Access the correct imagePath key
                                  alt={angle.angle || 'Azimuth angle image'}
                                  className="w-[200px] h-[160px] mx-auto rounded mt-2 hover:shadow-xl"
                                />
                              )}
                            </div>
                          ))
                        ) : (
                          <p>No Azimuth Angles available.</p>
                        )}
                      </div>

                      <h5 className="font-medium mt-4">Annotations</h5>
                      <div className="grid md:grid-cols-2 gap-5 mt-3">
                        {activeSiteData.operators[activeOperator]?.annotations?.length > 0 ? (
                          activeSiteData.operators[activeOperator].annotations.map((annotation, index) => (
                            <div key={index}>
                              {/* <p>{annotation.image}</p> */}
                              {annotation.imagePath && (
                                <img
                                  src={annotation.imagePath} // Access the correct imagePath key
                                  alt={`Annotation ${index + 1}`}
                                  className="w-[250px] h-[200px] mx-auto rounded mt-2 hover:shadow-xl"
                                />
                              )}
                            </div>
                          ))
                        ) : (
                          <p>No Annotations available.</p>
                        )}
                      </div>

                      <div>
                        <h5 className="font-medium mt-5">Missing Parts</h5>
                        <div className="grid md:grid-cols-1 gap-5 mt-3">
                               <table className="mt-2 w-full border-collapse">
                               <thead>
                                 <tr>
                                   <th className="border border-black p-2 bg-gray-200">Part</th>
                                   <th className="border border-black p-2 bg-gray-200">Description</th>
                                 </tr>
                               </thead>
                               <tbody>
                               {activeSiteData.operators[activeOperator]?.missingParts?.length > 0 ? (
                            activeSiteData.operators[activeOperator].missingParts.map((part, partIndex) => (
                                     <tr key={partIndex}>
                                       <td className="border border-black p-2">{part.part}</td>
                                       <td className="border border-black p-2">{part.description}</td>
                                     </tr>
                                   ))
                                 ) : (
                                   <p>No Missing Parts available.</p>
                                 )}
                               </tbody>
                             </table>
       
                        </div>
                      </div>

                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubSection4;