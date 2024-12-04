# Ollama Running On AWS Lambda

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/scaffoldly/scaffoldly-examples/scaffoldly.yml?branch=ollama&link=https%3A%2F%2Fgithub.com%2Fscaffoldly%2Fscaffoldly-examples%2Factions)

## 🚀 Working Example

> [!NOTE]
>
> - AWS Lambda uses **CPUs**, therefore running `generate` / `chat` is a little slow.
> - The first deployment takes **~5m** while the container is built and models are cached, subsequent deployments take **~1m**.
> - The first request while the model is loaded **takes ~20s**, subsequent requests take **~5-20s**.
> - While this is **not production grade**, it is **a cost effective way** to serve models.

```bash
curl https://wm4s6cxkwua4ncx3skpdtdx27a0qzbnd.lambda-url.us-east-1.on.aws/api/generate -d '{
  "model": "llama3.2:1b",
  "prompt":"Why is the sky blue?"
}'
```

- 🙏 Please, please, please don't abuse this endpoint, **Scaffoldly is Open Source** (a.k.a. cash strapped 🤣) and we're hosting it for demonstration purposes only!
- Please [consider donating](https://github.com/sponsors/scaffoldly) if you like what Scaffoldly is doing!
- Check out our [other examples](https://github.com/scaffoldly/scaffoldly-examples)
- Give our [Tooling](https://github.com/scaffoldly/scaffoldly) and [Examples](https://github.com/scaffoldly/scaffoldly-examples) repositories a ⭐️ if you like what you see!

## ✨ Host Your Own!

> [!TIP]
> To use a different model than [`llama3.2:1b`](https://ollama.com/library/llama3.2:1b), update [`scaffoldly.json`](./scaffoldly.json) with the desired model(s).

1. Run the following command to create your own copy of this application:

```bash
npx scaffoldly create app --template ollama
```

2. Create an [EFS Filesystem in AWS](https://console.aws.amazon.com/efs/home), give it a `Name` of `.cache` (to match [`scaffoldly.json`](scaffoldly.json))

3. Finally, deploy:

```bash
cd my-app
npx scaffoldly deploy
```

You will see output that looks like:

```
🟠 App framework not detected. Using `scaffoldly.json` for configuration.

✅ Updated Identity: arn:aws:sts::123456789012:assumed-role/aws-examples@scaffold.ly/cnuss
✅ Updated ECR Repository: 123456789012.dkr.ecr.us-east-1.amazonaws.com/ollama
✅ Updated Local Image Digest: sha256:f7ee27705d66c64a250982d6ee8282d5338a4989ae95c5ac4453a15c264efc97
✅ Updated Secret: arn:aws:secretsmanager:us-east-1:123456789012:secret:ollama@ollama-yaVNCp
✅ Updated EFS Access Point: arn:aws:elasticfilesystem:us-east-1:123456789012:access-point/fsap-0b0e5506324efd541
✅ Updated IAM Role: ollama-0447aaae
✅ Updated IAM Role Policy: ollama
✅ Updated Lambda Function: ollama
✅ Updated Function URL: https://wm4s6cxkwua4ncx3skpdtdx27a0qzbnd.lambda-url.us-east-1.on.aws
✅ Updated Schedule Group: ollama-0447aaae
✅ Updated Local Image: 123456789012.dkr.ecr.us-east-1.amazonaws.com/ollama:0.0.0-0-0447aaae
✅ Updated Local Image Digest: sha256:320447c49d08d109c4fc1702acc24768657a9a09e4e0eb90f8b32051500664ba
✅ Updated Secret: arn:aws:secretsmanager:us-east-1:123456789012:secret:ollama@ollama-yaVNCp
✅ Updated Lambda Function: ollama
✅ Updated Function Code: ollama@sha256:320447c49d08d109c4fc1702acc24768657a9a09e4e0eb90f8b32051500664ba
✅ Updated Function Alias: ollama (version: 4)
✅ Updated Function Policies: InvokeFunctionUrl
✅ Updated Function URL: https://wm4s6cxkwua4ncx3skpdtdx27a0qzbnd.lambda-url.us-east-1.on.aws
✅ Updated Network Interface: eni-0dc0e11444fa19715
✅ Created Invocation of `( HOME=$XDG_CACHE_HOME OLLAMA_HOST=$URL ollama pull llama3.2:1b )`:
pulling manifest
   ==> pulling 74701a8c35f6... 100% ▕████████████████▏ 1.3 GB
   ==> pulling 966de95ca8a6... 100% ▕████████████████▏ 1.4 KB
   ==> pulling fcc5a6bec9da... 100% ▕████████████████▏ 7.7 KB
   ==> pulling a70ff7e570d9... 100% ▕████████████████▏ 6.0 KB
   ==> pulling 4f659a1e86d7... 100% ▕████████████████▏  485 B
   ==> verifying sha256 digest
   ==> writing manifest
   ==> success
✅ Updated HTTP GET on https://wm4s6cx...s-east-1.on.aws: 200 OK

🚀 Deployment Complete!
   🆔 App Identity: arn:aws:iam::123456789012:role/ollama-0447aaae
   📄 Env Files: .env.ollama, .env.main, .env
   📦 Image Size: 4.81 GB
   🌎 URL: https://wm4s6cxkwua4ncx3skpdtdx27a0qzbnd.lambda-url.us-east-1.on.aws
```

## 🤨 How It Works

- The [`scaffoldly.json`](scaffoldly.json) is converted into a [Multi-Stage Docker Build](#multi-stage-docker-build)
- A docker build is pushed to [Amazon ECR](#amazon-ecr)
- A [Lambda Function](#lambda-function) is created to serve the image
- Models are [cached](#model-caching) to Amazon EFS
- Requests are [proxied](#request-proxy) to the underlying Ollama server

> [!TIP]
> This repoistory also comes with a [GitHub Action](.github/workflows/scaffoldly.yml) so that deployments can occur from GitHub instead of being executed manually!

### Multi-Stage Docker Build

After the [project has been created](#-host-your-own), run `npx scaffoldly show dockerfile` to see the resultant Dockerfile:

```Dockerfile
FROM ollama/ollama:0.4.7 AS install-base
WORKDIR /var/task

FROM install-base AS build-base
WORKDIR /var/task
ENV PATH="/var/task:$PATH"
COPY . /var/task/

FROM install-base AS package-base
WORKDIR /var/task
ENV PATH="/var/task:$PATH"

FROM install-base AS runtime
WORKDIR /var/task
ENV PATH="/var/task:$PATH"
COPY --from=scaffoldly/scaffoldly:1 /linux/arm64/awslambda-entrypoint /var/task/.entrypoint
CMD [ "( HOME=$XDG_CACHE_HOME ollama serve )" ]
```

Running `npx scaffoldly deploy` will:

- Infer [`scaffoldly.json`](scaffoldly.json) into a Multi-Stage Docker Build
- Run the equivalent of `docker build`
- Setup [Amazon ECR](#amazon-ecr)
- Create a [Lambda Function](#lambda-function)

### Amazon ECR

AWS Lambda requires that Docker Images come from Amazon ECR Private Registries, and it can't run public images either.

Running `npx scaffoldly deploy` will:

- Pull `ollama/ollama:0.4.7` and re-tag it and push it to Amazon ECR as a private image
- Create an ECR Repository if it doesn't already exist
- Run the equivalent of `docker push`

### Lambda Function

An AWS Lambda Function is created with the configuration in the [`scaffoldly.json`](scaffoldly.json) file:

Running `npx scaffoldly deploy` will:

- Setup Function Environment Variables from `.env`
- Deploy the Function with a VPC Configuration and EFS Mounts inferred from [Amazon EFS](#model-caching)
- Create Lambda Versions and Aliases
- Set an `ENTRYPOINT` which routes [AWS Lambda HTTP Requests to Ollama](#request-proxy)
- Create a Lambda Function URL and set it as an environment variable as `URL`

### Model Caching

Model files are large and cached in Amazon EFS. Using the `@immediately` option in the `schedules` directive of [`scaffoldly.json`](scaffoldly.json), the Model is pre-downloaded after the deployment.

Running `npx scaffoldly deploy` will:

- Set up a `XDG_CACHE_HOME` environment to be the EFS Mount on the Lambda Function
- Use the `OLLAMA_HOST=$URL` envrionment variable to trigger a remote download (on itself)
- Use the `HOME=$XDG_CACHE_HOME` to direct Ollama where to store files
- Invoke `ollama pull` once the AWS Lambda Function is finished deploying

### Request Proxy

Finally, Scaffoldly uses the `start` option in the `scripts` directive of [`scaffoldly.json`](scaffoldly.json) to run `ollama serve`.

Running `npx scaffoldly deploy` will:

- Copy the [`awslambda-entrypoint`](https://github.com/scaffoldly/scaffoldly/blob/main/src/awslambda-entrypoint.ts)
- The `awslambda-entrypoint` reads the `SLY_ROUTES` and `SLY_SERVE` environment variables to start and route requests
- Requests are converted from the AWS Lambda HTTP Request format back into a HTTP Request forwarded to the Ollama Server.
- The Ollama Server response is streamed back to the requestor.

## Questions, Feedback, and Help

Join our [Discussions](https://github.com/scaffoldly/scaffoldly/discussions) on GitHub.
Join our [Community](https://scaffoldly.dev/community) on Discord.

## License

This code is licensed under the [Apache-2.0](LICENSE.md) license.

The [`scaffoldly`](https://github.com/scaffoldly/scaffoldly) toolchain is licensed under the [FSL-1.1-Apache-2.0](https://github.com/scaffoldly/scaffoldly?tab=License-1-ov-file) license.

Copyright 2024 Scaffoldly LLC
