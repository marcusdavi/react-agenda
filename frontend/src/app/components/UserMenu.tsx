import { IconButton, Avatar, Icon, Box } from "@material-ui/core";
import { Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { signOutEndpoint } from "../services/backend";
import { useAuthContext } from "../hooks/authContext";

const useStyles = makeStyles({
  userDetails: {
    borderBottom: "1px solid rgb(224, 224, 224)",
    marginBottom: "8px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      marginBottom: "8px",
    },
  },
});

export default function UserMenu() {
  const {user,onSignOut}  = useAuthContext();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  };

  function signOut(){
    signOutEndpoint();
    onSignOut();
  }

  return (
    <div>
      <div>
        <IconButton onClick={handleClick}>
          <Avatar>
            <Icon>person</Icon>
          </Avatar>
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <Box className={classes.userDetails}>
            <Avatar>
              <Icon>person</Icon>
            </Avatar>
            <div>{user.name}</div>
            <small>{user.email}</small>
          </Box>
          <MenuItem onClick={signOut}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
