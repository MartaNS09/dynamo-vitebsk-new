import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Проверка типа файла
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 },
      );
    }

    // Проверка размера (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large (max 5MB)" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Создаем уникальное имя файла
    const timestamp = Date.now();
    const originalName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const filename = `${timestamp}-${originalName}`;

    // Путь для сохранения
    const uploadDir = path.join(process.cwd(), "public/uploads");

    // Создаем папку если её нет
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);
    await writeFile(filepath, buffer);

    // URL для доступа к файлу
    const url = `/uploads/${filename}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
