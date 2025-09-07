const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function uploadImage(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/upload/image`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Image upload failed");
    }

    const data = await response.json();

    // ✅ API se URL return karo
    return data.url as string;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}
