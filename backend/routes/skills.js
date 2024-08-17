const express = require('express');
const router = express.Router();
const Skill = require('../models/skills');
const validator = require('validator');
const projects = require('../models/projects');
const sanitize = require('mongo-sanitize');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, async (req, res) => {
    const username = req.user.username;
    await Skill.find(
        { username }
    ).then((skills) => {
        return res.json({ status: 200, data: skills });
    }).catch((err) => {
        return res.json({ status: 400, message: err });
    });
});

router.post('/', verifyToken, async (req, res) => {
    const { skillName, skillDescription } = req.body;
    if (!skillName || !skillDescription) {
        return res.json({ status: 400, message: "Missing required fields" });
    }

    if (!validator.isEmpty(skillName) && !validator.isLength(skillName, { min: 3, max: 50 })) {
        return res.json({ status: 400, message: "Skill name must be between 3 and 50 characters" });
    }

    if (!validator.isEmpty(skillDescription) && !validator.isLength(skillDescription, { min: 10, max: 500 })) {
        return res.json({ status: 400, message: "Skill description must be between 10 and 500 characters" });
    }

    const skill = new Skill({
        skillName,
        skillDescription,
        username: req.user.username
    });

    await skill.save().then(() => {
        return res.json({ status: 200, message: "Skill added successfully" });
    }).catch((err) => {
        return res.json({ status: 400, message: err });
    });
});

router.get('/:skillName', verifyToken, async (req, res) => {
    const skillName = sanitize(req.params.skillName);
    await projects.find({
        skills: { $in: [skillName] },
        username: req.user.username
    }).then((projects) => {
        return res.json({ status: 200, data: projects });
    }).catch((err) => {
        return res.json({ status: 400, message: err });
    });
});

router.put('/:id', verifyToken, async (req, res) => {
    const id = sanitize(req.params.id);
    const { skillName, skillDescription } = req.body;
    if (!skillName || !skillDescription) {
        return res.json({ status: 400, message: "Missing required fields" });
    }

    if (!validator.isEmpty(skillName) && !validator.isLength(skillName, { min: 3, max: 50 })) {
        return res.json({ status: 400, message: "Skill name must be between 3 and 50 characters" });
    }

    if (!validator.isEmpty(skillDescription) && !validator.isLength(skillDescription, { min: 10, max: 500 })) {
        return res.json({ status: 400, message: "Skill description must be between 10 and 500 characters" });
    }

    await Skill.findByIdAndUpdate(id, { skillName, skillDescription }).then(() => {
        return res.json({ status: 200, message: "Skill updated successfully" });
    }).catch((err) => {
        return res.json({ status: 400, message: err });
    });
});

router.delete('/:id', verifyToken, async (req, res) => {
    const id = sanitize(req.params.id);
    await Skill.findByIdAndDelete(id).then(() => {
        return res.json({ status: 200, message: "Skill deleted successfully" });
    }).catch((err) => {
        return res.json({ status: 400, message: err });
    });
});

module.exports = router;