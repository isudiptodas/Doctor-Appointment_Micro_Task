import express from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const router = express.Router();

router.post('/api/user/start-detection', authenticate, async (req, res) => {

    const { name, age, gender } = req.body;

    const genAI = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    const startPrompt = process.env.GEMINI_DISEASE_START_PROMPT;
    const data = `Name : ${name}, Gender : ${gender}, Age : ${age}`;

    try {
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: ` DATA : ${data}`,
            config: {
                systemInstruction: startPrompt
            }
        });

        const cleaned = response.text
            .replace(/```json|```/g, "")
            .trim();

        const parsed = JSON.parse(cleaned);
        console.log(parsed);

        return res.status(200).json({
            success: true,
            message: `Response generated`,
            question: parsed
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});

router.post('/api/user/next-question', authenticate, async (req, res) => {

    const { name, age, gender, converted } = req.body;

    const genAI = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    const startPrompt = process.env.GEMINI_FOLLOW_UP_PROMPT;
    const data = `Name : ${name}, Gender : ${gender}, Age : ${age}, Questions with answers : ${converted}`;

    try {
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: ` DATA : ${data}`,
            config: {
                systemInstruction: startPrompt
            }
        });
 
        const cleaned = response.text
            .replace(/```json|```/g, "")
            .trim();

        const parsed = JSON.parse(cleaned);
        console.log(parsed);

        return res.status(200).json({
            success: true,
            message: `Response generated`,
            question: parsed
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
});

export default router;