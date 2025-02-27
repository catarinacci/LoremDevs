import express, {Application} from 'express';
import morgan from 'morgan';
import routes from '@routes/auth';

const app: Application = express();

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", routes());

export default app;