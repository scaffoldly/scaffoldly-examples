import { BaseSchema, BaseTable } from "./base";

export type FileUploadEvent = {
  filename: string;
  uploadUrl?: string;
  downloadUrl?: string;
};

export type FileUpload = BaseSchema & Partial<FileUploadEvent>;

export class FileUploadTable extends BaseTable<FileUpload, "file", "upload"> {
  constructor() {
    super(
      process.env.AWS_DYNAMODB_TABLE_BLUEPRINTS_FULL__NAME!,
      "file",
      "upload"
    );
  }
}
