import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch } from "@/hooks";
import { logOutUser } from "@/store/userSlice";
import { Link } from "react-router-dom";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, route: "" },
  { text: "Analytics", icon: <AnalyticsRoundedIcon />, route: "" },
  { text: "Users", icon: <PeopleRoundedIcon />, route: "" },
  { text: "Requests", icon: <AssignmentRoundedIcon />, route: "/requests" },
];

const secondaryListItems = [
  { text: "Settings", icon: <SettingsRoundedIcon />, route: "/requests" },
];

export default function MenuContent() {
  const dispatcher = useAppDispatch();

  function logOut() {
    dispatcher(logOutUser());
  }

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <Link to={item.route}>
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <ListItemButton selected={index === 0}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <Link to={item.route}>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton onClick={logOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
}
