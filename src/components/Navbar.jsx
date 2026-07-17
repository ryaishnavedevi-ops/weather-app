import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import CloudIcon from "@mui/icons-material/Cloud";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <CloudIcon sx={{ mr: 1 }} />

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Weather App
        </Typography>

        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;