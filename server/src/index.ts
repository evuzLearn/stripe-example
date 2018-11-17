// import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import * as session from 'express-session';
import { createConnection } from 'typeorm';

import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const PORT = process.env.PORT || 4000;

const startServer = () => {
  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({ req }: any) => ({ req }),
  });

  return createConnection().then(() => {
    const app = express();
    app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: 'my-secret',
      }),
    );

    server.applyMiddleware({
      app,
      cors: {
        credentials: true,
        origin: 'http://localhost:3000',
      },
    }); // app is from an existing express app

    app.listen({ port: PORT }, () =>
      // tslint:disable-next-line
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`),
    );
  });
};

startServer();
