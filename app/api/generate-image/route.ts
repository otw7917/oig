import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Modality } from "@google/genai";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    if (!prompt) {
      return NextResponse.json(
        { error: "prompt가 비어 있습니다." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    // 3) 이미지 생성 호출
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-preview-image-generation",
      contents: prompt,
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });

    if (!response || !response.candidates || response.candidates.length === 0) {
      return NextResponse.json(
        { error: "이미지 생성에 실패했습니다." },
        { status: 500 }
      );
    }

    if (
      !response.candidates[0].content ||
      !response.candidates[0].content.parts
    ) {
      return NextResponse.json(
        { error: "이미지 생성에 실패했습니다. content가 비정상일수 있나?" },
        { status: 500 }
      );
    }

    const parts = response.candidates[0].content.parts;
    // 텍스트 파트는 무시하고, 이미지 파트 하나만 가정
    const imagePart = parts.find((p) => p.inlineData);
    if (!imagePart || !imagePart.inlineData) {
      return NextResponse.json(
        { error: "이미지 생성에 실패했습니다. imagePart에 데이터가 없음?" },
        { status: 500 }
      );
    }

    const base64Data: string = imagePart.inlineData.data!; // 여기에 데이터에 오류가 있을수 있는지 확인하기. 🚨
    return NextResponse.json(
      { imageBase64: base64Data },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err: any) {
    console.error("[generate-image Error]", err);
    return NextResponse.json(
      { error: err.message || "서버 에러" },
      { status: 500 }
    );
  }
}
