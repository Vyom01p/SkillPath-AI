import jwt from "jsonwebtoken";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";
import pool from "../config/db.js";

const protect = catchAsync(async (req, res, next) => {
  //1. Checking if token exists or not
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged In. Please log in to continue.", 401),
    );
  }
  //2. Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3. Checking if the user still exists in the db
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [
    decoded.id,
  ]);
  const user = result.rows[0];
  if (!user) {
    return next(
      new AppError("The user belonging to this token no longer exists.", 401),
    );
  }
  // 4. Attach user to request object so controllers can access it
  req.user = user;
  next();
});
