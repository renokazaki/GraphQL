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

    update: (
      parent: any,
      args: { id: string; url?: string; description?: string }
    ) => {
      const index = links.findIndex((link) => link.id === args.id);
      if (index === -1) return null;

      if (args.url !== undefined) links[index].url = args.url;
      if (args.description !== undefined)
        links[index].description = args.description;

      return links[index];
    },

    delete: (parent: any, args: { id: string }) => {
      const index = links.findIndex((link) => link.id === args.id);
      if (index === -1) return null;

      const [deleted] = links.splice(index, 1);
      return deleted;
    },
  },
};

