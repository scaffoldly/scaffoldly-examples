import { log } from "console";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  healthy?: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  log("Health Event", {
    headers: req.headers,
    query: req.query,
    body: req.body,
  });

  res.status(200).send({ healthy: true });
}
