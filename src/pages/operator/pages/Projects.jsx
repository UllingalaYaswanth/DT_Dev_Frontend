import React, { useState, useEffect } from 'react';
import image3 from './img/RealityCapture_UYRdFrq7Xq.png';

const Inspection = () => {
  const [data, setData] = useState([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSite, setActiveSite] = useState(null); // Track which site is active
  const [activeOperator, setActiveOperator] = useState(null); // Track which operator's data to show
  const [activeTower, setActiveTower] = useState(null); // Track which tower's data to show

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/form/ins-get'); // Your API endpoint here
        const result = await response.json();
        console.log(result)
        if (response.ok) {
          setData(result); // Set the entire data response
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
  }, []);

  // Render loading state or error message
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Toggle the active site when a button is clicked
  const handleSiteClick = (siteId) => {
    if (activeSite === siteId) {
      setActiveSite(null); // Collapse site if clicked again
      setActiveOperator(null); // Collapse operator data if site is collapsed
      
    } else {
      setActiveSite(siteId);
      setActiveTower(siteId)
    }
  };

  // Toggle operator data visibility
  const handleOperatorClick = (operatorIndex) => {
    if (activeOperator === operatorIndex) {
      setActiveOperator(null);
    } else {
      setActiveOperator(operatorIndex);
    }
  };

  // Rendering the fetched data
  return (
    <div className="mx-auto h-[89vh]">
      <div className='flex gap-10 px-6 py-6'>
      <div className='w-[26%] overflow-y-scroll rounded-lg bg-white scrollbar-hide p-3'>
        {/* Render Site ID buttons */}
        {data.length > 0 ? (
          <div className="mb-6">
            <h3 className="font-semibold text-lg px-5 py-2">Available Sites</h3>
            <table className='w-full mt-5 border border-gray-300 p-2'>
              <thead>
                <tr className='bg-gray-100 text-center hover:bg-gray-100 hover:shadow-md'>
                  <td className=" px-4 py-2 border border-gray-300 text-center">S.No.</td>
                  <td className=" px-4 py-2 border border-gray-300">Site ID</td>
                  <td className=" px-4 py-2 border border-gray-300">Operators</td>
                </tr>
              </thead>
              <tbody className='p-2'>
                {data.map((site, index) => (
                  <tr key={site.siteID} className={`${
                        activeTower === site.siteID
                            ? 'bg-gray-200'
                            : 'hover:bg-gray-100'
                    } hover:bg-gray-100 hover:shadow-md`}>
                    <td className="px-4 text-center py-2 border border-gray-300">{index + 1}</td>
                    <td onClick={() => handleSiteClick(site.siteID)} className='cursor-pointer px-4 py-2 border border-gray-300'>
                      {site.siteID}
                    </td>
                    <td className=" px-4 py-2 border border-gray-300">
                      {site.operators ? `${site.operators.length} Operators` : 'No Operators'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No data available.</p>
        )}

      </div>
      <div className=' w-[1170px]'>
      {/* If a site is selected, show its operators */}
      {activeSite && (
        <div>
          {/* Find the site matching the activeSite */}
          {data
            .filter((site) => site.siteID === activeSite)
            .map((site) => (
              <div key={site._id} className="mb-6 relative bg-white p-5 rounded-md">
               <div className='flex gap-6'>
                <div>
                <h3 className="text-xl font-semibold mb-5 text-center">Site ID: {site.siteID}</h3>
                <img src={image3}/>
                {site.operators && site.operators.length > 0 ? (
                  <div className="mb-4 absolute top-20">
                    {site.operators.map((operator, operatorIndex) => (
                      <button
                        key={operatorIndex}
                        onClick={() => handleOperatorClick(operatorIndex)}
                        
                        style={{
                          opacity: 0.5,
                          borderStyle: 'dotted', 
                          borderWidth: '2px', 
                          left: '0%', 
                          right: '-6%', 
                          marginTop: "5%"
                  
                        }}
                        
                        className={` text-white text-sm h-[60px] w-[300px] px-4 py-2 rounded-md m-2 flex 
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
                <div className='max-h-[800px] overflow-y-scroll scrollbar-hide'>
                {activeOperator !== null && site.operators[activeOperator] && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Operator {activeOperator + 1} Details</h4>
                    <div className='grid md:grid-cols-4 gap-5 mt-3'>
                    <p className='px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg'><strong>Operator:</strong> {site.operators[activeOperator].operator || 'N/A'}</p>
                    <p className='px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg'><strong>Rad Center:</strong> {site.operators[activeOperator].radCenter || 'N/A'}</p>
                    <p className='px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg'><strong>Empty Mounts:</strong> {site.operators[activeOperator].emptyMounts || 'N/A'}</p>
                    <p className='px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg'><strong>Last Maintenance:</strong> {site.operators[activeOperator].lastMaintenance || 'N/A'}</p>
                    </div>
                    <div>


                      <h5 className="font-medium mt-5">Aspect Details</h5>
                      <table className="mt-2 w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="border border-gray-400 p-2 bg-gray-200">Part</th>
                              <th className="border border-gray-400 p-2 bg-gray-200">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                      {site.operators[activeOperator].aspectdetails && site.operators[activeOperator].aspectdetails.length > 0 ? (
                        site.operators[activeOperator].aspectdetails.map((part, partIndex) => (
                  
                         
                          <tr key={part} className='hover:bg-gray-100 hover:shadow-md'>
                            <td className="border border-gray-400 p-2">{part.aspect}</td>
                            <td className="border border-gray-400 p-2">{part.description}</td>
                          </tr>
                         
                        ))
                      ) : (
                        <p>No Missing Parts available.</p>
                      )}
                       </tbody>
                       </table>
                    </div>
                    
                    {/* Azimuth Angles */}
                    <h5 className="font-medium mt-4">Azimuth Angles</h5>
                    <div className='grid md:grid-cols-3 gap-5 mt-3'>
                      {site.operators[activeOperator].azimuthAngles && site.operators[activeOperator].azimuthAngles.length > 0 ? (
                        site.operators[activeOperator].azimuthAngles.map((angle, angleIndex) => (
                          <div key={angleIndex} >
                            <p className='px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg'><strong>{angle.angle}:</strong> {angle.details || 'N/A'}</p>
                            { <img 
                              src={angle.imageUrl} 
                              alt={angle.imageUrl ? `Azimuth angle ${angle.angle}` : "Cell Tower"} 
                              className="w-[200px] h-[200px] mx-auto rounded mt-2 hover:shadow-xl" 
                            />}
                          </div>
                        ))
                      ) : (
                        <p>No Azimuth Angles available.</p>
                      )}
                    </div>

                    <h5 className="font-medium mt-4">Annotations</h5>
                    <div className='grid md:grid-cols-2 gap-5 mt-3'>

                      {site.operators[activeOperator].annotations && Object.keys(site.operators[activeOperator].annotations).map((annotationKey,index) => (
                        <p >
                          <strong>{annotationKey.image}</strong> <img src={annotationKey.image} alt={`Annotation ${annotationKey.image}`} className="w-[350px] h-[200px] mx-auto rounded mt-2 hover:shadow-xl"  />
                        </p>
                      ))}
                    </div>

                    <div>
                      <h5 className="font-medium mt-5">Missing Parts</h5>
                      <table className="mt-2 w-full border-collapse">
                          <thead>
                            <tr className='hover:bg-gray-100 hover:shadow-md'>
                              <th className="border border-gray-400 p-2 bg-gray-200">Part</th>
                              <th className="border border-gray-400 p-2 bg-gray-200">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                      {site.operators[activeOperator].missingParts && site.operators[activeOperator].missingParts.length > 0 ? (
                        site.operators[activeOperator].missingParts.map((part, partIndex) => (
                          <tr key={partIndex} className='hover:bg-gray-100 hover:shadow-md'>
                            <td className="border border-gray-400 p-2">{part.part}</td>
                            <td className="border border-gray-400 p-2">{part.description}</td>
                          </tr>
                         
                        ))
                      ) : (
                        <p>No Missing Parts available.</p>
                      )}
                       </tbody>
                       </table>
                    </div>
                  </div>
                )}
                </div>
                </div>
              </div>
            ))}
        </div>
      )}
      </div>
      </div>
    </div>
  );
};

export default Inspection;


// import React, { useState, useEffect } from 'react';
// import image3 from '../../img/RealityCapture_UYRdFrq7Xq.png';

// const Inspection = () => {
//   const [forms, setForms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeSite, setActiveSite] = useState(null);
//   const [activeOperator, setActiveOperator] = useState(null);

//   const normalizeData = (forms) =>
//     forms.map((form) => ({
//       siteID: form.siteID || "N/A",
//       ...form._doc,
//       operators: form.operators?.map((operator) => ({
//         ...operator._doc,
//         // Access aspectdetails first
//         aspectdetails: operator._doc.aspectdetails ? operator._doc.aspectdetails.map((aspect) => ({
//           aspect: aspect.aspect || "Unknown",
//           description: aspect.description || "No description",
//           id: aspect._id,
//         })) : [],  // Fallback to an empty array if aspectdetails is missing
//         // Then map azimuthAngles after aspectdetails
//         azimuthAngles: operator.azimuthAngles?.map((angle) => ({
//           ...angle._doc,  // Ensure we're accessing the _doc field of azimuth angles
//           imageUrl: angle.imageUrl || "",
//         })),
//         annotations: operator.annotations?.map((annotation) => ({
//           ...annotation._doc,  // Ensure we're accessing the _doc field of annotations
//           imageUrl: annotation.imageUrl || "",
//         })),
//         missingParts: operator._doc.missingParts ? operator._doc.missingParts.map((part) => ({
//           part: part.part || "Unknown",
//           description: part.description || "No description",
//           id: part._id,
//         })) : [],  // Use an empty array if missingParts is not present
//       })),
//     }));
  
  

//     useEffect(() => {
//       const fetchForms = async () => {
//         try {
//           const response = await fetch("http://localhost:3000/api/form/ins-get");
//           if (!response.ok) {
//             throw new Error("Failed to fetch form data");
//           }
//           const data = await response.json();
//           console.log("Fetched Data: ", data);  // Log the raw data response
//           const normalizedForms = normalizeData(data);
//           console.log("Normalized Data: ", normalizedForms);  // Log normalized data
//           setForms(normalizedForms);
//           setLoading(false);
//         } catch (err) {
//           setError(err.message);
//           setLoading(false);
//         }
//       };
    
//       fetchForms();
//     }, []);


//   const handleSiteClick = (siteId) => {
//     setActiveSite((prevSite) => (prevSite === siteId ? null : siteId));
//     setActiveOperator(null);
//   };

//   const handleOperatorClick = (operatorIndex) => {
//     setActiveOperator((prevOperator) => (prevOperator === operatorIndex ? null : operatorIndex));
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

  
//   return (
//     <div className="mx-auto p-4">
//       <div className="flex gap-20 px-10 py-10">
//         <div className="w-[30%] max-h-screen overflow-y-scroll shadow-lg scrollbar-hide p-3">
//           {/* Render Site ID buttons */}
//           {forms.length > 0 ? (
//             <div className="mb-6">
//               <h3 className="font-semibold text-lg px-5 py-2">Available Sites</h3>
//               <table className="w-full mt-5 border p-2">
//                 <thead>
//                   <tr className="bg-gray-200">
//                     <td className="px-4 py-2 border text-center">S.No.</td>
//                     <td className="px-4 py-2 border">Site ID</td>
//                     <td className="px-4 py-2 border">Operators</td>
//                   </tr>
//                 </thead>
//                 <tbody className="p-2">
//                   {forms.map((form, index) => (
//                     <tr key={form.siteID}>
//                       <td className="px-4 text-center py-2 border">{index + 1}</td>
//                       <td onClick={() => handleSiteClick(form.siteID)} className="cursor-pointer px-4 py-2 border">
//                         {form.siteID}
//                       </td>
//                       <td className="px-4 py-2 border">
//                         {form.operators ? `${form.operators.length} Operators` : "No Operators"}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p>No data available.</p>
//           )}
//         </div>
//         <div className="max-h-[800px] overflow-y-scroll scrollbar-hide">
//           {/* If a site is selected, show its operators */}
//           {activeSite && (
//             <div>
//               {/* Find the site matching the activeSite */}
//               {forms
//                 .filter((form) => form.siteID === activeSite)
//                 .map((form) => (
//                   <div key={form._id} className="mb-6 relative">
//                     <div className="flex gap-20">
//                       <div>
//                         <h3 className="text-xl font-semibold mb-5 text-center">Site ID: {form.siteID}</h3>
//                         <img src={image3} />
//                         {form.operators && form.operators.length > 0 ? (
//                           <div className="mb-4 absolute top-20">
//                             {form.operators.map((operator, operatorIndex) => (
//                               <button
//                                 key={operatorIndex}
//                                 onClick={() => handleOperatorClick(operatorIndex)}
//                                 style={{
//                                   opacity: 0.5,
//                                   borderStyle: "dotted",
//                                   borderWidth: "2px",
//                                   left: "0%",
//                                   right: "-6%",
//                                 }}
//                                 className="text-white text-sm h-[60px] w-[300px] px-4 py-2 rounded-md m-2 flex"
//                               >
//                                 Operator {operatorIndex + 1}
//                               </button>
//                             ))}
//                           </div>
//                         ) : (
//                           <p>No operators found for this site.</p>
//                         )}
//                       </div>
//                       {activeOperator !== null && form.operators[activeOperator] && (
//                         <div className="mt-4">
//                           <h4 className="font-semibold">Operator {activeOperator + 1} Details</h4>
//                           <div className="grid md:grid-cols-4 gap-5 mt-3">
//                             <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400">
//                               <strong>Operator:</strong> {form.operators[activeOperator].operator || "N/A"}
//                             </p>
//                             <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400">
//                               <strong>Rad Center:</strong> {form.operators[activeOperator].radCenter || "N/A"}
//                             </p>
//                             <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400">
//                               <strong>Empty Mounts:</strong> {form.operators[activeOperator].emptyMounts || "N/A"}
//                             </p>
//                             <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400">
//                               <strong>Last Maintenance:</strong> {form.operators[activeOperator].lastMaintenance || "N/A"}
//                             </p>
//                           </div>
//                           <div>
//                             <h5 className="font-medium mt-5">Aspect Details</h5>
//                             <table className="mt-2 w-full border-collapse">
//                               <thead>
//                                 <tr>
//                                   <th className="border border-black p-2 bg-gray-200">Part</th>
//                                   <th className="border border-black p-2 bg-gray-200">Description</th>
//                                 </tr>
//                               </thead>
//                               <tbody>
//                                 {form.operators[activeOperator].aspectdetails &&
//                                 form.operators[activeOperator].aspectdetails.length > 0 ? (
//                                   form.operators[activeOperator].aspectdetails.map((part, partIndex) => (
//                                     <tr key={partIndex}>
//                                       <td className="border border-black p-2">{part.aspect}</td>
//                                       <td className="border border-black p-2">{part.description}</td>
//                                     </tr>
//                                   ))
//                                 ) : (
//                                   <p>No aspect details available.</p>
//                                 )}
//                               </tbody>
//                             </table>
//                           </div>
//                         {/* Azimuth Angles */}
//                           <h5 className="font-medium mt-4">Azimuth Angles</h5>
//                         <div className='grid md:grid-cols-3 gap-5 mt-3'>
//                           {form.operators[activeOperator].azimuthAngles && form.operators[activeOperator].azimuthAngles.length > 0 ? (
//                             form.operators[activeOperator].azimuthAngles.map((angle, angleIndex) => (
//                               <div key={angleIndex}>
//                                 <p className='px-3 rounded-md py-1 flex flex-col border-2 border-gray-400'>
//                                   <strong>{angle.angle}:</strong> {angle.details || 'N/A'}
//                                 </p>
//                                 {angle.imageUrl && <img src={angle.imageUrl} alt={`Azimuth angle ${angle.angle}`} />}
//                               </div>
//                             ))
//                           ) : (
//                             <p>No Azimuth Angles available.</p>
//                           )}
//                         </div>
//                           {/* Annotations */}
//                         <h5 className="font-medium mt-4">Annotations</h5>
//                         <div className="grid md:grid-cols-2 gap-5 mt-3">
//                           {form.operators[activeOperator].annotations && form.operators[activeOperator].annotations.length > 0 ? (
//                             form.operators[activeOperator].annotations.map((annotation, index) => (
//                               <div key={index} className="border-2 border-gray-400 rounded-md p-2">
                              
//                                 {annotation.imageUrl && <img src={annotation.imageUrl} alt={`Annotation ${index}`} />}
//                               </div>
//                             ))
//                           ) : (
//                             <p>No annotations available.</p>
//                           )}
//                         </div>
//                           {/* Missing Parts */}
//                               <div>
//                           <h5 className="font-medium mt-5">Missing Parts</h5>
//                           <table className="mt-2 w-full border-collapse">
//                             <thead>
//                               <tr>
//                                 <th className="border border-black p-2 bg-gray-200">Part</th>
//                                 <th className="border border-black p-2 bg-gray-200">Description</th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {form.operators[activeOperator].missingParts && form.operators[activeOperator].missingParts.length > 0 ? (
//                                 form.operators[activeOperator].missingParts.map((part, partIndex) => (
//                                   <tr key={partIndex}>
//                                     <td className="border border-black p-2">{part.part}</td>
//                                     <td className="border border-black p-2">{part.description}</td>
//                                   </tr>
//                                 ))
//                               ) : (
//                                 <p>No Missing Parts available.</p>
//                               )}
//                             </tbody>
//                           </table>
//                         </div>
                         
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
  
// };

// export default Inspection;