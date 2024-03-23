function buildErrorResponse(message) {
  return { status: "error", message };
}

function getBaseURl() {
  return process.env.NODE_ENV === "production"
    ? process.env.SERVER_BASE_URL
    : process.env.LOCAL_BASE_URL;
}


module.exports = {
  buildErrorResponse,
  getBaseURl,
};
