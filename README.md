# FEED POST

Welcome to the **FEED POST** project, a dynamic web application built with Next.js 14. This project allows users to create, view, and interact with posts. Users can share their thoughts and experiences by creating new posts, and they can engage with content by liking posts shared by others.

## Table of Contents

- [FEED POST](#feed-post)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
  - [Project Structure](#project-structure)
  - [Environment Variables](#environment-variables)
  - [Libraries and Tools](#libraries-and-tools)
  - [Deployment](#deployment)
  - [License](#license)
  - [Gif](#gif)
  - [](#)
  - [Start](#start)
  - [Learn More](#learn-more)
  - [Deploy on Vercel](#deploy-on-vercel)

## Features

- **Post Creation**: Users can create new posts with a title, image, and content.
- **Feed**: A feed where all posts by all users are displayed.
- **Like Feature**: Users can like and unlike posts, with the number of likes dynamically updated.
- **Error Handling**: Dedicated error pages for handling application errors.
- **Responsive Design**: The application is responsive and works well on both desktop and mobile devices.

## Getting Started

### Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (version 16 or above)
- npm (version 7 or above)
- Cloudinary account for image uploads

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/feed-post.git
   cd feed-post
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

### Running the Application

1. **Set up the environment variables:**

   Create a `.env.local` file in the root directory with the following variables:

   ```plaintext
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```plaintext
.
├── actions
│   └── posts
│       └── posts.js
├── app
│   ├── feed
│   │   ├── error.js
│   │   ├── loading.js
│   │   └── page.js
│   ├── new-post
│   │   ├── error.js
│   │   └── page.js
│   ├── globals.css
│   ├── icon.png
│   ├── layout.js
│   └── page.js
├── assets
│   └── logo.png
├── components
│   ├── form-submission
│   │   └── form-submit.js
│   ├── header
│   │   └── header.js
│   ├── like-icon
│   │   └── like-icon.js
│   ├── post-form
│   │   └── post-form.js
│   └── posts
│       └── posts.js
├── lib
│   ├── cloudinary
│   │   └── cloudinary.js
│   ├── format
│   │   └── format.js
│   └── posts
│       └── posts.js
├── public
├── node_modules
├── .env.local
├── .gitignore
├── .eslintrc.json
├── jsconfig.json
├── package-lock.json
├── package.json
├── README.md
└── posts.db
```

## Environment Variables

The application uses the following environment variables for Cloudinary integration:

- `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name.
- `CLOUDINARY_API_KEY`: Your Cloudinary API key.
- `CLOUDINARY_API_SECRET`: Your Cloudinary API secret.

Ensure these variables are set correctly in the `.env.local` file.

## Libraries and Tools

- **Next.js 14**: A powerful React framework for building web applications.
- **Cloudinary**: Used for image storage and management.
- **better-sqlite3**: A simple SQLite library for fast database operations.
- **React**: A JavaScript library for building user interfaces.

## Deployment

To deploy the application, follow the standard deployment process for Next.js applications. Ensure all environment variables are set up in the production environment.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

## Gif

Here is an expected gif of the preview of the App(News Feed Posts)

## ![News Archive Web gif](./public/feed-posts.gif)

## Start

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
