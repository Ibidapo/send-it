import express from 'express';
import bodyParser from 'body-parser';

import router from './routes/routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

// Port server is running on for localhost and Heroku integration
app.listen(port);

export default app;
