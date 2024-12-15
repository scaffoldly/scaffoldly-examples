"use client";
import { RequestData, ResponseData } from "@/pages/api/upload";
import { Button } from "@nextui-org/react";
import { useRef, useState, ChangeEvent } from "react";

interface FileUploadComponentProps {
  onFileUpload?: (file: File) => void;
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({
  onFileUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [uploadStatus, setUploadStatus] = useState<string | undefined>(
    undefined
  );

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onFileUpload?.(file);

      const request: RequestData = { filename: file.name };

      const response = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const upload = (await response.json()) as Partial<ResponseData>;

      await fetch(upload.uploadUrl!, {
        method: "PUT",
        body: file,
      });

      setUploadStatus("File uploaded successfully");
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Button color="primary" onPress={handleButtonClick} size="lg">
        Select File
      </Button>
      {fileName && <p>Selected File: {fileName}</p>}
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default FileUploadComponent;
