// import React, { useState, useEffect } from 'react';
// import image3 from '../img/RealityCapture_UYRdFrq7Xq.png';

// const SubSection4 = ({ towerDetails }) => {
//   const [data, setData] = useState([]); // Initialize with an empty array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeSite, setActiveSite] = useState(null); // Track the active site
//   const [activeOperator, setActiveOperator] = useState(0); // Default to operator 1 (index 0)

//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://13.235.82.152:3000/api/form/ins-get'); // Your API endpoint here
//         const result = await response.json();
//         console.log(result);
//         if (response.ok) {
//           setData(result); // Set the entire data response
//           // Automatically set the first site and operator as active by default
//           if (result.length > 0) {
//             setActiveSite(result[0].siteID); // Set the first site as active
//             setActiveOperator(0); // Set the first operator as active
//           }
//         } else {
//           setError('Failed to fetch data');
//         }
//       } catch (err) {
//         setError('Error occurred while fetching data');
//         console.error('Error fetching data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Render loading state or error message
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   // Filter the data to show only the tower details that match the siteId
//   const filteredData = towerDetails && towerDetails.siteId
//     ? data.filter(site => site.siteID === towerDetails.siteId)
//     : data;

//   // Handle operator selection
//   const handleOperatorClick = (operatorIndex) => {
//     setActiveOperator(operatorIndex); // Update active operator
//   };

//   // Display content for the active site and operator
//   const activeSiteData = filteredData.find((site) => site.siteID === activeSite);
//   console.log("active sites ID",activeSiteData)

//   return (
//     <div className="mx-auto h-[89vh]">
//       <div className="flex gap-10 px-6 py-6">
//         <div className="w-[1570px]">
//           {/* Display the active site details */}
//           {activeSiteData && (
//             <div className="mb-6 flex  relative bg-white p-5 rounded-md">
//               <div>
//               <h3 className="text-xl font-semibold mb-5 text-center">Site ID: {activeSiteData.siteID}</h3>
//               <img src={image3} alt="Site Visualization"  />
//               {activeSiteData.operators && activeSiteData.operators.length > 0 ? (
//                 <div className="mb-4 absolute top-20 left-0 right-0 z-10">
//                   {/* Ensure the buttons are correctly positioned */}
//                   {activeSiteData.operators.map((operator, operatorIndex) => (
//                     // <button
//                     //   key={operatorIndex}
//                     //   onClick={() => handleOperatorClick(operatorIndex)}
//                     //   className={`text-white text-sm h-[60px] w-[300px] px-4 py-2 rounded-md m-2 flex justify-center items-center
//                     //     ${activeOperator === operatorIndex ? ' text-black' : 'hover:bg-gray-200'} 
//                     //     transition-all duration-300 ease-in-out`}
//                     //   style={{
//                     //     opacity: 1, // Ensure full opacity for visibility
//                     //     borderStyle: 'solid',
//                     //     borderWidth: '2px',
//                     //     borderColor: 'gray',
//                     //     backgroundColor: activeOperator === operatorIndex ? '#e0e0e0' : '#808080',
//                     //   }}
//                     // >
//                     //   Operator {operatorIndex + 1}
//                     // </button>
//                     <button
//                         key={operatorIndex}
//                         onClick={() => handleOperatorClick(operatorIndex)}
                        
//                         style={{
//                           opacity: 0.5,
//                           borderStyle: 'dotted', 
//                           borderWidth: '2px', 
//                           left: '', 
//                           right: '0', 
//                           marginLeft:'2%'
                  
//                         }}
                        
//                         className={` text-white text-sm h-[60px] w-[300px] px-4 py-2 rounded-md m-2 flex 
//                           ${activeOperator === operatorIndex ? 'text-black bg-gray-100/50' : 'hover:bg-gray-100/50 hover:text-black'}`}
                      
//                       >
//                         Operator {operatorIndex + 1}
//                       </button>
//                   ))}
//                 </div>
//               ) : (
//                 <p>No operators found for this site.</p>
//               )}
//             </div>
//             <div className='max-h-[800px] w-[60%] mx-auto overflow-y-scroll scrollbar-hide'>
//               {activeOperator !== null && activeSiteData.operators[activeOperator] && (
//                 <div className="mt-4">
//                   <h4 className="font-semibold">Operator {activeOperator + 1} Details</h4>
//                   <div className="grid md:grid-cols-4 gap-5 mt-3">
//                     <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg">
//                       <strong>Operator:</strong> {activeSiteData.operators[activeOperator].operator || 'N/A'}
//                     </p>
//                     <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg">
//                       <strong>Rad Center:</strong> {activeSiteData.operators[activeOperator].radCenter || 'N/A'}
//                     </p>
//                     <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg">
//                       <strong>Empty Mounts:</strong> {activeSiteData.operators[activeOperator].emptyMounts || 'N/A'}
//                     </p>
//                     <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg">
//                       <strong>Last Maintenance:</strong> {activeSiteData.operators[activeOperator].lastMaintenance || 'N/A'}
//                     </p>
//                   </div>

//                   <div>
//                     <h5 className="font-medium mt-5">Aspect Details</h5>
//                     <table className="mt-2 w-full border-collapse">
//                       <thead>
//                         <tr>
//                           <th className="border border-gray-400 p-2 bg-gray-200">Part</th>
//                           <th className="border border-gray-400 p-2 bg-gray-200">Description</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {activeSiteData.operators[activeOperator].aspectdetails &&
//                         activeSiteData.operators[activeOperator].aspectdetails.length > 0 ? (
//                           activeSiteData.operators[activeOperator].aspectdetails.map((part, partIndex) => (
//                             <tr key={partIndex} className="hover:bg-gray-100 hover:shadow-md">
//                               <td className="border border-gray-400 p-2">{part.aspect}</td>
//                               <td className="border border-gray-400 p-2">{part.description}</td>
//                             </tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td colSpan="2" className="text-center p-2">No Aspect Details available.</td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                     <h5 className="font-medium mt-4">Azimuth Angles</h5>
//                     <div className='grid md:grid-cols-3 gap-5 mt-3'>
//                       {activeSiteData.operators[activeOperator].azimuthAngles && activeSiteData.operators[activeOperator].azimuthAngles.length > 0 ? (
//                         activeSiteData.operators[activeOperator].azimuthAngles.map((angle, angleIndex) => (
//                           <div key={angleIndex} >
//                             <p className='px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg'><strong>{angle.angle}:</strong> {angle.details || 'N/A'}</p>
//                             { <img 
//                               src={angle.imageUrl} 
//                               alt={angle.imageUrl ? `Azimuth angle ${angle.angle}` : "Cell Tower"} 
//                               className="w-[200px] h-[200px] mx-auto rounded mt-2 hover:shadow-xl" 
//                             />}
//                           </div>
//                         ))
//                       ) : (
//                         <p>No Azimuth Angles available.</p>
//                       )}
//                     </div>
//                     <h5 className="font-medium mt-4">Annotations</h5>
//                     <div className='grid md:grid-cols-2 gap-5 mt-3'>

//                       {activeSiteData.operators[activeOperator].annotations && Object.keys(activeSiteData.operators[activeOperator].annotations).map((annotationKey,index) => (
//                         <p >
//                           <strong>{annotationKey.image}</strong> <img src={annotationKey.image} alt={`Annotation ${annotationKey.image}`} className="w-[350px] h-[200px] mx-auto rounded mt-2 hover:shadow-xl"  />
//                         </p>
//                       ))}
//                     </div>
//                     <div>
//                       <h5 className="font-medium mt-5">Missing Parts</h5>
//                       <table className="mt-2 w-full border-collapse">
//                           <thead>
//                             <tr className='hover:bg-gray-100 hover:shadow-md'>
//                               <th className="border border-gray-400 p-2 bg-gray-200">Part</th>
//                               <th className="border border-gray-400 p-2 bg-gray-200">Description</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                       {activeSiteData.operators[activeOperator].missingParts && activeSiteData.operators[activeOperator].missingParts.length > 0 ? (
//                         activeSiteData.operators[activeOperator].missingParts.map((part, partIndex) => (
//                           <tr key={partIndex} className='hover:bg-gray-100 hover:shadow-md'>
//                             <td className="border border-gray-400 p-2">{part.part}</td>
//                             <td className="border border-gray-400 p-2">{part.description}</td>
//                           </tr>
                         
//                         ))
//                       ) : (
//                         <p>No Missing Parts available.</p>
//                       )}
//                        </tbody>
//                        </table>
//                     </div>

//                   </div>
//                 </div>
//               )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubSection4;


// import React, { useState, useEffect } from 'react';
// import image3 from '../img/RealityCapture_UYRdFrq7Xq.png';

// const SubSection4 = ({ towerDetails }) => {
//   const [data, setData] = useState([]); // Initialize with an empty array
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeSite, setActiveSite] = useState(null); // Track the active site
//   const [activeOperator, setActiveOperator] = useState(0); // Default to operator 1 (index 0)

//   // Fetch data on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://13.235.82.152:3000/api/form/ins-get'); // Your API endpoint here
//         const result = await response.json();
//         console.log(result);
//         if (response.ok) {
//           setData(result); // Set the entire data response

//           // If towerDetails.siteId is passed, set the active site to that ID
//           if (towerDetails && towerDetails.siteId) {
//             const matchedSite = result.find(site => site.siteID === towerDetails.siteId);
//             if (matchedSite) {
//               setActiveSite(matchedSite.siteID); // Set matched site as active
//             }
//           } else if (result.length > 0) {
//             setActiveSite(result[0].siteID); // Default to the first site if no siteId in props
//           }
//         } else {
//           setError('Failed to fetch data');
//         }
//       } catch (err) {
//         setError('Error occurred while fetching data');
//         console.error('Error fetching data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [towerDetails]);

//   // Render loading state or error message
//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   // Filter the data to show only the tower details that match the siteId
//   const filteredData = activeSite
//     ? data.filter(site => site.siteID === activeSite)
//     : data;

//   // Handle operator selection
//   const handleOperatorClick = (operatorIndex) => {
//     setActiveOperator(operatorIndex); // Update active operator
//   };

//   // Display content for the active site and operator
//   const activeSiteData = filteredData.find((site) => site.siteID === activeSite);
//   console.log("active sites ID", activeSiteData);

//   return (
//     <div className="mx-auto h-[89vh]">
//       <div className="flex gap-10 px-6 py-6">
//         <div className="w-[1570px]">
//           {/* Display the active site details */}
//           {activeSiteData && (
//             <div className="mb-6 flex relative bg-white p-5 rounded-md">
//               <div>
//                 <h3 className="text-xl font-semibold mb-5 text-center">Site ID: {activeSiteData.siteID}</h3>
//                 <img src={image3} alt="Site Visualization" />
//                 {activeSiteData.operators && activeSiteData.operators.length > 0 ? (
//                   <div className="mb-4 absolute top-20 left-0 right-0 z-10">
//                     {/* Ensure the buttons are correctly positioned */}
//                     {activeSiteData.operators.map((operator, operatorIndex) => (
//                       <button
//                         key={operatorIndex}
//                         onClick={() => handleOperatorClick(operatorIndex)}
//                         style={{
//                           opacity: 0.5,
//                           borderStyle: 'dotted',
//                           borderWidth: '2px',
//                           left: '',
//                           right: '0',
//                           marginLeft: '2%',
//                         }}
//                         className={`text-white text-sm h-[60px] w-[300px] px-4 py-2 rounded-md m-2 flex 
//                           ${activeOperator === operatorIndex ? 'text-black bg-gray-100/50' : 'hover:bg-gray-100/50 hover:text-black'}`}
//                       >
//                         Operator {operatorIndex + 1}
//                       </button>
//                     ))}
//                   </div>
//                 ) : (
//                   <p>No operators found for this site.</p>
//                 )}
//               </div>
//               <div className="max-h-[800px] w-[60%] mx-auto overflow-y-scroll scrollbar-hide">
//                 {activeOperator !== null && activeSiteData.operators[activeOperator] && (
//                   <div className="mt-4">
//                     <h4 className="font-semibold">Operator {activeOperator + 1} Details</h4>
//                     <div className="grid md:grid-cols-4 gap-5 mt-3">
//                       <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg">
//                         <strong>Operator:</strong> {activeSiteData.operators[activeOperator].operator || 'N/A'}
//                       </p>
//                       <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg">
//                         <strong>Rad Center:</strong> {activeSiteData.operators[activeOperator].radCenter || 'N/A'}
//                       </p>
//                       <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg">
//                         <strong>Empty Mounts:</strong> {activeSiteData.operators[activeOperator].emptyMounts || 'N/A'}
//                       </p>
//                       <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg">
//                         <strong>Last Maintenance:</strong> {activeSiteData.operators[activeOperator].lastMaintenance || 'N/A'}
//                       </p>
//                     </div>

//                     <div>
//                       <h5 className="font-medium mt-5">Aspect Details</h5>
//                       <table className="mt-2 w-full border-collapse">
//                         <thead>
//                           <tr>
//                             <th className="border border-gray-400 p-2 bg-gray-200">Part</th>
//                             <th className="border border-gray-400 p-2 bg-gray-200">Description</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {activeSiteData.operators[activeOperator].aspectdetails &&
//                           activeSiteData.operators[activeOperator].aspectdetails.length > 0 ? (
//                             activeSiteData.operators[activeOperator].aspectdetails.map((part, partIndex) => (
//                               <tr key={partIndex} className="hover:bg-gray-100 hover:shadow-md">
//                                 <td className="border border-gray-400 p-2">{part.aspect}</td>
//                                 <td className="border border-gray-400 p-2">{part.description}</td>
//                               </tr>
//                             ))
//                           ) : (
//                             <tr>
//                               <td colSpan="2" className="text-center p-2">No Aspect Details available.</td>
//                             </tr>
//                           )}
//                         </tbody>
//                       </table>
//                       <h5 className="font-medium mt-4">Azimuth Angles</h5>
//                       <div className="grid md:grid-cols-3 gap-5 mt-3">
//                         {activeSiteData.operators[activeOperator].azimuthAngles &&
//                         activeSiteData.operators[activeOperator].azimuthAngles.length > 0 ? (
//                           activeSiteData.operators[activeOperator].azimuthAngles.map((angle, angleIndex) => (
//                             <div key={angleIndex}>
//                               <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400 hover:shadow-lg">
//                                 <strong>{angle.angle}:</strong> {angle.details || 'N/A'}
//                               </p>
//                               <img
//                                 src={angle.imageUrl}
//                                 alt={angle.imageUrl ? `Azimuth angle ${angle.angle}` : "Cell Tower"}
//                                 className="w-[200px] h-[200px] mx-auto rounded mt-2 hover:shadow-xl"
//                               />
//                             </div>
//                           ))
//                         ) : (
//                           <p>No Azimuth Angles available.</p>
//                         )}
//                       </div>
//                       <h5 className="font-medium mt-4">Annotations</h5>
//                       <div className="grid md:grid-cols-2 gap-5 mt-3">
//                         {activeSiteData.operators[activeOperator].annotations &&
//                         Object.keys(activeSiteData.operators[activeOperator].annotations).map((annotationKey, index) => (
//                           <p key={index}>
//                             <strong>{annotationKey.image}</strong>
//                             <img
//                               src={annotationKey.image}
//                               alt={`Annotation ${annotationKey.image}`}
//                               className="w-[350px] h-[200px] mx-auto rounded mt-2 hover:shadow-xl"
//                             />
//                           </p>
//                         ))}
//                       </div>
//                       <div>
//                         <h5 className="font-medium mt-5">Missing Parts</h5>
//                         <table className="mt-2 w-full border-collapse">
//                           <thead>
//                             <tr className="hover:bg-gray-100 hover:shadow-md">
//                               <th className="border border-gray-400 p-2 bg-gray-200">Part</th>
//                               <th className="border border-gray-400 p-2 bg-gray-200">Description</th>
//                             </tr>
//                           </thead>
//                           <tbody>
//                             {activeSiteData.operators[activeOperator].missingParts &&
//                             activeSiteData.operators[activeOperator].missingParts.length > 0 ? (
//                               activeSiteData.operators[activeOperator].missingParts.map((part, partIndex) => (
//                                 <tr key={partIndex} className="hover:bg-gray-100 hover:shadow-md">
//                                   <td className="border border-gray-400 p-2">{part.part}</td>
//                                   <td className="border border-gray-400 p-2">{part.description}</td>
//                                 </tr>
//                               ))
//                             ) : (
//                               <p>No Missing Parts available.</p>
//                             )}
//                           </tbody>
//                         </table>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubSection4;


import React, { useState, useEffect } from 'react';
import image3 from '../../../img/RealityCapture_UYRdFrq7Xq.png';

const Inspection = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSite, setActiveSite] = useState(null);
  const [activeOperator, setActiveOperator] = useState(null);

  const normalizeData = (forms) =>
    forms.map((form) => ({
      siteID: form.siteID || "N/A",
      ...form._doc,
      operators: form.operators?.map((operator) => ({
        ...operator._doc,
        // Access aspectdetails first
        aspectdetails: operator._doc.aspectdetails ? operator._doc.aspectdetails.map((aspect) => ({
          aspect: aspect.aspect || "Unknown",
          description: aspect.description || "No description",
          id: aspect._id,
        })) : [],  // Fallback to an empty array if aspectdetails is missing
        // Then map azimuthAngles after aspectdetails
        azimuthAngles: operator.azimuthAngles?.map((angle) => ({
          ...angle._doc,  // Ensure we're accessing the _doc field of azimuth angles
          imageUrl: angle.imageUrl || "",
        })),
        annotations: operator.annotations?.map((annotation) => ({
          ...annotation._doc,  // Ensure we're accessing the _doc field of annotations
          imageUrl: annotation.imageUrl || "",
        })),
        missingParts: operator._doc.missingParts ? operator._doc.missingParts.map((part) => ({
          part: part.part || "Unknown",
          description: part.description || "No description",
          id: part._id,
        })) : [],  // Use an empty array if missingParts is not present
      })),
    }));
  
  

    useEffect(() => {
      const fetchForms = async () => {
        try {
          const response = await fetch("http://13.235.82.152:3000/api/form/ins-get");
          if (!response.ok) {
            throw new Error("Failed to fetch form data");
          }
          const data = await response.json();
          console.log("Fetched Data: ", data);  // Log the raw data response
          const normalizedForms = normalizeData(data);
          console.log("Normalized Data: ", normalizedForms);  // Log normalized data
          setForms(normalizedForms);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
    
      fetchForms();
    }, []);


  const handleSiteClick = (siteId) => {
    setActiveSite((prevSite) => (prevSite === siteId ? null : siteId));
    setActiveOperator(null);
  };

  const handleOperatorClick = (operatorIndex) => {
    setActiveOperator((prevOperator) => (prevOperator === operatorIndex ? null : operatorIndex));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  
  return (
    <div className="mx-auto p-4">
      <div className="flex gap-20 px-10 py-10">
        <div className="w-[30%] max-h-screen overflow-y-scroll shadow-lg scrollbar-hide p-3">
          {/* Render Site ID buttons */}
          {forms.length > 0 ? (
            <div className="mb-6">
              <h3 className="font-semibold text-lg px-5 py-2">Available Sites</h3>
              <table className="w-full mt-5 border p-2">
                <thead>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 border text-center">S.No.</td>
                    <td className="px-4 py-2 border">Site ID</td>
                    <td className="px-4 py-2 border">Operators</td>
                  </tr>
                </thead>
                <tbody className="p-2">
                  {forms.map((form, index) => (
                    <tr key={form.siteID}>
                      <td className="px-4 text-center py-2 border">{index + 1}</td>
                      <td onClick={() => handleSiteClick(form.siteID)} className="cursor-pointer px-4 py-2 border">
                        {form.siteID}
                      </td>
                      <td className="px-4 py-2 border">
                        {form.operators ? `${form.operators.length} Operators` : "No Operators"}
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
        <div className="max-h-[800px] overflow-y-scroll scrollbar-hide">
          {/* If a site is selected, show its operators */}
          {activeSite && (
            <div>
              {/* Find the site matching the activeSite */}
              {forms
                .filter((form) => form.siteID === activeSite)
                .map((form) => (
                  <div key={form._id} className="mb-6 relative">
                    <div className="flex gap-20">
                      <div>
                        <h3 className="text-xl font-semibold mb-5 text-center">Site ID: {form.siteID}</h3>
                        <img src={image3} />
                        {form.operators && form.operators.length > 0 ? (
                          <div className="mb-4 absolute top-20">
                            {form.operators.map((operator, operatorIndex) => (
                              <button
                                key={operatorIndex}
                                onClick={() => handleOperatorClick(operatorIndex)}
                                style={{
                                  opacity: 0.5,
                                  borderStyle: "dotted",
                                  borderWidth: "2px",
                                  left: "0%",
                                  right: "-6%",
                                }}
                                className="text-white text-sm h-[60px] w-[300px] px-4 py-2 rounded-md m-2 flex"
                              >
                                Operator {operatorIndex + 1}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p>No operators found for this site.</p>
                        )}
                      </div>
                      {activeOperator !== null && form.operators[activeOperator] && (
                        <div className="mt-4">
                          <h4 className="font-semibold">Operator {activeOperator + 1} Details</h4>
                          <div className="grid md:grid-cols-4 gap-5 mt-3">
                            <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400">
                              <strong>Operator:</strong> {form.operators[activeOperator].operator || "N/A"}
                            </p>
                            <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400">
                              <strong>Rad Center:</strong> {form.operators[activeOperator].radCenter || "N/A"}
                            </p>
                            <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400">
                              <strong>Empty Mounts:</strong> {form.operators[activeOperator].emptyMounts || "N/A"}
                            </p>
                            <p className="px-3 rounded-md py-1 flex flex-col border-2 border-gray-400">
                              <strong>Last Maintenance:</strong> {form.operators[activeOperator].lastMaintenance || "N/A"}
                            </p>
                          </div>
                          <div>
                            <h5 className="font-medium mt-5">Aspect Details</h5>
                            <table className="mt-2 w-full border-collapse">
                              <thead>
                                <tr>
                                  <th className="border border-black p-2 bg-gray-200">Part</th>
                                  <th className="border border-black p-2 bg-gray-200">Description</th>
                                </tr>
                              </thead>
                              <tbody>
                                {form.operators[activeOperator].aspectdetails &&
                                form.operators[activeOperator].aspectdetails.length > 0 ? (
                                  form.operators[activeOperator].aspectdetails.map((part, partIndex) => (
                                    <tr key={partIndex}>
                                      <td className="border border-black p-2">{part.aspect}</td>
                                      <td className="border border-black p-2">{part.description}</td>
                                    </tr>
                                  ))
                                ) : (
                                  <p>No aspect details available.</p>
                                )}
                              </tbody>
                            </table>
                          </div>
                        {/* Azimuth Angles */}
                          <h5 className="font-medium mt-4">Azimuth Angles</h5>
                        <div className='grid md:grid-cols-3 gap-5 mt-3'>
                          {form.operators[activeOperator].azimuthAngles && form.operators[activeOperator].azimuthAngles.length > 0 ? (
                            form.operators[activeOperator].azimuthAngles.map((angle, angleIndex) => (
                              <div key={angleIndex}>
                                <p className='px-3 rounded-md py-1 flex flex-col border-2 border-gray-400'>
                                  <strong>{angle.angle}:</strong> {angle.details || 'N/A'}
                                </p>
                                {angle.imageUrl && <img src={angle.imageUrl} alt={`Azimuth angle ${angle.angle}`} />}
                              </div>
                            ))
                          ) : (
                            <p>No Azimuth Angles available.</p>
                          )}
                        </div>
                          {/* Annotations */}
                        <h5 className="font-medium mt-4">Annotations</h5>
                        <div className="grid md:grid-cols-2 gap-5 mt-3">
                          {form.operators[activeOperator].annotations && form.operators[activeOperator].annotations.length > 0 ? (
                            form.operators[activeOperator].annotations.map((annotation, index) => (
                              <div key={index} className="border-2 border-gray-400 rounded-md p-2">
                              
                                {annotation.imageUrl && <img src={annotation.imageUrl} alt={`Annotation ${index}`} />}
                              </div>
                            ))
                          ) : (
                            <p>No annotations available.</p>
                          )}
                        </div>
                          {/* Missing Parts */}
                              <div>
                          <h5 className="font-medium mt-5">Missing Parts</h5>
                          <table className="mt-2 w-full border-collapse">
                            <thead>
                              <tr>
                                <th className="border border-black p-2 bg-gray-200">Part</th>
                                <th className="border border-black p-2 bg-gray-200">Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {form.operators[activeOperator].missingParts && form.operators[activeOperator].missingParts.length > 0 ? (
                                form.operators[activeOperator].missingParts.map((part, partIndex) => (
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
                      )}
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