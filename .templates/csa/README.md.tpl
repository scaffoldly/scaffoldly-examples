This is a <%= readmeName %> application created with [`create-scaffoldly-app`](https://www.npmjs.com/package/create-scaffoldly-app).

## Getting Started

First, run the development server:

```bash
<%= devCommand %>
```

Open [http://<%= handler %>](http://<%= handler %>) with your browser or `curl` to see running application.

You can start editing the application by modifying [`<%= main %>`](<%= main %>).

## Secrets

Secrets for this application are managed using [`scaffoldly`](https://github.com/scaffoldly/scaffoldly).

1. Create a repository secret in GitHub (e.g. `MY_SECRET`)
1. Create a reference to it in a `.env` file (e.g. `MY_SECRET=${MY_SECRET:-some-default-value}`)
   1. It will be available at **build time** and **run time**.
1. Read the secret using environment variables (e.g. `process.env.MY_SECRET`)

Check out Scaffoldly [documentation](https://scaffoldly.dev/docs) for more details.

## Deployment

This application deploys using [`scaffoldly`](https://github.com/scaffoldly/scaffoldly) which is configured in [`<%= configFile %>`](<%= configFile %>).

- **Automatic**: A `git push` to `main` will trigger the [`scaffoldly.yml`](.github/workflows/scaffoldly.yml) GitHub Action to perform a deploy.
- **Manual**: Run [`npx scaffoldly deploy`](https://scaffoldly.dev/docs/cli) from the Command Line will perform a deploy.

Check out Scaffoldly [documentation](https://scaffoldly.dev/docs) for more details.
