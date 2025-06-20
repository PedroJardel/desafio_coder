import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const connection = mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB');
    console.log(`Database: ${mongoose.connection.name}`);
}).catch((error) => {
    console.error("Database connection error:", error);
});

export default connection;

