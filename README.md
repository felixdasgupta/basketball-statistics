# Basketball Statistics

Simple Next.js app that uses [Vercel Postgres](https://vercel.com/postgres) as the database and [Prisma](https://prisma.io/) as the ORM.

This app allows users to search for basketball players by querying [BALLDONTLIE API](https://docs.balldontlie.io/) and create a dream roster of their favorite player + visualize their latest agg stats.

![Final UI/UX](/public/final-ux.png)

Here is a snapshot of the data tables, to persist the storage of your favorite basketball players.

![UML](/public/prisma-uml.png)

# Local Dev

Copy the .env.example file in this directory to .env.local (which will be ignored by Git) to properly access prisma instance:

`cp .env.example .env.local`

Next, run Next.js in development mode:

`pnpm dev`
