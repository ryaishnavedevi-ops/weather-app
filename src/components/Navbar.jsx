import {
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";

import CloudIcon from "@mui/icons-material/Cloud";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../services/firebase";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
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