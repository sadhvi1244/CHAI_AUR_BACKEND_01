//what ApiError.js does: it is a utility class that standardizes the structure of error responses in an Express.js application. It provides a consistent way to handle errors, making it easier to manage error responses uniformly across the application.   
class ApiError extends Error {
  constructor(
    statusCode,
    message="Something went wrong", 
    error = [],
    stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.error = error;

       if(stack){
          this.stack = stack;
        } 
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };