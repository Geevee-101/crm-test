# CRM Test Application

This is a client management application built with Next.js, Prisma, and PostgreSQL.

## Getting Started

### Prerequisites

- Node.js (version 18 or later)
- Docker (for PostgreSQL database)
- pnpm (recommended) or npm

### Setup Database

First, start the PostgreSQL database:

```bash
pnpm start:db
```

This will start a PostgreSQL instance in a Docker container.

### Environment Setup

1. Create a `.env.local` file in the root directory with:

```
DATABASE_URL="postgresql://postgres@localhost:5432/postgres?schema=public"
```

### Install Dependencies

```bash
pnpm install
```

### Database Setup

Run the Prisma migrations to set up your database schema:

```bash
pnpm prisma:migrate:local
```

Generate the Prisma client:

```bash
pnpm prisma:generate:local
```

### Run Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
