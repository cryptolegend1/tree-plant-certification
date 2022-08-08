import * as React from "react";
import Container from "@mui/material/Container";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import api from "../services/api";

export default function Home() {
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [qrCode, setQRCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onIssue = async () => {
    if (!species || !location || !date) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    const result = await api.issue(species, location, date);
    setQRCode(
      "https://chart.googleapis.com/chart?cht=qr&chl=" +
        result.offerUrl +
        "&chs=300x300&chld=L|1"
    );
    setLoading(false);
  };
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          p: 4,
          bgcolor: "#cfe8fc",
          minHeight: "100vh",
        }}
        component="form"
        noValidate
      >
        <Typography
          variant="h6"
          sx={{ textAlign: "center", marginBottom: "32px", fontWeight: 700 }}
        >
          Tree Plant Certification
        </Typography>
        <TextField
          fullWidth
          label="Species"
          size="small"
          sx={{ marginBottom: "20px" }}
          required
          onChange={(e) => {
            setSpecies(e.target.value);
          }}
          value={species}
          error={!species}
        />
        <TextField
          fullWidth
          label="Location"
          size="small"
          sx={{ marginBottom: "20px" }}
          required
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          value={location}
          error={!location}
        />
        <TextField
          required
          fullWidth
          label="Date Of Plant"
          size="small"
          type="date"
          sx={{ marginBottom: "20px" }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          value={date}
          error={!date}
        />

        <Button variant="contained" onClick={onIssue}>
          {loading ? (
            <>
              <CircularProgress color="secondary" sx={{ mr: "5px" }} />{" "}
              Issuing...
            </>
          ) : (
            "Issue Certification"
          )}
        </Button>
        {qrCode && (
          <Box sx={{ marginTop: "20px", textAlign: "center" }}>
            <img id="qrcode" src={qrCode} alt="QR code" />
          </Box>
        )}
      </Box>
    </Container>
  );
}
