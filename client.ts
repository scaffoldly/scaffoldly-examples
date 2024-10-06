import { createPromiseClient } from "@connectrpc/connect";
import { ElizaService } from "./gen/eliza_connect";
import { createConnectTransport } from "@connectrpc/connect-node";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
  httpVersion: "1.1",
});

async function main() {
  const client = createPromiseClient(ElizaService, transport);
  const res = await client.say({ sentence: "I feel happy." });
  console.log(res);
}
void main();
