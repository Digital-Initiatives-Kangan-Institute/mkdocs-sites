# Deploy Your App

In this task you'll put your work on the internet. You'll deploy the [Pet Adoption Board](pet-adoption-board.md) to Vercel, set up its environment variables, use preview deployments, then deploy to Cloudflare the two ways it supports: OpenNext for a full app, and a static export on Cloudflare Pages.

Revisit [Deploying Your Project](../resources/deployment/deploying.md) while you work.

!!! note "Before you start"
    You need a finished (or nearly finished) Pet Adoption Board, a GitHub account, and the project pushed to a GitHub repository. Check `.gitignore` contains `.env*` so your keys aren't pushed. If you haven't finished the Pet Adoption Board, any Next.js app from the earlier tasks will work for the Vercel exercises.

## Check the Build Locally

!!! abstract "Instructions"
    Every deployment platform runs `npm run build`. If it fails on your computer, it will fail online too, so check it first.

    1. Stop the dev server and run `npm run build` in your project folder.
    2. Fix any errors it reports, and run it again until it finishes.
    3. Run `npm run start` and visit `http://localhost:3000`. This is the **production** version of your app. Click through every page.
    4. Run `npm run lint` and fix anything it reports.
    5. Commit and push your fixes to GitHub.

??? hint "Hint - Click to expand"
    The build is stricter than the dev server: a TypeScript error that only showed as a red underline in VS Code will stop the build. Read the file name and line number in the error and fix it the same way you would in the editor.

## Deploy to Vercel

!!! abstract "Instructions"
    1. Sign in to [vercel.com](https://vercel.com) with your GitHub account.
    2. Click **Add New → Project** and **Import** your Pet Adoption Board repository.
    3. Leave the build settings Vercel detects as they are.
    4. **Before** clicking Deploy, open **Environment Variables** and add both variables from your `.env.local`.
    5. Click **Deploy** and wait for the build to finish.
    6. Open your live URL and test it against this checklist:
        - The pets list loads from Supabase
        - Filters and search work
        - Clicking a pet opens its detail page, and `/pets/999` shows "not found"
        - The adopt button saves, and the change shows on the list page
        - Everything works on your phone

??? hint "Hint - Click to expand"
    Copy the variable **names** exactly, including the `NEXT_PUBLIC_` prefix. If the list shows an error or never loads, open DevTools on the live site and check the **Network** tab: a request to your own `vercel.app` domain instead of `supabase.co` means the URL variable is missing.

## Break and Fix the Environment Variables

!!! abstract "Instructions"
    Learn what a missing variable looks like, so you'll recognise it later.

    1. In the Vercel dashboard, open **Settings → Environment Variables** and change `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to `wrong`.
    2. Visit your live site. Does anything change? Why not?
    3. Redeploy the latest deployment. What does the site show now? Check the **Network** tab to see Supabase's response.
    4. Put the correct key back and redeploy. Confirm the site works again.

??? hint "Hint - Click to expand"
    `NEXT_PUBLIC_` variables are written into the JavaScript when the app is **built**, so changing one does nothing until a new build runs. The [Deploying Your Project](../resources/deployment/deploying.md) resource shows where the **Redeploy** option is.

## Preview Deployments

!!! abstract "Instructions"
    1. In your project, create a new git branch called `stats`.
    2. Add the "5 of 8 pets still need a home" stats line from the Pet Adoption Board stretch goals (or any small visible change).
    3. Commit and push the branch to GitHub.
    4. In the Vercel dashboard, open **Deployments**. Find the **Preview** deployment for your branch and open its URL.
    5. Compare it with your production URL: one has the change and one doesn't.
    6. Open a pull request on GitHub for the branch. Find the comment or check that Vercel adds to it.
    7. Merge the pull request, then watch the production URL update.

??? hint "Hint - Click to expand"
    `git checkout -b stats` creates and switches to the branch. The first push of a new branch needs `git push -u origin stats`. In VS Code you can do the same from the branch name in the bottom-left corner and the **Publish Branch** button.

## Deploy with the Vercel CLI

!!! abstract "Instructions"
    Deploy a **different** app, one from an earlier task that isn't on GitHub, straight from your terminal.

    1. In that app's folder, run `npx vercel login`, then `npx vercel`. Answer the setup questions.
    2. Open the **preview** URL it prints.
    3. Run `npx vercel --prod` and open the **production** URL.
    4. Find the new project in the Vercel dashboard. Which deployments are listed?

??? hint "Hint - Click to expand"
    The first `vercel` run asks which account to use, whether to link to an existing project (answer no), the project name, and the folder. Accepting the defaults is fine.

## Deploy to Cloudflare with OpenNext

!!! abstract "Instructions"
    Deploy the Pet Adoption Board a second time, to Cloudflare Workers.

    1. Create a branch called `cloudflare` so the Cloudflare setup stays separate from your Vercel deployment.
    2. Install the OpenNext adapter and Wrangler, as shown in the [Deploying Your Project](../resources/deployment/deploying.md) resource.
    3. Follow the linked OpenNext guide to add `wrangler.jsonc`, `open-next.config.ts`, and the `preview` and `deploy` scripts.
    4. Run `npx wrangler login`.
    5. Run `npm run preview` and test the app locally the way Cloudflare will run it.
    6. Run `npm run deploy` and open the `workers.dev` URL it prints. Test it with the same checklist as the Vercel deployment.

??? hint "Hint - Click to expand"
    The OpenNext build runs on **your** computer, so it reads your `.env.local` and writes the `NEXT_PUBLIC_` values into the build, the same way Vercel does with its dashboard variables. If the deploy succeeds but the pets don't load, check `.env.local` is in the project root and run `npm run deploy` again.

## Deploy a Static Site to Cloudflare Pages

!!! abstract "Instructions"
    A static export only works for apps whose pages can all be built ahead of time. Use your **Arrays with map and filter** or **Saving to localStorage** app; they have no dynamic routes.

    1. Add `output: "export"` to the app's `next.config.ts`.
    2. Run `npm run build`. Find the `out/` folder it creates and look at what's inside.
    3. Run `npx wrangler pages deploy out` and follow the prompts to create a Pages project.
    4. Open the `pages.dev` URL and test every page.
    5. **Try it on the Pet Adoption Board:** add `output: "export"` on a scratch branch and run `npm run build`. Read the error and explain in one sentence why this app can't be a static export. Then delete the branch.

??? hint "Hint - Click to expand"
    The `out/` folder holds plain `.html`, `.css` and `.js` files, one HTML file per page. The Pet Adoption Board's `/pets/[id]` page could be any id from the database, so Next.js can't build every possible page ahead of time.

## Release Note

!!! abstract "Instructions"
    Write a short release note in your repository's `README.md` that includes:

    - Your live Vercel URL and your Cloudflare URL
    - The features that are included
    - Any known issues or things you'd improve next
    - Which platform you'd choose for this app, and why (two or three sentences)
