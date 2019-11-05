const mongoose = require('../db');
const { Schema } = require('mongoose');
const uuidv1 = require('uuid/v1');

const BoardScheme = new Schema(
    {
        id: String,
        user_id: String,
        name: String,
        description: String,
        columns: [{ title: String, color: String }]
    }
);
BoardScheme.pre('save', function (next) {
    if (!this.id) {
        this.id = uuidv1();
    }
    next();
});
const Board = mongoose.model('Board', BoardScheme);

module.exports = Board;
