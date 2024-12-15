import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { log } from "console";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.headers.host !== "s3.amazonaws.com") {
    return res.status(403).json({ error: "Forbidden" });
  }

  log("S3 Event", {
    headers: req.headers,
    query: req.query,
    body: req.body,
  });

  res.status(200).json({});
}

export const presign = async (
  action: "GET" | "PUT",
  key: string
): Promise<string> => {
  const s3 = new S3Client();

  if (action === "PUT") {
    return getSignedUrl(
      s3,
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BLUEPRINTS_FULL__NAME!,
        Key: key,
      })
    );
  }

  return getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: process.env.AWS_S3_BLUEPRINTS_FULL__NAME!,
      Key: key,
    })
  );
};
