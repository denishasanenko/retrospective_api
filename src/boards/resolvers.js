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
                user_id: "27164be0-0014-11ea-b98b-c1bba1509ff4",
                ...args.input
            });
            const item = await newBoard.save();
            console.log(item);
            return item;
        }
    },
    Board: {
        posted_by: async (parent) => {
            return await User.findOne({id: parent.user_id});
        }
    },
};

module.exports = resolvers;
