import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  Alert,
  Box,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { auth } from "../services/firebase";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      navigate("/dashboard");
    } catch (firebaseError) {
      console.error(firebaseError);

      if (firebaseError.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (
        firebaseError.code === "auth/invalid-credential" ||
        firebaseError.code === "auth/user-not-found" ||
        firebaseError.code === "auth/wrong-password"
      ) {
        setError("Incorrect email or password.");
      } else if (firebaseError.code === "auth/too-many-requests") {
        setError(
          "Too many failed login attempts. Please try again later."
        );
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError(
        "Enter your registered email address first, then click Forgot Password."
      );
      return;
    }

    setResetLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());

      setSuccess(
        "Password reset email sent. Please check your inbox and spam folder."
      );
    } catch (firebaseError) {
      console.error(firebaseError);

      if (firebaseError.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (firebaseError.code === "auth/too-many-requests") {
        setError(
          "Too many reset attempts. Please wait and try again."
        );
      } else {
        setError(
          "Unable to send the password reset email. Please try again."
        );
      }
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#E3F2FD",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 380,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
        >
          Weather App
        </Typography>

        <Typography
          align="center"
          color="text.secondary"
          mb={3}
        >
          Login to continue
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Box component="form" onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading || resetLoading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <Button
            type="button"
            variant="text"
            fullWidth
            sx={{ mt: 1 }}
            onClick={handleForgotPassword}
            disabled={loading || resetLoading}
          >
            {resetLoading
              ? "Sending reset email..."
              : "Forgot Password?"}
          </Button>
        </Box>

        <Typography
          align="center"
          color="text.secondary"
          sx={{ mt: 2 }}
        >
          Don't have an account?{" "}
          <Link to="/register">Create account</Link>
        </Typography>
      </Paper>
    </Box>
  );
}