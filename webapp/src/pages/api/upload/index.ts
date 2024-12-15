import { NextApiRequest, NextApiResponse } from "next";
import { log } from "console";
import { FileUpload, FileUploadEvent, FileUploadTable } from "@/db/file-upload";
import { ulid } from "ulid";
import { presign } from "../s3";
import { preventOverwrite } from "@/db/base";

export type RequestData = {
  filename?: string;
};

export type ResponseData = {
  error?: string;
} & Partial<FileUploadEvent>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  log("Upload Event", {
    headers: req.headers,
    query: req.query,
    body: req.body,
  });

  const body = req.body as Partial<RequestData>;
  const { filename } = body;

  const fileUpload = new FileUploadTable();
  const id = ulid();

  const item: FileUpload = {
    pk: fileUpload.pk("file"),
    sk: fileUpload.sk(`upload-${id}`),
    filename: filename!,
    uploadUrl: await presign("PUT", `${id}-${filename}`),
  };

  await fileUpload.put(item).exec(preventOverwrite());
  return res.status(200).json(item);
}
