const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    skillName: {
        type: String,
        required: true
    },
    skillDescription: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Skill', skillSchema, 'skills');