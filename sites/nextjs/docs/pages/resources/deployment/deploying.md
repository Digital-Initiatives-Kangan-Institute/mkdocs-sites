# Deploying Your Project

Deployment is the process of putting your web application on the internet so others can access it. This page covers preparing your project, choosing a platform, and releasing it.

---

## Preparing for Deployment

Before deploying, verify your project is ready:

1. Run the build command to check for errors:

```bash
npm run build
```

2. Fix any build errors that appear
3. Test your app locally one final time
4. Check that all pages and features work

---

## Environment Variables

If your app uses API keys or secrets, set them as environment variables:

```bash
# .env.local (local development)
NEXT_PUBLIC_API_URL=https://api.example.com
```

On your deployment platform, add these same variables in the project settings. Never commit `.env` files to GitHub.

---

## Deployment Platforms

The two platforms covered here are **Vercel** and **Cloudflare**. Both have free plans, deploy straight from a GitHub repository, and give you a live URL in a few minutes.

| | Vercel | Cloudflare |
|---|---|---|
| Setup for Next.js | None: detected automatically | OpenNext adapter (full apps) or a static export (Pages) |
| Command-line tool | Vercel CLI (`vercel`) | Wrangler (`wrangler`) |
| Live URL | `https://my-app.vercel.app` | `https://my-app.<subdomain>.workers.dev` or `https://my-app.pages.dev` |
| Server features (server components, `await params`, API routes) | Supported | Supported with OpenNext |

### Vercel

Vercel is the company that makes Next.js, so it supports every Next.js feature with no extra setup. There are two ways to deploy: from the dashboard (recommended), or with the Vercel CLI.

#### Deploying from the dashboard

1. Push your project to a GitHub repository.
2. Sign in at [vercel.com](https://vercel.com) with your GitHub account.
3. Click **Add New → Project**, then **Import** your repository. If it isn't listed, click **Adjust GitHub App Permissions** and give Vercel access to it.
4. Vercel detects Next.js and fills in the build settings for you (**Framework Preset**: Next.js, build command `next build`). Leave them as they are.
5. Open **Environment Variables** and add every variable from your `.env.local`, e.g. `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
6. Click **Deploy**. When the build finishes you get a live URL like `https://my-app.vercel.app`.

#### Production and preview deployments

Once the repository is connected, Vercel deploys automatically:

- **Production**: every push to your main branch updates the live site
- **Preview**: every push to another branch, and every pull request, gets its own temporary URL so you can test changes before merging

Each deployment shows its build log in the dashboard under **Deployments**. If a deploy fails, open it and read the log; it's the same output you would see from `npm run build` on your own computer.

#### Deploying with the Vercel CLI

The **Vercel CLI** lets you deploy from the terminal without pushing to GitHub first. Run it with `npx` so you don't need to install it globally:

```bash
npx vercel login
npx vercel
```

- `vercel login` connects the terminal to your Vercel account
- `vercel` (the first time) asks a few questions to link the folder to a Vercel project, then creates a **preview** deployment and prints its URL
- `vercel --prod` creates a **production** deployment

The CLI can also manage environment variables:

```bash
npx vercel env add NEXT_PUBLIC_SUPABASE_URL
npx vercel env pull .env.local
```

- `vercel env add` adds a variable to the project (it asks for the value and which environments it applies to)
- `vercel env pull` downloads the project's variables into your local `.env.local`

!!! note "Redeploy after changing environment variables"
    Variables that start with `NEXT_PUBLIC_` are written into your JavaScript when the app is **built**. Changing one in the dashboard has no effect until you redeploy: open **Deployments**, click the **⋯** menu on the latest deployment, and choose **Redeploy**.

#### Custom domains

To use your own domain name instead of `*.vercel.app`, open the project's **Settings → Domains**, add the domain, and follow the instructions to update its DNS records.

### Cloudflare

Cloudflare runs your app on its global network. There are two ways to deploy a Next.js app there, and both use **Wrangler**, Cloudflare's command-line tool for building, previewing and deploying projects.

Log in to Cloudflare from the terminal before your first deploy:

```bash
npx wrangler login
```

#### Full Next.js apps with OpenNext

**OpenNext** is an adapter that converts a Next.js build into something Cloudflare can run. Use it when your app needs server features such as server components, dynamic routes with `await params`, or API routes. OpenNext apps run on **Cloudflare Workers**.

Install the adapter and Wrangler in your project:

```bash
npm install @opennextjs/cloudflare@latest
npm install --save-dev wrangler@latest
```

Then follow the [OpenNext Cloudflare guide](https://opennext.js.org/cloudflare/get-started) to add its config files (`wrangler.jsonc` and `open-next.config.ts`) and these scripts to `package.json`:

```json
"scripts": {
  "preview": "opennextjs-cloudflare build && opennextjs-cloudflare preview",
  "deploy": "opennextjs-cloudflare build && opennextjs-cloudflare deploy"
}
```

- `npm run preview` builds the app and runs it locally the way Cloudflare will run it
- `npm run deploy` builds the app and uploads it with Wrangler, giving you a live URL like `https://my-app.<your-subdomain>.workers.dev`

To start a brand new project that is already set up this way, run `npm create cloudflare@latest -- my-app --framework=next`.

#### Static sites with Cloudflare Pages

If every page can be built ahead of time (for example, client components that fetch data in the browser with `useEffect`), you can export the app as plain HTML, CSS and JavaScript and host it on **Cloudflare Pages**. Add `output: "export"` to `next.config.ts`:

```typescript
const nextConfig = {
    output: "export",
};

export default nextConfig;
```

`npm run build` now writes the site to an `out/` folder. Deploy that folder with Wrangler:

```bash
npx wrangler pages deploy out
```

You can also connect your Git repository in the Cloudflare dashboard, set the build command to `npm run build` and the output directory to `out`, and Cloudflare will redeploy on every push.

!!! note
    A static export can't use features that need a running server, such as API routes. Dynamic routes like `app/pets/[id]` also won't export unless every possible id is known at build time (using `generateStaticParams`), which rules out ids that come from a database. If the build fails with an error about one of these, use OpenNext instead.

---

## Testing the Live Site

After deployment:

1. Visit the live URL
2. Test every page and feature
3. Check that images and assets load correctly
4. Test on mobile and different browsers
5. Verify that API calls work on the live domain

---

## Release Notes

When you deploy, document what changed. A short release note includes:

- What features are included
- Any known issues
- The live link to the deployed site

---

## Summary

- Run `npm run build` to verify your project before deploying
- Set environment variables on your deployment platform, not in your code
- Vercel detects Next.js automatically: import the repository, add environment variables, and deploy
- Vercel and the Vercel CLI create production deployments from the main branch and preview deployments for everything else
- On Cloudflare, use OpenNext and Wrangler for full Next.js apps, or a static export on Cloudflare Pages
- Test thoroughly on the live URL after deploying
- Document your release with a short note and live link

### Activity - Deploy Your App

[Attempt Activity - Deploy Your App](../../tasks/deploy-your-app.md){.md-button}
