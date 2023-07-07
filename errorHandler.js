// errorHandler.js

const errorHandler = (err, req, res, next) => {

    console.log("this is inside errorhandler"+err)
  
    const statusCode = err.statusCode || 500; // Set the status code based on the error or default to 500
  
    res.status(statusCode).json({
      status: "error",
      statusCode,
      message: err.message,
      errors: [
        {
          msg: err.message,
          name: err.name,
          value: err.value,
        },
      ],
    });
  };
  
  module.exports = errorHandler;
  