# Coursecraft

A responsive course catalog built with React, Vite, and React Router. Browse all courses, filter by learning level, and open a course to see its description and topics.

## Run locally

```sh
npm install
npm run dev
```

## Routes

- `/` — all courses
- `/category/Beginner` — beginner courses
- `/category/Intermediate` — intermediate courses
- `/courses/:slug` — course details, or a not-found message for an unknown slug

Course information is stored locally in `src/data/courses.js`.
