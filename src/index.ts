// import "reflect-metadata"
// import http from "node:http";
// import express from "express";
// import { expressMiddleware } from "@apollo/server/express4";
// import dotenv from "dotenv";
// import db from "./db";
// import cors from "cors";
// import resolvers from "./Resolvers";
// import { buildSchema } from "type-graphql";
// import session from "express-session";
// import mySession from "./mySession";
// import { WebSocketServer } from "ws";
// import { useServer } from "graphql-ws/lib/use/ws";
// import { ApolloServer } from '@apollo/server';
// import apolloServerConfig from "./apolloServerConfig";
// import { PubSub } from 'graphql-subscriptions';
// import { redis } from "./Cache/redis";

import { BaseURLs, getData, getWebsite } from "./utils/scrapper"

// dotenv.config();

// const PORT = process.env.SERVER_PORT;
// new PubSub();
// const app = express();
// const httpServer = http.createServer(app);
// const wsServer = new WebSocketServer({
//   server: httpServer,
//   path: "/api",
// });


// async function main() {
//   try {
//     const DB = await db.initialize();
//     app.use(session(mySession));
//     const schema = await buildSchema({ resolvers, validate: false });
//     const serverCleanup = useServer({ schema }, wsServer);
//     const apolloServer = new ApolloServer(apolloServerConfig({
//       httpServer,
//       schema,
//       serverCleanup
//     }))
//     await apolloServer.start();
//     app.use(
//       "/api",
//       cors({ origin: "http://localhost:5173", credentials: true }),
//       express.json(),
//       expressMiddleware(apolloServer, {
//         context: async ({ req, res }) => {
//           return { req, res, db:DB, redis};
//         },
//       }),
//     );
//     await new Promise<void>((resolve) =>
//       httpServer.listen({ port: PORT }, resolve)
//     );
//     console.log(`server running on port ${PORT}`);
//     console.log(`open the api : http://localhost:${PORT}/api`);
//   } catch (error) {
//     console.log(error);
//   }
// }

// main();

async function main() {
  const res = await getWebsite(BaseURLs[0])
  if(res){
    getData(res)
  }
}
main()
