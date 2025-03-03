import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config()

const mongoDbURL = process.env.MONGO_URL_STRING as string
//console.log (mongoDbURL)
//console.log (process.env.MONGO_URL_STRING)
//const mongoDbURL = "mongodb+srv://catarinacci:OG4PZfiiVSIx8aPx@apilorem.80c3v.mongodb.net/?retryWrites=true&w=majority&appName=apiLorem"
export default (async ()=>{
    try {
        await mongoose.connect(mongoDbURL)
        console.log("DB online");
    } catch (error) {
        console.log("error :>>",error);
        process.exit(1);
        //throw new Error("Error a la hora de iniciar la BD ver logs");
    }
})();
