import express from 'express';
import dotenv from 'dotenv';
import path, { dirname, join } from 'path';
import cors from 'cors'
import { fileURLToPath } from 'url';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import { typeDefs } from './graphql/schema.js';
import { resolvers } from './graphql/resolvers.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
const HOST = process.env.HOST ?? "localhost";
const PORT = process.env.PORT ?? 3000;


async function startApolloServer(typeDefs, resolvers) {
    const app = express();
    app.set("view engine", "pug");
    app.set("views", join(__dirname, '.', 'views'));
    app.use(cors())
    app.get('/', (req, res) => res.render("index", { title: "GQL DEMO" }));
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    server.applyMiddleware({ app, path: "/api", context: context => context });
    await new Promise(resolve => httpServer.listen({ port: PORT }, resolve));
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}
startApolloServer(typeDefs, resolvers);