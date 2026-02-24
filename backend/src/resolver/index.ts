const links = [
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

export const resolvers = {
  Query: {
    info: () => "HackerNews",
    feed: () => links,
  },

  Mutation: {
    post: (parent: any, args: { description: string; url: string }) => {
      const idCount = links.length;

      const link = {
        id: `link-${idCount}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);
      return link;
    },
  },
};

