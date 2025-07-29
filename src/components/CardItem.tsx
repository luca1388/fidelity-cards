import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Paper,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  CreditCard as CardIcon,
} from "@mui/icons-material";
import type { LoyaltyCard } from "../types/types";

interface CardItemProps {
  card: LoyaltyCard;
  onDelete: (id: string) => void;
  onClick: () => void;
}

export const CardItem = ({ card, onDelete, onClick }: CardItemProps) => {
  return (
    <Card
      component={Paper}
      elevation={2}
      sx={{
        margin: 2,
        cursor: "pointer",
        transition: "all 0.3s ease",
        borderRadius: 3,
        background: "linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 4,
        },
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={2}
        >
          <Box display="flex" gap={2} alignItems="center" flex={1}>
            <Box
              sx={{
                backgroundColor: "primary.main",
                borderRadius: 2,
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CardIcon sx={{ color: "white" }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                {card.storeName}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {card.cardNumber}
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete(card.id);
            }}
            size="small"
            sx={{
              opacity: 0.7,
              transition: "all 0.2s",
              "&:hover": {
                opacity: 1,
                color: "error.main",
              },
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
