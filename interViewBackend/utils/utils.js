// Helper function to format the response
function formattedResponse(res, statusCode, data, message) {
  return res.status(statusCode).json({
      status: statusCode,
      message: message,
      data: data
  });
}

module.exports = formattedResponse;
