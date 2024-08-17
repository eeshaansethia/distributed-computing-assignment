const express = require('express');
const router = express.Router();
const Project = require('../models/projects');
const validator = require('validator');
const sanitize = require('mongo-sanitize');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, async (req, res) => {
    await Project.find(
        { username: req.user.username }
    ).then((projects) => {
        return res.json({ status: 200, data: projects });
    }).catch((err) => {
        return res.json({ status: 400, message: err });
    });
});

router.post('/', verifyToken, async (req, res) => {
    const { projectName, projectDescription, projectTechStack, skills } = sanitize(req.body);

    if (!projectName || !projectDescription || !projectTechStack || !skills) {
        return res.json({ status: 400, message: "Missing required fields" });
    }

    if (skills.length == 0) {
        return res.json({ status: 400, message: "Skills must be provided" });
    }

    const project = new Project({
        projectName,
        projectDescription,
        projectTechStack,
        skills,
        username: req.user.username
    });

    await project.save().then(() => {
        return res.json({ status: 200, message: "Project added successfully" });
    }).catch((err) => {
        return res.json({ status: 400, message: err });
    });
});

router.get('/:id', verifyToken, async (req, res) => {
    const id = sanitize(req.params.id);
    await Project.findById(id).then((project) => {
        return res.json({ status: 200, data: project });
    }).catch((err) => {
        return res.json({ status: 400, message: err });
    });
});

router.put('/:id', verifyToken, async (req, res) => {
    const id = sanitize(req.params.id);
    const { projectName, projectDescription, projectTechStack, skills } = sanitize(req.body);
    if (!projectName || !projectDescription || !projectTechStack || !skills) {
        return res.json({ status: 400, message: "Missing required fields" });
    }

    if (skills.length == 0) {
        return res.json({ status: 400, message: "Skills must be provided" });
    }

    await Project.findByIdAndUpdate(id, {
        projectName,
        projectDescription,
        projectTechStack,
        skills
    }).then(() => {
        return res.json({ status: 200, message: "Project updated successfully" });
    }).catch((err) => {
        return res.json({ status: 400, message: err });
    });
});

router.delete('/:id', verifyToken, async (req, res) => {
    const id = sanitize(req.params.id);
    await Project.findByIdAndDelete(id).then(() => {
        return res.json({ status: 200, message: "Project deleted successfully" });
    }).catch((err) => {
        return res.json({ status: 400, message: err });
    });
});

router.get('/search/:query', verifyToken, async (req, res) => {
    const query = sanitize(req.params.query);
    await Project.find({ $or: [{ projectName: { $regex: query, $options: 'i' } }, { projectDescription: { $regex: query, $options: 'i' } }, { projectTechStack: { $regex: query, $options: 'i' } }, { skillName: { $regex: query, $options: 'i' } }, { skillDescription: { $regex: query, $options: 'i' } }] }).then((projects) => {
        return res.json({ status: 200, data: projects });
    }).catch((err) => {
        return res.json({ status: 400, message: err });
    });
});

module.exports = router;