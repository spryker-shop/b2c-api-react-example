import express from 'express';
import path from 'path';

import serverRenderer from './middleware/renderer';

const PORT = 9000;
const app = express();
const router = express.Router();

app.set('view engine', 'ejs');

router.use('^/*', serverRenderer);

// other static resources should just be served as they are
router.use(express.static(path.resolve(__dirname, '..', 'build'), {maxAge: '30d'}));

app.use(router);

app.listen(PORT, (error: Error) => {
  if (error) {
    return console.log('something bad happened', error);
  }

  console.log('listening on ' + PORT + '...');
});
