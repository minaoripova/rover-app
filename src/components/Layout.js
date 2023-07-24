import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from 'react-router-dom';


export function Layout(){

    return (
        <>
          <AppBar position="relative" style={{ background: '#000000' }}>
            <Toolbar>
              <Typography variant="h6" color="inherit" style={{ fontWeight: 800, textDecoration:'none' }} noWrap component={Link} to="/">Rovers App
              </Typography>
            </Toolbar>
          </AppBar>
          <main>
            <Outlet/>
          </main>
        </>
      );
}