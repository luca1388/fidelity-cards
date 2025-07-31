import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import type { LoyaltyCard } from "../types/types";

const generateColorFromString = (str: string) => {
  // Generate a hash from the string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Use the hash to generate HSL values
  const hue = Math.abs(hash % 360); // 0-360 degrees
  const saturation = 65 + Math.abs((hash >> 8) % 20); // 65-85%
  const lightness = 45 + Math.abs((hash >> 16) % 10); // 45-55%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

interface CardItemProps {
  card: LoyaltyCard;
  onDelete: (id: string) => void;
  onClick: () => void;
}

export const CardItem = ({ card, onDelete, onClick }: CardItemProps) => {
  return (
    <Card
      sx={{
        cursor: "pointer",
        transition: "all 0.2s ease",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        boxShadow: "none",
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "4px",
          backgroundColor: generateColorFromString(card.storeName),
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        },
        "&:hover": {
          borderColor: "#e0e0e0",
          transform: "translateY(-1px)",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        },
      }}
      onClick={onClick}
    >
      <CardContent sx={{ p: 2, pt: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Box display="flex" gap={2} alignItems="center">
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 1.5,
                backgroundColor: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
                fontSize: "18px",
                fontWeight: 600,
                border: "1px solid #eee",
              }}
            >
              {card.storeName.charAt(0).toUpperCase()}
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: "#000",
                  fontSize: "0.95rem",
                  mb: 0.5,
                }}
              >
                {card.storeName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#666",
                  fontFamily: "monospace",
                  fontSize: "0.85rem",
                  letterSpacing: "0.5px",
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
              color: "#999",
              "&:hover": {
                color: "#000",
                backgroundColor: "transparent",
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
