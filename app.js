import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import staticPages from 'koa-static';
import cors from 'koa2-cors';
import db from './api_server/models/db';

import config from './config/index';
import apiRoutes from './api_server/router/index';
import './node_modules/react-scripts/scripts/build';

const app = new Koa();

app.use(cors({allowMethods: ['GET', 'POST', 'PUT', 'DELETE']}));

app.use(bodyParser());
app.use(staticPages(__dirname + '/build'));
app.use(apiRoutes.routes());

db.connect('mongodb://localhost:27017/pms', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.');
    process.exit(1);
  } else {
    app.listen(config.apiOptions.port, function() {
      console.log('Listening on port 3001...');
    });
  }
});
