const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();

const users = require("./users.js");
const validUser = users.valid;

const classSchema = new mongoose.Schema({
    className: '',
    teacher: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    students: [],
    created: {
        type: Date,
        default: Date.now
    },
});

const Class = mongoose.model('Class', classSchema);

router.post("/", validUser, async (req, res) => {
    // check parameters
    /*if (!req.body.teacher || !req.body.students || !req.body.className)
        return res.status(400).send({
            message: "Must add a teacher, classname and list of students."
        });*/

    const class1 = new Class({
        className: req.body.className,
        teacher: req.body.teacher,
        students: req.body.students,
    });
    try {
        await class1.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get all classes
router.get('/all', validUser, async (req, res) => {
    try {
        //  lookup class record
        const classes = await Class.find();
        // Return an error if class does not exist.
        if (!classes) {
            return res.status(403).send({
                message: "no classes"
            });
        }
        return res.send({
            classes: classes
        });
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// delete a class
router.delete('/:id', validUser,async (req, res) => {
    // Make sure that the form coming from the browser includes a class, otherwise return an error.
    try {
        await Class.deleteOne({
            _id: req.params.id
        });
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

module.exports = {
    model: Class,
    routes: router,
}

