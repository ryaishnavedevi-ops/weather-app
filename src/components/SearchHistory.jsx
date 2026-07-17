import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

function SearchHistory({ history, onCityClick }) {
  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 4,
        mb: 4,
        p: 2,
        borderRadius: 3,
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        Search History
      </Typography>

      <List>
        {history.map((city) => (
          <ListItem key={city} disablePadding>
            <ListItemButton onClick={() => onCityClick(city)}>
              <ListItemText primary={city} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default SearchHistory;