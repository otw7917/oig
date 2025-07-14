import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Modality } from "@google/genai";
import { createClient } from "@/utils/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { Buffer } from "buffer";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Generates an image from a text prompt using Google's Gemini model.
 * @param prompt The text prompt for image generation.
 * @returns The base64 encoded image data.
 */
async function generateImage(prompt: string): Promise<string> {
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

/**
 * Uploads a base64 encoded image to Supabase Storage.
 * @param supabase The Supabase client instance.
 * @param userId The ID of the user uploading the image.
 * @param imageDataB64 The base64 encoded image data.
 * @returns The file path of the uploaded image.
 */
async function uploadImage(
  supabase: SupabaseClient,
  userId: string,
  imageDataB64: string
): Promise<string> {
  const filePath = `private/${userId}/${Date.now()}.png`;
  const { error } = await supabase.storage
    .from("generated-images")
    .upload(filePath, Buffer.from(imageDataB64, "base64"), {
      contentType: "image/png",
    });

  if (error) {
    console.error("Supabase upload error:", error);
    throw new Error("Failed to upload image to storage.");
  }
  return filePath;
}

/**
 * Creates a signed URL for a file in Supabase Storage.
 * @param supabase The Supabase client instance.
 * @param filePath The path of the file in the storage bucket.
 * @returns The signed URL for private access.
 */
async function createSignedUrl(
  supabase: SupabaseClient,
  filePath: string
): Promise<string> {
  const { data, error } = await supabase.storage
    .from("generated-images")
    .createSignedUrl(filePath, 3600); // 1 hour expiry

  if (error || !data) {
    console.error("Signed URL creation error:", error);
    throw new Error("Failed to create a signed URL for the image.");
  }
  return data.signedUrl;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { prompt } = await request.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { success: false, error: "A valid text prompt is required." },
        { status: 400 }
      );
    }

    // Refactored pipeline
    const imageData = await generateImage(prompt);
    const filePath = await uploadImage(supabase, user.id, imageData);
    await new Promise((res) => setTimeout(res, 1000));
    const imageUrl = await createSignedUrl(supabase, filePath);

    return NextResponse.json({ success: true, imageUrl });
  } catch (error) {
    console.error("[generate-image POST Error]", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred.",
      },
      { status: 500 }
    );
  }
}
