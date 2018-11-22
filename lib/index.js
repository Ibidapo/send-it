import express from 'express';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';

import parcelRoutes from './routes/parcelRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import authenticate from './helper/authentication/token';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
app.use('/api/v1/parcels', authenticate.token, parcelRoutes);
app.use('/api/v1/users', authenticate.token, userRoutes);
app.use('/api/v1/auth', authRoutes);

// Port server is running on for localhost and Heroku integration
app.listen(port);

export default app;
