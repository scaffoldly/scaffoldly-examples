This is a <%= readmeName %> application created with [`create-scaffoldly-app`](https://www.npmjs.com/package/create-scaffoldly-app).

## Development

<%- if (setupCommands) { %>
Setup the project:

```bash
<%= setupCommands.join('\n') %>
```
<% } -%>

Run the development server:

```bash
<%= devCommand %>
```

Open [http://<%= handler %>](http://<%= handler %>) with your browser or `curl` to see running application.

You can start editing the application by modifying [`<%= main %>`](<%= main %>)

## Deployment

This application deploys using [`scaffoldly`](https://github.com/scaffoldly/scaffoldly) which is configured in [`<%= configFile %>`](<%= configFile %>) [(docs)](https://scaffoldly.dev/docs).

- **Automatic**: A `git push` to `main` will trigger [`scaffoldly/scaffoldly@v1`](https://github.com/marketplace/actions/scaffoldly) in a [GitHub Action](.github/workflows/scaffoldly.yml) to perform a deploy.
- **Manual**: Run [`npx scaffoldly deploy`](https://scaffoldly.dev/docs/cli) from the Command Line will perform a deploy.

## Secrets

Secrets for this application are managed using [`scaffoldly`](https://github.com/scaffoldly/scaffoldly) [(docs)](https://scaffoldly.dev/docs).

### Build Time Secrets

1. Set the value of the secret in the shell's envirionment.
1. Read the secret using environment variables in the build scripts.

### Run Time Secrets

1. Create a repository secret in GitHub (e.g. `MY_SECRET`) (and your shell's environment).
1. Create a reference to it in a `.env` file (e.g. `MY_SECRET=${MY_SECRET}`).
1. Read the secret using environment variables in the application.
