const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
    const filePath = path.join(__dirname, 'traffic_data.json');
    
    if (event.httpMethod === 'GET') {
        // Read the JSON file and return its content
        const data = JSON.parse(fs.readFileSync(filePath));
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    }

    if (event.httpMethod === 'POST') {
        // Parse the request body to get the new traffic issue
        const newIssue = JSON.parse(event.body);

        // Read the existing data
        let data = JSON.parse(fs.readFileSync(filePath));
        data.push(newIssue);

        // Write the updated data back to the file
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Issue added successfully' })
        };
    }

    return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' })
    };
};
