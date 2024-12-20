# Scaffoldly Examples

This repository contains example usage of the [`scaffoldly`](https://scaffoldly.dev) toolchain.

## Introduction

[Scaffoldly](https://github.com/scaffoldly/scaffoldly) allows you to run **any HTTP server** inside AWS Lambda. It requires **no code** changes to your application and a [simple configuration](https://scaffoldly.dev/docs/config/) in the project's configuration file. Deployments can be done [Locally](https://scaffoldly.dev/docs/cli/#scaffoldly-deploy) or in [GitHub Actions](https://scaffoldly.dev/docs/gha/).

See the various examples below for running various frameworks in AWS Lambda using [Scaffoldly](https://scaffoldly.dev).

⭐️ Please [give `scaffoldly` a star](https://github.com/scaffoldly/scaffoldly) on GitHub! ⭐️

## Getting Started

All of the [Frameworks](#frameworks) below below can be created with the [`create-scaffoldly-app`](https://www.npmjs.com/package/create-scaffoldly-app) utility.

_Note_: Having `npx`, `npm`, or `yarn` installed is necesssary.

```bash
npx scaffoldly create app
# or
npm create scaffoldly-app
# or
yarn create scaffoldly-app
```

Alternatively, browse the various [Frameworks](#frameworks) below and add `scaffoldly` to an existing project manually. See the [docs](https://scaffoldly.dev/docs) for more information.

## Frameworks

We've created a handful of examples to show how Scaffoldly can be used.

<!-- TODO: Generate this table based on frameworks.yaml !-->

<!-- Alphbetically Ordered!!! -->
<!-- ALSO UPDATE ./index.yml for "create-scaffoldly-app" !!! -->

| Language | Framework                   | Example Projects                                                                                          |
| :------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------- |
| .NET     | C#                          | [`dotnet-csharp`](https://github.com/scaffoldly/scaffoldly-examples/tree/dotnet-csharp)                   |
| Go       | ConnectRPC                  | [`go-connect`](https://github.com/scaffoldly/scaffoldly-examples/tree/go-connect)                         |
| Go       | HTTP                        | [`go-http`](https://github.com/scaffoldly/scaffoldly-examples/tree/go-http)                               |
| Node     | ConnectRPC (with `fastify`) | [`node-connect`](https://github.com/scaffoldly/scaffoldly-examples/tree/node-connect)                     |
| Node     | ExpressJS                   | [`node-express`](https://github.com/scaffoldly/scaffoldly-examples/tree/node-express)                     |
| Node     | Next.js                     | [`node-nextjs`](https://github.com/scaffoldly/scaffoldly-examples/tree/node-nextjs)                       |
| Node     | Next.js (`export` mode)     | [`node-nextjs-export`](https://github.com/scaffoldly/scaffoldly-examples/tree/node-nextjs-export)         |
| Node     | Next.js (`standalone` mode) | [`node-nextjs-standalone`](https://github.com/scaffoldly/scaffoldly-examples/tree/node-nextjs-standalone) |
| Node     | React (with `vite`)         | [`node-react-vite`](https://github.com/scaffoldly/scaffoldly-examples/tree/node-react-vite)               |
| Python   | Flask                       | [`python-flask`](https://github.com/scaffoldly/scaffoldly-examples/tree/python-flask)                     |
| Python   | Flask (with `poetry`)       | [`python-flask-poetry`](https://github.com/scaffoldly/scaffoldly-examples/tree/python-flask-poetry)       |
| Python   | Huggingface (with `flask`)  | [`python-huggingface`](https://github.com/scaffoldly/scaffoldly-examples/tree/python-huggingface)         |
| Rust     | Axum                        | [`rust-axum`](https://github.com/scaffoldly/scaffoldly-examples/tree/rust-axum)                           |
| Rust     | Hyper                       | [`rust-hyper`](https://github.com/scaffoldly/scaffoldly-examples/tree/rust-hyper)                         |

<!-- Alphbetically Ordered!!! -->
<!-- ALSO UPDATE ./index.yml for "create-scaffoldly-app" !!! -->

## Questions, Feedback, and Help

- Join our [Discussions](https://github.com/scaffoldly/scaffoldly/discussions) on GitHub.
- Join our [Community](https://scaffoldly.dev/community) on Discord.

## License

The code in this repository and its branches are licensed under the [Apache-2.0](LICENSE.md) license.

The [`scaffoldly`](https://github.com/scaffoldly/scaffoldly) toolchain is licensed under the [FSL-1.1-Apache-2.0](https://github.com/scaffoldly/scaffoldly?tab=License-1-ov-file) license.

Copyright 2024 Scaffoldly LLC
