# A Connect (ConnectRPC) App Running On AWS Lambda

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/scaffoldly/scaffoldly-examples/scaffoldly.yml?branch=node-connect&link=https%3A%2F%2Fgithub.com%2Fscaffoldly%2Fscaffoldly-examples%2Factions)

This application was created by following the following instructions:

1. Connect's [Getting Started](https://connectrpc.com/docs/node/getting-started) guide.
   - _Skipped_: The steps to make a SSL certificate, since AWS Lambda Function URLs operate over TLS by default.

✨ No modifications or SDKs were made or added to the code to "make it work" in AWS Lambda.

Check out our other [examples](https://github.com/scaffoldly/scaffoldly-examples) and Learn more at [scaffoldly.dev](https://scaffoldly.dev)!

### Working example

[https://adm2n2urfuewyca33xlh3bmlzy0gqsdh.lambda-url.us-east-1.on.aws](https://adm2n2urfuewyca33xlh3bmlzy0gqsdh.lambda-url.us-east-1.on.aws)

And to `curl` using ConnectRPC:

```
curl \
  --header 'Content-Type: application/json' \
  --data '{"sentence": "I feel happy."}' \
   https://adm2n2urfuewyca33xlh3bmlzy0gqsdh.lambda-url.us-east-1.on.aws/connectrpc.eliza.v1.ElizaService/Say
```

## First, Scaffoldly Config was added...

In the project's [`package.json`](package.json) file, the `scaffoldly` configuration was added:

- `files` includes a handful of files to run `tsx server.ts`
- The `proto` and `buf*.yaml` files can be excluded since those are generated during the development process

```json
  "scaffoldly": {
    "runtime": "node:22-alpine",
    "handler": "localhost:8080",
    "services": [
      {
        "name": "connect",
        "files": [
          "gen",
          "node_modules",
          "client.ts",
          "connect.ts",
          "package-lock.json",
          "package.json",
          "server.ts",
          "tsconfig.json"
        ],
        "scripts": {
          "install": "npm install",
          "start": "tsx server.ts"
        }
      }
    ]
  }
```

See the [Scaffoldly Docs](https://scaffoldly.dev/docs/config/) for additional configuration directives.

## Then, deployed to AWS Lambda

```bash
npx scaffoldly deploy
```

See the [Scaffoldly Docs](https://scaffoldly.dev/docs/cli/#scaffoldly-deploy) for details on the `scaffoldly deploy` command.

### After deploy the app is available on a public URL

```bash
🚀 Deployment Complete!
   🆔 App Identity: arn:aws:iam::123456789012:role/connect-dae64702
   📄 Env Files: .env.main, .env
   📦 Image Size: 371.5 MB
   🌎 URL: https://adm2n2urfuewyca33xlh3bmlzy0gqsdh.lambda-url.us-east-1.on.aws
```

## GitHub Action added for CI/CD

A [`scaffoldly.yml`](.github/workflows/scaffoldly.yml) was added to `.github/workflows` so that a push will trigger a deploy

```
name: Scaffoldly Deploy

# ... snip ...

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Deploy
        uses: scaffoldly/scaffoldly@v1
        with:
          secrets: ${{ toJSON(secrets) }}
```

See the [Scaffoldly Docs](https://scaffoldly.dev/docs/gha/) for additional GitHub Actions directives.

## Questions, Feedback, and Help

Join our [Discussions](https://github.com/scaffoldly/scaffoldly/discussions) on GitHub.
Join our [Community](https://scaffoldly.dev/community) on Discord.

## License

This code is licensed under the [Apache-2.0](LICENSE.md) license.

The [`scaffoldly`](https://github.com/scaffoldly/scaffoldly) toolchain is licensed under the [FSL-1.1-Apache-2.0](https://github.com/scaffoldly/scaffoldly?tab=License-1-ov-file) license.

Copyright 2024 Scaffoldly LLC
