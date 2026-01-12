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
      const errorText = await response.text();
      console.error("Upload failed:", response.status, errorText);
      throw new Error(`Image upload failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Upload response:", data);

    // Handle different response structures
    const imageUrl = data.url || data.data?.url || data.imageUrl || data.data?.imageUrl;
    
    if (!imageUrl) {
      console.error("No URL in response:", data);
      throw new Error("Image upload succeeded but no URL returned");
    }

    return imageUrl as string;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}
