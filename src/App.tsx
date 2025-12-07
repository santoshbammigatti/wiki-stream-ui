import React, { useMemo, useState, useEffect } from "react";
import Joyride, { STATUS } from "react-joyride";
import type { CallBackProps, Step } from "react-joyride";
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
  CircularProgress,
  Alert,
  LinearProgress,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import PauseIcon from "@mui/icons-material/Pause";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import TourIcon from "@mui/icons-material/Tour";
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
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const [runTour, setRunTour] = useState(false);
  const [tourCompleted, setTourCompleted] = useState(() => {
    return !!localStorage.getItem('wikiStreamTourCompleted');
  });

  const [filters, setFilters] = useState<FiltersType>({
    wiki: "enwiki",
    type: "edit",
    namespace: 0,
    bot: "false",
    minDelta: 50,
    purgeSeconds: 120, // 2 minutes default
  });

  const [secondsUntilPurge, setSecondsUntilPurge] = useState(filters.purgeSeconds);

  // Check if this is the first visit
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('wikiStreamTourCompleted');
    if (!hasSeenTour) {
      // Show tour automatically on first visit after a short delay
      const timer = setTimeout(() => {
        setRunTour(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Tour steps configuration
  const tourSteps: Step[] = [
    {
      target: 'body',
      content: (
        <Box sx={{ 
          bgcolor: mode === 'light' ? '#E8F5E9' : '#1B4D20', 
          p: 3, 
          borderRadius: 2,
          border: mode === 'light' ? '2px solid #2E7D32' : '2px solid #4CAF50'
        }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: mode === 'light' ? '#2E7D32' : '#81C784' }}>
            👋 Welcome to Wikipedia Live Stream Monitor!
          </Typography>
          <Typography variant="body2" sx={{ color: mode === 'light' ? 'text.primary' : '#E0E0E0' }}>
            This application shows real-time Wikipedia edit events from around the world. 
            Let's take a quick tour to show you how everything works!
          </Typography>
          <Box sx={{ 
            mt: 2, 
            p: 1.5, 
            bgcolor: mode === 'light' ? '#C8E6C9' : '#2E5D32', 
            borderRadius: 1 
          }}>
            <Typography variant="caption" sx={{ fontWeight: 600, color: mode === 'light' ? '#1B5E20' : '#A5D6A7' }}>
              💡 Tip: You can skip this tour anytime and restart it later from the "Tour" button in the header!
            </Typography>
          </Box>
        </Box>
      ),
      placement: 'center',
    },
    {
      target: '#wiki-filter',
      content: (
        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            📚 Wiki Selection
          </Typography>
          <Typography variant="body2">
            Choose which Wikipedia language edition to monitor. Each language has its own stream of edits!
          </Typography>
        </Box>
      ),
    },
    {
      target: '#type-filter',
      content: (
        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            🔍 Edit Type Filter
          </Typography>
          <Typography variant="body2">
            Filter by event type: new pages, edits, categorizations, or view all changes together.
          </Typography>
        </Box>
      ),
    },
    {
      target: '#namespace-filter',
      content: (
        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            📂 Namespace Filter
          </Typography>
          <Typography variant="body2">
            Focus on specific areas: articles (0), talk pages (1), user pages (2), etc. 
            Leave blank to see all namespaces.
          </Typography>
        </Box>
      ),
    },
    {
      target: '#bot-filter',
      content: (
        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            🤖 Bot Filter
          </Typography>
          <Typography variant="body2">
            Choose whether to include or exclude bot edits. Bots make automated changes to Wikipedia.
          </Typography>
        </Box>
      ),
    },
    {
      target: '#min-delta-filter',
      content: (
        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            📏 Minimum Delta
          </Typography>
          <Typography variant="body2">
            Filter by edit size. Only show changes that add or remove at least this many bytes. 
            Larger values = more significant edits.
          </Typography>
        </Box>
      ),
    },
    {
      target: '#purge-time-filter',
      content: (
        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            ⏰ Auto-Purge Timer
          </Typography>
          <Typography variant="body2">
            Events older than this duration are automatically removed to keep the list manageable. 
            Set to "Never" to keep all events indefinitely.
          </Typography>
        </Box>
      ),
    },
    {
      target: '#connect-button',
      content: (
        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            🚀 Connect Button
          </Typography>
          <Typography variant="body2">
            Click here to start streaming! The button will be disabled once connected.
          </Typography>
        </Box>
      ),
    },
    {
      target: '#stop-button',
      content: (
        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            ⛔ Stop Button
          </Typography>
          <Typography variant="body2">
            Disconnect from the stream at any time. You can reconnect with different filters!
          </Typography>
        </Box>
      ),
    },
    {
      target: '#pause-button',
      content: (
        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            ⏸️ Pause/Resume
          </Typography>
          <Typography variant="body2">
            Pause the display while events continue buffering in the background. 
            Resume to see all pending events at once!
          </Typography>
        </Box>
      ),
    },
    {
      target: '#clear-button',
      content: (
        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            🗑️ Clear Events
          </Typography>
          <Typography variant="body2">
            Remove all current events from the display and reset counters.
          </Typography>
        </Box>
      ),
    },
    {
      target: '#statistics-panel',
      content: (
        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            📊 Statistics Dashboard
          </Typography>
          <Typography variant="body2">
            Monitor: current visible events, total received, paused buffer size, 
            max age setting, and countdown to next auto-purge.
          </Typography>
        </Box>
      ),
    },
    {
      target: '#theme-toggle',
      content: (
        <Box>
          <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
            🌓 Theme Toggle
          </Typography>
          <Typography variant="body2">
            Switch between light and dark modes for your viewing comfort!
          </Typography>
        </Box>
      ),
    },
    {
      target: 'body',
      content: (
        <Box sx={{ 
          bgcolor: mode === 'light' ? '#E8F5E9' : '#1B4D20', 
          p: 3, 
          borderRadius: 2,
          border: mode === 'light' ? '2px solid #2E7D32' : '2px solid #4CAF50'
        }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: mode === 'light' ? '#2E7D32' : '#81C784' }}>
            🎊 You're All Set!
          </Typography>
          <Typography variant="body2" gutterBottom sx={{ color: mode === 'light' ? 'text.primary' : '#E0E0E0' }}>
            You can restart this tour anytime by clicking the <strong>"Tour"</strong> button in the top navigation bar.
          </Typography>
          <Box sx={{ 
            mt: 2, 
            p: 1.5, 
            bgcolor: mode === 'light' ? '#C8E6C9' : '#2E5D32', 
            borderRadius: 1 
          }}>
            <Typography variant="body2" sx={{ fontWeight: 600, color: mode === 'light' ? '#1B5E20' : '#A5D6A7' }}>
              � <strong>Pro Tip:</strong> Try different filter combinations to explore various 
              aspects of Wikipedia's real-time activity!
            </Typography>
          </Box>
          <Box sx={{ 
            mt: 2, 
            p: 1.5, 
            bgcolor: mode === 'light' ? '#A5D6A7' : '#388E3C', 
            borderRadius: 1,
            textAlign: 'center'
          }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: mode === 'light' ? '#1B5E20' : '#E8F5E9' }}>
              ✨ Ready to start? Click "Finish Tour" and then hit the green "Connect" button!
            </Typography>
          </Box>
        </Box>
      ),
      placement: 'center',
    },
  ];

  const handleTourCallback = (data: CallBackProps) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      setTourCompleted(true);
      localStorage.setItem('wikiStreamTourCompleted', 'true');
    }
  };

  const startTour = () => {
    setRunTour(true);
  };

  const url = useMemo(() => buildStreamUrl(filters), [filters]);

  const { 
    status, 
    events, 
    connect, 
    disconnect, 
    togglePause,
    clearEvents,
    paused,
    totalReceived,
    pendingCount,
  } = useEventSource(
    url,
    filters.purgeSeconds, // Use user-configured purge time
    /*maxItems*/ 500
  );

  const toggleTheme = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  // Calculate purged events count
  const purgedCount = totalReceived - events.length - pendingCount;

  // Countdown timer for next purge
  React.useEffect(() => {
    if (filters.purgeSeconds === 0 || status !== "open") {
      setSecondsUntilPurge(0);
      return;
    }

    setSecondsUntilPurge(filters.purgeSeconds);
    
    const interval = setInterval(() => {
      setSecondsUntilPurge((prev) => {
        if (prev <= 1) return filters.purgeSeconds;
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [filters.purgeSeconds, status]);

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
        return "🟢 Connected";
      case "connecting":
        return "🔄 Connecting...";
      case "error":
        return "🔴 Error";
      case "closed":
        return "⚫ Disconnected";
      default:
        return "⚪ Idle";
    }
  };

  // Calculate purge progress percentage
  const purgeProgress = filters.purgeSeconds > 0 
    ? ((filters.purgeSeconds - secondsUntilPurge) / filters.purgeSeconds) * 100 
    : 0;

  return (
    <ThemeProvider theme={makeAppTheme(mode)}>
      <CssBaseline />
      <Box sx={{ 
        minHeight: "100vh", 
        bgcolor: "background.default",
        transition: 'background-color 0.3s ease'
      }}>
        <AppBar 
          position="sticky" 
          elevation={0} 
          className="fade-in"
          sx={{ 
            bgcolor: 'background.paper', 
            color: 'text.primary', 
            borderBottom: 1, 
            borderColor: 'divider',
            transition: 'all 0.3s ease'
          }}>
          <Toolbar sx={{ py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
              <Box sx={{ 
                bgcolor: 'primary.main', 
                color: 'white', 
                p: 1, 
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'default',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0 4px 12px rgba(0, 82, 204, 0.3)'
                }
              }}>
                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem' }}>
                  Wiki
                </Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '-0.02em' }}>
                Live Stream Monitor
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                id="tour-button"
                variant="outlined"
                size="small"
                startIcon={<TourIcon />}
                onClick={startTour}
                disabled={status === "open"}
                sx={{
                  fontWeight: 600,
                  borderRadius: '6px',
                  textTransform: 'none',
                  transition: 'all 0.2s ease',
                  '&:not(:disabled):hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                  }
                }}
              >
                Tour
              </Button>

              {status === "connecting" && (
                <CircularProgress size={20} color="primary" />
              )}

              <Chip
                label={getStatusText()}
                color={getStatusColor()}
                size="medium"
                variant={status === "open" ? "filled" : "outlined"}
                className="slide-in-right"
                sx={{ 
                  fontWeight: 600,
                  minWidth: 140,
                  borderRadius: '6px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.15)'
                  }
                }}
              />

              <IconButton
                id="theme-toggle"
                onClick={toggleTheme}
                title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
                size="small"
                sx={{ 
                  borderRadius: 1.5,
                  border: 1,
                  borderColor: 'divider',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  "&:hover": { 
                    bgcolor: mode === 'light' ? 'grey.100' : 'grey.800',
                    transform: 'rotate(180deg) scale(1.1)',
                    borderColor: 'primary.main'
                  }
                }}
              >
                {mode === "light" ? <DarkModeIcon fontSize="small" /> : <LightModeIcon fontSize="small" />}
              </IconButton>
            </Box>
          </Toolbar>
          {/* Purge Progress Bar */}
          {filters.purgeSeconds > 0 && status === "open" && (
            <LinearProgress 
              variant="determinate" 
              value={purgeProgress} 
              sx={{ 
                height: 3,
                bgcolor: "rgba(255,255,255,0.1)",
                transition: 'all 0.3s ease',
                "& .MuiLinearProgress-bar": {
                  bgcolor: "warning.main",
                  transition: 'transform 0.3s ease, background-color 0.3s ease',
                  backgroundImage: purgeProgress > 80 
                    ? 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.1) 100%)'
                    : 'none',
                  backgroundSize: '200% 100%',
                  animation: purgeProgress > 80 ? 'shimmer 1.5s infinite' : 'none'
                }
              }}
            />
          )}
        </AppBar>

        <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
          {/* Status Messages */}
          {status === "error" && (
            <Alert 
              severity="error" 
              className="slide-in-up"
              sx={{ 
                mb: 3,
                transition: 'all 0.3s ease'
              }}
            >
              ❌ Connection error! Please check if the backend is running at http://localhost:8000
            </Alert>
          )}
          {status === "connecting" && (
            <Alert 
              severity="info" 
              className="slide-in-up"
              sx={{ 
                mb: 3,
                transition: 'all 0.3s ease'
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <CircularProgress size={20} />
                <Typography>Establishing connection to Wikipedia stream...</Typography>
              </Stack>
            </Alert>
          )}
          {paused && (
            <Alert 
              severity="warning" 
              className="slide-in-up"
              sx={{ 
                mb: 3,
                transition: 'all 0.3s ease'
              }}
            >
              ⏸️ Display paused - {pendingCount} events waiting. Click "Resume" to see them.
            </Alert>
          )}
          {status === "open" && filters.purgeSeconds > 0 && (
            <Alert 
              severity="info" 
              className="fade-in"
              sx={{ 
                mb: 3,
                transition: 'all 0.3s ease'
              }}
            >
              <Typography variant="body2">
                ℹ️ <strong>Auto-Purge Enabled:</strong> Events are automatically removed when they become older than{' '}
                <strong>{filters.purgeSeconds >= 60 ? `${Math.floor(filters.purgeSeconds / 60)} minute(s)` : `${filters.purgeSeconds} seconds`}</strong>.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                📊 <strong>Status:</strong> Showing {events.length} events • {totalReceived} received total • {purgedCount > 0 ? `${purgedCount} auto-purged` : '0 purged yet'}
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mt: 0.5, fontStyle: 'italic' }}>
                💡 Tip: Hover over timestamps to see event age, or set purge to "Never" to keep all events
              </Typography>
            </Alert>
          )}

          <Paper 
            elevation={3} 
            className="scale-in"
            sx={{ 
              p: 3, 
              mb: 3, 
              borderRadius: 3,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6
              }
            }}
          >
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
                id="connect-button"
                variant="contained"
                color="success"
                size="large"
                startIcon={status === "connecting" ? <CircularProgress size={20} color="inherit" /> : <PlayArrowIcon />}
                onClick={connect}
                disabled={status === "open" || status === "connecting"}
                sx={{ 
                  minWidth: 160,
                  fontWeight: 600,
                  boxShadow: 3,
                  transition: 'all 0.2s ease',
                  '&:not(:disabled):hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6
                  },
                  '&:not(:disabled):active': {
                    transform: 'scale(0.98)'
                  }
                }}
              >
                {status === "connecting" ? "Connecting..." : "Connect"}
              </Button>
              <Button
                id="stop-button"
                variant="contained"
                color="error"
                size="large"
                startIcon={<StopIcon />}
                onClick={disconnect}
                disabled={status === "closed" || status === "idle"}
                sx={{ 
                  minWidth: 160,
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  '&:not(:disabled):hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6
                  },
                  '&:not(:disabled):active': {
                    transform: 'scale(0.98)'
                  }
                }}
              >
                Stop Stream
              </Button>
              <Button
                id="pause-button"
                variant="contained"
                color={paused ? "info" : "warning"}
                size="large"
                startIcon={paused ? <PlayCircleIcon /> : <PauseIcon />}
                onClick={togglePause}
                disabled={status !== "open"}
                sx={{ 
                  minWidth: 160,
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  '&:not(:disabled):hover': {
                    transform: 'scale(1.05)',
                    boxShadow: 6
                  },
                  '&:not(:disabled):active': {
                    transform: 'scale(0.98)'
                  }
                }}
              >
                {paused ? `Resume (${pendingCount})` : "Pause Display"}
              </Button>
              <Button
                id="clear-button"
                variant="outlined"
                size="large"
                startIcon={<DeleteSweepIcon />}
                onClick={clearEvents}
                disabled={events.length === 0 && totalReceived === 0}
                sx={{ 
                  minWidth: 160,
                  fontWeight: 600,
                  transition: 'all 0.2s ease',
                  '&:not(:disabled):hover': {
                    transform: 'scale(1.05)',
                    borderWidth: 2
                  },
                  '&:not(:disabled):active': {
                    transform: 'scale(0.98)'
                  }
                }}
              >
                Clear Events
              </Button>
            </Stack>
          </Paper>

          {/* Statistics Panel */}
          <Paper 
            id="statistics-panel"
            elevation={2} 
            className="fade-in"
            sx={{ 
              p: 2, 
              mb: 3, 
              borderRadius: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: 4
              }
            }}
          >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3} justifyContent="space-around">
              <Box 
                sx={{ 
                  textAlign: "center",
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Typography 
                  variant="h4" 
                  color="primary" 
                  sx={{ 
                    fontWeight: 700,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {events.length}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Current Events
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  (visible in table)
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />
              <Box 
                sx={{ 
                  textAlign: "center",
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
                  {totalReceived}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Total Received
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  (all time this session)
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />
              <Box 
                sx={{ 
                  textAlign: "center",
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Typography variant="h4" color={paused ? "warning.main" : "info.main"} sx={{ fontWeight: 700 }}>
                  {paused ? pendingCount : "—"}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  {paused ? "Buffered" : "Pause Buffer"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {paused ? "(click resume)" : "(not paused)"}
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />
              <Box 
                sx={{ 
                  textAlign: "center",
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <Typography variant="h4" color="secondary.main" sx={{ fontWeight: 700 }}>
                  {filters.purgeSeconds === 0 
                    ? "♾️" 
                    : filters.purgeSeconds >= 60 
                      ? `${Math.floor(filters.purgeSeconds / 60)}m`
                      : `${filters.purgeSeconds}s`
                  }
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                  {filters.purgeSeconds === 0 ? "No Auto-Purge" : "Max Age"}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {filters.purgeSeconds === 0 ? "(keeps all)" : "(then removed)"}
                </Typography>
              </Box>
              {filters.purgeSeconds > 0 && status === "open" && (
                <>
                  <Divider orientation="vertical" flexItem sx={{ display: { xs: "none", sm: "block" } }} />
                  <Box 
                    className="scale-in"
                    sx={{ 
                      textAlign: "center",
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)'
                      }
                    }}
                  >
                    <Typography 
                      variant="h4" 
                      color="warning.main" 
                      sx={{ 
                        fontWeight: 700,
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      {secondsUntilPurge}s
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                      Next Check
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      (purge cycle)
                    </Typography>
                  </Box>
                </>
              )}
            </Stack>
          </Paper>

          <Paper 
            elevation={2} 
            className="slide-in-up"
            sx={{ 
              borderRadius: 3, 
              overflow: "hidden",
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: 6
              }
            }}
          >
            <Box sx={{ 
              p: 2, 
              bgcolor: "primary.main", 
              color: "white", 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              transition: 'all 0.3s ease'
            }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  📊 Live Events Stream
                </Typography>
                {filters.purgeSeconds > 0 && status === "open" && (
                  <Typography variant="caption" sx={{ opacity: 0.9 }}>
                    Auto-purging events older than {filters.purgeSeconds >= 60 ? `${Math.floor(filters.purgeSeconds / 60)} min` : `${filters.purgeSeconds}s`}
                  </Typography>
                )}
              </Box>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                {paused && (
                  <Chip
                    label="⏸️ PAUSED"
                    color="warning"
                    sx={{ fontWeight: 700, color: "white" }}
                  />
                )}
                {status === "open" && !paused && (
                  <Chip
                    icon={<CircularProgress size={16} sx={{ color: "white !important" }} />}
                    label="LIVE"
                    color="success"
                    sx={{ fontWeight: 700, color: "white", animation: "pulse 2s infinite" }}
                  />
                )}
              </Box>
            </Box>
            <EventTable events={events} />
          </Paper>
        </Container>

        {/* Guided Tour */}
        <Joyride
          steps={tourSteps}
          run={runTour}
          continuous
          showProgress
          showSkipButton
          callback={handleTourCallback}
          styles={{
            options: {
              primaryColor: '#2E7D32',
              textColor: mode === 'light' ? '#172B4D' : '#FFFFFF',
              backgroundColor: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
              overlayColor: 'rgba(0, 0, 0, 0.5)',
              arrowColor: mode === 'light' ? '#FFFFFF' : '#1E1E1E',
              zIndex: 10000,
            },
            buttonNext: {
              backgroundColor: '#2E7D32',
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 6,
              padding: '8px 16px',
              transition: 'all 0.2s ease',
            },
            buttonBack: {
              color: '#2E7D32',
              fontSize: 14,
              fontWeight: 600,
              marginRight: 8,
            },
            buttonSkip: {
              color: mode === 'light' ? '#6B778C' : '#8C9BAB',
              fontSize: 14,
            },
            tooltip: {
              borderRadius: 12,
              padding: 20,
              fontSize: 14,
              boxShadow: '0 8px 24px rgba(46, 125, 50, 0.15)',
              border: mode === 'light' ? '2px solid #E8F5E9' : '2px solid rgba(46, 125, 50, 0.3)',
            },
            tooltipContainer: {
              textAlign: 'left',
            },
            tooltipContent: {
              padding: '10px 0',
            },
            tooltipTitle: {
              color: '#2E7D32',
              fontSize: 18,
              fontWeight: 700,
              marginBottom: 8,
            },
            spotlight: {
              borderRadius: 8,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5), 0 0 15px rgba(46, 125, 50, 0.8)',
            },
            beaconInner: {
              backgroundColor: '#2E7D32',
            },
            beaconOuter: {
              backgroundColor: 'rgba(46, 125, 50, 0.3)',
              borderColor: '#2E7D32',
            },
          }}
          locale={{
            back: '← Previous',
            close: 'Close',
            last: '✓ Finish Tour',
            next: 'Next →',
            skip: 'Skip Tour',
          }}
        />
      </Box>
    </ThemeProvider>
  );
}
