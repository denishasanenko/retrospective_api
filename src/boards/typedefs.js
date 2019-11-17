const { gql } = require('apollo-server-express');

const typedefs = gql`
    type BoardCard {
        id: String!
        text: String!
    }
    
    type BoardColumn {
        title: String!
        color: String!
        cards: [BoardCard!]
    }
    
    type Board {
        id: ID!
        name: String!
        description: String
        created_at: DateTime
        columns: [BoardColumn!]
        posted_by: User!
    }

    input PostBoardInput {
        name: String!
        description: String
    }
    
    input PostBoardCardInput {
        text: String!
        column: String!
        board_id: String!
        parent: String
    }

    extend type Query {
        totalBoards: Int!
        allBoards: [Board!]!
        getBoard(id: String): Board!
    }
    extend type Mutation {
        postBoard(input: PostBoardInput!): Board!
        postCard(input: PostBoardCardInput!): BoardCard!
    }
`;

module.exports = typedefs;
