import Fastify from 'fastify';
import prismaPlugin from './plugins/prisma';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifyAuth from '@fastify/auth';
import healthCheck from './controllers/healthcheck';
import categoriesRoutes from './controllers/public/category.controller';
import productsRoutes from './controllers/public/products.controller';
import registerRoute from './controllers/public/authentication/register';
import loginRoute from './controllers/public/authentication/login';
import authPlugin from './plugins/authenticate';



function build(opts = {}) {
  const app = Fastify(opts);
  // Register plugins
  app.register(prismaPlugin);
  app.register(fastifyAuth);
  app.register(fastifyCors, {
    origin: '*'
  });
  app.register(authPlugin)
  

  // Register routes
  app.register(healthCheck, { prefix: '/api' });
  app.register(categoriesRoutes, { prefix: '/api' });
  app.register(productsRoutes, { prefix: '/api' });
  app.register(registerRoute,{ prefix:'/api/auth'})
  app.register(loginRoute,{ prefix:'/api/auth'})

  return app;
}

export default build;
