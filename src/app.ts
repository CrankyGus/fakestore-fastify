import Fastify from 'fastify';
import prismaPlugin from './plugins/prisma';
import fastifyCors from '@fastify/cors';
import fastifyAuth from '@fastify/auth';
import fastifyCookie from '@fastify/cookie';
import healthCheck from './controllers/healthcheck';
import categoriesRoutes from './controllers/public/category.controller';
import productsRoutes from './controllers/public/products.controller';
import registerRoute from './controllers/public/authentication/register';
import loginRoute from './controllers/public/authentication/login';
import authPlugin from './plugins/authenticate';
import categoriesPrivateRoutes from './controllers/private/category.controller';
import productsPrivateRoutes from './controllers/private/products.controller';
import brandController from './controllers/public/brand.controller';
import brandPrivateController from './controllers/private/brand.controller';
import usersPrivateController from './controllers/private/authentication/users.controller';
import orderPrivateController from './controllers/private/order.controller';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: any;
  }
}

function build(opts = {}) {
  const app = Fastify(opts);

  // Register plugins
  app.register(prismaPlugin);
  app.register(fastifyAuth);
  app.register(fastifyCors, {
    origin: 'http://localhost:3000',
    credentials: true
  });
  app.register(authPlugin);
  app.register(fastifyCookie);

  // Register routes
  app.register(healthCheck, { prefix: '/api' });
  app.register(categoriesRoutes, { prefix: '/api' });
  app.register(productsRoutes, { prefix: '/api' });
  app.register(registerRoute, { prefix: '/api/auth' });
  app.register(loginRoute, { prefix: '/api/auth' });
  app.register(brandController, { prefix: '/api' });

  // Register private routes
  app.register(usersPrivateController, { prefix: '/api/auth' });
  app.register(categoriesPrivateRoutes, { prefix: '/api' });
  app.register(productsPrivateRoutes, { prefix: '/api' });
  app.register(brandPrivateController, { prefix: '/api' });
  app.register(orderPrivateController, { prefix: '/api' });

  return app;
}

export default build;
