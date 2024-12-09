import * as React from "react";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import AppTheme from "../../theme/AppTheme";
import ColorModeSelect from "../../theme/ColorModeSelect";
import signinContent from "@/content/pages/signin.json";
import { CardStyle, SignUpContainerStyle } from "./signin.style";
import { SignInRequestBody } from "@/api/authApi";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  selectIsAuthenticated,
  selectSignInStatus,
  signInUser,
  Status,
} from "@/store/userSlice";
import { useNavigate } from "react-router-dom";
import SignInErrorSnackbar from "./components/snackbar";

const SignUpContainer = styled(Stack)(({ theme }) =>
  SignUpContainerStyle(theme)
);

const Card = styled(MuiCard)(({ theme }) => CardStyle(theme));

export default function SignUp(props: { disableCustomTheme?: boolean }) {
  const [referenceError, setreferenceError] = React.useState(false);
  const [referenceErrorMessage, setreferenceErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");

  const dispatcher = useAppDispatch();

  const status: Status = useAppSelector(selectSignInStatus);
  const isAuthenticated: boolean = useAppSelector(selectIsAuthenticated);

  const validateInputs = () => {
    const reference = document.getElementById("reference") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!reference.value || !/\b\d+\b/.test(reference.value)) {
      setreferenceError(true);
      setreferenceErrorMessage("Please enter a valid reference.");
      isValid = false;
    } else {
      setreferenceError(false);
      setreferenceErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (referenceError || passwordError) {
      return;
    }

    const reference = document.getElementById("reference") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    const signInRequestBody: SignInRequestBody = {
      password: password.value,
      reference: parseInt(reference.value),
    };

    await dispatcher(signInUser(signInRequestBody));

  
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <SignInErrorSnackbar />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            {signinContent.signin}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="reference">
                {signinContent.reference}
              </FormLabel>
              <TextField
                required
                fullWidth
                id="reference"
                placeholder="XXXX"
                name="reference"
                autoComplete="reference"
                variant="outlined"
                error={referenceError}
                helperText={referenceErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">{signinContent.password}</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <LoadingButton
              loading={status == "loading"}
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              {signinContent.signin}
            </LoadingButton>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
