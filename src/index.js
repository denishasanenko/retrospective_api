const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mergeDeep = require('./utils');
require('dotenv').config();

let typeDefs = [
    require('./base/typedefs'),
    require('./users/typedefs'),
    require('./boards/typedefs')
];
let resolvers = {

};
resolvers = mergeDeep(resolvers, require('./base/resolvers'),
    require('./users/resolvers'),
    require('./boards/resolvers'));

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.applyMiddleware({ app });

app.get('/', (req, res) => res.end('Welcome'));

app.listen({port: process.env.APP_PORT}, () => {
    console.log(`App listen on port ${process.env.APP_PORT}} by ${server.graphqlPath}`)
});
