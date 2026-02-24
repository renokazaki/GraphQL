import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import * as fs from "fs";
import * as path from "path";
import { resolvers } from "./resolver";

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, "schema", "schema.graphql"),
    "utf-8"
  ),
  resolvers,
});

async function main() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });
  console.log(`Server ready at ${url}`);
}

main();
