import { createGoogleGenerativeAI } from "@ai-sdk/google"

const geminiModel = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GEMINI_API,
})

export default geminiModel;