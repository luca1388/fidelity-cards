import { Box, Button, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

interface EmptyScreenProps {
  onClickHandler: (isOpen: boolean) => void;
}

const EmptyScreen: React.FC<EmptyScreenProps> = ({ onClickHandler }) => {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 10,
        px: 4,
        bgcolor: "background.paper",
        borderRadius: 4,
        border: "2px dashed",
        borderColor: "primary.light",
        mt: 4,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at center, rgba(96, 165, 250, 0.08), transparent 70%)",
          zIndex: 0,
        },
      }}
    >
      <Box position="relative" zIndex={1}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            background: "linear-gradient(45deg, #2563eb, #60a5fa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 700,
          }}
        >
          No loyalty cards yet
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Add your first loyalty card to get started.
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => onClickHandler(true)}
          sx={{ py: 1.5 }}
        >
          Add Your First Card
        </Button>
      </Box>
    </Box>
  );
};

export default EmptyScreen;
