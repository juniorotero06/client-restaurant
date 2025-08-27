import React from "react";
import { Grid, Paper } from "@mui/material";

function noFound() {
  return (
    <Grid container spacing={4} justifyContent="center" alignItems="center">
      <Paper style={{ marginTop: 150, padding: 20 }}>
        <h6>
          Sorry, but the page you were looking for can’t be found. We hope the
          options below help you find what you are looking for.
        </h6>
      </Paper>
    </Grid>
  );
}

export default noFound;
