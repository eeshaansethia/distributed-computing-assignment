const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true
    },
    projectDescription: {
        type: String,
        required: true
    },
    projectTechStack: {
        type: String,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    username: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Project', projectSchema, 'projects');