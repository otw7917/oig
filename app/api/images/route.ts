import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { listImages, deleteImage, createSignedUrl, getImageMetadata } from "../../gen-image/services/storage";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const files = await listImages(supabase, user.id);

    if (!files || files.length === 0) {
        return NextResponse.json({ success: true, images: [] });
    }

    const signedUrls = await Promise.allSettled(
        files.map(file => createSignedUrl(supabase, `private/${user.id}/${file.name}`))
    );

    const metadataResults = await Promise.allSettled(
        files.map(file => getImageMetadata(supabase, `private/${user.id}/${file.name}`))
    );

    const images = files.map((file, index) => {
        const urlResult = signedUrls[index];
        const metadataResult = metadataResults[index];
        
        // Skip files that failed to get signed URL
        if (urlResult.status === 'rejected') {
            console.error(`Failed to get signed URL for ${file.name}:`, urlResult.reason);
            return null;
        }
        
        const metadata = metadataResult.status === 'fulfilled' 
            ? metadataResult.value 
            : { prompt: "", createdAt: "" };
        
        return {
            name: file.name,
            url: urlResult.value,
            prompt: metadata.prompt,
            createdAt: metadata.createdAt,
        };
    }).filter(Boolean); // Remove null entries

    return NextResponse.json({ success: true, images });
  } catch (error) {
    console.error("[images GET Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "An unknown error occurred.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
  
      if (!user) {
        return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
      }
  
      const { filePath } = await request.json();
      if (!filePath || typeof filePath !== 'string') {
        return NextResponse.json({ success: false, error: "A valid file path is required." }, { status: 400 });
      }

      // Security check: ensure the user is deleting a file in their own directory
      if (!filePath.startsWith(`private/${user.id}/`)) {
        return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
      }
  
      await deleteImage(supabase, filePath);
  
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("[images DELETE Error]", error);
      return NextResponse.json(
        {
          success: false,
          error: error instanceof Error ? error.message : "An unknown error occurred.",
        },
        { status: 500 }
      );
    }
  }
