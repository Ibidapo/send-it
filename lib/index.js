import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import cors from 'cors';

import parcelRoutes from './routes/parcelRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import authenticate from './middleware/authentication/authenticate';

const app = express();
const port = process.env.PORT || 3000;
const { verify } = authenticate;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/api/v1/parcels', verify, parcelRoutes);
app.use('/api/v1/users', verify, userRoutes);
app.use('/api/v1/auth', authRoutes);

// Port server is running on for localhost and Heroku integration
app.listen(port);

export default app;
