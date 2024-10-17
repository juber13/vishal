import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateTokenAndSetCookie } from "../util/generateToken.js";

export const signup = async (req, res) => {
      try {
        const { fullName, username, email, password } = req.body;
        // console.log("In signup aoge")

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        
        // if (password.length < 6) {
        //   return res
        //     .status(400)
        //     .json({ error: "Password must be at least 6 character long" });
        // }


        if (!emailRegex.test(email)) {
          return res.status(400).json({ error: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
          return res.status(400).json({ error: "UsernEmail Is Already Taken" });
        }

        // const existingEmail = await User.findOne({ email });

        // if (existingEmail) {
        //   return res.status(400).json({ error: "Email Is Already Taken" });
        // }


        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
          fullName,
          username,
          email,
          password: hashedPassword,
        });

        // if (newUser) {
          generateTokenAndSetCookie(newUser._id, res);
          // await newUser.save();

         return  res.status(201).json({
       
          newUser

          });
      } catch (error) {
        console.log("Error in signup Controller", error.message);
    
       return  res.status(500).json({ error: "Internal server Error" });
      }
    };
    export const login = async (req, res) => {
      try {
        const { email, password } = req.body;
        
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ error: "Invalid username or password" });
        }
    
        // Compare the password
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          return res.status(400).json({ error: "Invalid username or password" });
        }


        const option = {
          maxAge: 15*24*60*60*1000,
          httpOnly: true, //its used for XSS attacks cross-site scripting attacks
          sameSite:"strict", //CSRF attacks cross-site request forgery attacks
          secure: false
      }
    
        // If login is successful, generate a token
        const token = generateTokenAndSetCookie(user._id, res);
        console.log("token", token);  
        
        return res.cookie("token" , token , option).status(200).json({ message: "Login successful" , data : user , token});
    
      } catch (error) {
        console.log("Error in login Controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    };
    
export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Serever Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getMe controller", error.message);
    res.status(500).json({ error: "Internal Serever Error" });
      }
};


