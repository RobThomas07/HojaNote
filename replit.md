# HojaNote - Student Productivity Platform

## Overview

HojaNote is a comprehensive productivity platform designed specifically for students. It provides tools for creating typed and handwritten notes, managing reminders, and organizing class schedules. The application features a clean, modern interface inspired by Notion, Linear, and Google Workspace, with persistent navigation and integrated advertisement slots for monetization.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**UI Component Library**: Radix UI primitives with shadcn/ui components, providing accessible, customizable components styled with Tailwind CSS. The design system follows a "new-york" style with consistent spacing (2, 4, 8, 12, 16 Tailwind units), custom color tokens, and elevation effects.

**Routing**: Wouter for lightweight client-side routing with protected routes for authenticated users.

**State Management**: 
- TanStack Query (React Query) for server state and data fetching
- React Context API for authentication state
- Local component state for UI interactions

**Styling Approach**: Tailwind CSS with custom design tokens defined in CSS variables, supporting light/dark themes. The design emphasizes information density with clear hierarchy, using Inter for UI text and JetBrains Mono for code snippets.

**Layout Strategy**: Three-column grid structure:
- Fixed left sidebar (16rem/256px) for navigation and advertisements
- Flexible main content area for the active workspace
- Optional right panel (20rem/320px) for metadata/tags

### Backend Architecture

**Server**: Express.js with TypeScript, serving both API endpoints and static frontend assets in production.

**Development Setup**: Vite middleware mode for hot module replacement during development, with custom error overlays and Replit-specific plugins for cartographer and dev banner.

**Session Management**: In-memory storage interface with CRUD operations for users. The architecture is designed to be easily swappable with a database-backed implementation.

**API Design**: RESTful endpoints prefixed with `/api`, with structured error handling and request/response logging.

### Authentication System

**Provider**: Firebase Authentication for email/password authentication.

**Implementation**: 
- Context-based auth state management (`AuthContext`)
- Protected route wrapper component that renders auth form for unauthenticated users
- Firebase Auth SDK handles token management and session persistence

**User Flow**: Users sign up or log in via email/password. Authentication state is persisted by Firebase and consumed via React context throughout the application.

### Data Storage Solutions

**Primary Database**: Firebase Firestore for real-time note storage and synchronization.

**Schema Design**: Notes collection with user-scoped access control via Firestore security rules. Each note contains:
- `userId`: Owner reference for security rules
- `title`, `content`: Note data
- `tags`: Array of category strings
- `createdAt`, `updatedAt`: Timestamps

**Real-time Subscriptions**: The `notesService` uses Firestore's `onSnapshot` for live updates, automatically syncing notes across devices and sessions.

**Security Model**: Firestore security rules ensure users can only read/write their own notes by validating `request.auth.uid` matches the note's `userId`.

**Future Migration Path**: The codebase includes Drizzle ORM configuration for PostgreSQL, indicating planned migration to a relational database. The Neon serverless Postgres driver is already installed but not yet integrated.

### External Dependencies

**Firebase Services**:
- Firebase Authentication (email/password provider)
- Cloud Firestore (NoSQL database with real-time sync)
- Configuration via environment variables (API key, project ID, etc.)

**Database (Future)**:
- Neon Serverless PostgreSQL with Drizzle ORM
- Connection pooling via `@neondatabase/serverless`
- Schema migrations managed with drizzle-kit

**UI Framework**: 
- Radix UI (accessible component primitives)
- shadcn/ui (pre-built component implementations)
- Lucide React (icon library)

**Development Tools**:
- Replit-specific Vite plugins for cartographer and dev banner
- Runtime error modal overlay for development

**Validation**: Zod for schema validation with drizzle-zod integration for type-safe database operations.

**Advertisement Integration**: Static image assets for sidebar advertisements located in `attached_assets/generated_images/`.