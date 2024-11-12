# A Python Flask App w/GPT2 (via Huggingface) Running On AWS Lambda

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/scaffoldly/scaffoldly-examples/scaffoldly.yml?branch=python-gpt2&link=https%3A%2F%2Fgithub.com%2Fscaffoldly%2Fscaffoldly-examples%2Factions)

## ✨ Quickstart

Run the following command to create your own copy of this application:

```bash
npx scaffoldly create app --template python-gpt2
```

> [!WARNING]
>
> - Downloaded models are pre-downloaded at build time and **they are large**. The Lambda Function will have a **large image size**.
> - Running inference on a CPU takes time. The CPU for the Lambda Function can be increased by setting the `memorySize` option in `scaffoldly.json`.

Check out our other [examples](https://github.com/scaffoldly/scaffoldly-examples) and learn more at [scaffoldly.dev](https://scaffoldly.dev)!

## Manual Setup

This application was created by following these steps:

1. Added a [`requirements.txt`](./app.py) which installs `Flask`, `gunicorn`, `torch`, `numpy` and `transformers`.
1. Added `packages`
   1. Added `pip:requirements.txt` to do a `pip install` of all packages listed in `requirements.txt`.
   1. Added `huggingface:openai-community/gpt2` to [`scaffoldly.json`](./scaffoldly.json) as a `package`.
      - This adds `openai-community/gpt2` to a list of models to download via `huggingface-cli`
1. Added an [`app.py`](./app.py) to create the `generator` and run it.

💡 Run `npx scaffoldly show dockerfile` to see the `Dockerfile` that will be used during the build.

✨ No other modifications or SDKs were made or added to the code to "make it work" in AWS Lambda.

### Working example

[https://mg5s5yi5qwfe6vibg6cknv3e7q0scvjy.lambda-url.us-east-1.on.aws](https://mg5s5yi5qwfe6vibg6cknv3e7q0scvjy.lambda-url.us-east-1.on.aws)

## First, Scaffoldly Config was added...

In the [`scaffoldly.json`](./scaffoldly.json) file, the applications configuration was added:

- `app.py` is copied
- `requirements.txt` is installed using `pip`
- `openai-community/gpt2` is installed using `huggingface-cli`
- `start` runs `gunicorn app:app`

```json
{
  "name": "python-gpt2",
  "runtime": "python:3.12",
  "handler": "localhost:8000",
  "files": ["app.py"],
  "packages": ["pip:requirements.txt", "huggingface:openai-community/gpt2"],
  "scripts": {
    "start": "gunicorn app:app"
  }
}
```

💡 Run `npx scaffoldly show dockerfile` to see the `Dockerfile` that will be used during the build.

See the [Scaffoldly Docs](https://scaffoldly.dev/docs/config/) for additional configuration directives.

## Then, deployed to AWS Lambda

```bash
npx scaffoldly deploy
```

See the [Scaffoldly Docs](https://scaffoldly.dev/docs/cli/#scaffoldly-deploy) for details on the `scaffoldly deploy` command.

### After deploy the app is available on a public URL

```bash
🚀 Deployment Complete!
   🆔 App Identity: arn:aws:iam::123456789012:role/python-gpt2-54463086
   📄 Env Files: .env.main, .env
   📦 Image Size: 7.39 GB
   🌎 URL: https://mg5s5yi5qwfe6vibg6cknv3e7q0scvjy.lambda-url.us-east-1.on.aws
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
