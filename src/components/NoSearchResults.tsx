import { Box, Typography } from "@mui/material";
import SearchOffIcon from "@mui/icons-material/SearchOff";

const NoSearchResults = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        mt: 4,
        color: "text.secondary",
      }}
    >
      <SearchOffIcon sx={{ fontSize: 60, mb: 2, color: "grey.500" }} />
      <Typography variant="h6" gutterBottom>
        Nessuna carta trovata
      </Typography>
      <Typography variant="body2" align="center">
        Nessuna carta corrisponde alla tua ricerca.
        <br />
        Prova a modificare il testo per trovare altre carte.
      </Typography>
    </Box>
  );
};

export default NoSearchResults;
