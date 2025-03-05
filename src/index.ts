import express  from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import "./database/database"
import cors from "cors"
import bodyParser from "body-parser";
import authRoutes from "./routes/auth";
import fileUpload from "express-fileupload";
//Gimport multer from "multer"

dotenv.config();

//initializations
const app = express();
const corsOptions = {
  //To allow requests from client
  origin: ["http://localhost:3000", "https://blog-point-nine.vercel.app"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
//settings
app.set('port', process.env.PORT || 3000);

//middleware
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(
  fileUpload({
    useTempFiles: true,
    preserveExtension: true,
    createParentPath: true,
  })
);

//routes
app.get('/', (req, res)=>{
    res.send(`The API is at http://localhost:${app.get('port')}`)
});

app.use('/api', authRoutes);

app.listen(app.get('port'));
console.log('Server on port', app.get('port'))


