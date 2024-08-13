## Welcome to TournaME

The following is project of a tournament creation website for games.

Stable version of the website can be found on this render link: https://tourname-client.onrender.com

## How to run the project locally

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

If we're running the project locally we need to modifiy our fetch endpoints acording to the comments in the following files:

/src/app/pages/signin/form.js - Line 30

/src/app/pages/signup/form.js - Line 53

First, run the server:

```bash
npm install

# Recommended for local run
npm run dev

# or, Recommended for deployment
next build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) or the link that will be provided if 3000 isn't available with your browser to see the result.

> [!NOTE]
> This project is linked to the server [GitHub repository](github.com/Player1IL/TournaME/)

> [!IMPORTANT]
> Stable version is located in the Production branch
