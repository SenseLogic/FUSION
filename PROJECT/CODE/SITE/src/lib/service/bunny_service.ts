// -- IMPORTS

import fs from "fs/promises";

// -- TYPES

class BunnyService {
  // -- CONSTRUCTORS

  baseUrl: string | undefined;
  storageName: string | undefined;
  apiKey: string | undefined;

  constructor() {
    this.baseUrl = process.env.FUSION_PROJECT_BUNNY_STORAGE_URL;
    this.storageName = process.env.FUSION_PROJECT_BUNNY_STORAGE_NAME;
    this.apiKey = process.env.FUSION_PROJECT_BUNNY_STORAGE_KEY;
  }

  // -- INQUIRIES

  getFileUrl(filePath: string): string {
    return (this.baseUrl ?? "") + "/" + (this.storageName ?? "") + "/" + filePath;
  }

  // ~~

  async uploadFile(localFile: Uint8Array, storageFilePath: string): Promise<unknown | null> {
    try {
      const response = await fetch(this.getFileUrl(storageFilePath), {
        method: "PUT",
        headers: {
          AccessKey: this.apiKey ?? "",
          "Content-Type": "application/octet-stream",
        },
        body: localFile,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file: " + response.statusText);
      }

      let data: unknown | null = null;

      try {
        const text = await response.text();
        if (text.length > 0) {
          data = JSON.parse(text) as unknown;
        }
      } catch {
        // ignore empty/non-json response
      }

      return data;
    } catch (error) {
      console.error("Error uploading file to Bunny CDN:", error);
      return null;
    }
  }

  // ~~

  async copyFile(localFile: string | Uint8Array, storageFilePath: string, storageFileIsOverwritten = false) {
    let fileData: Uint8Array;

    if (typeof localFile === "string") {
      fileData = await fs.readFile(localFile);
    } else {
      fileData = localFile;
    }

    return await this.uploadFile(fileData, storageFilePath);
  }

  // ~~

  async removeFile(storageFilePath: string): Promise<unknown | null> {
    try {
      const response = await fetch(this.getFileUrl(storageFilePath), {
        method: "DELETE",
        headers: { AccessKey: this.apiKey ?? "" },
      });

      if (!response.ok) {
        throw new Error("Failed to remove file: " + response.statusText);
      }

      let data: unknown | null = null;

      try {
        const text = await response.text();
        if (text.length > 0) {
          data = JSON.parse(text) as unknown;
        }
      } catch {
        // ignore
      }

      return data;
    } catch (error) {
      console.error("Error removing file from Bunny CDN:", error);
      return null;
    }
  }

  // ~~

  async downloadImageFile(storageFilePath: string, format: string | undefined = undefined, width: number | undefined = undefined, quality: number | undefined = undefined ): Promise<Uint8Array> {
    let fileUrl: string = this.getFileUrl(storageFilePath);
    let queryParameterPartArray: string[] = [];

    if (format !== undefined) {
      queryParameterPartArray.push("format=" + encodeURIComponent(format));
    }

    if (width !== undefined) {
      queryParameterPartArray.push("width=" + String(width));
    }

    if (quality !== undefined) {
      queryParameterPartArray.push("quality=" + String(quality));
    }

    if (queryParameterPartArray.length > 0) {
      fileUrl += "?" + queryParameterPartArray.join("&");
    }

    try {
      const response = await fetch(fileUrl, {
        headers: { AccessKey: this.apiKey ?? "" },
      });

      if (!response.ok) {
        throw new Error("Failed to download image file: " + response.statusText);
      }

      const arrayBuffer: ArrayBuffer = await response.arrayBuffer();

      return new Uint8Array(arrayBuffer);
    } catch (error) {
      console.error("Error downloading image file from Bunny CDN:", error);
      throw error;
    }
  }
}

// -- VARIABLES

export const bunnyService = new BunnyService();

