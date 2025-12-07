import React, { useMemo, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Stack,
  Button,
  Chip,
  ThemeProvider,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import RefreshIcon from "@mui/icons-material/Refresh";
import EventTable from "./components/EventTable";
import Filters, { type Filters as FiltersType } from "./components/Filters";
import { useEventSource } from "./hooks/useEventSource";
import { makeAppTheme } from "./theme";

function buildStreamUrl(f: FiltersType) {
  const params = new URLSearchParams();
  if (f.wiki) params.set("wiki", f.wiki);
  if (f.type) params.set("type", f.type);
  if (f.namespace !== null && f.namespace !== undefined)
    params.set("namespace", String(f.namespace));
  if (f.bot === "true") params.set("bot", "true");
  if (f.bot === "false") params.set("bot", "false");
  if (f.minDelta > 0) params.set("min_delta", String(f.minDelta));
  // Using Vite proxy: /api => http://localhost:8000
  return `/api/stream?${params.toString()}`;
}

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  const [filters, setFilters] = useState<FiltersType>({
    wiki: "enwiki",
    type: "edit",
    namespace: 0,
    bot: "false",
    minDelta: 50,
  });

  const url = useMemo(() => buildStreamUrl(filters), [filters]);

  const { status, events, connect, disconnect, setEvents } = useEventSource(
    url,
    /*purgeSeconds*/ 10,
    /*maxItems*/ 200
  );

  const handleApply = () => {
    connect(); // (re)connect with current filters
  };

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={makeAppTheme(mode)}>
      <>
        <AppBar position="sticky" elevation={0}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Wikipedia Live Stream
            </Typography>

            <Chip
              label={status.toUpperCase()}
              color={
                status === "open"
                  ? "success"
                  : status === "error"
                  ? "error"
                  : "default"
              }
              variant="outlined"
              sx={{ mr: 2 }}
            />

            <IconButton
              color="inherit"
              onClick={toggleTheme}
              title="Toggle theme"
            >
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
          <Filters
            filters={filters}
            onChange={setFilters}
            onApply={handleApply}
          />

          <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
            <Button variant="contained" color="success" onClick={connect}>
              Connect
            </Button>
            <Button variant="outlined" color="warning" onClick={disconnect}>
              Disconnect
            </Button>
            <Button
              variant="text"
              startIcon={<RefreshIcon />}
              onClick={() => setEvents([])}
            >
              Clear list
            </Button>
          </Stack>

          <EventTable events={events} />
        </Container>
      </>
    </ThemeProvider>
  );
}
