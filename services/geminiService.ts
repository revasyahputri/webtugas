
import { GoogleGenAI } from "@google/genai";

// Initialize the GoogleGenAI client with the API key from process.env
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getStyleAdvice = async (query: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a high-end fashion consultant for a store called "Choosebox". Your personality is chic, encouraging, and expert. All your advice should focus on styling pink outfits or finding the perfect pink item. User query: ${query}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 250,
      }
    });
    // Access response text property directly as per latest SDK guidelines
    return response.text || "I'm sorry, darling, I'm a bit overwhelmed with fashion week right now. Ask me again shortly!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The fashion spirits are quiet today. Try asking about a specific pink trend!";
  }
};
