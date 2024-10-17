import mongoose from "mongoose";
const connectmongoDB = async()=>{
    console.log(process.env.MONGO_URI);
    try {
        const connected = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB Connected: ${connected.connection.host}`);     
    } catch (error) {
     console.log(`Error connection to MongoDB: ${error.message}`);
     process.exit(1);
    }
}
export default connectmongoDB;