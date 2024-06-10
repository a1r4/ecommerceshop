const mongoose = require("mongoose");

export const connectMongoDB = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB already connected.");
            return;
        }

        // Connect to MongoDB using Mongoose
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // Additional options if needed
        });

        console.log("MongoDB connected successfully.");
    } catch (error) {
        // Handle connection errors
        console.error("Error connecting to MongoDB:", error);
        throw error; // Rethrow the error to be caught by the caller
    }
};
