const {DefaultColumns, Board} = require('./models');
const User = require('../users/models');

const resolvers = {
    Query: {
        totalBoards: async () => {
            return await Board.count();
        },
        allBoards: async () => {
            return await Board.find();
        },
        getBoard: async (parent) => {
            console.log(parent);
            return await Board.findOne({id: '7f6369c0-001b-11ea-8a12-0b0d9f209cec'})
        }
    },
    Mutation: {
        postBoard: async (parent, args) => {
            const newBoard = new Board({
                user_id: "27164be0-0014-11ea-b98b-c1bba1509ff4",
                ...args.input,
                columns: DefaultColumns
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
