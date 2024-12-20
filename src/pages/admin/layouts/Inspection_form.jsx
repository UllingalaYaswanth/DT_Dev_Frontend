// import React, { useState } from 'react';

// const Uploads = () => {
//   const initialState = {
//     siteID: '',
//     reconstructionImage: '',
//     operators: [
//       {
//         operator: '',
//         radCenter: '',
//         emptyMounts: '',
//         lastMaintenance: '',
//         aspectdetails:[
//           {aspect:"Installation Date",description: ''},
//           {aspect:"Antenna Types",description: ''},
//           {aspect:"Frequency Bands",description: ''},
//           {aspect:"Gain of Antenna",description: ''},
//           {aspect:"Interference",description:''},
//           {aspect:"Radiation",description:''}
//         ],
//         azimuthAngles: [
//           { angle: '0-120 degrees', details: '', imageUrl: '' },
//           { angle: '120-240 degrees', details: '', imageUrl: '' },
//           { angle: '240-360 degrees', details: '', imageUrl: '' },
//         ],
//         annotations: [
//           {image: 'image1', imageUrl: ''},
//           {image: 'image2', imageUrl: ''},
//           {image: 'image3', imageUrl: ''},
//           {image: 'image4', imageUrl: ''},
//         ],
//         missingParts: [
//           { part: 'Wind Load Indicators', description: '' },
//           { part: 'Antenna Mounting Brackets', description: '' },
//           { part: 'Guy Wires', description: '' },
//           { part: 'Climbing Ladders', description: '' },
//           { part: 'Cable Management Hardware', description: '' },
//           { part: 'Grounding Kits', description: '' },
//           { part: 'Lighting and Marking', description: '' },
//           { part: 'Feedlines and Connectors', description: '' },
//           { part: 'Weatherproofing Materials', description: '' },
//           { part: 'Surge Protectors', description: '' },
//         ],
//       },
//     ],
//   };

//   const [formData, setFormData] = useState(initialState);

//   // Handle field change for operators
//   const handleOperatorChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedOperators = [...formData.operators];
//     updatedOperators[index] = {
//       ...updatedOperators[index],
//       [name]: value,
//     };
//     setFormData({ ...formData, operators: updatedOperators });
//   };

//   // Handle input field changes for specific operator details (such as azimuthAngles, annotations, etc.)
//   const handleInputChange = (operatorIndex, fieldName, subFieldIndex, e) => {
//     const { name, value } = e.target;
//     const updatedOperators = [...formData.operators];
//     updatedOperators[operatorIndex][fieldName][subFieldIndex][name] = value;
//     setFormData({ ...formData, operators: updatedOperators });
//   };

//   // Handle adding new operators
//   const addOperator = () => {
//     const newOperator = {
//       operator: '',
//       radCenter: '',
//       emptyMounts: '',
//       lastMaintenance: '',
//       aspectdetails:[
//         {aspect:"Installation Date",description: ''},
//         {aspect:"Antenna Types",description: ''},
//         {aspect:"Frequency Bands",description: ''},
//         {aspect:"Gain of Antenna",description:''},
//         {aspect:"Interference",description:''},
//         {aspect:"Radiation",description:''}
//       ],
//       azimuthAngles: [
//         { angle: '0-120 degrees', details: '', imageUrl: '' },
//         { angle: '120-240 degrees', details: '', imageUrl: '' },
//         { angle: '240-360 degrees', details: '', imageUrl: '' },
//       ],
//       annotations: [
//         {image: 'image1', imageUrl: ''},
//         {image: 'image2', imageUrl: ''},
//         {image: 'image3', imageUrl: ''},
//         {image: 'image4', imageUrl: ''},
//       ],
//       missingParts: [
//         { part: 'Wind Load Indicators', description: '' },
//         { part: 'Antenna Mounting Brackets', description: '' },
//         { part: 'Guy Wires', description: '' },
//         { part: 'Climbing Ladders', description: '' },
//         { part: 'Cable Management Hardware', description: '' },
//         { part: 'Grounding Kits', description: '' },
//         { part: 'Lighting and Marking', description: '' },
//         { part: 'Feedlines and Connectors', description: '' },
//         { part: 'Weatherproofing Materials', description: '' },
//         { part: 'Surge Protectors', description: '' },
//       ],
//     };
//     setFormData((prevState) => ({
//       ...prevState,
//       operators: [...prevState.operators, newOperator],
//     }));
//   };

//   // Handle deleting an operator
//   const deleteOperator = (index) => {
//     const updatedOperators = formData.operators.filter((_, i) => i !== index);
//     setFormData({ ...formData, operators: updatedOperators });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:3000/api/form/ins-submit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       const result = await response.json();
//       if (response.ok) {
//         alert('Form submitted successfully!');
//       } else {
//         alert('Error submitting form!');
//       }
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Error submitting form!');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} >
//       <div className="max-h-[500px] overflow-y-scroll overflow-x-hidden p-2">
//       <div className="space-x-2">
//         <label className="font-semibold">Site ID</label>
//         <input
//           type="text"
//           name="siteID"
//           value={formData.siteID}
//           onChange={(e) => setFormData({ ...formData, siteID: e.target.value })}
//         />
//       </div>

//       {/* Operators */}
//       {formData.operators.map((operator, index) => (
//         <div key={index}>
//           <h3 className="mt-3 font-semibold text-red-600">Operator {index + 1}</h3>
//           <div className="grid md:grid-cols-4 mt-2">
//             <div>
//               <label>Operator</label>
//               <input
//                 type="text"
//                 name="operator"
//                 value={operator.operator}
//                 onChange={(e) => handleOperatorChange(index, e)}
//               />
//             </div>
//             <div>
//               <label>Rad Center</label>
//               <input
//                 type="text"
//                 name="radCenter"
//                 value={operator.radCenter}
//                 onChange={(e) => handleOperatorChange(index, e)}
//               />
//             </div>
//             <div>
//               <label>Empty Mounts</label>
//               <input
//                 type="text"
//                 name="emptyMounts"
//                 value={operator.emptyMounts}
//                 onChange={(e) => handleOperatorChange(index, e)}
//               />
//             </div>
//             <div>
//               <label>Last Maintenance</label>
//               <input
//                 type="date"
//                 name="lastMaintenance"
//                 value={operator.lastMaintenance}
//                 onChange={(e) => handleOperatorChange(index, e)}
//               />
//             </div>
//           </div>

//           {/* Aspect	Details */}
//           <h4 className="mt-4 font-semibold">Aspect	Details</h4>
//           <div className="grid md:grid-cols-4 gap-3 mt-2">
//             {operator.aspectdetails.map((part, subIndex) => (
//               <div key={subIndex}>
//                 <label>{part.aspect}</label>
//                 <input
//                   type="text"
//                   name="description"
//                   value={part.description}
//                   className='mt-1'
//                   onChange={(e) => handleInputChange(index, 'aspectdetails', subIndex, e)}
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Azimuth Angles */}
//           <h4 className="mt-4 font-semibold">Azimuth Angles</h4>
//           <div className="grid md:grid-cols-4 mt-2">
//             {operator.azimuthAngles.map((angle, subIndex) => (
//               <div key={subIndex}>
//                 <label>{angle.angle}</label>
//                 <input
//                   type="text"
//                   name="details"
//                   value={angle.details}
//                   onChange={(e) => handleInputChange(index, 'azimuthAngles', subIndex, e)}
//                   className='mt-1'
//                 />
//                 <input
//                   type="file"
//                   name="imageUrl"
//                   className="mt-2"
//                   onChange={(e) => handleInputChange(index, 'azimuthAngles', subIndex, e)}
//                 />
//               </div>
//             ))}
//           </div>

//           <h4 className="mt-4 font-semibold">Annotations</h4>
//           <div className="grid md:grid-cols-4 mt-2">
//             {Object.keys(operator.annotations).map((annotationKey,subIndex) => (
//               <div key={subIndex}>
//                 <label>{annotationKey.image}</label>
//                 <input
//                   type="file"
//                   name="imageUrl"
//                   // name={annotationKey.imageUrl}
//                   onChange={(e) => handleInputChange(index, 'annotations', subIndex, e)}
//                   className='mt-1'
//                 />
//               </div>
//             ))}
//           </div>

//           <h4 className="mt-4 font-semibold">Missing Parts</h4>
//           <div className="grid md:grid-cols-4 gap-2 mt-2">
//             {operator.missingParts.map((part, subIndex) => (
//               <div key={subIndex}>
//                 <label>{part.part}</label>
//                 <input
//                   type="text"
//                   name="description"
//                   value={part.description}
//                   className='mt-1'
//                   onChange={(e) => handleInputChange(index, 'missingParts', subIndex, e)}
//                 />
//               </div>
//             ))}
//           </div>

//           <button
//             type="button"
//             onClick={() => deleteOperator(index)}
//             className="bg-red-500 text-white px-3 py-2 rounded-md mt-4"
//           >
//             Delete Operator
//           </button>
//         </div>
//       ))}
//   </div>
//       <div className="flex justify-between w-full">
//         <button
//           type="button"
//           onClick={addOperator}
//           className="bg-blue-500 text-white px-3 py-2 rounded-md mt-4"
//         >
//           Add Operator
//         </button>

//         <button type="submit" className="bg-green-500 text-white px-3 py-2 rounded-md mt-4">
//           Submit
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Uploads;

import React, { useState } from 'react';

const Uploads = () => {
  const initialState = {
    siteID: '',
    reconstructionImage: '',
    operators: [
      {
        operator: '',
        radCenter: '',
        emptyMounts: '',
        lastMaintenance: '',
        aspectdetails:[
          {aspect:"Installation Date",description: ''},
          {aspect:"Antenna Types",description: ''},
          {aspect:"Frequency Bands",description: ''},
          {aspect:"Gain of Antenna",description: ''},
          {aspect:"Interference",description:''},
          {aspect:"Radiation",description:''}
        ],
        azimuthAngles: [
          { angle: '0-120 degrees', details: '', imageUrl: '' },
          { angle: '120-240 degrees', details: '', imageUrl: '' },
          { angle: '240-360 degrees', details: '', imageUrl: '' },
        ],
        annotations: [
          {image: 'image1', imageUrl: ''},
          {image: 'image2', imageUrl: ''},
          {image: 'image3', imageUrl: ''},
          {image: 'image4', imageUrl: ''},
        ],
        missingParts: [
          { part: 'Wind Load Indicators', description: '' },
          { part: 'Antenna Mounting Brackets', description: '' },
          { part: 'Guy Wires', description: '' },
          { part: 'Climbing Ladders', description: '' },
          { part: 'Cable Management Hardware', description: '' },
          { part: 'Grounding Kits', description: '' },
          { part: 'Lighting and Marking', description: '' },
          { part: 'Feedlines and Connectors', description: '' },
          { part: 'Weatherproofing Materials', description: '' },
          { part: 'Surge Protectors', description: '' },
        ],
      },
    ],
  };

  const [formData, setFormData] = useState(initialState);

  // Handle field change for operators
  const handleOperatorChange = (index, e) => {
    const { name, value } = e.target;
    const updatedOperators = [...formData.operators];
    updatedOperators[index] = {
      ...updatedOperators[index],
      [name]: value,
    };
    setFormData({ ...formData, operators: updatedOperators });
  };

  // Handle input field changes for specific operator details (such as azimuthAngles, annotations, etc.)
  // const handleInputChange = (operatorIndex, fieldName, subFieldIndex, e) => {
  //   const { name, value } = e.target;
  //   const updatedOperators = [...formData.operators];
  //   updatedOperators[operatorIndex][fieldName][subFieldIndex][name] = value;
  //   setFormData({ ...formData, operators: updatedOperators });
  // };
  const handleInputChange = (operatorIndex, fieldName, subFieldIndex, e) => {
    const { name, value, files } = e.target;
    
    if (files && files[0]) {
      // Convert the file to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedOperators = [...formData.operators];
        updatedOperators[operatorIndex][fieldName][subFieldIndex][name] = reader.result;  // Store as base64
        setFormData({ ...formData, operators: updatedOperators });
      };
      reader.readAsDataURL(files[0]);  // Convert to base64
    } else {
      // Handle text fields as usual
      const updatedOperators = [...formData.operators];
      updatedOperators[operatorIndex][fieldName][subFieldIndex][name] = value;
      setFormData({ ...formData, operators: updatedOperators });
    }
  };
  
  


  // Handle adding new operators
  const addOperator = () => {
    const newOperator = {
      operator: '',
      radCenter: '',
      emptyMounts: '',
      lastMaintenance: '',
      aspectdetails:[
        {aspect:"Installation Date",description: ''},
        {aspect:"Antenna Types",description: ''},
        {aspect:"Frequency Bands",description: ''},
        {aspect:"Gain of Antenna",description:''},
        {aspect:"Interference",description:''},
        {aspect:"Radiation",description:''}
      ],
      azimuthAngles: [
        { angle: '0-120 degrees', details: '', imageUrl: '' },
        { angle: '120-240 degrees', details: '', imageUrl: '' },
        { angle: '240-360 degrees', details: '', imageUrl: '' },
      ],
      annotations: [
        {image: 'image1', imageUrl: ''},
        {image: 'image2', imageUrl: ''},
        {image: 'image3', imageUrl: ''},
        {image: 'image4', imageUrl: ''},
      ],
      missingParts: [
        { part: 'Wind Load Indicators', description: '' },
        { part: 'Antenna Mounting Brackets', description: '' },
        { part: 'Guy Wires', description: '' },
        { part: 'Climbing Ladders', description: '' },
        { part: 'Cable Management Hardware', description: '' },
        { part: 'Grounding Kits', description: '' },
        { part: 'Lighting and Marking', description: '' },
        { part: 'Feedlines and Connectors', description: '' },
        { part: 'Weatherproofing Materials', description: '' },
        { part: 'Surge Protectors', description: '' },
      ],
    };
    setFormData((prevState) => ({
      ...prevState,
      operators: [...prevState.operators, newOperator],
    }));
  };

  // Handle deleting an operator
  const deleteOperator = (index) => {
    const updatedOperators = formData.operators.filter((_, i) => i !== index);
    setFormData({ ...formData, operators: updatedOperators });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/form/ins-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        alert('Error submitting form!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form!');
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      <div className="max-h-[500px] overflow-y-scroll overflow-x-hidden p-2">
      <div className="space-x-2">
        <label className="font-semibold">Site ID</label>
        <input
          type="text"
          name="siteID"
          value={formData.siteID}
          onChange={(e) => setFormData({ ...formData, siteID: e.target.value })}
        />
      </div>

      {/* Operators */}
      {formData.operators.map((operator, index) => (
        <div key={index}>
          <h3 className="mt-3 font-semibold text-red-600">Operator {index + 1}</h3>
          <div className="grid md:grid-cols-4 mt-2">
            <div>
              <label>Operator</label>
              <input
                type="text"
                name="operator"
                value={operator.operator}
                onChange={(e) => handleOperatorChange(index, e)}
              />
            </div>
            <div>
              <label>Rad Center</label>
              <input
                type="text"
                name="radCenter"
                value={operator.radCenter}
                onChange={(e) => handleOperatorChange(index, e)}
              />
            </div>
            <div>
              <label>Empty Mounts</label>
              <input
                type="text"
                name="emptyMounts"
                value={operator.emptyMounts}
                onChange={(e) => handleOperatorChange(index, e)}
              />
            </div>
            <div>
              <label>Last Maintenance</label>
              <input
                type="date"
                name="lastMaintenance"
                value={operator.lastMaintenance}
                onChange={(e) => handleOperatorChange(index, e)}
              />
            </div>
          </div>

          {/* Aspect	Details */}
          <h4 className="mt-4 font-semibold">Aspect	Details</h4>
          <div className="grid md:grid-cols-4 gap-3 mt-2">
            {operator.aspectdetails.map((part, subIndex) => (
              <div key={subIndex}>
                <label>{part.aspect}</label>
                <input
                  type="text"
                  name="description"
                  value={part.description}
                  className='mt-1'
                  onChange={(e) => handleInputChange(index, 'aspectdetails', subIndex, e)}
                />
              </div>
            ))}
          </div>

          {/* Azimuth Angles */}
          {/* <h4 className="mt-4 font-semibold">Azimuth Angles</h4>
          <div className="grid md:grid-cols-4 mt-2">
            {operator.azimuthAngles.map((angle, subIndex) => (
              <div key={subIndex}>
                <label>{angle.angle}</label>
                <input
                  type="text"
                  name="details"
                  value={angle.details}
                  onChange={(e) => handleInputChange(index, 'azimuthAngles', subIndex, e)}
                  className='mt-1'
                />
                <input
                  type="file"
                  name="imageUrl"
                  className="mt-2"
                  onChange={(e) => handleInputChange(index, 'azimuthAngles', subIndex, e)}
                />
              </div>
            ))}
          </div>

          <h4 className="mt-4 font-semibold">Annotations</h4>
          <div className="grid md:grid-cols-4 mt-2">
            {Object.keys(operator.annotations).map((annotationKey,subIndex) => (
              <div key={subIndex}>
                <label>{annotationKey.image}</label>
                <input
                  type="file"
                  name="imageUrl"
                  // name={annotationKey.imageUrl}
                  onChange={(e) => handleInputChange(index, 'annotations', subIndex, e)}
                  className='mt-1'
                />
              </div>
            ))}
          </div> */}

          {/* Azimuth Angles */}
<h4 className="mt-4 font-semibold">Azimuth Angles</h4>
<div className="grid md:grid-cols-4 mt-2">
  {operator.azimuthAngles.map((angle, subIndex) => (
    <div key={subIndex}>
      <label>{angle.angle}</label>
      <input
        type="text"
        name="details"
        value={angle.details}
        onChange={(e) => handleInputChange(index, 'azimuthAngles', subIndex, e)}
        className="mt-1"
      />
      <input
        type="file"
        name="imageUrl"
        className="mt-2"
        onChange={(e) => handleInputChange(index, 'azimuthAngles', subIndex, e)}
      />
      {angle.imageUrl && (
        <img
          src={angle.imageUrl} // Display the base64 image
          alt={`Azimuth Angle ${angle.angle}`}
          className="mt-2"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
      )}
    </div>
  ))}
</div>

{/* Annotations */}
<h4 className="mt-4 font-semibold">Annotations</h4>
<div className="grid md:grid-cols-4 mt-2">
  {operator.annotations.map((annotation, subIndex) => (
    <div key={subIndex}>
      <label>{annotation.image}</label>
      <input
        type="file"
        name="imageUrl"
        onChange={(e) => handleInputChange(index, 'annotations', subIndex, e)}
        className="mt-1"
      />
      {annotation.imageUrl && (
        <img
          src={annotation.imageUrl} // Display the base64 image
          alt={`Annotation ${annotation.image}`}
          className="mt-2"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
      )}
    </div>
  ))}
</div>


          <h4 className="mt-4 font-semibold">Missing Parts</h4>
          <div className="grid md:grid-cols-4 gap-2 mt-2">
            {operator.missingParts.map((part, subIndex) => (
              <div key={subIndex}>
                <label>{part.part}</label>
                <input
                  type="text"
                  name="description"
                  value={part.description}
                  className='mt-1'
                  onChange={(e) => handleInputChange(index, 'missingParts', subIndex, e)}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => deleteOperator(index)}
            className="bg-red-500 text-white px-3 py-2 rounded-md mt-4"
          >
            Delete Operator
          </button>
        </div>
      ))}
  </div>
      <div className="flex justify-between w-full">
        <button
          type="button"
          onClick={addOperator}
          className="bg-blue-500 text-white px-3 py-2 rounded-md mt-4"
        >
          Add Operator
        </button>

        <button type="submit" className="bg-green-500 text-white px-3 py-2 rounded-md mt-4">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Uploads;