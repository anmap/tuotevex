# TuoteVex

A product search application built with Vue 3 and Vite, using the [DummyJSON Products API](https://dummyjson.com/docs/products#products-search). The name is inspired by [AutoVex](https://autovex.fi) (and shamelessly the typefaces as well 😄).

## Features

- **Product Cards** - Display product image, brand, title, rating, description, price, and in stock status.
- **Search Bar** - Search products with URL query sync for shareable links
- **Infinite Scroll** - Automatically loads more results as you scroll
- **Responsive** - Stylings and responsive layout with Tailwind CSS
- **Accessibility (a11y)** - Skip links, ARIA labels, screen reader announcements, etc.

## Tech Stack

- Vue 3 + TypeScript
- Vite
- Tailwind CSS
- TanStack Vue Query
- VueUse
- Vue Router
- Vitest

## Getting Started

```sh
npm install
npm run dev
```

## Scripts

| Command             | Description                 |
| ------------------- | --------------------------- |
| `npm run dev`       | Start development server    |
| `npm run build`     | Build for production        |
| `npm run test:unit` | Run unit tests              |
| `npm run lint`      | Lint and fix files          |
| `npm run storybook` | Start Storybook UI workshop |
