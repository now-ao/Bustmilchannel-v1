
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.error("API_KEY environment variable not set.");
}
const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const getAiResponse = async (prompt: string): Promise<string> => {
    if (!apiKey) {
        return "Erro: A chave da API do Gemini não foi configurada. Verifique as variáveis de ambiente.";
    }
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                systemInstruction: "Você é um assistente especialista em gestão de supermercados. Forneça respostas concisas, práticas e úteis para donos de supermercados. Fale em português do Brasil.",
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            return `Ocorreu um erro ao contatar a IA: ${error.message}`;
        }
        return "Ocorreu um erro desconhecido ao contatar a IA.";
    }
};
