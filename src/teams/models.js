const mongoose = require('../db');
const { Schema } = require('mongoose');
const uuidv1 = require('uuid/v1');

const TeamScheme = new Schema(
    {
        id: String,
        name: String,
        users: [String]
    }
);
TeamScheme.pre('save', function (next) {
    if (!this.id) {
        this.id = uuidv1();
    }
    next();
});
const Team = mongoose.model('Team', TeamScheme);

module.exports = Team;
