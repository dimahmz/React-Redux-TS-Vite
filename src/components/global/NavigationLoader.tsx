import { Outlet, useNavigation } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";

export default function NavigationLoader() {
  const navigation = useNavigation();

  if (navigation.state == "loading") {
    return (
      <>
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Outlet />
      </>
    );
  }
  return <Outlet />;

  return;
}
