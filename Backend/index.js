// PACKAGES IMPORT
import express from "express";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";
import path from "path";
import cors from 'cors';
//my file imports here
import userRoutes from "./routes/userRoute.js"
import connectmongoDB from "./Database/mongoDB.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/postRoute.js";
import notificationRoute from "./routes/notificationRoute.js"
import dotenv from "dotenv";

dotenv.config();


cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
    
});

const app = express();
app.use(cors());
const __dirname = path.resolve();
app.use(express.json()); //its parse the req.body
app.use(express.urlencoded({extended:true}));
app.use(cors(
    { origin: "http://localhost:5173" , credentials : true }
    ));
app.use(cookieParser());
// console.log(process.env.MONGO_URI);
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoute);
const PORT = process.env.PORT || 5050;
if (process.env.MODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectmongoDB();
});