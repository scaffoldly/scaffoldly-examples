# A Golang Connect (ConnectRPC) App Running On AWS Lambda

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/scaffoldly/scaffoldly-examples/scaffoldly.yml?branch=go-connect&link=https%3A%2F%2Fgithub.com%2Fscaffoldly%2Fscaffoldly-examples%2Factions)

This application was created by following the following instructions:

1. Connect's [Getting Started](https://connectrpc.com/docs/go/getting-started) guide.
   - _Note_: Used a `module` name of `go-connect` instead of `example`
   - _Skipped_: The steps to make a SSL certificate, since AWS Lambda Function URLs operate over TLS by default.

✨ No modifications or SDKs were made or added to the code to "make it work" in AWS Lambda.

Check out our other [examples](https://github.com/scaffoldly/scaffoldly-examples) and Learn more at [scaffoldly.dev](https://scaffoldly.dev)!

### Working example

[https://6m7hwen7ailmu4jkcfe5b23tii0nfnhf.lambda-url.us-east-1.on.aws](https://6m7hwen7ailmu4jkcfe5b23tii0nfnhf.lambda-url.us-east-1.on.aws)

And to `curl` using ConnectRPC:

```
curl \
    --header "Content-Type: application/json" \
    --data '{"name": "Jane"}' \
    https://6m7hwen7ailmu4jkcfe5b23tii0nfnhf.lambda-url.us-east-1.on.aws/greet.v1.GreetService/Greet
```

## First, Scaffoldly Config was added...

A [`scaffoldly.json`](scaffoldly.json) configuration contains the configuration:

- `connect` is built in an intermediate container using the `golang:1.22-alpine3.20` runtime
- `bin` is the only output from the `build` command
- `server` is copied from `bin/server` to the root
- The `server` is started by simply invoking the `server` compiled binary

```json
{
  "runtime": "alpine:3.20",
  "handler": "localhost:8080",
  "bin": {
    "server": "connect:bin/server"
  },
  "services": [
    {
      "name": "connect",
      "runtime": "golang:1.22-alpine3.20",
      "files": ["bin"],
      "scripts": {
        "build": "go build -o bin/ ./cmd/server ./cmd/client",
        "start": "server"
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
   🆔 App Identity: arn:aws:iam::123456789012:role/go-connect-3d6f6f21
   📄 Env Files: .env.main, .env
   📦 Image Size: 101.42 MB
   🌎 URL: https://6m7hwen7ailmu4jkcfe5b23tii0nfnhf.lambda-url.us-east-1.on.aws
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
