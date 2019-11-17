const {DefaultColumns, Board, BoardCard} = require('./models');
const User = require('../users/models');

const resolvers = {
    Query: {
        allBoards: async (parent, args, context) => {
            return await Board.find({user_id: context.user.id});
        },
        getBoard: async (parent, args) => {
            return await Board.findOne({id: args.id})
        }
    },
    Mutation: {
        postBoard: async (parent, args, context) => {
            const newBoard = new Board({
                user_id: context.user.id,
                ...args.input,
                columns: DefaultColumns
            });
            return await newBoard.save();
        },
        postCard: async (parent, args, context) => {
            const newCard = new BoardCard({
                user_id: context.user.id,
                ...args.input
            });
            return await newCard.save();
        }
    },
    Board: {
        posted_by: async (parent) => {
            return await User.findOne({id: parent.user_id});
        },
    },
    BoardColumn: {
        cards: async (parent, args, context, info) => {
            return await BoardCard.find({board_id: info.variableValues.id, column: parent.title}, null, {sort: {created_at: -1}});
        }
    }
};

module.exports = resolvers;
