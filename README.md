# Job Board

## Demo
https://job-board-eight-beta.vercel.app/

## About
Job Board is a web application designed to connect candidates with employers. It allows users to search and filter job offers, manage applications, and interact with role-specific features.

The application focuses on solving real-world challenges such as filtered search, role-based UI management, and responsive design. Depending on the user role, the platform provides different functionality, including job creation, application tracking, and candidate management.

## Tech Stack
- React
- TypeScript
- Redux Toolkit
- TanStack Query
- Material UI (MUI)
- Tailwind CSS

## Features
- Real-time form validation
- Apply for jobs with CV (PDF) and optional cover letter
- Application status tracking
- Role-based UI and user experience
- Download uploaded files
- Manage applicants (change status)
- Create, update, and delete job offers
- Advanced filtering for job search

## How to Run
```bash
npm install
npm run dev
```

## Architecture and Decisions

- Clear separation of responsibilities:
  - Redux Toolkit for global UI state
  - TanStack Query for server state and API communication
- Token stored in application state using redux-persist instead of cookies to avoid cross-origin cookie issues
- React Hook Form for predictable form handling and real-time validation
- Component-based architecture for better scalability and maintainability

## Challenges

### Role-based UI
- Different dashboards and functionality depending on user role
- Route protection to prevent unauthorized access

### Responsive design
- Adapting Material UI components for mobile devices

### Navigation on mobile devices
- Implementing a user-friendly mobile menu

## Future Improvements

- Add FAQ and blog sections
- Support company profiles instead of only individual employers
- Improve user onboarding experience