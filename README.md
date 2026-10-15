# LinkVault

Full-stack app for saving, editing and managing your links.

## Features

- Create, edit and delete links
- Form validation on the server (server actions)
- REST API for links (`/api/links`, `/api/links/[id]`)
- Create your own tags 

## Roadmap

- OAuth authentication
- Search and filter links by tags
- Responsive design


## Tech stack

- **Framework:** Next.js (App Router), React, TypeScript
- **Database:** PostgreSQL + Prisma ORM
- **Server logic:** Server Actions, next-safe-action wrapper
- **Validation:** zod
- **Infrastructure:** Docker Compose (local database)