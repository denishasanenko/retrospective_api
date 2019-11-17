const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const express = require('express');
const mergeDeep = require('./utils');
const jwt = require('jsonwebtoken');
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

    const context = ({ req }) => {
        // get the user token from the headers
        let user = {};
        const token = req.headers.authorization || '';
        const splitToken = token.split(' ')[1];
        if (['signIn', 'signUp'].includes(req.body.operationName)) {
            return {user};
        }
        try {
            jwt.verify(splitToken, 'secret');
            user = jwt.decode(splitToken);
        } catch (e) {
            throw new AuthenticationError(
                'Authentication token is invalid, please log in'
            )
        }
        return {user};
    }

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
});

server.applyMiddleware({ app });

app.get('/', (req, res) => res.end('Welcome'));

app.listen({port: process.env.PORT}, () => {
    console.log(`App listen on port ${process.env.PORT}} by ${server.graphqlPath}`)
});
