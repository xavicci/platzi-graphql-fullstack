
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import resolvers from './resolvers'
import path from 'path'
import { readFileSync } from 'fs'
import { PrismaClient } from '@prisma/client'

const orm = new PrismaClient()



const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')

// @ts-ignore
async function listen() {
  // @ts-ignore
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => ({
      orm,
    }),

  })

  return url
}

listen().then((url) => console.log(`🚀  Server ready at: ${url}`))

