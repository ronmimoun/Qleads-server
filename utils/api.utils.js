function buildErrorResponse(message) {
  return { status: "error", message };
}

module.exports = {
  buildErrorResponse,
};
