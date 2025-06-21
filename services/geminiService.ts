
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Ensure API_KEY is handled as per instructions (must be from process.env)
const apiKey = process.env.API_KEY;

if (!apiKey) {
  console.error("API_KEY environment variable not set.");
  // This error will be caught by the calling function and displayed in the UI
}

const ai = new GoogleGenAI({ apiKey: apiKey || "MISSING_API_KEY" }); // Provide a fallback for initialization if key is missing
const modelName = 'gemini-2.5-flash-preview-04-17';

export const getMotivationalQuotes = async (name: string): Promise<string[]> => {
  if (!apiKey) {
    throw new Error("Kunci API (API_KEY) tidak ditemukan di environment variables. Aplikasi tidak dapat mengambil data.");
  }

  const prompt = `Berikan 3 kata-kata motivasi singkat dan inspiratif untuk ulang tahun ${name}. Tema: semangat, cinta, dan masa depan cerah. Kembalikan jawaban HANYA dalam format JSON array berisi string. Contoh: ["Motivasi 1", "Motivasi 2", "Motivasi 3"]`;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelName,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        temperature: 0.7, // Add some creativity
      },
    });

    let jsonStr = response.text.trim();
    
    // Remove Markdown code block fences if present
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
      jsonStr = match[1].trim();
    }

    try {
      const parsedData = JSON.parse(jsonStr);
      if (Array.isArray(parsedData) && parsedData.every(item => typeof item === 'string')) {
        return parsedData as string[];
      } else {
        console.error("Format JSON tidak sesuai, data yang diterima:", parsedData);
        throw new Error("Format respons tidak sesuai dengan yang diharapkan (array string).");
      }
    } catch (e) {
      console.error("Gagal memparsing JSON:", e, "String JSON mentah:", jsonStr);
      // Try to provide a fallback or more specific error
      if (jsonStr.toLowerCase().includes("error") || jsonStr.toLowerCase().includes("sorry")) {
         throw new Error(`Model AI mengembalikan pesan yang mengindikasikan masalah: "${jsonStr.substring(0,100)}..."`);
      }
      throw new Error(`Gagal memparsing respons JSON dari AI. Respons mentah: "${jsonStr.substring(0,100)}..."`);
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        // Check for specific Gemini API errors if possible, or re-throw
        if (error.message.includes("API key not valid")) {
             throw new Error("Kunci API tidak valid. Periksa kembali API_KEY Anda.");
        }
    }
    throw new Error(`Gagal mengambil kata-kata motivasi dari AI: ${error instanceof Error ? error.message : String(error)}`);
  }
};
