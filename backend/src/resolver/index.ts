import { PrismaClient } from "generated/prisma/client";

type Context = {
  prisma: PrismaClient;
};

function parseId(id: string): number | null {
  const parsed = parseInt(id, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

export const resolvers = {
  Query: {
    info: () => "HackerNews",
    feed: async (_: unknown, __: unknown, context: Context) => {
      return context.prisma.link.findMany({ orderBy: { id: "asc" } });
    },
  },

  Mutation: {
    post: async (
      _: unknown,
      args: { description: string; url: string },
      context: Context,
    ) => {
      return context.prisma.link.create({
        data: {
          description: args.description,
          url: args.url,
        },
      });
    },

    update: async (
      _: unknown,
      args: { id: string; url?: string; description?: string },
      context: Context,
    ) => {
      const id = parseId(args.id);
      if (id === null) return null;

      const existing = await context.prisma.link.findUnique({ where: { id } });
      if (!existing) return null;

      const data: { url?: string; description?: string } = {};
      if (args.url !== undefined) data.url = args.url;
      if (args.description !== undefined) data.description = args.description;

      return context.prisma.link.update({ where: { id }, data });
    },

    delete: async (_: unknown, args: { id: string }, context: Context) => {
      const id = parseId(args.id);
      if (id === null) return null;

      const link = await context.prisma.link.findUnique({ where: { id } });
      if (!link) return null;

      await context.prisma.link.delete({ where: { id } });
      return link;
    },
  },
};
