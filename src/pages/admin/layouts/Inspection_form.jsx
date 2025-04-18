import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const Uploads = ({closeDialog }) => {
  const [formData, setFormData] = useState({
    siteID: '',
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
                  {aspect:"Gain of Antenna",description:''},
                  {aspect:"Interference",description:''},
                  {aspect:"Radiation",description:''}
                ],
        azimuthAngles: [
          { angle: '0-120 degrees', details: '',  imagePath: '' },
          { angle: '120-240 degrees', details: '',  imagePath: '' },
          { angle: '240-360 degrees', details: '',  imagePath: '' }
        ],
        annotations: [
          { image: 'image1', imagePath: '' },
          { image: 'image2', imagePath : '' },
          { image: 'image3', imagePath : '' },
          { image: 'image4', imagePath : '' }
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
          { part: 'Surge Protectors', description: '' }
        ]
      }
    ]
  });
  // Handle field change for operators

  const handleChange = (e, operatorIndex, section, index = null) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      const updatedOperators = [...updatedFormData.operators];

      if (section) {
        if (index !== null) {
          updatedOperators[operatorIndex][section][index] = {
            ...updatedOperators[operatorIndex][section][index],
            [name]: value
          };
        } else {
          updatedOperators[operatorIndex][section] = value;
        }
      } else {
        updatedOperators[operatorIndex][name] = value;
      }

      updatedFormData.operators = updatedOperators;
      return updatedFormData;
    });
  };


  
const handleFileChange = (e, operatorIndex = null, section = null, index = null) => {
  const file = e.target.files[0];
  if (file) {
    setFormData((prevData) => {
      const updatedData = { ...prevData };

      if (operatorIndex !== null && section) {
        // For operator-related files
        updatedData.operators[operatorIndex][section][index].imagePath = file; // Store file object in imagePath
      } else if (section === 'siteImage') {
        // For the tower image (site image)
        updatedData.siteImagePath = file; // Store the file in siteImagePath
      }

      return updatedData;
    });
  }
};


  // Add a new operator
  const addOperator = () => {
    const newOperator = {
      operator: '',
        radCenter: '',
        emptyMounts: '',
        lastMaintenance: '',
        aspectdetails: [
          {aspect:"Installation Date",description: ''},
          {aspect:"Antenna Types",description: ''},
          {aspect:"Frequency Bands",description: ''},
          {aspect:"Gain of Antenna",description:''},
          {aspect:"Interference",description:''},
          {aspect:"Radiation",description:''}
        ],
        azimuthAngles: [
          { angle: '0-120 degrees', details: '',  imagePath: '' },
          { angle: '120-240 degrees', details: '',  imagePath: '' },
          { angle: '240-360 degrees', details: '',  imagePath: '' }
        ],
        annotations: [
          { image: 'image1', imagePath: '' },
          { image: 'image2', imagePath : '' },
          { image: 'image3', imagePath : '' },
          { image: 'image4', imagePath : '' }
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
          { part: 'Surge Protectors', description: '' }
      ],
    };

    setFormData((prevState) => ({
      ...prevState,
      operators: [...prevState.operators, newOperator],
    }));
  };

  // Delete an operator
  const deleteOperator = (index) => {
    const updatedOperators = formData.operators.filter((_, i) => i !== index);
    setFormData({ ...formData, operators: updatedOperators });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log(formData);
    const formDataToSubmit = new FormData();
  
    // Append the form fields
    formDataToSubmit.append('siteID', formData.siteID);
  
    // Append the site image if it exists
    if (formData.siteImagePath) {
      formDataToSubmit.append('siteImage', formData.siteImagePath); // Assuming the file is stored in siteImagePath
    }
  
    // Handle operator data and file uploads
    formData.operators.forEach((operator) => {
      operator.azimuthAngles.forEach((angle) => {
        if (angle.imagePath) {
          formDataToSubmit.append('azimuthAnglesImages', angle.imagePath);
        }
      });
  
      operator.annotations.forEach((annotation) => {
        if (annotation.imagePath) {
          formDataToSubmit.append('annotationsImages', annotation.imagePath);
        }
      });
  
      // Add the operator data (without images)
      formDataToSubmit.append('operators', JSON.stringify(operator));
    });
  
    try {
      const response = await axios.post(
        'https://dt-dev-backend.onrender.com/api/forms/ins-submit',
        formDataToSubmit,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // This is necessary for file uploads
          },
        }
      );
      console.log('Form submitted successfully', response.data);
      toast.success('Form submitted successfully!');
      closeDialog();
    } catch (error) {
      console.error('Error submitting form', error);
      toast.error('Something went wrong while submitting.');
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
        
          <label className="font-semibold">Tower Image</label>
              <input
        type="file"
        name="siteImage"
        onChange={(e) => handleFileChange(e, null, 'siteImage')}
        className="ml-4"
      />
      {formData.siteImagePath && (
        <img
          src={formData.siteImagePath}
          alt="Site Image"
          className="ml-2"
          style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
        />
      )}
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
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label>Rad Center</label>
              <input
                type="text"
                name="radCenter"
                value={operator.radCenter}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label>Empty Mounts</label>
              <input
                type="text"
                name="emptyMounts"
                value={operator.emptyMounts}
                onChange={(e) => handleChange(e, index)}
              />
            </div>
            <div>
              <label>Last Maintenance</label>
              <input
                type="date"
                name="lastMaintenance"
                value={operator.lastMaintenance}
                onChange={(e) => handleChange(e, index)}
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
                  onChange={(e) => handleChange( e, index, 'aspectdetails', subIndex,)}
                />
              </div>
            ))}
          </div>

     

<h4 className="mt-4 font-semibold">Azimuth Angles</h4>
<div className="grid md:grid-cols-4 mt-2">
  {operator.azimuthAngles.map((angle, subIndex) => (
    <div key={subIndex}>
      <label>{angle.angle}</label>
      <input
        type="text"
        name="details"
        value={angle.details}
        onChange={(e) => handleChange(e, index, 'azimuthAngles', subIndex)}
        className="mt-1"
      />
      <input
        type="file"
        name="azimuthAnglesImages"
        className="mt-2"
        onChange={(e) => handleFileChange(e, index, 'azimuthAngles', subIndex)}
      />
      {angle.imagePath && (
        <img
          src={angle.imagePath} 
          alt={`Azimuth Angle ${angle.angle}`}
          className="mt-2"
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
        />
      )}
    </div>
  ))}
</div>



<h4 className="mt-4 font-semibold">Annotations</h4>
<div className="grid md:grid-cols-4 mt-2">
  {operator.annotations.map((annotation, subIndex) => (
    <div key={subIndex}>
      <label>{annotation.image}</label>
      <input
        type="file"
        name="annotationsImages"
        onChange={(e) =>handleFileChange(e, index, 'annotations', subIndex)}
        className="mt-1"
      />
      {annotation.imagePath && (
        <img
          src={annotation.imagePath}
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
                  onChange={(e) => handleChange(e, index, 'missingParts', subIndex)}
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