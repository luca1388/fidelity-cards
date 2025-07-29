import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import type { LoyaltyCard } from "./types/types";
import { AddCardForm } from "./components/AddCardForm";
import { CardItem } from "./components/CardItem";
import { CardDetails } from "./components/CardDetails";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb", // Modern blue
      light: "#60a5fa",
      dark: "#1d4ed8",
    },
    secondary: {
      main: "#ec4899", // Modern pink
      light: "#f472b6",
      dark: "#db2777",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
    },
    divider: "#e2e8f0",
  },
  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h4: {
      fontWeight: 800,
      letterSpacing: "-0.5px",
      background: "linear-gradient(to right, #2563eb, #60a5fa)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "-0.25px",
    },
    button: {
      fontWeight: 600,
      letterSpacing: "0.025em",
    },
    body1: {
      letterSpacing: "-0.025em",
    },
    body2: {
      letterSpacing: "-0.025em",
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600,
          padding: "10px 20px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(37, 99, 235, 0.15)",
          },
        },
        containedPrimary: {
          background: "linear-gradient(45deg, #2563eb, #60a5fa)",
          "&:hover": {
            background: "linear-gradient(45deg, #1d4ed8, #3b82f6)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.05)",
          "&:hover": {
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "rgba(37, 99, 235, 0.08)",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (min-width: 600px)": {
            paddingLeft: 32,
            paddingRight: 32,
          },
        },
      },
    },
  },
});

function App() {
  const [cards, setCards] = useState<LoyaltyCard[]>(() => {
    try {
      const savedCards = localStorage.getItem("loyaltyCards");
      console.log("Initial load from localStorage:", savedCards);
      return savedCards ? JSON.parse(savedCards) : [];
    } catch (error) {
      console.error("Error loading initial cards:", error);
      return [];
    }
  });
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<LoyaltyCard | null>(null);

  // Save cards to localStorage whenever they change (but not on initial load)
  useEffect(() => {
    try {
      console.log("Saving cards to localStorage:", cards);
      localStorage.setItem("loyaltyCards", JSON.stringify(cards));
    } catch (error) {
      console.error("Error saving cards:", error);
    }
  }, [cards]);

  const handleAddCard = (newCard: LoyaltyCard) => {
    setCards([...cards, newCard]);
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box py={6}>
          <Box
            sx={{
              mb: { xs: 4, md: 6 },
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "stretch", sm: "center" },
              gap: 3,
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: -24,
                left: -24,
                right: -24,
                bottom: -24,
                background:
                  "radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 70%)",
                zIndex: -1,
                borderRadius: 4,
              },
            }}
          >
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                My Loyalty Cards
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 500 }}
              >
                Keep all your loyalty cards in one place, easily accessible
                whenever you need them.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsAddFormOpen(true)}
              sx={{
                minWidth: { xs: "100%", sm: "auto" },
                py: 1.5,
              }}
            >
              Add New Card
            </Button>
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(auto-fill, minmax(280px, 1fr))",
              },
            }}
          >
            {cards.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                onDelete={handleDeleteCard}
                onClick={() => setSelectedCard(card)}
              />
            ))}
          </Box>

          {cards.length === 0 && (
            <Box
              sx={{
                textAlign: "center",
                py: 10,
                px: 4,
                bgcolor: "background.paper",
                borderRadius: 4,
                border: "2px dashed",
                borderColor: "primary.light",
                mt: 4,
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background:
                    "radial-gradient(circle at center, rgba(96, 165, 250, 0.08), transparent 70%)",
                  zIndex: 0,
                },
              }}
            >
              <Box position="relative" zIndex={1}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    background: "linear-gradient(45deg, #2563eb, #60a5fa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 700,
                  }}
                >
                  No loyalty cards yet
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  Add your first loyalty card to get started.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => setIsAddFormOpen(true)}
                  sx={{ py: 1.5 }}
                >
                  Add Your First Card
                </Button>
              </Box>
            </Box>
          )}
        </Box>

        <AddCardForm
          open={isAddFormOpen}
          onClose={() => setIsAddFormOpen(false)}
          onAdd={handleAddCard}
        />

        <CardDetails
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
