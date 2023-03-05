import { ApolloServer, gql } from "apollo-server";

import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"

//tagged template literal
const typeDefs = gql`
   type Query{
     greet : String
   }
`

const resolvers = {
    Query: {
        greet: () => {
            return "Hello World"
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    plugins : [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
    
})


server.listen().then(({ url }) => {
    console.log(`Server is running ${url}`)
})