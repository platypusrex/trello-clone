import 'reflect-metadata';
import express from 'express';
// import cors from 'cors';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { redis } from './redis';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';

const bootstrap = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [__dirname + '/resolvers/*.ts'],
    authChecker: ({ context }) => {
      return !!context.req.session!.userId;
    },
  });

  const server = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res })
  });

  const app = express();
  const redisStore = connectRedis(session);

  app.use(
    session({
      store: new redisStore({
        client: redis as any
      }),
      name: 'qid',
      secret: 'laskuefalksjdfh12345',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365
      }
    })
  );

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: ['http://localhost:3000', 'http://localhost:6006']
    },
  });

  app.listen(4000, () => console.log('App listening on http://localhost:4000/graphql'))
};

bootstrap();