const formattedResponse = require("../utils/utils");
const fs = require("fs");
const path = require("path");

// Helper function to parse CSV text into an array of objects
// Function to convert CSV text to JSON
function csvToJson(csv) {
  const lines = csv.split("\n"); // Split the CSV into lines
  const headers = lines[0].split(","); // Get the headers from the first line
  const jsonData = [];

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(",");

    // Skip empty lines
    if (currentLine.length === headers.length) {
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = currentLine[j].trim(); // Trim whitespace
      }
      jsonData.push(obj);
    }
  }

  return jsonData;
}

function csvToJsonFilterData(csv, startDate, endDate) {
  const lines = csv.split("\n"); // Split the CSV into lines
  const headers = lines[0].split(","); // Get the headers from the first line
  const jsonData = [];

  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(",");

    // Skip empty lines
    if (currentLine.length === headers.length) {
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = currentLine[j].trim(); // Trim whitespace
      }
      jsonData.push(obj);
    }
  }

  // Filter the jsonData based on the timestamp
  const filteredData = jsonData.filter((item) => {
    const itemDate = new Date(item.timestamp); // Convert timestamp to Date object
    return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
  });

  return filteredData;
}

const calculatePriceStats = (data) => {
  const groupedData = {};

  data.forEach((vehicle) => {
    // Parse the price to a number
    const price = parseFloat(vehicle.price.replace(" USD", ""));

    // Group by condition
    if (!groupedData[vehicle.condition]) {
      groupedData[vehicle.condition] = {
        total: 0,
        count: 0,
      };
    }

    // Update total and count
    groupedData[vehicle.condition].total += price;
    groupedData[vehicle.condition].count += 1;
  });

  // Calculate average and prepare the result
  const result = Object.keys(groupedData).map((condition) => {
    const total = groupedData[condition].total;
    const count = groupedData[condition].count;
    const average = total / count;

    // Create dynamic key names based on the condition
    return {
      [`${condition} Units`]: count, // e.g., "New Units" or "Used Units"
      [`${condition} MSRP`]: total.toFixed(2), // e.g., "New MSRP" or "Used MSRP"
      [`${condition} Avg. MSRP`]: average.toFixed(2), // e.g., "New Avg. MSRP" or "Used Avg. MSRP"
    };
  });

  return result;
};

// Function to calculate inventory count and average MSRP by date and condition
function getInventoryAndAvgMSRP(data) {
  const result = {
    inventory_count: {},
    avg_msrp: {},
  };

  // Function to calculate the start date of a 10-day interval
  function getIntervalStartDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate();
    const intervalStartDay = Math.floor((day - 1) / 10) * 10 + 1;
    date.setDate(intervalStartDay);
    return date.toISOString().split("T")[0]; // Return in YYYY-MM-DD format
  }

  data.forEach((item) => {
    const condition = item.condition; // "new" or "used"
    const date = getIntervalStartDate(item.timestamp.split(" ")[0]); // Get the interval start date
    const price = parseFloat(item.price.replace(" USD", "")); // Parse price as a number

    // Initialize condition groups if not present
    if (!result.inventory_count[condition]) {
      result.inventory_count[condition] = {};
      result.avg_msrp[condition] = {};
    }

    // Initialize date groups for the interval if not present
    if (!result.inventory_count[condition][date]) {
      result.inventory_count[condition][date] = 0;
      result.avg_msrp[condition][date] = { total: 0, count: 0 };
    }

    // Increment inventory count for the date interval under the condition
    result.inventory_count[condition][date]++;

    // Add price to total and increment count for MSRP calculation
    result.avg_msrp[condition][date].total += price;
    result.avg_msrp[condition][date].count++;
  });

  // Calculate the average MSRP for each condition and date interval
  for (const condition in result.avg_msrp) {
    for (const date in result.avg_msrp[condition]) {
      const { total, count } = result.avg_msrp[condition][date];
      result.avg_msrp[condition][date] = total / count; // Calculate the average
    }
  }

  return result;
}

async function getVehicleData(req, res) {
  try {
    // Define the path to the CSV file
    const filePath = path.join(__dirname, "../assets/sample-data-v2.csv"); // Adjust the path as necessary

    // Read the CSV file
    const csvText = fs.readFileSync(filePath, "utf8");

    // Convert CSV to JSON
    const jsonData = csvToJson(csvText);
    const priceStats = calculatePriceStats(jsonData);
    const result = getInventoryAndAvgMSRP(jsonData);
    console.log(jsonData);

    return formattedResponse(
      res,
      200,
      { jsonData, priceStats, result },
      "File Data"
    );
  } catch (error) {
    console.error("Error reading vehicle data:", error);
    return formattedResponse(res, 500, null, "Internal Server Error!");
  }
}

async function getVehicleFilterData(req, res) {
  try {

    const {startDate, endDate} = req.body;

    // Define the path to the CSV file
    const filePath = path.join(__dirname, "../assets/sample-data-v2.csv"); // Adjust the path as necessary

    // Read the CSV file
    const csvText = fs.readFileSync(filePath, "utf8");

    // Convert CSV to JSON
    const jsonData = csvToJsonFilterData(csvText, startDate, endDate);
    const priceStats = calculatePriceStats(jsonData);
    const result = getInventoryAndAvgMSRP(jsonData);
    console.log(jsonData);

    return formattedResponse(
      res,
      200,
      { jsonData, priceStats, result },
      "File Data"
    );
  } catch (error) {
    console.error("Error reading vehicle data:", error);
    return formattedResponse(res, 500, null, "Internal Server Error!");
  }
}

module.exports = {
  getVehicleData,
  getVehicleFilterData
};
