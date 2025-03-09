import { RootResolver } from "@hono/graphql-server";
const resolvers:RootResolver = (c) => {
  return {
    Query: {
      hello: () => {
        return "Hello World";
      },
      // greet: (args) => {
      //   return `Hello ${args.name}`;
      // },
    },
  };
}

export default resolvers;
