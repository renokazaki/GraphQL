import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Query {
    info: String!
    feed: [Link]!
  }

  type Link {
  id : ID!
  description : String!
  url: String!
  }
`;

const resolvers = {
  Query: {
    info: () => "HackerNews",
    feed: () => links,
  },
};

let links = [
  {
    id: "link1",
    description: "test1",
    url: "test1",
  },
  {
    id: "link2",
    description: "test2",
    url: "test2",
  },
];

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function main() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });
  console.log(`Server ready at ${url}`);
}

main();
