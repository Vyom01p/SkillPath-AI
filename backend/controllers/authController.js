import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/AppError.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = signToken(user.id);
  delete user.password;

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

//-------------------------------SIGNUP-----------------------------------------------------
export const signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  //1. Validate Input
  if (!name || !email || !password) {
    return next(new AppError("Please provide name , email and password", 400));
  }
  if (password.length < 6) {
    return next(new AppError("Password must be of atleast 6 characters", 400));
  }
  //2. Checking if email already exists
  const existingUser = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email],
  );
  if (existingUser.rows.length > 0) {
    return next(
      new AppError("Email is already in use. Please login instead.", 400),
    );
  }

  //3. Hash Password
  const hashedPassword = await bcrypt.hash(password, 12);

  //4. Save to the database
  const result = await pool.query(
    `INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id,name,email,avatar,streak,created_at`,
    [name, email, hashedPassword],
  );

  const newUser = result.rows[0];

  //5. Send Token
  sendTokenResponse(newUser, 201, res);
});

//--------------------------------------LOGIN---------------------------------------------

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1. Checking if email and passwors provided
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }
  //2. Find user by email
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];

  //3. Checking if the user exists and password is correct
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  //4. Send Token
  sendTokenResponse(user, 200, res);
});

//-------------------------------------GET-ME----------------------------------------------

export const getMe = catchAsync(async (req, res, next) => {
  const result = await pool.query(
    "SELECT id,name,email,avatar,streak,created_at FROM users WHERE id = $1",
    [req.user.id],
  );
  res.status(200).json({
    status: "success",
    data: { user: result.rows[0] },
  });
});

//------------------------------------UPDATE-ME--------------------------------------------

export const updateMe = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return next(new AppError("Please provide name and email", 400));
  }
  const result = await pool.query(
    "UPDATE users SET name = $1,email = $2 WHERE id = $3 RETURNING id,name,email,avatar,streak,created_at",
    [name, email, req.user.id],
  );
  res.status(200).json({
    status: "success",
    data: { user: result.rows[0] },
  });
});

//------------------------CHANGE-PASSWORD------------------------------------------------

export const changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return next(new AppError("Please provide current and new Password", 400));
  }
  if (newPassword.length < 6) {
    return next(new AppError("New password must be atleast 6 characters", 400));
  }
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [
    req.user.id,
  ]);
  const user = result.rows[0];

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError("Current password is incorrect", 401));
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  await pool.query("UPDATE users SET password = $1 WHERE id = $2", [
    hashedPassword,
    req.user.id,
  ]);

  res.status(200).json({
    status: "success",
    message: "Password updated successfully",
  });
});
