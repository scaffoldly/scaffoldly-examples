# Scaffoldly Examples

This repository contains example usage of the [`scaffoldly`](https://scaffoldly.dev) toolchain.

## Introduction

[Scaffoldly](https://github.com/scaffoldly/scaffoldly) allows you to run **any HTTP server** inside AWS Lambda. It requires **no code** changes to your application and a [simple configuration](https://scaffoldly.dev/docs/config/) in the project's configuration file. Deployments can be done [Locally](https://scaffoldly.dev/docs/cli/#scaffoldly-deploy) or in [GitHub Actions](https://scaffoldly.dev/docs/gha/).

See the various examples below for running various frameworks in AWS Lambda using [Scaffoldly](https://scaffoldly.dev).

⭐️ Please [give `scaffoldly` a star](https://github.com/scaffoldly/scaffoldly) on GitHub! ⭐️

<!--
## Getting Started

> :warning: **UPDATE 2024-10-06**: **`create-scaffoldly-app`**: will be ready in a few days!

All of the [Frameworks](#frameworks) below below can be duplicated with the [`create-scaffoldly-app`](https://www.npmjs.com/package/create-scaffoldly-app) utility.

_Note_: Having `npm` or `yarn` installed is necesssary.

```bash
npm create scaffoldly-app
# or
yarn create scaffoldly-app
```

Alternatively, browse the various [Frameworks](#frameworks) below and add `scaffoldly` to an existing project manually. See the [docs](https://scaffoldly.dev/docs) for more information.
-->

## Frameworks

We've created a handful of examples to show how Scaffoldly can be used.

<!-- Alphbetically Ordered Please!!! -->

| Language | Framework                   | Example Projects                                                                                          | Public URL                                                                                           | Image Size |
| :------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- | ---------- |
| .NET     | C#                          | [`dotnet-csharp`](https://github.com/scaffoldly/scaffoldly-examples/tree/dotnet-csharp)                   | [Function URL](https://wmnaydmf2zp5s7rw4htcw5rcku0cwkfq.lambda-url.us-east-1.on.aws/weatherforecast) | ~1000 MB   |
| Go       | ConnectRPC                  | [`go-connect`](https://github.com/scaffoldly/scaffoldly-examples/tree/go-connect)                         | [Function URL](https://6m7hwen7ailmu4jkcfe5b23tii0nfnhf.lambda-url.us-east-1.on.aws)                 | ~100 MB    |
| Node     | ConnectRPC (with `fastify`) | [`node-connect`](https://github.com/scaffoldly/scaffoldly-examples/tree/node-connect)                     | [Function URL](https://adm2n2urfuewyca33xlh3bmlzy0gqsdh.lambda-url.us-east-1.on.aws)                 | ~130 MB    |
| Node     | ExpressJS                   | [`node-express`](https://github.com/scaffoldly/scaffoldly-examples/tree/node-express)                     | [Function URL](https://pbydasw2o3quxi7fu3dyiqomne0noypf.lambda-url.us-east-1.on.aws)                 | ~130 MB    |
| Node     | Next.js                     | [`node-nextjs`](https://github.com/scaffoldly/scaffoldly-examples/tree/node-nextjs)                       | [Function URL](https://inne3tcyuarfqwqz633ojyg2qe0ldglc.lambda-url.us-east-1.on.aws)                 | ~650 MB    |
| Node     | Next.js (`export` mode)     | [`node-nextjs-export`](https://github.com/scaffoldly/scaffoldly-examples/tree/node-nextjs-export)         | [Function URL](https://jtzom2obx3owx4gn4vluichvze0frzcn.lambda-url.us-east-1.on.aws)                 | ~200 MB    |
| Node     | Next.js (`standalone` mode) | [`node-nextjs-standalone`](https://github.com/scaffoldly/scaffoldly-examples/tree/node-nextjs-standalone) | [Function URL](https://uyf6bj4oqifqnfwivhdsy25giu0eaauf.lambda-url.us-east-1.on.aws)                 | ~250 MB    |
| Node     | React (with `vite`)         | [`node-react-vite`](https://github.com/scaffoldly/scaffoldly-examples/tree/node-react-vite)               | [Function URL](https://qgb37tjq2vu4qlejnu2p7zzire0tqtsy.lambda-url.us-east-1.on.aws)                 | ~200 MB    |
| Rust     | Hyper                       | [`rust-hyper`](https://github.com/scaffoldly/scaffoldly-examples/tree/rust-hyper)                         | [Function URL](https://x3nlq7rmjc675skupaksowqut40fflpc.lambda-url.us-east-1.on.aws)                 | ~150 MB    |

## Questions, Feedback, and Help

- Join our [Discussions](https://github.com/scaffoldly/scaffoldly/discussions) on GitHub.
- Join our [Community](https://scaffoldly.dev/community) on Discord.

## License

The code in this repository and its branches are licensed under the [Apache-2.0](LICENSE.md) license.

The [`scaffoldly`](https://github.com/scaffoldly/scaffoldly) toolchain is licensed under the [FSL-1.1-Apache-2.0](https://github.com/scaffoldly/scaffoldly?tab=License-1-ov-file) license.

Copyright 2024 Scaffoldly LLC
