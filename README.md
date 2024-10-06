# A React + Vite App Running On AWS Lambda

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/scaffoldly/scaffoldly-examples/scaffoldly.yml?branch=node-react-vite&link=https%3A%2F%2Fgithub.com%2Fscaffoldly%2Fscaffoldly-examples%2Factions)

This application was generated with the following command:

```bash
npm create vite@latest -- react-vite --template react-ts
```

✨ No modifications or SDKs were made or added to the code to "make it work" in AWS Lambda.

Check out our other [examples](https://github.com/scaffoldly/scaffoldly-examples) and Learn more at [scaffoldly.dev](https://scaffoldly.dev)!

### Working example

[https://qgb37tjq2vu4qlejnu2p7zzire0tqtsy.lambda-url.us-east-1.on.aws](https://qgb37tjq2vu4qlejnu2p7zzire0tqtsy.lambda-url.us-east-1.on.aws)

## First, Scaffoldly Config was added...

In the project's [`package.json`](package.json) file, the `scaffoldly` configuration was added:

- `serve` is installed via `npm`
- the `start` script uses `serve` to host the `dist` directory created by the `build` script
- since it's static HTML, only the `dist` and `public` directories are needed

```json
  "scaffoldly": {
    "runtime": "node:22-alpine",
    "handler": "localhost:3000",
    "packages": [
      "npm:serve"
    ],
    "services": [
      {
        "files": [
          "public",
          "dist"
        ],
        "scripts": {
          "install": "npm ci",
          "build": "npm run build",
          "start": "serve dist"
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
   🆔 App Identity: arn:aws:iam::123456789012:role/react-vite-82d0e693
   📄 Env Files: .env.main, .env
   📦 Image Size: 196.21 MB
   🌎 URL: https://qgb37tjq2vu4qlejnu2p7zzire0tqtsy.lambda-url.us-east-1.on.aws
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
