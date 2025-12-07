# Wikipedia Live Stream UI 📡# React + TypeScript + Vite



A real-time web application that displays live Wikipedia edits, new pages, and log events as they happen across different Wikipedia language editions. Built with React, TypeScript, and Material-UI.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



![License](https://img.shields.io/badge/license-MIT-blue.svg)Currently, two official plugins are available:

![React](https://img.shields.io/badge/React-19.2-blue.svg)

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

![Vite](https://img.shields.io/badge/Vite-7.2-purple.svg)- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



## 🌟 Features## React Compiler



- **Real-Time Streaming**: Displays live Wikipedia changes using Server-Sent Events (SSE)The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- **Advanced Filtering**: Filter events by:

  - Wiki language (English, Vietnamese, German, French, Spanish)## Expanding the ESLint configuration

  - Event type (edit, new page, log)

  - Namespace (article, talk, user, etc.)If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

  - Bot activity (exclude/include bots)

  - Minimum byte change (delta)```js

- **Dark/Light Theme**: Toggle between light and dark modes for comfortable viewingexport default defineConfig([

- **Auto-Purging**: Automatically removes old events (configurable, default 10 seconds)  globalIgnores(['dist']),

- **Connection Management**: Connect, disconnect, and clear event list with ease  {

- **Responsive Design**: Works seamlessly on desktop and mobile devices    files: ['**/*.{ts,tsx}'],

- **Event Details**: View timestamp, user, title, byte changes, and edit comments    extends: [

      // Other configs...

## 🏗️ Architecture

      // Remove tseslint.configs.recommended and replace with this

This application is the **frontend** component that connects to the [Wiki Stream Backend](https://github.com/santoshbammigatti/wiki-stream-backend).      tseslint.configs.recommendedTypeChecked,

      // Alternatively, use this for stricter rules

### Tech Stack      tseslint.configs.strictTypeChecked,

      // Optionally, add this for stylistic rules

- **Framework**: React 19 with TypeScript      tseslint.configs.stylisticTypeChecked,

- **UI Library**: Material-UI (MUI) v7

- **Build Tool**: Vite 7      // Other configs...

- **Styling**: Emotion (CSS-in-JS)    ],

- **Date Handling**: Day.js    languageOptions: {

- **Linting**: ESLint 9      parserOptions: {

        project: ['./tsconfig.node.json', './tsconfig.app.json'],

### How It Works        tsconfigRootDir: import.meta.dirname,

      },

1. **User Interface**: Built with React and Material-UI components      // other options...

2. **Filters**: User selects filtering criteria (wiki, type, namespace, bot, min delta)    },

3. **Connection**: Uses EventSource API to establish SSE connection to backend  },

4. **Real-Time Updates**: Backend streams filtered Wikipedia events])

5. **Display**: Events are displayed in a table with auto-purging of old data```

6. **Theme Support**: Dynamic theme switching between light and dark modes

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

## 🚀 Getting Started

```js

### Prerequisites// eslint.config.js

import reactX from 'eslint-plugin-react-x'

- Node.js (v18 or higher)import reactDom from 'eslint-plugin-react-dom'

- npm or yarn

- Backend server running at `http://localhost:8000` ([wiki-stream-backend](https://github.com/santoshbammigatti/wiki-stream-backend))export default defineConfig([

  globalIgnores(['dist']),

### Installation  {

    files: ['**/*.{ts,tsx}'],

1. **Clone the repository**    extends: [

   ```bash      // Other configs...

   git clone https://github.com/santoshbammigatti/wiki-stream-ui.git      // Enable lint rules for React

   cd wiki-stream-ui      reactX.configs['recommended-typescript'],

   ```      // Enable lint rules for React DOM

      reactDom.configs.recommended,

2. **Install dependencies**    ],

   ```bash    languageOptions: {

   npm install      parserOptions: {

   ```        project: ['./tsconfig.node.json', './tsconfig.app.json'],

        tsconfigRootDir: import.meta.dirname,

3. **Start the development server**      },

   ```bash      // other options...

   npm run dev    },

   ```  },

])

4. **Open your browser**```

   ```
   http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Backend Connection

The frontend connects to the backend via a Vite proxy configured in `vite.config.ts`:

```typescript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

This proxies all `/api/*` requests to `http://localhost:8000`.

### Environment Variables

You can modify the backend URL by updating the proxy target in `vite.config.ts`.

## 📊 Components Overview

### `App.tsx`
Main application component that:
- Manages theme state (light/dark mode)
- Handles filter state
- Orchestrates connection to backend
- Renders the UI layout

### `EventTable.tsx`
Displays streaming events in a table format with:
- Timestamp (HH:mm:ss)
- Wiki language
- Event type
- Namespace
- Page title (with tooltip for long titles)
- User
- Bot indicator
- Byte delta (with +/- sign)
- Edit comment (truncated)

### `Filters.tsx`
Filter controls including:
- Wiki selector (enwiki, viwiki, dewiki, frwiki, eswiki)
- Type selector (edit, new, log, any)
- Namespace input
- Bot filter (any, true, false)
- Minimum delta input

### `useEventSource.ts`
Custom React hook that:
- Manages SSE connection lifecycle
- Handles connection states (idle, connecting, open, error, closed)
- Auto-purges old events
- Maintains event buffer with configurable max size

## 🎨 Theme

The application supports both light and dark themes powered by Material-UI's theming system. Users can toggle between themes using the theme switcher in the app bar.

## 🔗 Related Repositories

- **Backend**: [wiki-stream-backend](https://github.com/santoshbammigatti/wiki-stream-backend)

## 📝 API Integration

The frontend expects the backend to expose an SSE endpoint at:

```
GET /api/stream?wiki={wiki}&type={type}&namespace={ns}&bot={bool}&min_delta={num}
```

### Query Parameters

- `wiki`: Wikipedia language edition (e.g., "enwiki")
- `type`: Event type ("edit", "new", "log")
- `namespace`: Namespace ID (e.g., 0 for main articles)
- `bot`: Boolean string ("true" or "false") to filter bot edits
- `min_delta`: Minimum byte change for edits

### Event Format

Each SSE message contains a JSON object:

```typescript
{
  wiki?: string;
  type?: "edit" | "new" | "log";
  namespace?: number;
  title?: string;
  user?: string;
  bot?: boolean;
  timestamp?: number;  // Unix timestamp in seconds
  comment?: string;
  length?: {
    old?: number;
    new?: number;
  };
  log_type?: string;    // For type="log"
  log_action?: string;  // For type="log"
}
```

## 🛠️ Development

### Project Structure

```
wiki-stream-ui/
├── src/
│   ├── components/
│   │   ├── EventTable.tsx    # Event display table
│   │   └── Filters.tsx       # Filter controls
│   ├── hooks/
│   │   └── useEventSource.ts # SSE connection hook
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   ├── theme.ts              # Theme configuration
│   ├── types.ts              # TypeScript types
│   └── assets/               # Static assets
├── public/                   # Public assets
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript config
└── package.json              # Dependencies
```

### Adding New Features

1. **New Filters**: Update `Filters.tsx` and `FiltersType` interface
2. **New Event Fields**: Update `RecentChangeEvent` interface in `types.ts`
3. **Styling**: Modify `theme.ts` or use MUI's `sx` prop
4. **Connection Logic**: Modify `useEventSource.ts` hook

## 🐛 Troubleshooting

### Connection Issues

- Ensure the backend is running at `http://localhost:8000`
- Check browser console for CORS errors
- Verify the proxy configuration in `vite.config.ts`

### No Events Displaying

- Check the filters - try setting all to "Any" or default values
- Verify the backend is receiving and processing Wikipedia events
- Check the browser's Network tab for SSE connection

### Build Errors

- Delete `node_modules` and `package-lock.json`, then run `npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`
- Ensure you're using Node.js v18+

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Santosh Bammigatti**
- GitHub: [@santoshbammigatti](https://github.com/santoshbammigatti)

## 🙏 Acknowledgments

- Wikipedia for providing the real-time event stream
- Material-UI team for the excellent React component library
- Vite team for the blazing-fast build tool

---

**Note**: This is the frontend UI. Make sure to run the [backend server](https://github.com/santoshbammigatti/wiki-stream-backend) before starting this application.
