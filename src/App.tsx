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
import { stores } from "./utils/stores";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
      light: "#333333",
      dark: "#000000",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#666666",
    },
  },
  typography: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    h4: {
      fontSize: "24px",
      fontWeight: 600,
      color: "#000000",
    },
    h6: {
      fontSize: "16px",
      fontWeight: 500,
    },
    body1: {
      fontSize: "16px",
    },
    body2: {
      fontSize: "14px",
      color: "#666666",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 500,
          fontSize: "14px",
          padding: "8px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: {
          backgroundColor: "#000",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#333",
          },
        },
        outlined: {
          borderColor: "#e0e0e0",
          color: "#000",
          "&:hover": {
            backgroundColor: "#f5f5f5",
            borderColor: "#e0e0e0",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid #e0e0e0",
          borderRadius: 8,
          "&:hover": {
            borderColor: "#000000",
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
    const matchedStore = stores.find(
      (store) => store.name.toLowerCase() === newCard.storeName.toLowerCase()
    );

    const enrichedCard: LoyaltyCard = {
      ...newCard,
      category: matchedStore?.category,
      accentColor: matchedStore?.accentColor,
      image: matchedStore?.image,
      storeDisplayName: matchedStore?.displayName || newCard.storeName,
    };

    setCards([...cards, enrichedCard || newCard]);
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box py={4}>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography variant="h4" component="h1">
              My Fidelity Cards
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is the list of your cards!
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsAddFormOpen(true)}
              sx={{ alignSelf: "flex-start" }}
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
