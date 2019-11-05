const Board = require('./models');
const User = require('../users/models');

const resolvers = {
    Query: {
        totalBoards: async () => {
            return await Board.count();
        },
        allBoards: async () => {
            return await Board.find();
        }
    },
    Mutation: {
        postBoard: async (parent, args) => {
            const newBoard = new Board({
                user_id: "3e4cccc0-e2fb-11e9-a7aa-dd0f452832bc",
                ...args.input
            });
            return await newBoard.save();
        }
    },
    Board: {
        posted_by: async (parent) => {
            return await User.findOne({id: parent.user_id});
        }
    },
};

module.exports = resolvers;
