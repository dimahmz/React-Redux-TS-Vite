import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { useState } from "react";
import { selectSignInStatus } from "@/store/userSlice";
import { useAppSelector } from "@/hooks";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

import * as React from "react"

export default function SignInErrorSnackbar() {
  const signInStatus = useAppSelector(selectSignInStatus);

  const [open, setOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={signInStatus == "failed"}
      autoHideDuration={5000}
      action={action}
      onClose={handleClose}
      message="Email or password is incorrect!"
    />
  );
}
