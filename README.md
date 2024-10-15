# A Python + Flask (w/Poetry) App Running On AWS Lambda

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/scaffoldly/scaffoldly-examples/scaffoldly.yml?branch=python-flask-poetry&link=https%3A%2F%2Fgithub.com%2Fscaffoldly%2Fscaffoldly-examples%2Factions)

This application was generated with the following command:

1. `poetry new flask-poetry && cd flask-poetry`
1. `poetry add flask`

Then, the [Simple Example](https://github.com/pallets/flask/?tab=readme-ov-file#a-simple-example) from [`Flask`](https://pypi.org/project/Flask/) was added to [`flask_poetry/__init__.py`](flask_poetry/__init__.py).

✨ No modifications or SDKs were made or added to the code to "make it work" in AWS Lambda.

Check out our other [examples](https://github.com/scaffoldly/scaffoldly-examples) and Learn more at [scaffoldly.dev](https://scaffoldly.dev)!

### Working example

[https://7dkca5ogwlgdjc66e4wc5braiu0ewgma.lambda-url.us-east-1.on.aws](https://7dkca5ogwlgdjc66e4wc5braiu0ewgma.lambda-url.us-east-1.on.aws)

## First, Scaffoldly Config was added...

In the project's [`pyproject.toml`](pyproject.toml) file, the `scaffoldly` configuration was added:

- `poetry` is installed using the `packages` directive
- The `prepare` command in `flask` will have `poetry` make a `.venv` when `poetry install` is invoked.
- The `files` command for `flask` includes all of the files/and directories needed at runtime.
- The `start` command in `flask` will start `flask` using `poetry run`

```
[tool.scaffoldly]
runtime = "python:3.13"
handler = "localhost:5000"
files = ["pyproject.toml", "poetry.lock"]
packages = ["pip:poetry"]

[tool.scaffoldly.services.flask]
files = [".venv", "flask_poetry"]
packages = ["pip:poetry"]

[tool.scaffoldly.services.flask.scripts]
prepare = "poetry config virtualenvs.in-project true"
install = "poetry install"
start = "poetry run flask --app flask_poetry run"
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
   🆔 App Identity: arn:aws:iam::123456789012:role/flask-poetry-9c9f0eac
   📄 Env Files: .env.main, .env
   📦 Image Size: 1.12 GB
   🌎 URL: https://7dkca5ogwlgdjc66e4wc5braiu0ewgma.lambda-url.us-east-1.on.aws
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
