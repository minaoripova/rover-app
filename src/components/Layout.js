import { Outlet } from "react-router-dom";
import { AppBar, ListItem, Toolbar, Typography } from "@mui/material";
import { Link } from 'react-router-dom';

export function Layout(){
    return (
        <>
          <AppBar position="relative">
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap>
                Rover App
              </Typography>
    
              <ul>
                <li>
                    <ListItem component={Link} to="/">Rovers</ListItem>
                </li>
              </ul>
            </Toolbar>
          </AppBar>
          <main>
            <Outlet/>
          </main>
        </>
      );
}