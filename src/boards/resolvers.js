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
        removeBoard: async (parent, args, context) => {
            const board = await Board.findOne({id: args.id});
            if (!board || board.user_id !== context.user.id) {
                throw new Error('Not enough permissions');
            }
            await Board.deleteOne({id: args.id});
            return 1;
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
    },
    BoardCard: {
        posted_by: async (parent) => {
            return await User.findOne({id: parent.user_id});
        },
    },
};

module.exports = resolvers;
