import mongoose from "mongoose";

const Connection = async () => {
    const URL = "mongodb://localhost:27017/myblog?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
    try {
        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;