import {ApolloServer} from '@apollo/server';

const typeDefs = `
type Query {
  info: String!
}
`
const resolvers = {
  Query:{
    info: ()=>`This is the API of Platzi Node GraphQL`
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

const server = new ApolloServer({
  typeDefs,
  resolvers
})
