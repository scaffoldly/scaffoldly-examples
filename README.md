# A Rust + Axum App Running On AWS Lambda

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/scaffoldly/scaffoldly-examples/scaffoldly.yml?branch=rust-axum&link=https%3A%2F%2Fgithub.com%2Fscaffoldly%2Fscaffoldly-examples%2Factions)

## Introduction

[Scaffoldly](https://github.com/scaffoldly/scaffoldly) allows you to run **any HTTP server** inside AWS Lambda. It requires **no code** changes to your existing server and a simple configuration in the project's `Cargo.toml`. Deployments can be done locally or in GitHub Actions (see below).

In this example, we're running a [axum](https://crates.io/crates/axum) server in AWS Lambda, and the [`scaffoldly`](https://scaffoldly.dev) toolchain handles packaging, deployment, and routing of AWS Lambda HTTP requests.

⭐️ Please [give `scaffoldly` a star](https://github.com/scaffoldly/scaffoldly) on GitHub! ⭐️

## Project Creation

This application was created by following the following instructions:

```bash
cargo init
cargo add axum tracing
cargo add tokio --features full
cargo add serde --features derive
cargo add tracing-subscriber --features env-filter
```

Then the [Usage Example](https://crates.io/crates/axum#usage-example) was added to [`src/main.rs`](src/main.rs).

✨ No other modifications or SDKs were made or added to the code to "make it work" in AWS Lambda.

Check out our other [examples](https://github.com/scaffoldly/scaffoldly-examples) and learn more at [scaffoldly.dev](https://scaffoldly.dev)!

### Working example

[https://yqbqbyyukepkhoony3vjtjhxva0ihedb.lambda-url.us-east-1.on.aws](https://yqbqbyyukepkhoony3vjtjhxva0ihedb.lambda-url.us-east-1.on.aws)

And to `curl` the `users` endpoint:

```
curl \
    --header "Content-Type: application/json" \
    --data '{"username": "Jane"}' \
    https://yqbqbyyukepkhoony3vjtjhxva0ihedb.lambda-url.us-east-1.on.aws/users
```

## First, Scaffoldly Config was added...

In the project's [`Cargo.toml`](Cargo.toml) file, the `scaffoldly` configuration was added:

- Only the `target` directory is included in files to be packaged for runtime
  - The `target` directory is lifted out of the `axum` stage and included in the base `alpine` container
- adding `gcc` and `musl-dev` to run `cargo build` on `alpine`
  - `gcc` and `musl-dev` are only added at **compile time**
  - _Tip_: use `npx scaffoldly show dockerfile` to show the build stages
- the `target/release/rust-axum` server is run when the Lambda Function starts

```toml
[package]
name = "rust-axum"
version = "0.1.0"

# ...snip...

[package.metadata.scaffoldly]
runtime = "alpine:3.20"
handler = "localhost:3000"

[[package.metadata.scaffoldly.services]]
name = "axum"
runtime = "rust:1-alpine3.20"
files = ["target"]
packages = ["gcc", "musl-dev"]
scripts = { build = "cargo build --release", start = "target/release/rust-axum" }
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
   🆔 App Identity: arn:aws:iam::123456789012:role/rust-axum-a2cd2713
   📄 Env Files: .env.main, .env
   📦 Image Size: 222.35 MB
   🌎 URL: https://yqbqbyyukepkhoony3vjtjhxva0ihedb.lambda-url.us-east-1.on.aws
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
