import { log } from "console";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.headers.host !== "dynamodb.amazonaws.com") {
    return res.status(403).json({ error: "Forbidden" });
  }

  log("DynamoDB Event", {
    headers: req.headers,
    query: req.query,
    body: req.body,
  });

  res.status(200).send({});
}
