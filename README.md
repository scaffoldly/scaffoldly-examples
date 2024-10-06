# A Next.js App Running On AWS Lambda

This application was generated with the following command:

```bash
npx create-next-app@latest node-nextjs
```

✨ No modifications or SDKs were made or added to the code to "make it work" in AWS Lambda.

Learn more at [scaffoldly.dev](https://scaffoldly.dev)!

### Working example

[https://inne3tcyuarfqwqz633ojyg2qe0ldglc.lambda-url.us-east-1.on.aws](https://inne3tcyuarfqwqz633ojyg2qe0ldglc.lambda-url.us-east-1.on.aws)

## First, Scaffoldly Config was added...

In the project's [`package.json`](package.json) file, the `scaffoldly` configuration was added:

```jsonc
{
  "name": "node-nextjs",
  "version": "0.1.0",
  // ... snip ...
  "scaffoldly": {
    "runtime": "node:22-alpine",
    "handler": "localhost:3000",
    "services": [
      {
        "name": "next",
        "files": ["package.json", ".next", "node_modules", "package-lock.json"],
        "scripts": {
          "install": "npm ci",
          "dev": "next dev",
          "build": "next build",
          "start": "next start"
        }
      }
    ]
  }
}
```

See the [Scaffoldly Docs](https://scaffoldly.dev/docs/config/) for additional configuration directives.

## Then, deployed to AWS Lambda

```bash
npx scaffoldly deploy
```

See the [Scaffoldly Docs](https://scaffoldly.dev/docs/cli/#scaffoldly-deploy) for details on the `scaffoldly deploy` command.

### After deploy the C# app is available on a public URL

```bash
🚀 Deployment Complete!
   🆔 App Identity: arn:aws:iam::796973506507:role/node-nextjs-740c100e
   📄 Env Files: .env.main, .env
   📦 Image Size: todo MB
   🌎 URL: https://inne3tcyuarfqwqz633ojyg2qe0ldglc.lambda-url.us-east-1.on.aws
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
