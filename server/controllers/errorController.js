const prodErrors = (res, err) => {
  console.log("me prod");
  console.log(err.message);
  if (err.isOperational) {
    res.status(err.statuscode).json({
      status: 'failure',
      message: err.message
    });
  } else {
    res.status(err.statuscode).json({
      status: 'failure',
      message: 'Something went wrong! Please try again later'
    });
  }
};

const devErrors = (res, err) => {
  console.log("me dev")
  const formattedError = {
    status: err.status || 'failure',
    message: err.message,
    stackTrace: err.stack
  };
  console.log(err);
  res.status(err.statuscode).json(formattedError);
};

module.exports = (err, req, res, next) => {
  console.log("i got in errorhandler"+err);
  err.statuscode = err.statuscode || 500;
  err.status = err.status || 'failure';
  const environment = process.env.NODE_ENV || 'development'; // Get environment from process.env
  if (environment === 'development') {
    devErrors(res, err);
  } else if (environment === 'production') {
    prodErrors(res, err);
  }
};
