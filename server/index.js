import { ApolloServer, gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core"
import {quotes,users} from  "./fakedb.js"

//tagged template literal
const typeDefs = gql`
   type Query{
     users : [User]
     user(id:ID!):User                      
     quotes : [Quote]
     indvidualQuote(by : ID!) : [Quote]
   }

   type User{
    id : ID!
    firstName : String
    lastName : String
    email : String
    password : String
    quotes : [Quote]
   }

   type Quote{
    name : String 
    by : ID!
   }
`

// line 9  -->  user(id:ID!):User for individual

const resolvers = {
    Query: {
        users : () => users,
        user : (_,args) => users.find(user => user.id === args.id),              
        quotes : () => quotes,
        indvidualQuote :  (_,{by}) => quotes.filter(quote => quote.by === by), 
    },
    User : {
        quotes : (ur) => quotes.filter(quote => quote.by == ur.id)   // ur ---> user
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