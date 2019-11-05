const { gql } = require('apollo-server-express');

const typedefs = gql`
    type Board {
        id: ID!
        name: String!
        description: String
        created_at: DateTime
        posted_by: User!
    }

    input PostBoardInput {
        name: String!
        description: String
    }

    extend type Query {
        totalBoards: Int!
        allBoards: [Board!]!
    }
    extend type Mutation {
        postBoard(input: PostBoardInput!): Board!
    }
`;

module.exports = typedefs;
