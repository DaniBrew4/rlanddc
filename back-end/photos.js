const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
    dest: '../front-end/public/images/',
    limits: {
        fileSize: 50000000
    }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const photoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    path: String,
    created: {
        type: Date,
        default: Date.now
    },
});

const Photo = mongoose.model('Photo', photoSchema);

router.post("/", validUser, upload.single('photo'), async (req, res) => {
    // check parameters
    if (!req.file)
        return res.status(400).send({
            message: "Must upload a file."
        });

    const photo = new Photo({
        user: req.user,
        path: "./images/" + req.file.filename,
    });
    try {
        await photo.save();
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get my photos
router.get("/", validUser, async (req, res) => {
    // return photos
    try {
        let photos = await Photo.find({
            user: req.user
        }).sort({
            created: -1
        }).populate('user');
        return res.send(photos);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

// get a users photos
router.get("/:id", async (req, res) => {
    // return photos
    try {
        let photos = await Photo.findOne({
            user: req.params.id
        });
        return res.send(photos);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});

module.exports = {
    model: Photo,
    routes: router,
}