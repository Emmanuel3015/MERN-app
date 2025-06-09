import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// Login User
const loginUser = async (req, res) => {
  // Check if email matches the database
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    // Create JWT token
    const token = createToken(user._id);
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// User token creation function
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Registering User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // 1. Check if user already exists
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // 2. Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // 3. Validate password strength
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Please enter a strong password (min 8 chars)",
      });
    }

    // 4. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 5. Create & save the new user to the database
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    // 6. Create JWT and send success
    const token = createToken(user._id);
    return res.status(201).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error("registerUser error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export { loginUser, registerUser };
