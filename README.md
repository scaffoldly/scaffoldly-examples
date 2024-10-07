# A Rust + Hyper App Running On AWS Lambda

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/scaffoldly/scaffoldly-examples/scaffoldly.yml?branch=rust-hyper&link=https%3A%2F%2Fgithub.com%2Fscaffoldly%2Fscaffoldly-examples%2Factions)

## Introduction

[Scaffoldly](https://scaffoldly.dev) allows you to run **any HTTP server** on AWS Lambda. It requires **no code** changes to your existing server and a very basic configuration in the project's `Cargo.toml`. Deployments can be done locally or in GitHub Actions (see below).

In this example, we're running a [hyper](https://crates.io/crates/hyper) server in AWS Lambda, and the `scaffoldly` toolchain handles packaging, deployment, and AWS Lambda HTTP traffic.

## Project Creation

This application was created by following the following instructions:

1. Hyper's [Getting Started](https://hyper.rs/guides/1/server/hello-world/) guide.

✨ No modifications or SDKs were made or added to the code to "make it work" in AWS Lambda.

Check out our other [examples](https://github.com/scaffoldly/scaffoldly-examples) and Learn more at [scaffoldly.dev](https://scaffoldly.dev)!

### Working example

[https://x3nlq7rmjc675skupaksowqut40fflpc.lambda-url.us-east-1.on.aws](https://x3nlq7rmjc675skupaksowqut40fflpc.lambda-url.us-east-1.on.aws)

## First, Scaffoldly Config was added...

In the project's [`Cargo.toml`](Cargo.toml) file, the `scaffoldly` configuration was added:

- Only the `target` directory is included in files to be packaged for runtime
  - The `target` directory is lifted out of the `hyper` stage and included in the base `alpine` container
- `hyper` requires `gcc` and `musl-dev` to run `cargo build` on `alpine`
  - `gcc` and `musl-dev` are only added at **compile time**
    - use `npx scaffoldly show dockerfile` to show the build stages
- the `target/release/rust-hyper` server is run when the Lambda Function starts

```toml
[package]
name = "rust-hyper"
version = "0.1.0"

# ...snip...

[package.metadata.scaffoldly]
runtime = "alpine:3.20"
handler = "localhost:3000"

[[package.metadata.scaffoldly.services]]
name = "hyper"
runtime = "rust:1-alpine3.20"
files = ["target"]
packages = ["gcc", "musl-dev"]
scripts = { build = "cargo build --release", start = "target/release/rust-hyper" }
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
   🆔 App Identity: arn:aws:iam::123456789012:role/rust-hyper-47be7050
   📄 Env Files: .env.main, .env
   📦 Image Size: 148.6 MB
   🌎 URL: https://x3nlq7rmjc675skupaksowqut40fflpc.lambda-url.us-east-1.on.aws
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
