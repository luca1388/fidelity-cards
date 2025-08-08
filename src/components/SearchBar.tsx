import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { Add as AddIcon } from "@mui/icons-material";

interface SearchBarProps {
  searchTerm: string;
  onChangeHandler: (term: string) => void;
  onAddNewCardHandler: () => void;
  disabled: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onChangeHandler,
  disabled,
  onAddNewCardHandler,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap", // mantiene il layout responsive su schermi piccoli
        mb: 3,
      }}
    >
      <TextField
        placeholder="Search for a card..."
        variant="outlined"
        value={searchTerm}
        onChange={(e) => onChangeHandler(e.target.value)}
        size="small"
        disabled={disabled}
        sx={{
          mb: 2,
          maxWidth: 400,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          flexGrow: 1,
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#888" }} />
            </InputAdornment>
          ),
          endAdornment: searchTerm && (
            <IconButton
              size="small"
              onClick={() => onChangeHandler("")}
              sx={{ visibility: searchTerm ? "visible" : "hidden" }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          ),
        }}
      />
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={onAddNewCardHandler}
        sx={{ alignSelf: "flex-start" }}
      >
        Add New Card
      </Button>
    </Box>
  );
};

export default SearchBar;
