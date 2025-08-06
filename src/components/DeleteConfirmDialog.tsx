import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import type { LoyaltyCard } from "../types/types";

interface DeleteConfirmDialogProps {
  onOpen: boolean;
  storeDisplayName: string;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  storeDisplayName,
  onOpen,
  onClose,
  onDelete,
}) => {
  return (
    <Dialog open={onOpen} onClose={onClose}>
      <DialogTitle>Eliminare questa carta?</DialogTitle>
      <DialogContent>
        <Typography>
          Sei sicuro di voler eliminare <strong>{storeDisplayName}</strong>?
          Questa azione non può essere annullata.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Annulla
        </Button>
        <Button onClick={onDelete} color="error" variant="contained">
          Elimina
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
