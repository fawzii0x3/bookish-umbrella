import { GraphQLSchema } from "graphql";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "node:http";
import { Disposable } from "graphql-ws";
import { ApolloServerOptions, BaseContext } from "@apollo/server";

interface ApolloServerProps {
  httpServer: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
  schema: GraphQLSchema,
  serverCleanup: Disposable
}

export default ({ httpServer, schema, serverCleanup }: ApolloServerProps): ApolloServerOptions<BaseContext> => ({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});