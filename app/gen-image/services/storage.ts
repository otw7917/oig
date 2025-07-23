import { SupabaseClient } from "@supabase/supabase-js";
import { Buffer } from "buffer";

const BUCKET_NAME = "generated-images";

/**
 * Uploads a base64 encoded image to Supabase Storage with metadata.
 * @param supabase The Supabase client instance.
 * @param userId The ID of the user uploading the image.
 * @param imageDataB64 The base64 encoded image data.
 * @param prompt The prompt used to generate the image.
 * @returns The file path of the uploaded image.
 */
export async function uploadImage(
  supabase: SupabaseClient,
  userId: string,
  imageDataB64: string,
  prompt?: string
): Promise<string> {
  const timestamp = Date.now();
  const filePath = `private/${userId}/${timestamp}.png`;
  
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, Buffer.from(imageDataB64, "base64"), {
      contentType: "image/png",
      metadata: {
        prompt: prompt || "",
        createdAt: new Date().toISOString(),
      }
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
export async function createSignedUrl(
  supabase: SupabaseClient,
  filePath: string
): Promise<string> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUrl(filePath, 3600); // 1 hour expiry

    if (error) {
      console.error("Signed URL creation error:", error);
      
      // Provide clear error messages based on error type
      if (error.message?.includes('not found') || error.message?.includes('does not exist')) {
        throw new Error(`Storage bucket '${BUCKET_NAME}' not found. Please contact administrator.`);
      }
      
      if (error.message?.includes('permission') || error.message?.includes('unauthorized')) {
        throw new Error(`Permission denied for file: ${filePath}`);
      }
      
      throw new Error(`Failed to create signed URL: ${error.message}`);
    }

    if (!data?.signedUrl) {
      throw new Error("No signed URL returned from Supabase");
    }

    return data.signedUrl;
  } catch (err) {
    console.error("Unexpected error in createSignedUrl:", err);
    throw err;
  }
}

/**
 * Lists all images for a specific user with their metadata.
 * @param supabase The Supabase client instance.
 * @param userId The ID of the user.
 * @returns A list of file objects with metadata.
 */
export async function listImages(supabase: SupabaseClient, userId: string) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(`private/${userId}`);

  if (error) {
    console.error("Supabase list error:", error);
    throw new Error("Failed to list images.");
  }
  return data;
}

/**
 * Gets metadata for a specific image file.
 * @param supabase The Supabase client instance.
 * @param filePath The path of the file.
 * @returns The metadata of the file.
 */
export async function getImageMetadata(supabase: SupabaseClient, filePath: string) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .info(filePath);

  if (error) {
    console.error("Supabase metadata error:", error);
    return { prompt: "", createdAt: "" };
  }
  
  return {
    prompt: data?.metadata?.prompt || "",
    createdAt: data?.metadata?.createdAt || "",
  };
}

/**
 * Deletes an image from Supabase Storage.
 * @param supabase The Supabase client instance.
 * @param filePath The path of the file to delete.
 */
export async function deleteImage(supabase: SupabaseClient, filePath: string) {
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath]);

  if (error) {
    console.error("Supabase delete error:", error);
    throw new Error("Failed to delete image.");
  }
}
