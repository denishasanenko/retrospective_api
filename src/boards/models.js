const mongoose = require('../db');
const { Schema } = require('mongoose');
const uuidv1 = require('uuid/v1');

const DefaultColumns = [
    {title: "Liked", color:"#F0FFF0"},
    {title: "Learned", color:"#0FF000"},
    {title: "Lacked", color:"#FF0000"},
    {title: "Actions", color:"#000FF0"},
];

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

module.exports = { Board, DefaultColumns };
