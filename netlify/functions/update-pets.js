const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  // Check if it's a POST request
  if (event.httpMethod === 'POST') {
    try {
      const data = JSON.parse(event.body); // Get the new data sent in the request
      const filePath = path.join(__dirname, '../../public/pets.json'); // Path to your pets.json file
      
      // Write new data to pets.json file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'File updated successfully!' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error updating file', error }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Only POST method is allowed' }),
  };
};