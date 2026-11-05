# BookNook

BookNook is a modern and responsive community library application built with Next.js and TypeScript. It helps readers discover books, borrow available copies, share books with the community, and manage their personal library from one place.

## Live Demo

[BookNook Live Demo](https://book-nook-a7.vercel.app)

## Technology Stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS
- Better Auth
- MongoDB Atlas
- Google OAuth and GitHub OAuth
- REST API
- shadcn/ui and HeroUI components
- React Hot Toast
- Lucide React icons
- Vercel

## Key Features

- **Browse Books** — Explore the complete book collection with cover images, authors, categories, availability, and descriptions.
- **Category Filtering** — Filter the collection by Fiction, Science, History, Kids, or Others.
- **Book Details** — View detailed information about a book and the reader who added it.
- **Borrow Books** — Borrow available books with a 30-day borrowing period.
- **Return Books** — View currently borrowed books and return them when finished.
- **Add Books** — Authenticated users can contribute books to the community library.
- **Manage Added Books** — Edit or delete books added by the signed-in user.
- **Personal Library** — View all books contributed by your account.
- **User Profile** — Update profile details, change your password, and view library and borrowing statistics.
- **Authentication** — Create an account and sign in with email and password.
- **Social Login** — Sign in with Google or GitHub.
- **Protected Routes** — Restrict profile, borrowing, book management, and contribution features to authenticated users.
- **Responsive Design** — Use the application comfortably on desktop, tablet, and mobile devices.
- **Light and Dark Themes** — Switch between supported color themes throughout the application.

## Project Structure

```text
book-nook/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── sign-in/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   └── sign-up/
│   │   │       ├── layout.tsx
│   │   │       └── page.tsx
│   │   │
│   │   ├── (pages)/
│   │   │   ├── add-book/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── books/
│   │   │   │   ├── [bookid]/
│   │   │   │   │   ├── loading.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── loading.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── my-books/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── my-borrows/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   └── profile-info/
│   │   │       ├── layout.tsx
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/
│   │   │   ├── auth/[...all]/route.ts
│   │   │   └── uploads/book-cover/route.ts
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── books/
│   │   │   ├── homepage/
│   │   │   ├── shared/
│   │   │   └── ui/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   │
│   ├── hooks/
│   ├── lib/
│   │   ├── access-jwt-at-client-component.ts
│   │   ├── access-jwt-at-server-component.ts
│   │   ├── auth-client.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   ├── types/
│   │   ├── book.ts
│   │   └── borrow.ts
│   └── proxy.ts
│
├── public/
├── .env
├── next.config.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage and featured library content |
| `/books` | Browse and filter all books |
| `/books/[bookid]` | View book details and borrow a book |
| `/add-book` | Add a book to the community library |
| `/my-books` | Manage books added by you |
| `/my-borrows` | View and return borrowed books |
| `/profile-info` | Manage your profile and account settings |
| `/sign-in` | Sign in to BookNook |
| `/sign-up` | Create a BookNook account |


## API

BookNook uses a REST API for book, borrowing, and library management operations. Configure its base URL with `NEXT_PUBLIC_SERVER_BASE_URL` in your `.env` file.

**Base API URL**

```text
NEXT_PUBLIC_SERVER_BASE_URL
```

**Available endpoints**

| Endpoint | Method | Description |
| --- | --- | --- |
| `/books` | `GET` | Retrieve all books |
| `/books/{id}` | `GET` | Retrieve details for a specific book |
| `/add-book` | `POST` | Add a new book; authentication required |
| `/books/{id}` | `PATCH` | Update a book; authentication required |
| `/books/{id}` | `DELETE` | Delete a book; authentication required |
| `/my-books` | `GET` | Retrieve books added by the signed-in user |
| `/borrows` | `GET` | Retrieve the signed-in user’s borrowed books |
| `/borrows` | `POST` | Borrow an available book; authentication required |
| `/borrows/{id}` | `DELETE` | Return a borrowed book; authentication required |
| `/new-arrivals` | `GET` | Retrieve recently added books |
| `/top-categories` | `GET` | Retrieve popular book categories |

Authenticated requests use a JWT bearer token in the request header:

```http
Authorization: Bearer <jwt-token>
```

Book details fall back to the `/books` collection when a direct `/books/{id}` response is unavailable.


## Authentication

BookNook uses [Better Auth](https://www.better-auth.com/) for authentication and session management. It supports:

- Email and password registration and sign-in
- Google OAuth
- GitHub OAuth
- JWT-based session access
- Protected pages and API requests
- Profile updates and password changes

## Installation

### Prerequisites

- Node.js 20 or later
- npm, yarn, pnpm, or Bun
- A MongoDB Atlas database
- Google and/or GitHub OAuth credentials if social login is required

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd book-nook
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add the following values:

```env
BETTER_AUTH_SECRET=your-better-auth-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_BASE_URL=your-book-api-url
MONGODB_URI=your-mongodb-atlas-connection-string

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

`NEXT_PUBLIC_SERVER_BASE_URL` should point to the REST API that provides the book and borrowing endpoints. Keep OAuth secrets and database credentials private, and do not commit `.env` to source control.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.


## Deployment

BookNook can be deployed on [Vercel](https://vercel.com/). Add the same environment variables from the local `.env` file to the Vercel project settings before deploying.

## License

This project is created for educational and portfolio purposes.

## 👨‍💻 Author

**Md. Raju Ahammed**

- GitHub: [mdraju116](https://github.com/mdraju116)
