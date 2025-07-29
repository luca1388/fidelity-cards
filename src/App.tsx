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
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
  },
  typography: {
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.5px",
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          fontWeight: 600,
          padding: "8px 16px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
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
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={6}
            sx={{
              background: (theme) =>
                `linear-gradient(145deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
              borderRadius: 4,
              p: 4,
              color: "white",
              boxShadow: 2,
            }}
          >
            <Typography variant="h4" component="h1" sx={{ color: "white" }}>
              My Loyalty Cards
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setIsAddFormOpen(true)}
              sx={{
                bgcolor: "white",
                color: "primary.main",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              Add Card
            </Button>
          </Box>

          <Box sx={{ display: "grid", gap: 2 }}>
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
                py: 8,
                px: 2,
                bgcolor: "background.paper",
                borderRadius: 4,
                border: "2px dashed",
                borderColor: "divider",
                mt: 4,
              }}
            >
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                No loyalty cards yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Click "Add Card" to get started with your first loyalty card.
              </Typography>
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
