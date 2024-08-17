const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const projectsRouter = require('./routes/projects');
const skillsRouter = require('./routes/skills');
const authRouter = require('./routes/auth');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const uri = 'mongodb://database:27017/newDistributedComputing';
// const uri = 'mongodb://localhost:27017/newDistributedComputing';

mongoose.connect(uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((err) => {
        console.log(err);
    });

app.get('/', (req, res) => {
    res.json({ message: "Distributed Computing Assignment" });
});

app.use('/projects', projectsRouter);
app.use('/skills', skillsRouter);
app.use('/auth', authRouter);

app.listen(3000);