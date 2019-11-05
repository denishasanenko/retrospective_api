const { ApolloServer } = require('apollo-server-express');
const express = require('express');
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

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Deep merge two objects.
 * @param target
 * @param ...sources
 */
function mergeDeep(target, ...sources) {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

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
