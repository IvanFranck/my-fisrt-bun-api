# my-first-bun-api

To install dependencies:

```bash
bun install
```
To sync Prisma schema with your sqlite DB:

```bash
bunx prisma migrate dev --name init
```
you can replace "init" with any words of your choice


To run:

```bash
bun run index.ts
```

Don't forget to ignore `.env` file.
