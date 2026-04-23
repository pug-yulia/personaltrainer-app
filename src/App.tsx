import { NavLink, Outlet } from "react-router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Personal Trainer
          </Typography>
          <Button color="inherit" component={NavLink} to="/">
            Customers
          </Button>
          <Button color="inherit" component={NavLink} to="/trainings">
            Trainings
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {/* Outlet is a placeholder, router replaces it with
        what route matches the current url */}
        <Outlet />
      </Container>
    </>
  );
}
