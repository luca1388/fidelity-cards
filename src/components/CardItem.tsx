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
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        borderRadius: 3,
        background: (theme) =>
          `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
        "&:hover": {
          transform: "translateY(-4px) scale(1.01)",
          boxShadow: (theme) =>
            `0 12px 24px -8px ${theme.palette.primary.main}20`,
        },
        position: "relative",
        overflow: "hidden",
      }}
      onClick={onClick}
    >
      <CardContent
        sx={{
          p: 3,
          "&:last-child": { pb: 3 },
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          gap={2}
        >
          <Box display="flex" gap={3} alignItems="center" flex={1}>
            <Box
              sx={{
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                borderRadius: 3,
                p: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 16px -4px rgba(37, 99, 235, 0.2)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05) rotate(-5deg)",
                },
              }}
            >
              <CardIcon sx={{ color: "white", fontSize: 28 }} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: 700,
                  mb: 1,
                  color: "text.primary",
                  transition: "color 0.2s ease",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
              >
                {card.storeName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: "text.secondary",
                  fontFamily: "monospace",
                  letterSpacing: "0.1em",
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
              opacity: 0.5,
              transition: "all 0.2s ease",
              "&:hover": {
                opacity: 1,
                color: "error.main",
                transform: "scale(1.1)",
                bgcolor: "error.light",
              },
            }}
          >
            <DeleteIcon fontSize="small" sx={{ color: "inherit" }} />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};
