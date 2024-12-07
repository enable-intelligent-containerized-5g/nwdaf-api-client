import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload/interface";
import React from "react";

interface FileUploadProps {
  onFileChange: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileChange }) => {
  const handleFileChange = (info: UploadChangeParam) => {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Upload
      beforeUpload={(file) => {
        onFileChange(file);
        return false; // Prevent automatic upload
      }}
      onChange={handleFileChange}
      accept=".csv"
    >
      <Button icon={<UploadOutlined />}>Upload CSV</Button>
    </Upload>
  );
};

export default FileUpload;
