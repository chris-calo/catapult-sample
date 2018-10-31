import fs from 'fs';
import Koa from 'koa';
import path from 'path';
import cors from 'kcors';
import React from 'react';
import colors from 'colors';
import ip from 'my-local-ip';
import serve from 'koa-static';
import App from '../shared/App';
import Router from 'koa-router';
import fetch from 'isomorphic-fetch';
import { renderToString } from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { caloriesCRUD, distanceCRUD, watchCRUD } from './api';

const port = 5000;
const app = new Koa();
const router = new Router();
const filepath = path.resolve('src', 'public', 'index.html');
const template = fs.readFileSync(filepath).toString();

// initial setup
app.use(cors());
app.use(serve('build'));

let last = new Date();
let routeData;
let routes = [];

// handle calorie-related API routes
router
  .post('/api/v1/caloriesburned', (ctx, next) => {
    ctx.body = { ok: false, msg: "ERROR: not yet implemented" };
  })
  .get('/api/v1/caloriesburned', (ctx, next) => {
    ctx.body = caloriesCRUD.read(-1, true);
  })
  .get('/api/v1/caloriesburned/:id', (ctx, next) => {
    ctx.body = { ok: false, msg: "ERROR: not yet implemented" };
  })
  .put('/api/v1/caloriesburned/:id', (ctx, next) => {
    ctx.body = { ok: false, msg: "ERROR: not yet implemented" };
  })
  .del('/api/v1/caloriesburned/:id', (ctx, next) => {
    ctx.body = { ok: false, msg: "ERROR: not yet implemented" };
  });

// handle distance-related API routes
router
  .post('/api/v1/distance', (ctx, next) => {
    ctx.body = { ok: false, msg: "ERROR: not yet implemented" };
  })
  .get('/api/v1/distance', (ctx, next) => {
    ctx.body = distanceCRUD.read(-1, true);
  })
  .get('/api/v1/distance/:id', (ctx, next) => {
    ctx.body = { ok: false, msg: "ERROR: not yet implemented" };
  })
  .put('/api/v1/distance/:id', (ctx, next) => {
    ctx.body = { ok: false, msg: "ERROR: not yet implemented" };
  })
  .del('/api/v1/distance/:id', (ctx, next) => {
    ctx.body = { ok: false, msg: "ERROR: not yet implemented" };
  });

// handle watch-related API routes
router
  .post('/api/v1/streamusage', (ctx, next) => {
    ctx.body = { ok: false, msg: "ERROR: not yet implemented" };
  })
  .get('/api/v1/streamusage', (ctx, next) => {
    ctx.body = watchCRUD.read(-1, true);
  })
  .get('/api/v1/streamusage/:id', (ctx, next) => {
    ctx.body = { ok: false, msg: "ERROR: not yet implemented" };
  })
  .put('/api/v1/streamusage/:id', (ctx, next) => {
    ctx.body = { ok: false, msg: "ERROR: not yet implemented" };
  })
  .del('/api/v1/streamusage/:id', (ctx, next) => {
    ctx.body = { ok: false, msg: "ERROR: not yet implemented" };
  });

// map all remaining routes to application
router.get('*', async (ctx, next) => {
  const now = new Date();

  const activeRoute = routes.find(route=>matchPath(ctx.req.url,route))||{};

  const markup = renderToString(
    <StaticRouter location={ctx.req.url} context={{ routeData }}>
      <App routes={routeData} />
    </StaticRouter>
  );

  const result = template.replace(
    `<div id="root"></div>`,
    `
    <script>
      window.__DATA_LOADED__ = true;
    </script>
    <div id="root">${markup}</div>
    `
  );

  ctx.body = result;
});

// start server loop
app.use(router.routes()).use(router.allowedMethods());
app.listen(port);

console.log(
  colors.bold.white(`Server current listening :\n\n`) +
  colors.reset.yellow(`Machine access: https://localhost:${port}\n`) +
  colors.reset.yellow(`Network access: https://${ip()}:${port}`)
);
