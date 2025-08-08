import { useState, useEffect } from "react";
import { Container, Box, CssBaseline, ThemeProvider } from "@mui/material";

import type { LoyaltyCard } from "./types/types";
import { AddCardForm } from "./components/AddCardForm";
import { CardItem } from "./components/CardItem";
import { CardDetails } from "./components/CardDetails";
import { stores } from "./utils/stores";
import { Fab } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import DeleteConfirmDialog from "./components/DeleteConfirmDialog";

import NoSearchResults from "./components/NoSearchResults";
import EmptyScreen from "./components/EmptyScreen";
import { theme } from "./theme";
import Header from "./components/Header";

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
  const [deleteCard, setDeleteCard] = useState<LoyaltyCard | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Save cards to localStorage whenever they change (but not on initial load)
  useEffect(() => {
    try {
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

  const handleConfirmDeleteCard = (cardId: string) => {
    const cardToDelete = cards.find((card) => card.id === cardId);

    if (cardToDelete) {
      setDeleteCard(cardToDelete);
    }
  };

  const handleDeleteCard = () => {
    setCards(cards.filter((card) => card.id !== deleteCard?.id));
    setDeleteCard(null);
  };

  const filteredCards = cards.filter((card) => {
    const term = searchTerm.toLowerCase();
    return (
      card.storeName.toLowerCase().includes(term) ||
      (card.storeDisplayName?.toLowerCase().includes(term) ?? false)
    );
  });

  const handleAddNewCard = () => {
    setIsAddFormOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box py={4}>
          <Header
            onAddNewCardHandler={handleAddNewCard}
            searchDisabled={cards.length === 0}
            onChangeSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
          />

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
            {filteredCards.map((card) => (
              <CardItem
                key={card.id}
                card={card}
                onDelete={handleConfirmDeleteCard}
                onClick={() => setSelectedCard(card)}
              />
            ))}
          </Box>

          {filteredCards.length === 0 &&
            (searchTerm ? (
              <NoSearchResults />
            ) : (
              <EmptyScreen onClickHandler={setIsAddFormOpen} />
            ))}
        </Box>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "fixed", bottom: 16, right: 16 }}
        >
          <AddIcon onClick={handleAddNewCard} />
        </Fab>

        <AddCardForm
          open={isAddFormOpen}
          onClose={() => setIsAddFormOpen(false)}
          onAdd={handleAddCard}
        />

        <CardDetails
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
        />

        <DeleteConfirmDialog
          onOpen={Boolean(deleteCard)}
          onClose={() => setDeleteCard(null)}
          onDelete={handleDeleteCard}
          storeDisplayName={
            deleteCard?.storeDisplayName || deleteCard?.storeName || ""
          }
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
