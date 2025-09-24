1 — Project scaffold & monorepo layout

Implementation tasks

Create monorepo layout:

/apps
  /web-next       # Next.js (Tailwind, shadcn/ui)
  /mobile-expo    # Expo app
/packages
  /ui             # shared design tokens, small primitives
  /data           # hardcoded sample data (json/ts)
  /utils          # sync queue, zod schemas, types


Add TypeScript config (tsconfig.base.json), workspace package manager (pnpm preferred).

Your tasks

Decide package manager (pnpm / yarn / npm). (I recommend pnpm.)

Confirm whether packages/ui will be JS-only or use cross-platform tech (Tamagui / shadcn).

Acceptance

Directory structure created and committed. Basic package.json workspace defined.

2 — Dev environment & onboarding

Implementation tasks

Add dev scripts: dev:web, dev:mobile, lint, test.

Create CONTRIBUTING.md with branch naming and review rules.

Install linters/prettier and set up Husky pre-commit hooks.

Your tasks

Install Node LTS locally and confirm platform (macOS/Win/Linux) used for testing.

Share device(s) you’ll test on (e.g., Android Pixel 3, iPhone 11) so we prioritize compatibility.

Acceptance

npm run dev:web and npm run dev:mobile run without breaking errors.

Husky linting runs pre-commit.

3 — Design system & tokens

Implementation tasks

Create packages/ui/tokens.ts (or JSON) with color tokens, spacing, radii, typography scale.

Add dark-mode tokens only (background, surface, text, muted, primary, secondary, accent).

Export tokens for both web and mobile packages.

Your tasks

Confirm one color palette (Teal / Indigo / Emerald) or provide final hexs for primary/secondary/accent.

Approve typography choices (font family, base size, scale).

Acceptance

packages/ui exports tokens used by both web-next and mobile-expo.

A DESIGN_TOKENS.md documents names and hexs.

4 — Hardcoded data & fixtures

Implementation tasks

Create packages/data/sample-events.ts containing:

2 events, each with 4–6 contacts.

Contacts include: id, name, role, company, tags[], sample photo URL (placeholder), sample audio URL (placeholder), createdAt, syncStatus.

Use mock audio URLs (short clips) and placeholder images in /public/mock/.

Your tasks

Provide any real sample images or voice clips you want embedded; otherwise approve placeholders.

Approve wording for 2–3 LinkedIn message templates to hardcode.

Acceptance

packages/data loads via imports in Next.js and Expo without network calls.

UI screens show hardcoded contacts and playable audio.

5 — UI integration (web)

Implementation tasks

Integrate Cursor output into apps/web-next pages:

Events list page (route /events)

Event contacts page (/events/[id])

Contact view modal/page (/contact/[id])

Capture page (/capture)

Follow-up dashboard (/followups)

Use Tailwind + shadcn/ui primitives and packages/ui tokens.

All data reads use the hardcoded fixtures for now.

Your tasks

Validate screen flows by clicking through in browser and note UI bugs or friction points.

Acceptance

All core screens render using hardcoded data and match the intended mobile-first layout on a browser mobile viewport.

6 — UI integration (mobile Expo)

Implementation tasks

Create parallel screens in apps/mobile-expo reusing tokens from packages/ui.

Implement bottom tab navigation (Events, Capture, Follow-ups, Profile).

Use platform-appropriate components (TouchableOpacity, Pressable) and ensure large tap targets.

Your tasks

Install Expo Go on your test device and provide feedback on tap target sizing and camera permission prompts.

Acceptance

Mobile app runs in Expo Go and shows the same hardcoded data + playable audio (use Expo AV for audio playback).

7 — Capture flows — photo & audio (hardcoded → real)

Implementation tasks

Build capture form UI: name, company, role, tags chips, photo placeholder, audio recorder UI.

For now implement:

Photo: file input on web (accept camera when possible), Expo Camera on mobile (but default to placeholder save).

Audio: play/pause UI for hardcoded samples; stubbed record button that saves placeholder audio.

Ensure UI is usable one-handed and auto-focuses the first input.

Your tasks

If you want real recording now: record 3–5 sample 10–30s voice notes and add them to /public/mock/audio.

Decide the tag default order and approve tag colors.

Acceptance

Capture screen saves a new contact into local fixture store and shows it in the event list (even if saved locally only).

8 — Local storage & offline-first layer (web + mobile)

Implementation tasks

Implement local DB layer:

Web: Dexie.js (IndexedDB) with schemas for Event, Contact, FollowUp.

Mobile: Expo SQLite or WatermelonDB (if you want sync complexity later).

Add fields: createdAt, updatedAt, syncStatus (local|pending|synced), lastConflictAt.

Implement basic CRUD APIs in packages/utils/local-db.ts and expose hooks useContacts, useCreateContact.

Your tasks

Confirm Dexie.js for web and Expo SQLite for mobile (or choose WatermelonDB if you prefer one library across platforms).

Decide how long to keep local data (e.g., purge after 1 year) if needed.

Acceptance

Data persists after refresh and when device is offline (simulate offline and confirm entries exist).

9 — Search, filtering, and performance

Implementation tasks

Implement client-side fuzzy search with Fuse.js in packages/utils/search.ts.

Contacts list should support filtering by tag and by text query.

Optimize lists: virtualization for web (react-window) and flatlist optimizations on mobile (getItemLayout if fixed height).

Your tasks

Confirm which tags to show as default filters in the top bar.

Acceptance

Search returns relevant results and lists scroll smoothly with 100+ mocked contacts.

10 — Follow-up dashboard & templates

Implementation tasks

Implement follow-up dashboard aggregating contacts with followUpStatus !== done.

Add UI to toggle status and add a reminder note locally.

Add 2–3 LinkedIn message templates (hardcoded) with template placeholders ({{name}}, {{company}}).

Your tasks

Write 3 short LinkedIn templates you want shipped in the MVP, or approve default examples.

Acceptance

Toggling a contact status updates local DB and removes/updates the contact on the dashboard.

11 — Sync layer & Supabase integration (staging)

Implementation tasks

Create packages/utils/sync-queue.ts that:

Queues local changes (create/update/delete).

Retries sync on regained connectivity.

Handles basic conflict resolution (last-write-wins or merge rule).

Add a sync endpoint that talks to Supabase REST/JS client (tables: events, contacts, followups).

Protect sensitive keys with environment variables and read from .env.local.

Your tasks

Create a Supabase project and provide SUPABASE_URL + SUPABASE_ANON_KEY for staging (or add keys to your Vercel/EAS later).

Confirm table column names and an initial schema; I can generate the SQL if you want.

Acceptance

When online, create a contact locally → the sync queue pushes it to Supabase and syncStatus becomes synced.

When offline, create contact → syncStatus=local|pending and later syncs when online.

12 — Notifications & reminders

Implementation tasks

Implement local reminders:

Web: Notifications API (and a fallback in-page reminder).

Mobile: Expo Notifications for local notifications.

Add UI to set simple reminders (date/time) per contact.

Your tasks

Opt-in to notifications on devices and confirm testing times.

Decide on default reminder times (e.g., 24h, 72h).

Acceptance

Create a reminder and receive a local notification at the scheduled time (on device).

13 — Testing & QA

Implementation tasks

Add unit tests for:

Local DB helpers

Sync queue logic

UI snapshot tests for core components

Add manual test plan specifically for offline→online behavior and 100+ contacts stress test.

Your tasks

Run the manual test plan on physical devices (both web mobile viewport and mobile Expo).

Report UX problems and prioritise fixes.

Acceptance

All critical tests pass in CI.

App handles 100+ contacts with acceptable memory and UI performance on target device(s).

14 — Analytics, error tracking & metrics

Implementation tasks

Add Sentry for error tracking.

Add PostHog/Amplitude to measure: contact capture time, follow-up completion rates, sync failures.

Capture these events in packages/utils/analytics.ts.

Your tasks

Create accounts for Sentry + analytics and provide keys (or add to environment config).

Acceptance

Events appear in analytics dashboard and Sentry captures a thrown test error.

15 — Deployment (web + staging Supabase)

Implementation tasks

Configure Vercel for apps/web-next.

Configure Supabase environments (staging / prod).

Document environment variables in ENVIRONMENTS.md (no secrets in repo).

Add simple deployment pipeline that deploys to staging on merges to main or a staging branch.

Your tasks

Provision Vercel and Supabase projects and add environment variables to each platform.

Approve the first staging deploy and sanity-check flows.

Acceptance

Staging web URL loads the app and authenticates with Supabase (if auth in scope).

Sync to Supabase works from staging.

16 — Usability testing & measuring core success metrics

Implementation tasks

Add a tiny in-app onboarding modal to capture simple usability metrics (optional).

Add a small built-in stopwatch to measure capture time for a sample of sessions (for internal testing).

Your tasks

Run 5–10 quick usability sessions (simulate a career fair) and capture:

Capture time (goal: under 30s)

Any friction points

Follow-up completion feedback

Acceptance

You have concrete quantitative and qualitative feedback and a short list of top 3 fixes to improve capture speed.

17 — Polishing & production readiness

Implementation tasks

Finalize camera/audio quality: compress audio files, limit size (e.g., 60s max).

Add accessibility checks (contrast, button labels).

Add basic E2E tests (Cypress / Playwright for web).

Add a privacy-first data policy and local data controls (export/delete).

Your tasks

Provide app name, app icon, and short app description for stores or landing page.

Review privacy language and approve default export/delete behaviors.

Acceptance

App passes basic accessibility checks and has privacy/export UX in settings.