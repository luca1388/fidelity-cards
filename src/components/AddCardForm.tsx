import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import type { LoyaltyCard } from "../types/types";
import BarcodeScanner from "./Scanner";

interface AddCardFormProps {
  open: boolean;
  onClose: () => void;
  onAdd: (card: LoyaltyCard) => void;
}

export const AddCardForm = ({ open, onClose, onAdd }: AddCardFormProps) => {
  const [formData, setFormData] = useState({
    storeName: "",
    cardNumber: "",
  });

  const handleSubmit = () => {
    if (formData.storeName && formData.cardNumber) {
      onAdd({
        id: Date.now().toString(),
        ...formData,
      });
      setFormData({ storeName: "", cardNumber: "" });
      onClose();
    }
  };

  const onScanSuccess = (decodedText: string) => {
    setFormData((prev) => ({
      ...prev,
      cardNumber: decodedText,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Loyalty Card</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Store Name"
          fullWidth
          value={formData.storeName}
          onChange={(e) =>
            setFormData({ ...formData, storeName: e.target.value })
          }
        />
        <Stack spacing={2}>
          <TextField
            margin="dense"
            label="Card Number"
            fullWidth
            value={formData.cardNumber}
            onChange={(e) =>
              setFormData({ ...formData, cardNumber: e.target.value })
            }
          />
          <BarcodeScanner onSuccess={onScanSuccess} />
          <div className="barcode-scanner">
            <div id="reader"></div>
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Add Card
        </Button>
      </DialogActions>
    </Dialog>
  );
};
