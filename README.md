# Wikipedia Live Stream Monitor 📡# Wikipedia Live Stream UI 📡# React + TypeScript + Vite



A modern, real-time web application that displays live Wikipedia edits, new pages, and log events as they happen across different Wikipedia language editions. Built with React 19, TypeScript, and Material-UI with a professional corporate design.



![License](https://img.shields.io/badge/license-MIT-blue.svg)A real-time web application that displays live Wikipedia edits, new pages, and log events as they happen across different Wikipedia language editions. Built with React, TypeScript, and Material-UI.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

![React](https://img.shields.io/badge/React-19.2-blue.svg)

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)

![Vite](https://img.shields.io/badge/Vite-7.2-purple.svg)

![Material--UI](https://img.shields.io/badge/Material--UI-7.3-blue.svg)![License](https://img.shields.io/badge/license-MIT-blue.svg)Currently, two official plugins are available:



## ✨ Features![React](https://img.shields.io/badge/React-19.2-blue.svg)



### 🎯 Core Functionality![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- **Real-Time Streaming**: Displays live Wikipedia changes using Server-Sent Events (SSE)

- **Pause/Resume**: Pause the display while events continue buffering in background![Vite](https://img.shields.io/badge/Vite-7.2-purple.svg)- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- **Auto-Purging**: Configurable automatic removal of old events (30s, 1m, 2m, 5m, 10m, or never)

- **Event Buffering**: Displays up to 500 events with smooth performance

- **Connection Management**: Connect, disconnect, pause, and clear events with intuitive controls

## 🌟 Features## React Compiler

### 🔍 Advanced Filtering

Filter Wikipedia events by:

- **Wiki Language**: English, Vietnamese, German, French, Spanish (🇬🇧 🇻🇳 🇩🇪 🇫🇷 🇪🇸)

- **Event Type**: Edits, new pages, logs, or all- **Real-Time Streaming**: Displays live Wikipedia changes using Server-Sent Events (SSE)The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- **Namespace**: Main articles, talk pages, user pages, project pages, etc.

- **Bot Activity**: Include all, exclude bots, or show only bot edits- **Advanced Filtering**: Filter events by:

- **Minimum Delta**: Filter by edit size (byte changes)

- **Auto-Purge Time**: Configure how long to keep events  - Wiki language (English, Vietnamese, German, French, Spanish)## Expanding the ESLint configuration



### 🎨 User Experience  - Event type (edit, new page, log)

- **🎭 Dark/Light Theme**: Professional theme with smooth transitions (starts in dark mode)

- **🎓 Interactive Tour**: Comprehensive guided tour for first-time users (14 steps)  - Namespace (article, talk, user, etc.)If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

- **✨ Smooth Animations**: 

  - Slide-in, fade-in, and scale-in effects  - Bot activity (exclude/include bots)

  - Hover animations on cards and buttons

  - Pulse animation for live indicator  - Minimum byte change (delta)```js

  - Shimmer effect on progress bars

  - Floating animations for key elements- **Dark/Light Theme**: Toggle between light and dark modes for comfortable viewingexport default defineConfig([

- **📊 Statistics Dashboard**: Real-time metrics with hover effects

  - Current visible events- **Auto-Purging**: Automatically removes old events (configurable, default 10 seconds)  globalIgnores(['dist']),

  - Total received (session)

  - Pause buffer count- **Connection Management**: Connect, disconnect, and clear event list with ease  {

  - Max age setting

  - Next purge countdown- **Responsive Design**: Works seamlessly on desktop and mobile devices    files: ['**/*.{ts,tsx}'],

- **⏱️ Event Age Tracking**: 

  - Tooltips showing event age- **Event Details**: View timestamp, user, title, byte changes, and edit comments    extends: [

  - Visual fade effect (opacity decreases with age)

  - Color-coded freshness indicators (🟢 Fresh, 🟡 Recent, 🟠 Old)      // Other configs...

- **🏷️ Namespace Badges**: Color-coded chips for easy identification

- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile## 🏗️ Architecture



### 🚀 Production Features      // Remove tseslint.configs.recommended and replace with this

- **Loading States**: Spinners and progress indicators

- **Error Handling**: Clear error messages and connection statusThis application is the **frontend** component that connects to the [Wiki Stream Backend](https://github.com/santoshbammigatti/wiki-stream-backend).      tseslint.configs.recommendedTypeChecked,

- **Status Indicators**: Real-time connection status with color coding

- **Progress Tracking**: Linear progress bar showing purge cycle      // Alternatively, use this for stricter rules

- **Helper Text**: Non-blocking guidance for all inputs

- **Keyboard Navigation**: Full accessibility support### Tech Stack      tseslint.configs.strictTypeChecked,



## 🏗️ Architecture      // Optionally, add this for stylistic rules



### Frontend Stack- **Framework**: React 19 with TypeScript      tseslint.configs.stylisticTypeChecked,

- **React 19.2**: Latest React with improved performance

- **TypeScript 5.9**: Type-safe development- **UI Library**: Material-UI (MUI) v7

- **Vite 7.2**: Lightning-fast build tool with HMR

- **Material-UI 7.3**: Professional component library- **Build Tool**: Vite 7      // Other configs...

- **React Joyride**: Interactive guided tours

- **Day.js**: Lightweight date formatting- **Styling**: Emotion (CSS-in-JS)    ],



### Backend Integration- **Date Handling**: Day.js    languageOptions: {

- Connects to Django backend via Server-Sent Events

- Proxied through Vite dev server (`/api` → `http://localhost:8000`)- **Linting**: ESLint 9      parserOptions: {

- Backend repository: `wiki-stream-backend`

        project: ['./tsconfig.node.json', './tsconfig.app.json'],

## 📦 Installation

### How It Works        tsconfigRootDir: import.meta.dirname,

### Prerequisites

- Node.js 16+ (project uses Node 16.20.2)      },

- npm 8+

- Backend server running at `http://localhost:8000`1. **User Interface**: Built with React and Material-UI components      // other options...



### Setup2. **Filters**: User selects filtering criteria (wiki, type, namespace, bot, min delta)    },



1. **Clone the repository**3. **Connection**: Uses EventSource API to establish SSE connection to backend  },

   ```bash

   git clone https://github.com/santoshbammigatti/wiki-stream-ui.git4. **Real-Time Updates**: Backend streams filtered Wikipedia events])

   cd wiki-stream-ui

   ```5. **Display**: Events are displayed in a table with auto-purging of old data```



2. **Install dependencies**6. **Theme Support**: Dynamic theme switching between light and dark modes

   ```bash

   npm install --legacy-peer-depsYou can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

   ```

   *Note: `--legacy-peer-deps` is needed for React 19 compatibility with some packages*## 🚀 Getting Started



3. **Start development server**```js

   ```bash

   npm run dev### Prerequisites// eslint.config.js

   ```

   The app will be available at `http://localhost:5173`import reactX from 'eslint-plugin-react-x'



4. **Build for production**- Node.js (v18 or higher)import reactDom from 'eslint-plugin-react-dom'

   ```bash

   npm run build- npm or yarn

   ```

- Backend server running at `http://localhost:8000` ([wiki-stream-backend](https://github.com/santoshbammigatti/wiki-stream-backend))export default defineConfig([

5. **Preview production build**

   ```bash  globalIgnores(['dist']),

   npm run preview

   ```### Installation  {



## 🎮 Usage    files: ['**/*.{ts,tsx}'],



### First Time Use1. **Clone the repository**    extends: [

1. Open the application - the **interactive tour** will automatically start after 1 second

2. Follow the 14-step guided tour to learn all features   ```bash      // Other configs...

3. Skip anytime by clicking "Skip Tour" or restart later with the "Tour" button

   git clone https://github.com/santoshbammigatti/wiki-stream-ui.git      // Enable lint rules for React

### Connecting to Stream

1. **Configure Filters**: Select your preferred wiki, filters, and auto-purge time   cd wiki-stream-ui      reactX.configs['recommended-typescript'],

2. **Click Connect**: Start receiving live events (green button)

3. **Monitor Events**: Watch the real-time table populate with Wikipedia changes   ```      // Enable lint rules for React DOM

4. **Pause/Resume**: Pause display anytime (events buffer in background)

5. **Clear Events**: Reset the view and counters      reactDom.configs.recommended,



### Using Filters2. **Install dependencies**    ],



**Wiki Language** 📚   ```bash    languageOptions: {

- Choose from 5 language editions

- Each has independent event streams   npm install      parserOptions: {



**Event Type** 🔍   ```        project: ['./tsconfig.node.json', './tsconfig.app.json'],

- `Edit`: Article modifications

- `New`: Newly created pages        tsconfigRootDir: import.meta.dirname,

- `Log`: Administrative actions

- `Any`: All event types3. **Start the development server**      },



**Namespace** 📂   ```bash      // other options...

- `0`: Main articles (encyclopedic content)

- `1`: Talk pages (discussions)   npm run dev    },

- `2`: User pages (user profiles)

- `4`: Wikipedia project pages   ```  },

- Leave blank for all namespaces

])

**Bot Filter** 🤖

- `Any`: Show all edits4. **Open your browser**```

- `Humans Only`: Exclude automated edits

- `Bots Only`: Show only automated edits   ```

   http://localhost:5173

**Min Δ Bytes** 📏   ```

- Set minimum edit size to filter

- Higher values = more significant edits### Available Scripts

- 0 = show all sizes

- `npm run dev` - Start development server with hot reload

**Auto-Purge** ⏰- `npm run build` - Build for production

- `Never (♾️)`: Keep all events- `npm run preview` - Preview production build

- `30 seconds`: Quick rotation- `npm run lint` - Run ESLint

- `1-10 minutes`: Various retention times

- Progress bar shows time until next purge## 🔧 Configuration



### Statistics Panel### Backend Connection



The dashboard shows 5 key metrics:The frontend connects to the backend via a Vite proxy configured in `vite.config.ts`:



1. **Current Events** (Blue): Visible in table```typescript

2. **Total Received** (Green): All-time session countserver: {

3. **Pause Buffer** (Yellow/Blue): Events waiting during pause  port: 5173,

4. **Max Age** (Orange): Auto-purge setting  proxy: {

5. **Next Check** (Yellow): Countdown to next purge cycle    '/api': {

      target: 'http://localhost:8000',

### Keyboard & Accessibility      changeOrigin: true,

- Full keyboard navigation support      secure: false,

- ARIA labels on all interactive elements    },

- High contrast theme options  },

- Screen reader compatible}

```

## 🎨 Theme & Design

This proxies all `/api/*` requests to `http://localhost:8000`.

### Color Palette

**Light Mode:**### Environment Variables

- Primary: `#0052CC` (Professional Blue)

- Secondary: `#FF5630` (Accent Orange-Red)You can modify the backend URL by updating the proxy target in `vite.config.ts`.

- Background: `#F7F8FC` (Clean Neutral)

## 📊 Components Overview

**Dark Mode:**

- Primary: `#4C9AFF` (Bright Blue)### `App.tsx`

- Secondary: `#FF8F73` (Bright Orange)Main application component that:

- Background: `#0D1117` (GitHub Dark)- Manages theme state (light/dark mode)

- Handles filter state

### Typography- Orchestrates connection to backend

- Font: Inter (system fallback)- Renders the UI layout

- Letter spacing: -0.02em for headers

- Weights: 400 (body), 600-800 (emphasis)### `EventTable.tsx`

Displays streaming events in a table format with:

### Animations- Timestamp (HH:mm:ss)

All animations follow Material Design principles:- Wiki language

- **Duration**: 200-400ms for interactions- Event type

- **Easing**: Cubic-bezier curves for natural motion- Namespace

- **Respects**: `prefers-reduced-motion` for accessibility- Page title (with tooltip for long titles)

- User

## 🧩 Component Structure- Bot indicator

- Byte delta (with +/- sign)

```- Edit comment (truncated)

src/

├── App.tsx                 # Main application with tour### `Filters.tsx`

├── theme.ts                # Material-UI theme configurationFilter controls including:

├── types.ts                # TypeScript type definitions- Wiki selector (enwiki, viwiki, dewiki, frwiki, eswiki)

├── components/- Type selector (edit, new, log, any)

│   ├── EventTable.tsx      # Event display with age tracking- Namespace input

│   ├── Filters.tsx         # Filter controls with IDs- Bot filter (any, true, false)

│   └── NamespaceBadge.tsx  # Color-coded namespace chips- Minimum delta input

└── hooks/

    └── useEventSource.ts   # SSE connection & lifecycle### `useEventSource.ts`

```Custom React hook that:

- Manages SSE connection lifecycle

### Key Components- Handles connection states (idle, connecting, open, error, closed)

- Auto-purges old events

**App.tsx**- Maintains event buffer with configurable max size

- Main container with theme provider

- Tour configuration (14 steps)## 🎨 Theme

- Connection management

- Statistics calculationThe application supports both light and dark themes powered by Material-UI's theming system. Users can toggle between themes using the theme switcher in the app bar.

- Purge countdown timer

## 🔗 Related Repositories

**EventTable.tsx**

- Sortable table with Material-UI- **Backend**: [wiki-stream-backend](https://github.com/santoshbammigatti/wiki-stream-backend)

- Age tracking with fade effect

- Namespace badges## 📝 API Integration

- Byte delta color coding

- Timestamp tooltipsThe frontend expects the backend to expose an SSE endpoint at:



**Filters.tsx**```

- All filter controls with IDsGET /api/stream?wiki={wiki}&type={type}&namespace={ns}&bot={bool}&min_delta={num}

- Helper text for guidance```

- Emoji icons for visual clarity

- Responsive layout### Query Parameters



**useEventSource.ts**- `wiki`: Wikipedia language edition (e.g., "enwiki")

- SSE connection management- `type`: Event type ("edit", "new", "log")

- Pause/resume logic with useRef- `namespace`: Namespace ID (e.g., 0 for main articles)

- Auto-purge with 1-second precision- `bot`: Boolean string ("true" or "false") to filter bot edits

- Event buffering (max 500)- `min_delta`: Minimum byte change for edits



**NamespaceBadge.tsx**### Event Format

- 16 predefined namespaces

- Color-coded chipsEach SSE message contains a JSON object:

- Tooltips with descriptions

```typescript

## 🔧 Configuration{

  wiki?: string;

### Vite Proxy  type?: "edit" | "new" | "log";

Development requests to `/api` are proxied to the backend:  namespace?: number;

  title?: string;

```typescript  user?: string;

// vite.config.ts  bot?: boolean;

server: {  timestamp?: number;  // Unix timestamp in seconds

  proxy: {  comment?: string;

    '/api': {  length?: {

      target: 'http://localhost:8000',    old?: number;

      changeOrigin: true,    new?: number;

    }  };

  }  log_type?: string;    // For type="log"

}  log_action?: string;  // For type="log"

```}

```

### Auto-Purge Settings

Configure in `Filters.tsx`:## 🛠️ Development

```typescript

const purgeOptions = [### Project Structure

  { value: 0, label: '♾️ Never' },

  { value: 30, label: '30 seconds' },```

  { value: 60, label: '1 minute' },wiki-stream-ui/

  { value: 120, label: '2 minutes' },├── src/

  { value: 300, label: '5 minutes' },│   ├── components/

  { value: 600, label: '10 minutes' },│   │   ├── EventTable.tsx    # Event display table

];│   │   └── Filters.tsx       # Filter controls

```│   ├── hooks/

│   │   └── useEventSource.ts # SSE connection hook

### Theme Mode│   ├── App.tsx               # Main app component

Change default theme in `App.tsx`:│   ├── main.tsx              # Entry point

```typescript│   ├── theme.ts              # Theme configuration

const [mode, setMode] = useState<"light" | "dark">("dark"); // Change to "light"│   ├── types.ts              # TypeScript types

```│   └── assets/               # Static assets

├── public/                   # Public assets

## 🐛 Troubleshooting├── index.html                # HTML template

├── vite.config.ts            # Vite configuration

### Connection Issues├── tsconfig.json             # TypeScript config

**Error: Connection error!**└── package.json              # Dependencies

- Ensure backend is running at `http://localhost:8000````

- Check backend logs for errors

- Verify network connectivity### Adding New Features



**Events not appearing:**1. **New Filters**: Update `Filters.tsx` and `FiltersType` interface

- Check filters aren't too restrictive2. **New Event Fields**: Update `RecentChangeEvent` interface in `types.ts`

- Verify backend is streaming events3. **Styling**: Modify `theme.ts` or use MUI's `sx` prop

- Try clearing events and reconnecting4. **Connection Logic**: Modify `useEventSource.ts` hook



### Tour Issues## 🐛 Troubleshooting

**Tour not starting:**

- Clear localStorage: `localStorage.removeItem('wikiStreamTourCompleted')`### Connection Issues

- Refresh the page

- Check browser console for errors- Ensure the backend is running at `http://localhost:8000`

- Check browser console for CORS errors

**Tour button disabled:**- Verify the proxy configuration in `vite.config.ts`

- Disconnect from stream first

- Tour is disabled while streaming to avoid interference### No Events Displaying



### Performance Issues- Check the filters - try setting all to "Any" or default values

**Too many events:**- Verify the backend is receiving and processing Wikipedia events

- Enable auto-purge (shorter duration)- Check the browser's Network tab for SSE connection

- Increase min delta filter

- Use more restrictive filters### Build Errors



**Slow animations:**- Delete `node_modules` and `package-lock.json`, then run `npm install`

- Check for browser extensions blocking animations- Clear Vite cache: `rm -rf node_modules/.vite`

- Verify hardware acceleration is enabled- Ensure you're using Node.js v18+

- Try reducing browser zoom level

## 📄 License

## 📝 API Integration

This project is licensed under the MIT License.

### Stream Endpoint

```## 👤 Author

GET /stream?wiki={wiki}&type={type}&namespace={ns}&bot={bool}&min_delta={num}

```**Santosh Bammigatti**

- GitHub: [@santoshbammigatti](https://github.com/santoshbammigatti)

**Query Parameters:**

- `wiki`: Language code (enwiki, dewiki, etc.)## 🙏 Acknowledgments

- `type`: Event type (edit, new, log)

- `namespace`: Numeric namespace ID- Wikipedia for providing the real-time event stream

- `bot`: Boolean (true/false) or omit for any- Material-UI team for the excellent React component library

- `min_delta`: Minimum byte change- Vite team for the blazing-fast build tool



**Response Format:**---

Server-Sent Events with JSON data:

```javascript**Note**: This is the frontend UI. Make sure to run the [backend server](https://github.com/santoshbammigatti/wiki-stream-backend) before starting this application.

{
  id: string,           // Unique event ID
  type: string,         // Event type
  title: string,        // Page title
  user: string,         // Username
  timestamp: number,    // Unix timestamp (ms)
  comment: string,      // Edit summary
  namespace: number,    // Namespace ID
  bot: boolean,         // Is bot edit
  newLength: number,    // New page length
  oldLength: number,    // Old page length
  meta: {
    wiki: string        // Wiki code
  }
}
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```
Output in `dist/` directory.

### Environment Variables
Create `.env.production`:
```env
VITE_API_URL=https://your-backend-api.com
```

Update proxy configuration for production in `vite.config.ts`.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Wikipedia for providing the SSE stream API
- Material-UI team for the excellent component library
- React team for the amazing framework
- Vite team for the blazing-fast build tool

## 📧 Contact

**Repository**: [wiki-stream-ui](https://github.com/santoshbammigatti/wiki-stream-ui)  
**Owner**: [santoshbammigatti](https://github.com/santoshbammigatti)

---

**Built with ❤️ using React, TypeScript, and Material-UI**
