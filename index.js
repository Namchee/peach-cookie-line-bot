import "regenerator-runtime/runtime";
import express from 'express';
import { router } from './src/routes/routes';
import logger from 'morgan';

const app = express();

if (process.env.NODE_ENV === 'test') {
  app.use(logger('dev'));
}

const port = process.env.PORT || 3000;

app.use('/', router);

app.listen(port, () => {
  console.log(`Listening to ${port}`);  
});
