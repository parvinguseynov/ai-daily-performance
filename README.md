# StaffCo Daily Team Performance Alert - AI Feature Prototype

An interactive Next.js prototype showcasing StaffCo's AI-powered daily team performance monitoring feature.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you'll be redirected to the dashboard.

## 📁 Project Structure

```
/app
  /dashboard/page.tsx     - Team Dashboard with AI alert banner
  /settings/page.tsx      - AI & Automation settings
  layout.tsx              - Sidebar + Top bar layout
/components
  Sidebar.tsx            - Left navigation
  TopBar.tsx             - Top header bar
  KPICard.tsx            - Performance metric cards
  AIAlertBanner.tsx      - Main AI alert feature (3 states)
  UserTable.tsx          - Team performance table
```

## ✨ Key Features

### 1. Team Dashboard (`/dashboard`)
- **KPI Cards**: 6 metrics showing worked hours, productivity, idle time, focus time
- **AI Alert Banner**: The star feature with:
  - **3 Demo States**: Alerts / Clear / Pending (toggle via pills)
  - **Collapsed State**: One-liner with issue count and chips
  - **Expanded State**: Accordion sections for High Idle, Low Focus, Burnout Risk, Late Start
  - **Premium Styling**: Blue→purple gradient accents, smooth animations
- **User Performance Table**: 4 users with progress bars, donut charts, status indicators
  - Princess Coronel is flagged (orange row highlight + red dot)
  - Mirveli Fayazzade shows as "Online" (green dot)

### 2. Settings Page (`/settings`)
- **AI & Automation Tab**: Configure alert thresholds
  - 4 toggle-able rules with custom thresholds
  - Compound conditions with "AND" logic
  - Email digest toggle
  - Save/Reset functionality with toast notification
  - Access control notice
- Other tabs are placeholders

## 🎨 Design System

- **Font**: DM Sans (Google Fonts)
- **Colors**:
  - Primary: `#3B82F6` (blue)
  - Purple: `#6366F1`
  - AI Gradient: `from-blue-500 to-purple-600`
  - Sidebar: `#0F172A` (slate-900)
- **Components**: Tailwind CSS with custom gradients and animations
- **Icons**: Lucide React

## 🎯 Navigation

- Sidebar icons navigate between Dashboard and Settings
- "Alert Settings" link in banner → Settings page
- All navigation is functional

## 📊 Data

All data is **hardcoded** - no API calls. Perfect for stakeholder demos.

## 🛠 Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React Icons
- DM Sans Font

## 💡 Usage Notes

- Optimized for desktop (1400px+)
- All interactions are client-side
- Demo state switcher shows 3 banner variations
- Settings changes trigger a success toast
- Smooth expand/collapse animations throughout

---

**Built for StaffCo stakeholder review** 🚀
