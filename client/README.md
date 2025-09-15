
# TimeCraft AI ✨

**Turning timetable chaos into clarity.**

TimeCraft AI is a web application designed to help colleges and teacher-education institutes in India automatically generate conflict-free, optimized academic timetables aligned with the NEP-2020 framework.

Our mission: **Save hours of manual scheduling, ensure fair faculty load, and give students a seamless academic journey.**

---

## 🚀 Features

### Intelligent Scheduling Engine
- Accepts structured inputs:
	- Student elective choices
	- Credit hours for each course
	- Full curriculum structure (core/electives/labs for FYUP, B.Ed., M.Ed., ITEP)
	- Faculty availability and workload
	- Room/lab capacities & equipment
	- Internships / teaching practice / fieldwork slots
- Produces semester-wise timetables with zero clashes
- "What-if" simulations (add courses, adjust credits)
- Manual editing with instant clash detection
- Scales for new courses and policy updates

### Exports & Integrations
- Export timetables in PDF and Excel
- Hooks for Academic Management Systems

### User Roles & Dashboards
- **Admin:** upload datasets, configure constraints, generate and approve schedules
- **Faculty:** view personal teaching slots, block/unblock availability
- **Students:** view personalized timetable (read-only on mobile)
- Quick stats: total classes, clashes solved, faculty utilization %

### UI / UX
- Clean dashboard with calendar & table views
- Drag-and-drop editing of slots with smooth animations
- Responsive for desktop & tablet (mobile is view-only)
- Calming blues & mint greens, generous white space, rounded cards, friendly Material icons

### Stretch Ideas (optional)
- Recommend optimal electives based on capacity/history
- Visual faculty load heatmaps
- Push notifications for changes

---

## 🛠 Tech Stack

- **Frontend:** React + Tailwind CSS or Material UI
- **Backend:** Node.js (Express) or Django
- **Database:** MongoDB or PostgreSQL
- **AI Engine:** Python with OR-Tools / constraint solver, using JSON for data exchange

---

## 💫 Brand & Tone

- **Name:** TimeCraft AI
- **Tagline:** Turning timetable chaos into clarity.
- **Style:** Approachable, modern, optimistic
- **Goal:** Empower faculty and students, not just automate bureaucracy

Every interaction reassures users that complex timetables can be solved with calm intelligence.

---

## Development

This project uses [React](https://react.dev/) and [Vite](https://vitejs.dev/) for a fast, modern development experience.

To get started:

```bash
pnpm install
pnpm dev
```

---

**Let’s build a tool that makes academic scheduling effortless, fair, and empowering!**
