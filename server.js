require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Student = require("./models/Student");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// GET API
app.get("/api/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// POST API
app.post("/api/students", async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
});

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(3000, () => {
            console.log("Server running on port 3000");
        });
    })
    .catch(err => console.log(err));