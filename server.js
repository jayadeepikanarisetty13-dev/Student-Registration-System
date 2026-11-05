require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Student = require("./models/student");

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

// Connect MongoDB & Handle Server for Vercel & Local
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected");

        // Only listen on port 3000 if running locally (not on Vercel)
        if (process.env.NODE_ENV !== 'production') {
            const PORT = process.env.PORT || 3000;
            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        }
    })
    .catch(err => console.log(err));

// Export app for Vercel serverless deployment
module.exports = app;