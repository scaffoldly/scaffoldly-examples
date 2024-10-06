# A C# App Running On AWS Lambda

This application was generated with the following command:

```bash
dotnet new webapi -n DotNetCSharpApp
```

✨ No modifications or SDKs were made or added to the code to "make it work" in AWS Lambda.

Learn more at [scaffoldly.dev](https://scaffoldly.dev)!

### Working example

[https://wmnaydmf2zp5s7rw4htcw5rcku0cwkfq.lambda-url.us-east-1.on.aws](https://wmnaydmf2zp5s7rw4htcw5rcku0cwkfq.lambda-url.us-east-1.on.aws/weatherforecast)

## First, Scaffoldly Config was added...

In the project's [`.csproj`](./DotNetCSharpApp.csproj) file, the `<Scaffoldly/>` configuration was added to `<PropertyGroup/>`:

```
<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <!-- ...snip... -->

    <!-- Scaffoldly Configuration -->
    <Scaffoldly>
      <Runtime>mcr.microsoft.com/dotnet/sdk:8.0</Runtime>
      <Handler>localhost:8080</Handler>
      <Bin name="DotNetCSharpApp.dll">DotNetCSharpApp:bin/Release/net8.0/publish/DotNetCSharpApp.dll</Bin>
      <Service name="DotNetCSharpApp">
        <File>DotNetCSharpApp.csproj</File>
        <File>bin</File>
        <Script name="build">dotnet publish</Script>
        <Script name="start">dotnet DotNetCSharpApp.dll</Script>
      </Service>
    </Scaffoldly>

  </PropertyGroup>
</Project>
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
   🆔 App Identity: arn:aws:iam::123456789012:role/dotnetDotNetCSharpapp-24d1a1f7
   📄 Env Files: .env.main, .env
   📦 Image Size: 942.47 MB
   🌎 URL: https://fqjyxerjyvaoxmdiiywhrm7xgm0hvouq.lambda-url.us-east-1.on.aws
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
