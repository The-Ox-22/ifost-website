# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
npx sv@0.17.0 create --template minimal --types ts --add prettier eslint tailwindcss="plugins:typography,forms" sveltekit-adapter="adapter:node" --install npm .
```

## Environment variables

Copy `.env.example` to `.env` and fill in anything you need to override. Notably:

- `GAS_TRACKER_URL` — base URL for the gas-tracker service backing `/gas-tracker`. Defaults to its in-cluster ClusterIP DNS name; for local dev, run `kubectl port-forward svc/gas-tracker 8080:80 -n gas-tracker` and set this to `http://localhost:8080`.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
