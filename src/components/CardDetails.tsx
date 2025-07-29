import {
  Dialog,
  DialogContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import Barcode from "react-barcode";
import { Close as CloseIcon } from "@mui/icons-material";
import type { LoyaltyCard } from "../types/types";

interface CardDetailsProps {
  card: LoyaltyCard | null;
  onClose: () => void;
}

export const CardDetails = ({ card, onClose }: CardDetailsProps) => {
  if (!card) return null;

  return (
    <Dialog open={Boolean(card)} onClose={onClose} fullScreen>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={4}
          pt={4}
        >
          <Box display="flex" justifyContent="space-between" width="100%">
            <Typography variant="h4" component="h2">
              {card.storeName}
            </Typography>
            <IconButton onClick={onClose} size="large">
              <CloseIcon />
            </IconButton>
          </Box>

          <Typography variant="h6" color="text.secondary">
            Card Number: {card.cardNumber}
          </Typography>

          <Box sx={{ transform: "scale(1.5)", mt: 4 }}>
            <Barcode value={card.cardNumber} />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
