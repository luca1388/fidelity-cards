import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Card,
} from "@mui/material";
import Barcode from "react-barcode";
import {
  Close as CloseIcon,
  LightMode as LightModeIcon,
  ContentCopy as ContentCopyIcon,
  Store as StoreIcon,
} from "@mui/icons-material";
import type { LoyaltyCard } from "../types/types";

const generateColorFromString = (str: string) => {
  // Generate a hash from the string
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash = hash & hash; // Convert to 32-bit integer
  }

  // Use the hash to generate HSL values
  // We'll use HSL to ensure good color distribution and saturation
  const hue = Math.abs(hash % 360); // 0-360 degrees
  const saturation = 65 + Math.abs((hash >> 8) % 20); // 65-85%
  const lightness = 45 + Math.abs((hash >> 16) % 10); // 45-55%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

interface CardDetailsProps {
  card: LoyaltyCard | null;
  onClose: () => void;
}

export const CardDetails = ({ card, onClose }: CardDetailsProps) => {
  if (!card) return null;

  return (
    <Dialog
      open={Boolean(card)}
      onClose={onClose}
      fullScreen
      PaperProps={{
        sx: {
          bgcolor: "#fafafa",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
              borderBottom: "1px solid #eee",
              bgcolor: "#fff",
            }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: generateColorFromString(card.storeName),
                color: "#fff",
                fontSize: "18px",
                fontWeight: 600,
              }}
            >
              {card.storeName.charAt(0).toUpperCase()}
            </Box>
            <Typography
              variant="h6"
              sx={{
                flex: 1,
                fontWeight: 600,
                fontSize: "1.1rem",
              }}
            >
              {card.storeName}
            </Typography>
            <IconButton
              onClick={onClose}
              size="large"
              sx={{
                color: "#666",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Content */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              p: 3,
            }}
          >
            <Card
              sx={{
                width: "100%",
                maxWidth: 400,
                p: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                borderRadius: 3,
                boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              }}
            >
              <Box sx={{ transform: "scale(1.2)" }}>
                <Barcode value={card.cardNumber} />
              </Box>
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontFamily: "monospace",
                  letterSpacing: 1,
                  color: "#666",
                }}
              >
                {card.cardNumber}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#666",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#000",
                  },
                }}
                onClick={() => navigator.clipboard.writeText(card.cardNumber)}
              >
                <ContentCopyIcon sx={{ fontSize: 20 }} />
                <Typography
                  sx={{
                    fontSize: "0.9rem",
                    fontWeight: 500,
                  }}
                >
                  Copy Number
                </Typography>
              </Box>
            </Card>

            <Typography
              sx={{
                color: "#666",
                textAlign: "center",
                maxWidth: 300,
                lineHeight: 1.6,
              }}
            >
              Show this barcode to the cashier to scan your loyalty card and
              earn points.
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
    //     </Box>
    //   </DialogContent>
    // </Dialog>
  );
};
