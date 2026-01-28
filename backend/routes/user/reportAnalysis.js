import express from 'express';
import { authenticate } from '../../middleware/authenticate.js';
import multer from 'multer';
import { GoogleGenAI, ThinkingLevel } from "@google/genai";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
 
router.post(`/api/user/analyze-report`, authenticate, upload.single("file"), async (req, res) => {

    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded"
        })
    }

    const genAI = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY
    });

    const pdfBuffer = req.file.buffer;
    const prompt = `summarize this file`;

    try {

        const response = await genAI.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [
                {
                    "role": "user",
                    parts: [
                        {
                            inlineData: {
                                mimeType: "application/pdf",
                                data: pdfBuffer.toString("base64"),
                            },
                        },
                        { text: prompt },
                    ]
                },
            ],
            config: {
                thinkingConfig: {
                    thinkingLevel: ThinkingLevel.MEDIUM,
                },
                systemInstruction: `${process.env.GEMINI_SYSTEM_INSTRUCTION}`
            }
        })

        const text = response.text;

        res.status(200).json({
            success: true,
            message: `Successfull`,
            text,
        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Something went wrong`
        });
    }
});

export default router;