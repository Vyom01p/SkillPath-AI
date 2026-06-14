//This is the Global Error Handler
import AppError from "./AppError.js";

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);
const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  let error = { ...err, name: err.name, message: err.message };

  if (error.name === "JsonWebTokenError") error = handleJWTError();
  if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

export default errorMiddleware;
