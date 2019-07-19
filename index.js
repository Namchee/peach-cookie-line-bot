import express from 'express';
import { router } from './src/routes/routes';

const app = express();
const port = process.env.PORT || 3000;

app.use('/', router);

app.listen(port, () => {
  console.log(`Listening to ${port}`);  
});