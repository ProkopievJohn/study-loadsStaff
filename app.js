import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import staticPages from 'koa-static';
import cors from 'koa2-cors';
import db from './api_server/models/db';

import config from './config/index';
import apiRoutes from './api_server/router/index';
const env = process.env.NODE_ENV;
const app = new Koa();

app.use(cors({allowMethods: ['GET', 'POST', 'PUT', 'DELETE']}));

app.use(bodyParser());
if (env === 'production') {
  app.use(staticPages(__dirname + '/build'));
} else {
  app.use(staticPages(__dirname + '/public'));
  app.use(staticPages(__dirname + '/src'));
}

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
