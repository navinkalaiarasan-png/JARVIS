const express = require("express");
const cors = require("cors");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Serve JARVIS frontend
app.use(express.static(__dirname));

// Gemini AI
const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
   model: "gemini-3.5-flash-lite"
});


// Open JARVIS
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


// AI CHAT
app.post("/api/chat", async (req, res) => {

    try {

        const message = req.body.message;

        if (!message) {
            return res.status(400).json({
                error: "Message is required"
            });
        }

        const result = await model.generateContent(message);

        const answer =
            result.response.text();

        res.json({
            reply: answer
        });

    } catch (error) {

        console.error("GEMINI ERROR:", error);

        res.status(500).json({
            error: "Gemini AI connection failed"
        });
    }
});


// START SERVER
app.listen(PORT, () => {

    console.log(
        `JARVIS Backend running at http://localhost:${PORT}`
    );

});