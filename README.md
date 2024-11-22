# A Python Flask App w/GPT2 (via Hugging Face) Running On AWS Lambda

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/scaffoldly/scaffoldly-examples/scaffoldly.yml?branch=python-gpt2&link=https%3A%2F%2Fgithub.com%2Fscaffoldly%2Fscaffoldly-examples%2Factions)

## ✨ Features

- Runs as a **Docker Container** on **AWS Lambda**
- Uses **Amazon EFS** to cache large model files
- Uses `requirements.txt` to package **`pytorch`**, etc.
- Costs **~$0.20/day** to host in AWS Lambda and EFS

> [!NOTE]
>
> - AWS Lambda uses **CPUs**, therefore running `pytorch` is slow. Each request takes ~20 sec with 1024 MiB memory.
> - While this is **not production grade**, it is **a cost effective way** to serve models.

## 🚀 Quickstart

1. Create an Amazon EFS File System named `.cache`

2. Run the following command to create your own copy of this example application:

   ```bash
   npx scaffoldly create app --template python-gpt2
   ```

3. Finally, `cd` into the newly created project and run:

   ```bash
   npx scaffoldly deploy
   ```

> [!TIP]
> To use a different model than [`openai-community/gpt2`](https://huggingface.co/openai-community/gpt2), update [`scaffoldly.json`](./scaffoldly.json) and [`app.py`](./app.py) with the desired model(s).

Check out our other [examples](https://github.com/scaffoldly/scaffoldly-examples) and learn more at [scaffoldly.dev](https://scaffoldly.dev)!

## Demo

[https://qk3hfznxdjodtbmvzzp2sx5rdq0rfcpn.lambda-url.us-east-1.on.aws](https://qk3hfznxdjodtbmvzzp2sx5rdq0rfcpn.lambda-url.us-east-1.on.aws)

### Project Configuration

First, an Amazon EFS File System was created in an AWS Account named `.cache`

Then, in the [`scaffoldly.json`](./scaffoldly.json) file, the applications configuration was added:

- [`app.py`](./app.py) is copied
- [`requirements.txt`](./requirements.txt) is installed using `pip`
- `resources` finds an EFS file system named `.cache` (created manually)
- `@immediately` runs `huggingface-cli download` inside Lambda to download models to Amazon EFS after the deploy.
- `start` runs `gunicorn app:app` to make the model availalbe via an API call

```json
{
  "name": "python-gpt2",
  "runtime": "python:3.12",
  "handler": "localhost:8000",
  "files": ["app.py"],
  "packages": ["pip:requirements.txt"],
  "resources": ["arn::elasticfilesystem:::file-system/.cache"],
  "schedules": {
    "@immediately": "huggingface-cli download openai-community/gpt2"
  },
  "scripts": {
    "start": "gunicorn app:app"
  },
  "memorySize": 1024
}
```

💡 Run `npx scaffoldly show dockerfile` to see the `Dockerfile` that will be used during the build.

See the [Scaffoldly Docs](https://scaffoldly.dev/docs/config/) for additional configuration directives.

### Deployment

```bash
npx scaffoldly deploy
```

See the [Scaffoldly Docs](https://scaffoldly.dev/docs/cli/#scaffoldly-deploy) for details on the `scaffoldly deploy` command.

#### After deploy the app is available on a public URL

```bash
🚀 Deployment Complete!
   🆔 App Identity: arn:aws:iam::123456789012:role/python-gpt2-54463086
   📄 Env Files: .env.main, .env
   📦 Image Size: 1.76 GB
   🌎 URL: https://qk3hfznxdjodtbmvzzp2sx5rdq0rfcpn.lambda-url.us-east-1.on.aws
```

#### GitHub Action for Autommated Deploys

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
