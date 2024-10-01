# Next.js Project

This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Use NVM to Set Node Version

Make sure to use the correct Node.js version for this project. Run the following command to switch to the specified Node.js version using nvm:

```bash
nvm use
```

### 3. Create Environment Variables

Transform the .env.sample file into a .env file. You can do this by running the following command:

```bash
cp .env.sample .env
```

### 4. Install Dependencies

Install the required dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 5. Generate Drizzle Schema

In the root directory of the project, run the following command to generate your Drizzle schema:

```bash
npx drizzle-kit generate
```

### 6. Run Database Migrations

Next, apply your database migrations using the following command:

```bash
npx tsx scripts/migrate.ts
```

### 7. Run the Development Server

Start the development server by running:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

You can also use [bun](https://bun.sh) if it's installed:

```bash
bun dev
```

Once the server is running, open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

You can start editing the app by modifying `app/page.tsx`. The page will auto-update as you make changes.

## Additional Information

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to optimize and load the [Geist](https://vercel.com/font) font family by Vercel.

### Learn More About Next.js

To dive deeper into Next.js, check out these resources:

- [Next.js Documentation](https://nextjs.org/docs) – Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) – Interactive Next.js tutorial.

### GitHub Repository

You can also contribute or leave feedback via the official [Next.js GitHub repository](https://github.com/vercel/next.js).

## Deployment

The easiest way to deploy your Next.js app is through the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme), which was created by the same team behind Next.js.

For more details on deploying Next.js applications, see the [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Enjoy!

Happy coding!
