import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
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
    storeDisplayName: "",
    cardNumber: "",
  });
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (formData.storeName && formData.cardNumber) {
      onAdd({
        id: Date.now().toString(),
        ...formData,
      });
      setFormData({ storeName: "", cardNumber: "", storeDisplayName: "" });
      onClose();
    } else {
      setShowError(true);
    }
  };

  const onScanSuccess = (decodedText: string, _result: any) => {
    // alert("Codice letto: " + JSON.stringify(result));
    setFormData((prev) => ({
      ...prev,
      cardNumber: decodedText,
    }));
  };

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <DialogTitle>Add New Loyalty Card</DialogTitle>
      <DialogContent>
        <Stack spacing={2} justifyContent="center" marginTop="8px">
          <TextField
            autoFocus
            margin="dense"
            label="Store Name"
            fullWidth
            value={formData.storeName}
            onChange={(e) =>
              setFormData({
                ...formData,
                storeName: e.target.value,
                storeDisplayName: e.target.value,
              })
            }
          />
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
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Add Card
        </Button>
      </DialogActions>

      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" onClose={() => setShowError(false)}>
          Inserisci i dati della tessera prima di procedere.
        </Alert>
      </Snackbar>
    </Dialog>
  );
};
