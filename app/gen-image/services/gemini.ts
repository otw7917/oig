import { GoogleGenAI, Modality } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Generates an image from a text prompt using Google's Gemini model.
 * @param prompt The text prompt for image generation.
 * @returns The base64 encoded image data.
 */
export async function generateImage(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured on the server.");
  }
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: prompt,
      config: { responseModalities: [Modality.TEXT, Modality.IMAGE] },
    });

    const imagePart = response.candidates?.[0]?.content?.parts?.find(
      (p) => p.inlineData
    );

    if (!imagePart?.inlineData?.data) {
      throw new Error(
        "Failed to extract image data from the generation response."
      );
    }
    return imagePart.inlineData.data;
  } catch (error) {
    console.error("Error during image generation:", error);
    throw new Error("Failed to generate image.");
  }
}
