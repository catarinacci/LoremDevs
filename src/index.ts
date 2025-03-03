import app from "./server/app";
import dotenv from "dotenv";
import "./database/database"

dotenv.config();

//const port = process.env.PORT || 4000;

app.listen(app.get('port'));
console.log('Server on port', app.get('port'))

