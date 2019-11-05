const { gql } = require('apollo-server-express');

const typedefs = gql`
    type BoardColumn {
        title: String!
        color: String!
    }
    
    type Board {
        id: ID!
        name: String!
        description: String
        created_at: DateTime
        columns: [BoardColumn!]
        posted_by: User!
    }
    
    input BoardColumnsInput {
        title: String!
        color: String!
    }

    input PostBoardInput {
        name: String!
        description: String
        columns: [BoardColumnsInput!]
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
