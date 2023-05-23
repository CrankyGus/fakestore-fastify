import Fastify from 'fastify';
import prismaPlugin from './plugins/prisma';
import healthCheck from './controllers/healthcheck';
import categoriesRoutes from './controllers/category.controller';

function build(opts = {}) {
  const app = Fastify(opts);

  app.register(prismaPlugin);

  // Register routes
  app.register(healthCheck, { prefix: '/api' });
  app.register(categoriesRoutes,{prefix:'/api'})
  return app;
}

export default build;
