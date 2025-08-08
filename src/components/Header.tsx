import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import type React from "react";

interface HeaderProps {
  onAddNewCardHandler: () => void;
  searchTerm: string;
  onChangeSearchTerm: (term: string) => void;
  searchDisabled: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onAddNewCardHandler,
  searchTerm,
  onChangeSearchTerm,
  searchDisabled,
}) => {
  return (
    <Box
      sx={{
        mb: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h1">
        My Fidelity Cards
      </Typography>
      <Typography variant="body2" color="text.secondary">
        This is the list of your cards!
      </Typography>
      <SearchBar
        onAddNewCardHandler={onAddNewCardHandler}
        disabled={searchDisabled}
        searchTerm={searchTerm}
        onChangeHandler={onChangeSearchTerm}
      />
    </Box>
  );
};

export default Header;
