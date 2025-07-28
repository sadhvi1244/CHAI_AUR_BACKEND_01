//What ApiResponse.js does: it is a utility class that standardizes the structure of API responses in an Express.js application. It provides a consistent way to send success and error responses, making it easier to handle API responses uniformly across the application.
class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode;
  }
}

export { ApiResponse };

//status code
// Informational responses (100 – 199)
// Successful responses (200 – 299)
// Redirection messages (300 – 399)
// Client error responses (400 – 499)
// Server error responses (500 – 599)
