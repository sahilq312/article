import { genAI } from "@/lib/gemini";
import { NextResponse, NextRequest } from "next/server";
import { SYSTEM_INSTRUCTIONS } from "@/lib/system-instruction";

export async function POST(req: NextRequest) {
    try {
        const { article } = await req.json();

        if (!article) {
            return NextResponse.json({ error: "Fill the form properly and retry" }, { status: 400 });
        }

        const prompt = `${SYSTEM_INSTRUCTIONS.RESUME_AI.ImproveResume}\n\n${JSON.stringify({ article })}`;

        const model = await genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "application/json",
        };

        const chatSession = model.startChat({
            generationConfig,
            history: [], 
        });

        const result = await chatSession.sendMessage(prompt);

        let responseData;
        try {
            responseData = await result.response.text(); 
        } catch {
            responseData = await result.response.text(); 
        }

        return NextResponse.json({ success: responseData }, { status: 200 });

    } catch (error) {
        console.error("Gemini API Error:", error);
        return NextResponse.json({ error: "Error getting the response" }, { status: 500 });
    }
};