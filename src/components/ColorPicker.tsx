import { Box } from "@mui/material";

const colors = [
  "#2196f3", // blue
  "#4caf50", // green
  "#9c27b0", // purple
  "#f44336", // red
  "#ff9800", // orange
  "#e91e63", // pink
  "#3f51b5", // indigo
  "#009688", // teal
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <Box display="flex" gap={1}>
      {colors.map((color) => (
        <Box
          key={color}
          onClick={() => onChange(color)}
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            backgroundColor: color,
            cursor: "pointer",
            border:
              value === color ? "2px solid #000" : "2px solid transparent",
            "&:hover": {
              opacity: 0.8,
            },
          }}
        />
      ))}
    </Box>
  );
};
