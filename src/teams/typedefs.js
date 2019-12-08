const { gql } = require('apollo-server-express');

const typedefs = gql`    
    type Team {
        id: ID!
        name: String!
    }
`;

module.exports = typedefs;
