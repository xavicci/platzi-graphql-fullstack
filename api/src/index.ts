import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `
type Query {
  info: String!
}
`
const resolvers = {
  Query: {
    info: () => `This is the API of Platzi Node GraphQL`,
  },
}

// @ts-ignore
async function listen() {
  // @ts-ignore
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  })

  return url
}

listen().then((url)=>console.log(`🚀  Server ready at: ${url}`));
