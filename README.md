# A Python Flask App Running On AWS Lambda

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/scaffoldly/scaffoldly-examples/scaffoldly.yml?branch=python-flask&link=https%3A%2F%2Fgithub.com%2Fscaffoldly%2Fscaffoldly-examples%2Factions)

## ✨ Quickstart

Run the following command to create your own copy of this application:

```bash
npx scaffoldly create app --template python-flask
```

Check out our other [examples](https://github.com/scaffoldly/scaffoldly-examples) and learn more at [scaffoldly.dev](https://scaffoldly.dev)!

## Manual Setup

This application was created by following these steps:

1. Added an [`app.py`](./app.py) as the [Minimal Application](https://flask.palletsprojects.com/en/stable/quickstart/#a-minimal-application) from Flask documentation
1. Added a [`requirements.txt`](./app.py) which installs `Flask` and `gunicorn`.

✨ No other modifications or SDKs were made or added to the code to "make it work" in AWS Lambda.

### Working example

[https://bmrroucx2eidhwiplrnme3l6ta0qnqwp.lambda-url.us-east-1.on.aws](https://bmrroucx2eidhwiplrnme3l6ta0qnqwp.lambda-url.us-east-1.on.aws)

## First, Scaffoldly Config was added...

In the [`scaffoldly.json`](./scaffoldly.json) file, the applications configuration was added:

- `app.py` is copied
- `requirements.txt` is installed using `pip`
- `start` runs `gunicorn app:app`

```json
{
  "name": "flask",
  "runtime": "python:3.12",
  "handler": "localhost:8000",
  "files": ["app.py"],
  "packages": ["pip:requirements.txt"],
  "memorySize": 1024,
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
   🆔 App Identity: arn:aws:iam::123456789012:role/flask-094a345a
   📄 Env Files: .env.main, .env
   📦 Image Size: 1.08 GB
   🌎 URL: https://bmrroucx2eidhwiplrnme3l6ta0qnqwp.lambda-url.us-east-1.on.aws
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
