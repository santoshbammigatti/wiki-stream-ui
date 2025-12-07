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
  CssBaseline,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
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

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const getStatusColor = () => {
    switch (status) {
      case "open":
        return "success";
      case "connecting":
        return "info";
      case "error":
        return "error";
      case "closed":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "open":
        return "Connected";
      case "connecting":
        return "Connecting...";
      case "error":
        return "Error";
      case "closed":
        return "Disconnected";
      default:
        return "Idle";
    }
  };

  return (
    <ThemeProvider theme={makeAppTheme(mode)}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <AppBar position="sticky" elevation={0} sx={{ backdropFilter: "blur(10px)" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
              📡 Wikipedia Live Stream
            </Typography>

            <Chip
              label={getStatusText()}
              color={getStatusColor()}
              size="medium"
              sx={{ 
                mr: 2,
                fontWeight: 600,
                minWidth: 120,
              }}
            />

            <IconButton
              color="inherit"
              onClick={toggleTheme}
              title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
              sx={{ 
                borderRadius: 2,
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" }
              }}
            >
              {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
          <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 600 }}>
              🔍 Stream Filters
            </Typography>
            <Filters
              filters={filters}
              onChange={setFilters}
            />

            <Divider sx={{ my: 2 }} />

            <Stack 
              direction={{ xs: "column", sm: "row" }} 
              spacing={2} 
              sx={{ mt: 2 }}
            >
              <Button
                variant="contained"
                color="success"
                size="large"
                startIcon={<PlayArrowIcon />}
                onClick={connect}
                disabled={status === "open" || status === "connecting"}
                sx={{ 
                  minWidth: 160,
                  fontWeight: 600,
                  boxShadow: 3,
                }}
              >
                Start Stream
              </Button>
              <Button
                variant="contained"
                color="error"
                size="large"
                startIcon={<StopIcon />}
                onClick={disconnect}
                disabled={status === "closed" || status === "idle"}
                sx={{ 
                  minWidth: 160,
                  fontWeight: 600,
                }}
              >
                Stop Stream
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<DeleteSweepIcon />}
                onClick={() => setEvents([])}
                disabled={events.length === 0}
                sx={{ 
                  minWidth: 160,
                  fontWeight: 600,
                }}
              >
                Clear Events
              </Button>
            </Stack>
          </Paper>

          <Paper elevation={2} sx={{ borderRadius: 3, overflow: "hidden" }}>
            <Box sx={{ p: 2, bgcolor: "primary.main", color: "white" }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                📊 Live Events ({events.length})
              </Typography>
            </Box>
            <EventTable events={events} />
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
