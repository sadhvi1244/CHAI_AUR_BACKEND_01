//what asyncHandler does: it is a middleware function that wraps an asynchronous request handler and catches any errors that occur during the execution of that handler. If an error occurs, it passes the error to the next middleware in the Express.js error-handling chain.

//promise-based error handler for async functions in Express.js
const asyncHandler = (requestHandler) => {
    (req,res,next) =>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>next(err))
    }
}



export {asyncHandler}

// const asyncHandler = () => {}  // basic arrow function with no parameters
// const asyncHandler = (func) => () => {}  // higher-order function — it accepts a function func and returns another (inner) function with no parameters.
// const asyncHandler = (func) => async (req, res, next) => {} //higher-order function that takes an async func (a controller) and wraps it in a try/catch-like behavior. async function that receives req, res, next — just like any Express route handler.


//try-catch block to handle errors in async functions
// const asyncHandler = (fn) => async (req,res,next) => {
//     try {
//         await fn(req, res, next);  //await the execution of the passed function fn with req, res, and next as arguments
//     } catch (error) {
//         res.status(error.code || 500).json({
//            success: false,
//            message: error.message || "Internal Server Error",
//         })
//     }
// }