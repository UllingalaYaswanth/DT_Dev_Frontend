import React, { useState, useEffect } from 'react';

const Inspection = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://15.206.148.249:3000/api/form/ins-get'); // Your API endpoint here
        const result = await response.json();
        
        console.log('API Response:', result);  // Log the entire response to check its structure

        // Ensure operators is an array before calling map()
        if (response.ok && result && Array.isArray(result.operators)) {
          // Process image data to base64
          const processedData = result.operators.map(operator => {
            if (operator.imageUrl && operator.imageUrl.data) {
              // Convert the binary data to a base64 string
              const base64Image = arrayBufferToBase64(operator.imageUrl.data);
              return { ...operator, imageUrl: base64Image };
            }
            return operator;
          });
          setData(processedData); // Set the entire data response with base64 image URLs
        } else {
          setError('Invalid data structure or no operators found');
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

  // Helper function to convert an array buffer to a base64 string
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const length = bytes.byteLength;
    for (let i = 0; i < length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/png;base64,${window.btoa(binary)}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {data && data.length > 0 ? (
        data.map((operator, index) => (
          <div key={operator._id}>
            <h3>Operator {index + 1}</h3>
            <div>
              {operator.imageUrl ? (
                <img src={operator.imageUrl} alt={`Operator ${index + 1}`} />
              ) : (
                <p>No image available</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default Inspection;
