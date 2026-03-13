"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import axios from "axios";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  description?: string;
}

export default function ImageUploader({
  value,
  onChange,
  onRemove,
  label = "Изображение",
  description,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setUploading(true);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        onChange(response.data.url);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
        alert("Не удалось загрузить файл");
        setPreview(value);
      } finally {
        setUploading(false);
        URL.revokeObjectURL(objectUrl);
      }
    },
    [onChange, value],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024,
    disabled: uploading,
  });

  const handleRemove = () => {
    setPreview(undefined);
    if (onRemove) onRemove();
    onChange("");
  };

  if (preview) {
    return (
      <div className="image-upload-preview">
        <div className="preview-container">
          <Image
            src={preview}
            alt="Preview"
            width={200}
            height={200}
            className="preview-image"
          />
          <div className="preview-actions">
            {onRemove && (
              <button
                type="button"
                onClick={handleRemove}
                className="remove-image-btn"
                disabled={uploading}
              >
                <X size={16} />
              </button>
            )}
            <div {...getRootProps()} className="change-image-btn">
              <input {...getInputProps()} />
              <Upload size={14} />
              <span>{uploading ? "Загрузка..." : "Изменить"}</span>
            </div>
          </div>
          {uploading && (
            <div className="uploading-overlay">
              <div className="spinner"></div>
              <span>Загрузка...</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      {...getRootProps()}
      className={`image-upload-area ${isDragActive ? "drag-active" : ""} ${uploading ? "uploading" : ""}`}
    >
      <input {...getInputProps()} />
      <Upload size={32} />
      <p>
        {uploading
          ? "Загрузка..."
          : isDragActive
            ? "Бросьте файл сюда"
            : `Нажмите или перетащите ${label}`}
      </p>
      {description && <span className="upload-hint">{description}</span>}
    </div>
  );
}
