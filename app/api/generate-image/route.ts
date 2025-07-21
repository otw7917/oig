import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { generateImage } from "../../gen-image/services/gemini";
import {
  uploadImage,
  createSignedUrl,
} from "../../gen-image/services/storage";

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
    const filePath = await uploadImage(supabase, user.id, imageData, prompt);
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
